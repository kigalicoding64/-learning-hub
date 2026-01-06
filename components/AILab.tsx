
import React, { useState, useRef } from 'react';
import { getAI, generateAIImage, analyzeMedia, generateAIVideo, generateTTS, transcribeAudio, encodeBase64 } from '../services/geminiService';
import { XIcon, LoaderIcon, ImageIcon, VideoIcon, MicIcon, SpeakerIcon, BrainIcon, SendIcon } from './Icons';

interface AILabProps {
    onClose: () => void;
}

const AILab: React.FC<AILabProps> = ({ onClose }) => {
    const [tool, setTool] = useState<'image' | 'video' | 'analyze' | 'audio'>('image');
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [isGenerating, setIsGenerating] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });

    const runTool = async () => {
        setIsGenerating(true);
        setResultUrl(null);
        setAnalysisResult('');
        try {
            if (tool === 'image') {
                const url = await generateAIImage(prompt, aspectRatio);
                setResultUrl(url);
            } else if (tool === 'video') {
                const hasSelected = await (window as any).aistudio.hasSelectedApiKey();
                if (!hasSelected) {
                    await (window as any).aistudio.openSelectKey();
                }
                const url = await generateAIVideo(prompt, aspectRatio as any);
                setResultUrl(url);
            } else if (tool === 'analyze' && selectedFile) {
                const b64 = await toBase64(selectedFile);
                const res = await analyzeMedia(b64, selectedFile.type, prompt || "Analyze this media in detail.");
                setAnalysisResult(res);
            } else if (tool === 'audio') {
                const url = await generateTTS(prompt);
                setResultUrl(`data:audio/wav;base64,${url}`);
            }
        } catch (e) {
            console.error(e);
            alert("Process failed. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in">
            <div className="bg-brand-secondary border border-slate-700 w-full max-w-4xl h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
                <header className="p-4 border-b border-slate-700 flex justify-between items-center bg-brand-dark/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-brand-blue/20 p-2 rounded-lg">
                            <BrainIcon className="w-6 h-6 text-brand-light-blue" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Egreed AI Hub</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <XIcon className="w-6 h-6" />
                    </button>
                </header>

                <div className="flex flex-grow overflow-hidden">
                    <aside className="w-20 md:w-48 bg-brand-dark/30 border-r border-slate-700 flex flex-col gap-2 p-2">
                        {[
                            { id: 'image', label: 'Image Gen', icon: ImageIcon },
                            { id: 'video', label: 'Video Gen', icon: VideoIcon },
                            { id: 'analyze', label: 'Analysis', icon: BrainIcon },
                            { id: 'audio', label: 'Audio/TTS', icon: SpeakerIcon },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => { setTool(item.id as any); setResultUrl(null); setAnalysisResult(''); }}
                                className={`flex flex-col md:flex-row items-center gap-3 p-3 rounded-xl transition-all ${tool === item.id ? 'bg-brand-blue text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="hidden md:inline text-sm font-medium">{item.label}</span>
                            </button>
                        ))}
                    </aside>

                    <main className="flex-grow flex flex-col p-6 overflow-y-auto bg-brand-dark/10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Prompt / Instruction</label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder={`Describe what you want to ${tool === 'analyze' ? 'analyze' : 'generate'}...`}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-brand-blue outline-none h-32 resize-none"
                                />
                            </div>

                            {(tool === 'image' || tool === 'video') && (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Aspect Ratio</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['1:1', '4:3', '3:4', '16:9', '9:16', '21:9'].map(ar => (
                                            <button
                                                key={ar}
                                                onClick={() => setAspectRatio(ar)}
                                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${aspectRatio === ar ? 'bg-brand-light-blue text-brand-dark' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                                            >
                                                {ar}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {tool === 'analyze' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Upload File (Image/Video)</label>
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-blue hover:bg-brand-blue/5 transition-all"
                                    >
                                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,video/*" />
                                        {selectedFile ? (
                                            <p className="text-brand-light-blue font-bold">{selectedFile.name}</p>
                                        ) : (
                                            <>
                                                <ImageIcon className="w-10 h-10 text-slate-600" />
                                                <p className="text-slate-400 text-sm">Click or drag and drop media file</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={runTool}
                                disabled={isGenerating || (tool === 'analyze' && !selectedFile)}
                                className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-brand-light-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-blue/20"
                            >
                                {isGenerating ? <LoaderIcon className="w-6 h-6 animate-spin" /> : <SendIcon className="w-6 h-6" />}
                                {isGenerating ? 'Processing...' : `Generate ${tool.charAt(0).toUpperCase() + tool.slice(1)}`}
                            </button>

                            {resultUrl && (
                                <div className="mt-8 p-4 bg-slate-900 border border-slate-700 rounded-2xl animate-fade-in">
                                    <label className="text-sm font-bold text-slate-400 uppercase mb-4 block">Generated Output</label>
                                    {tool === 'image' && <img src={resultUrl} className="w-full rounded-xl shadow-2xl" />}
                                    {tool === 'video' && <video src={resultUrl} controls className="w-full rounded-xl shadow-2xl" />}
                                    {tool === 'audio' && <audio src={resultUrl} controls className="w-full mt-2" />}
                                </div>
                            )}

                            {analysisResult && (
                                <div className="mt-8 p-6 bg-slate-900 border border-slate-700 rounded-2xl animate-fade-in">
                                    <label className="text-sm font-bold text-slate-400 uppercase mb-4 block">Analysis Result</label>
                                    <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed">
                                        {analysisResult}
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AILab;
