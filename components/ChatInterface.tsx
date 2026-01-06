
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
        // Updated model choice: use gemini-3-flash-preview for fast mode as it reliably supports search tools
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
                
                // Extract grounding if available in any chunk
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

    // Voice Message Feature
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

    // Live API Session
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
                            // CRITICAL: Initiating sendRealtimeInput after live.connect call resolves.
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
                            // Schedule audio chunk with precise timing for gapless playback
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
        <div className="flex flex-col h-[600px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl relative">
            {/* Header / Mode Toggles */}
            <div className="bg-slate-800/90 px-4 py-3 flex items-center justify-between border-b border-slate-700 z-10">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsThinkingMode(true)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isThinkingMode ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'bg-slate-700 text-slate-400 hover:text-slate-200'}`}
                        title="Use high-intelligence Pro model"
                    >
                        <BrainIcon className="w-3.5 h-3.5" />
                        THINKING
                    </button>
                    <button 
                        onClick={() => setIsThinkingMode(false)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!isThinkingMode ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-slate-700 text-slate-400 hover:text-slate-200'}`}
                        title="Use low-latency Flash model"
                    >
                        <SparklesIcon className="w-3.5 h-3.5" />
                        FAST
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    {isLiveActive ? (
                        <button onClick={stopLive} className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-red-500 text-white animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span> LIVE SESSION
                        </button>
                    ) : (
                        <button onClick={startLive} className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-brand-blue text-white hover:bg-brand-light-blue transition-all">
                            <MicIcon className="w-3.5 h-3.5" /> VOICE TUTOR
                        </button>
                    )}
                </div>
            </div>

            {/* Error Message Toast */}
            {errorMessage && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs font-bold py-2 px-4 rounded-full shadow-xl flex items-center gap-2 animate-slide-in-up z-20">
                    <span>{errorMessage}</span>
                    <button onClick={() => setErrorMessage(null)}><XIcon className="w-3 h-3" /></button>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-grow p-6 overflow-y-auto space-y-6 scroll-smooth bg-gradient-to-b from-slate-900 to-slate-950">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === MessageSender.USER ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === MessageSender.AI && (
                            <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-blue/20">
                                <BotIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                        <div className={`max-w-[80%] group ${msg.sender === MessageSender.USER ? 'order-1' : 'order-2'}`}>
                            <div className={`px-5 py-3.5 rounded-2xl shadow-sm relative ${
                                msg.sender === MessageSender.USER 
                                ? 'bg-brand-blue text-white rounded-tr-none' 
                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                            }`}>
                                {msg.isThinking && msg.isStreaming && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></div>
                                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-tighter">Deep Reasoning...</span>
                                    </div>
                                )}
                                <p className="whitespace-pre-wrap text-[15px] leading-relaxed select-text">{msg.text}</p>
                                {msg.isStreaming && <span className="inline-block w-2 h-4 bg-brand-light-blue/50 ml-1 animate-pulse rounded-sm"></span>}
                                
                                {/* Grounding URLs UI */}
                                {msg.groundingUrls && msg.groundingUrls.length > 0 && (
                                    <div className="mt-4 pt-3 border-t border-slate-700/50">
                                        <div className="flex items-center gap-2 mb-2 text-slate-500">
                                            <SearchIcon className="w-3 h-3" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Verified Sources</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {msg.groundingUrls.map((link, idx) => (
                                                <a key={idx} href={link.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] bg-slate-900/50 hover:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-700 transition-all text-brand-light-blue font-bold">
                                                    <span className="truncate max-w-[140px]">{link.title}</span>
                                                    <ExternalLinkIcon className="w-3 h-3 opacity-50" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {msg.sender === MessageSender.USER && (
                             <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <UserIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-4 bg-slate-800/50 border-t border-slate-700 flex items-center gap-3 backdrop-blur-sm">
                <button 
                    type="button"
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className={`p-3 rounded-xl transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
                    title="Hold to send voice message"
                >
                    <MicIcon className="w-6 h-6" />
                </button>
                
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isLiveActive ? "Voice session in progress..." : "Ask your tutor anything..."}
                    disabled={isLoading || isLiveActive}
                    className="flex-grow bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all disabled:opacity-50 text-[15px]"
                />
                
                <button 
                    type="submit" 
                    disabled={isLoading || !input.trim() || isLiveActive} 
                    className="bg-brand-blue text-white rounded-xl p-3 disabled:bg-slate-700 disabled:text-slate-500 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-blue/20"
                >
                    {isLoading ? <LoaderIcon className="w-6 h-6 animate-spin" /> : <SendIcon className="w-6 h-6" />}
                </button>
            </form>
        </div>
    );
};

export default ChatInterface;
