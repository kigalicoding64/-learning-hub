
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat, GenerateContentResponse, Modality, LiveServerMessage } from "@google/genai";
import { Lesson, ChatMessage, MessageSender } from '../types';
import { SendIcon, LoaderIcon, UserIcon, BotIcon, MicIcon, BrainIcon, ExternalLinkIcon, XIcon, SparklesIcon, SearchIcon } from './Icons';
import { getAI, decodeBase64, encodeBase64, decodeAudioData, transcribeAudio } from '../services/geminiService';

interface ChatInterfaceProps {
    lesson: Lesson;
    courseTitle: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ lesson, courseTitle }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isThinkingMode, setIsThinkingMode] = useState(true); // Default to thinking for tutors
    const [isLiveActive, setIsLiveActive] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<Chat | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    
    // Live API refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const liveSessionRef = useRef<any>(null);
    const nextStartTimeRef = useRef(0);

    const initChat = useCallback(() => {
        const ai = getAI();
        const model = isThinkingMode ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
        
        chatRef.current = ai.chats.create({
            model: model,
            config: {
                systemInstruction: `You are E-Tutor, a world-class AI learning assistant for Egreed Technology. 
                Help the student with "${lesson.title}" from the course "${courseTitle}". 
                Lesson Content: ${lesson.content}. 
                Be encouraging, concise, and use your grounding tool for external facts.`,
                tools: [{ googleSearch: {} }],
                ...(isThinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {})
            },
        });
    }, [lesson, courseTitle, isThinkingMode]);

    useEffect(() => {
        initChat();
        if (messages.length === 0) {
            setMessages([{ 
                id: 'welcome', 
                text: `Hello! I'm your E-Tutor. I've analyzed "${lesson.title}". How can I help you master this topic today?`, 
                sender: MessageSender.AI 
            }]);
        }
    }, [lesson, courseTitle, isThinkingMode, initChat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = useCallback(async (textOverride?: string) => {
        const messageText = textOverride || input;
        if (!messageText.trim() || !chatRef.current || isLoading) return;

        setErrorMessage(null);
        const userMessage: ChatMessage = { id: Date.now().toString(), text: messageText, sender: MessageSender.USER };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiMessageId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { 
            id: aiMessageId, 
            text: '', 
            sender: MessageSender.AI, 
            isStreaming: true, 
            isThinking: isThinkingMode 
        }]);

        try {
            const streamResponse = await chatRef.current.sendMessageStream({ message: messageText });
            let fullText = '';
            let grounding: any[] = [];

            for await (const chunk of streamResponse) {
                const c = chunk as GenerateContentResponse;
                fullText += c.text || '';
                
                const meta = c.candidates?.[0]?.groundingMetadata;
                if (meta?.groundingChunks) {
                    grounding = meta.groundingChunks.map((g: any) => ({
                        title: g.web?.title || "Reference",
                        uri: g.web?.uri
                    })).filter((l: any) => l.uri);
                }

                setMessages(prev => prev.map(msg => 
                    msg.id === aiMessageId ? { ...msg, text: fullText, groundingUrls: grounding } : msg
                ));
            }

            setMessages(prev => prev.map(msg => 
                msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
            ));
        } catch (error: any) {
            console.error("Chat error:", error);
            const friendlyError = error.message?.includes("API_KEY") 
                ? "API Key error. Please check your configuration." 
                : "I encountered a connection issue. Please try sending your message again.";
            
            setErrorMessage(friendlyError);
            setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, isThinkingMode]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async () => {
                    const base64Audio = (reader.result as string).split(',')[1];
                    setIsLoading(true);
                    try {
                        const transcript = await transcribeAudio(base64Audio);
                        if (transcript) handleSendMessage(transcript);
                    } catch (err) {
                        setErrorMessage("Could not transcribe your voice. Please try typing.");
                    } finally {
                        setIsLoading(false);
                    }
                };
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            setErrorMessage("Microphone access denied.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const stopLive = () => {
        if (liveSessionRef.current) {
            setIsLiveActive(false);
            liveSessionRef.current = null;
            if (audioContextRef.current) audioContextRef.current.close();
        }
    };

    const startLive = async () => {
        setErrorMessage(null);
        const ai = getAI();
        setIsLiveActive(true);
        
        try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-12-2025',
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
                    onerror: (e) => {
                        console.error(e);
                        setErrorMessage("Live session failed.");
                        setIsLiveActive(false);
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: `You are an expert voice tutor. Be conversational and helpful. Focus on: ${lesson.title}`,
                }
            });
            liveSessionRef.current = sessionPromise;
        } catch (e) {
            console.error(e);
            setErrorMessage("Could not start voice session.");
            setIsLiveActive(false);
        }
    };

    return (
        <div className="flex flex-col h-[600px] bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl relative ring-1 ring-white/5">
            {/* Header / Mode Toggles */}
            <div className="bg-slate-800/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-white/5 z-10">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsThinkingMode(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase ${isThinkingMode ? 'bg-brand-blue text-brand-darker shadow-lg shadow-brand-blue/20' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                        title="Use high-intelligence Pro model"
                    >
                        <BrainIcon className="w-3.5 h-3.5" />
                        DEEP
                    </button>
                    <button 
                        onClick={() => setIsThinkingMode(false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase ${!isThinkingMode ? 'bg-emerald-500 text-brand-darker shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                        title="Use low-latency Flash model"
                    >
                        <SparklesIcon className="w-3.5 h-3.5" />
                        FAST
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    {isLiveActive ? (
                        <button onClick={stopLive} className="flex items-center gap-3 px-5 py-2 rounded-full text-[10px] font-black bg-red-500 text-white animate-pulse tracking-widest uppercase">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> LIVE SESSION
                        </button>
                    ) : (
                        <button onClick={startLive} className="flex items-center gap-3 px-5 py-2 rounded-full text-[10px] font-black bg-brand-blue/10 text-brand-light-blue hover:bg-brand-blue hover:text-brand-darker transition-all border border-brand-blue/20 tracking-widest uppercase">
                            <MicIcon className="w-3.5 h-3.5" /> VOICE TUTOR
                        </button>
                    )}
                </div>
            </div>

            {/* Error Message Toast */}
            {errorMessage && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-full shadow-2xl flex items-center gap-3 animate-slide-up z-20">
                    <span>{errorMessage}</span>
                    <button onClick={() => setErrorMessage(null)} className="p-1 hover:bg-black/10 rounded-full"><XIcon className="w-3 h-3" /></button>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-grow p-8 overflow-y-auto space-y-8 scroll-smooth bg-gradient-to-b from-slate-900 to-slate-950 no-scrollbar">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-5 ${msg.sender === MessageSender.USER ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl ${
                            msg.sender === MessageSender.AI ? 'bg-brand-blue text-brand-darker' : 'bg-slate-800 text-slate-400'
                        }`}>
                            {msg.sender === MessageSender.AI ? <BotIcon className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                        </div>
                        <div className={`max-w-[85%] ${msg.sender === MessageSender.USER ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                            <div className={`px-6 py-4 rounded-[1.5rem] shadow-sm relative text-[14px] leading-relaxed select-text ${
                                msg.sender === MessageSender.USER 
                                ? 'bg-brand-blue text-brand-darker rounded-tr-none font-bold' 
                                : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/5 backdrop-blur-sm'
                            }`}>
                                {msg.isThinking && msg.isStreaming && (
                                    <div className="flex items-center gap-2 mb-3 opacity-60">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-light-blue animate-pulse"></div>
                                        <span className="text-[9px] font-black text-brand-light-blue uppercase tracking-widest">Neural Processing</span>
                                    </div>
                                )}
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                                {msg.isStreaming && <span className="inline-block w-2 h-4 bg-brand-light-blue/50 ml-1 animate-pulse rounded-sm"></span>}
                                
                                {/* Grounding URLs UI */}
                                {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                                    <div className="mt-6 pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 mb-3 text-slate-500">
                                            <SearchIcon className="w-3 h-3" />
                                            <span className="text-[9px] font-black uppercase tracking-widest">Verification Layer</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {msg.groundingUrls.map((link, idx) => (
                                                <a key={idx} href={link.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] bg-slate-950/50 hover:bg-slate-950 px-3 py-2 rounded-xl border border-white/5 transition-all text-brand-light-blue font-black uppercase tracking-tighter">
                                                    <span className="truncate max-w-[120px]">{link.title}</span>
                                                    <ExternalLinkIcon className="w-3 h-3 opacity-50" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-6 bg-slate-800/80 backdrop-blur-2xl border-t border-white/5 flex items-center gap-4">
                <button 
                    type="button"
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/20' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}
                    title="Hold to send voice message"
                >
                    <MicIcon className="w-6 h-6" />
                </button>
                
                <div className="flex-grow relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isLiveActive ? "Voice session active..." : "Query the E-Tutor intelligence..."}
                        disabled={isLoading || isLiveActive}
                        className="w-full bg-slate-900 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all disabled:opacity-50 text-[14px] font-medium"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim() || isLiveActive} 
                    className="w-14 h-14 flex items-center justify-center bg-brand-blue text-brand-darker rounded-2xl disabled:bg-slate-800 disabled:text-slate-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-blue/20"
                >
                    {isLoading ? <LoaderIcon className="w-6 h-6 animate-spin" /> : <SendIcon className="w-6 h-6" />}
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
