
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse, Modality, LiveServerMessage } from "@google/genai";
import { Lesson, ChatMessage, MessageSender } from '../types';
import { SendIcon, LoaderIcon, UserIcon, BotIcon, MicIcon, BrainIcon, ExternalLinkIcon, XIcon } from './Icons';
import { getAI, decodeBase64, encodeBase64, decodeAudioData } from '../services/geminiService';

interface ChatInterfaceProps {
    lesson: Lesson;
    courseTitle: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ lesson, courseTitle }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isThinkingMode, setIsThinkingMode] = useState(false);
    const [isLiveActive, setIsLiveActive] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<Chat | null>(null);
    
    // Live API refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const liveSessionRef = useRef<any>(null);
    const nextStartTimeRef = useRef(0);
    const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    useEffect(() => {
        const ai = getAI();
        chatRef.current = ai.chats.create({
            model: isThinkingMode ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
            config: {
                systemInstruction: `You are E-Tutor. Help with "${lesson.title}" from "${courseTitle}". 
                Content: ${lesson.content}. 
                Use Google Search if the user asks for current info or things outside this text.`,
                tools: [{ googleSearch: {} }],
                ...(isThinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {})
            },
        });
        setMessages([{ id: Date.now().toString(), text: `Hi! I'm E-Tutor. Ask me anything about "${lesson.title}".`, sender: MessageSender.AI }]);
    }, [lesson, courseTitle, isThinkingMode]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chatRef.current || isLoading) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), text: input, sender: MessageSender.USER };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: MessageSender.AI, isStreaming: true, isThinking: isThinkingMode }]);

        try {
            const result = await chatRef.current.sendMessage({ message: input });
            const grounding = result.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
                title: chunk.web?.title || "Reference",
                uri: chunk.web?.uri
            })).filter((c: any) => c.uri) || [];

            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: result.text || "", isStreaming: false, groundingUrls: grounding } : msg
            ));
        } catch (error) {
            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, text: "Error. Try again.", isStreaming: false } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, isThinkingMode]);

    const stopLive = () => {
        if (liveSessionRef.current) {
            // No direct session.close(), we just stop the stream and clear ref
            setIsLiveActive(false);
            liveSessionRef.current = null;
        }
    };

    const startLive = async () => {
        const ai = getAI();
        setIsLiveActive(true);
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        const source = inputCtx.createMediaStreamSource(stream);
                        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
                        processor.onaudioprocess = (e) => {
                            const inputData = e.inputBuffer.getChannelData(0);
                            const int16 = new Int16Array(inputData.length);
                            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
                            const pcmBlob = { data: encodeBase64(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
                            sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
                        };
                        source.connect(processor);
                        processor.connect(inputCtx.destination);
                    },
                    onmessage: async (msg: LiveServerMessage) => {
                        const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                        if (audioData && audioContextRef.current) {
                            const ctx = audioContextRef.current;
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                            const buffer = await decodeAudioData(decodeBase64(audioData), ctx, 24000, 1);
                            const source = ctx.createBufferSource();
                            source.buffer = buffer;
                            source.connect(ctx.destination);
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += buffer.duration;
                        }
                    },
                    onclose: () => setIsLiveActive(false),
                    onerror: () => setIsLiveActive(false),
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: `You are a voice tutor. Be helpful and natural. Topic: ${lesson.title}`,
                }
            });
            liveSessionRef.current = sessionPromise;
        } catch (e) {
            console.error(e);
            setIsLiveActive(false);
        }
    };

    return (
        <div className="flex flex-col h-[550px] bg-brand-dark/60 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsThinkingMode(!isThinkingMode)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all ${isThinkingMode ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'}`}
                    >
                        <BrainIcon className="w-3.5 h-3.5" />
                        {isThinkingMode ? 'THINKING ON' : 'THINKING OFF'}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    {isLiveActive ? (
                        <button onClick={stopLive} className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white animate-pulse">
                            <XIcon className="w-3.5 h-3.5" /> STOP VOICE
                        </button>
                    ) : (
                        <button onClick={startLive} className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-blue text-white hover:bg-brand-light-blue transition-all">
                            <MicIcon className="w-3.5 h-3.5" /> START VOICE
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4 scroll-smooth">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === MessageSender.USER ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === MessageSender.AI && (
                            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                                <BotIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                        <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm ${
                            msg.sender === MessageSender.USER 
                            ? 'bg-brand-blue text-white rounded-tr-none' 
                            : 'bg-slate-700/80 backdrop-blur-sm text-slate-200 rounded-tl-none'
                        }`}>
                            {msg.isThinking && <div className="text-[10px] uppercase tracking-wider text-purple-400 mb-1 font-bold">Reasoning...</div>}
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                            {msg.isStreaming && <LoaderIcon className="w-4 h-4 animate-spin inline-block ml-2 opacity-50"/>}
                            
                            {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                                <div className="mt-3 pt-2 border-t border-slate-600/50">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Sources:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {msg.groundingUrls.map((link, idx) => (
                                            <a key={idx} href={link.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-900 px-2 py-1 rounded transition-colors text-brand-light-blue">
                                                <ExternalLinkIcon className="w-3 h-3" />
                                                <span className="truncate max-w-[120px]">{link.title}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {msg.sender === MessageSender.USER && (
                             <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
                                <UserIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-slate-800/30 border-t border-slate-700 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLiveActive ? "Live Voice Active..." : "Type your question here..."}
                    disabled={isLoading || isLiveActive}
                    className="flex-grow bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all disabled:opacity-50"
                />
                <button type="submit" disabled={isLoading || !input.trim() || isLiveActive} className="bg-brand-blue text-white rounded-xl p-3 disabled:bg-slate-700 disabled:text-slate-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-blue/20">
                    {isLoading ? <LoaderIcon className="w-6 h-6 animate-spin" /> : <SendIcon className="w-6 h-6" />}
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
