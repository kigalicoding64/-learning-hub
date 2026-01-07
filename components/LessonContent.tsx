
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { Lesson, Quiz } from '../types';
import { generateQuiz, summarizeContent, generateTTS } from '../services/geminiService';
import { BrainCircuitIcon, ClipboardListIcon, LoaderIcon, SparklesIcon, SpeakerIcon, PlayIcon, CheckCircleIcon, VideoIcon, AwardIcon } from './Icons';
import ChatInterface from './ChatInterface';
import QuizModal from './QuizModal';

interface LessonContentProps {
  lesson: Lesson;
  courseTitle: string;
  isLessonComplete: boolean;
  onMarkComplete: () => void;
}

const CustomVideoPlayer: React.FC<{ url: string }> = ({ url }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleProgress = () => {
        if (videoRef.current) {
            const current = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(isNaN(current) ? 0 : current);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
            videoRef.current.currentTime = time;
            setProgress(parseFloat(e.target.value));
        }
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (videoRef.current) {
            videoRef.current.volume = vol;
            videoRef.current.muted = vol === 0;
        }
        setIsMuted(vol === 0);
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuteState = !isMuted;
            setIsMuted(newMuteState);
            videoRef.current.muted = newMuteState;
            if (newMuteState) setVolume(0);
            else {
                setVolume(0.5);
                videoRef.current.volume = 0.5;
            }
        }
    };

    return (
        <div className="relative group rounded-[2.5rem] overflow-hidden bg-black aspect-video mb-12 shadow-2xl border border-white/5 ring-1 ring-white/10">
            <video 
                ref={videoRef} 
                src={url} 
                className="w-full h-full cursor-pointer object-cover"
                onTimeUpdate={handleProgress}
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            
            {/* Overlay Controls */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-6 translate-y-2 group-hover:translate-y-0">
                <div className="relative w-full h-1.5 bg-white/10 rounded-full group/seek">
                    <input 
                        type="range" 
                        value={progress} 
                        onChange={handleSeek} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div 
                        className="absolute top-0 left-0 h-full bg-brand-blue rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-75" 
                        style={{ width: `${progress}%` }}
                    />
                    <div 
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-brand-blue scale-0 group-hover/seek:scale-100 transition-transform"
                        style={{ left: `calc(${progress}% - 8px)` }}
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button onClick={togglePlay} className="text-white hover:text-brand-light-blue transition-all transform hover:scale-110 active:scale-95">
                            {isPlaying ? (
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-6 bg-current rounded-full"></div>
                                    <div className="w-2 h-6 bg-current rounded-full"></div>
                                </div>
                            ) : (
                                <PlayIcon className="w-8 h-8" />
                            )}
                        </button>
                        
                        <div className="flex items-center gap-4 group/volume">
                            <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
                                <SpeakerIcon className={`w-6 h-6 ${isMuted ? 'opacity-40' : ''}`} />
                            </button>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05" 
                                value={volume} 
                                onChange={handleVolume} 
                                className="w-24 h-1 bg-white/20 rounded-full accent-brand-light-blue cursor-pointer" 
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                        <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">HD Smart Streaming</span>
                    </div>
                </div>
            </div>

            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:bg-black/20 transition-colors">
                    <div className="w-24 h-24 bg-brand-blue text-brand-darker rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] transform hover:scale-110 transition-all pointer-events-auto cursor-pointer" onClick={togglePlay}>
                        <PlayIcon className="w-10 h-10 ml-1" />
                    </div>
                </div>
            )}
        </div>
    );
};

const LessonContent: React.FC<LessonContentProps> = ({ lesson, courseTitle, isLessonComplete, onMarkComplete }) => {
  const [summary, setSummary] = useState('');
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [markdownHtml, setMarkdownHtml] = useState('');

  useEffect(() => {
    const parseContent = async () => {
        try {
            const html = await marked.parse(lesson.content);
            setMarkdownHtml(html);
        } catch (err) {
            console.error("Markdown parse error:", err);
            setMarkdownHtml(lesson.content);
        }
    };
    parseContent();
  }, [lesson.content]);

  const handleSummarize = async () => {
    setLoadingAction('summary');
    try {
      const result = await summarizeContent(lesson.content);
      setSummary(result);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleTTS = async () => {
    setLoadingAction('audio');
    try {
      const b64 = await generateTTS(lesson.content.substring(0, 1000));
      setAudioUrl(`data:audio/wav;base64,${b64}`);
    } catch (e) {
      alert("TTS generation failed. Please check your internet connection.");
    } finally {
      setLoadingAction(null);
    }
  };

  const onQuizSuccess = () => {
      onMarkComplete();
  };

  return (
    <div className="space-y-12 animate-slide-in-up max-w-5xl mx-auto pb-24">
      <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/5">
        <div className="p-8 lg:p-16">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16">
                <div className="flex-grow">
                    <h1 className="text-4xl lg:text-7xl font-black text-white mb-6 leading-[0.85] tracking-tighter uppercase italic">{lesson.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                            <VideoIcon className="w-3.5 h-3.5 text-brand-blue" />
                            <span>{lesson.duration} Min Core Module</span>
                        </div>
                        {isLessonComplete && (
                            <div className="flex items-center gap-2 bg-brand-blue/10 px-4 py-2 rounded-full border border-brand-blue/20 text-brand-blue">
                                <CheckCircleIcon className="w-3.5 h-3.5" />
                                <span>Validated Module</span>
                            </div>
                        )}
                        <div className="h-4 w-[1px] bg-slate-800 hidden md:block"></div>
                        <span className="text-brand-light-blue bg-brand-blue/10 px-3 py-1 rounded-md">{courseTitle}</span>
                    </div>
                </div>
                <div className="flex gap-4 shrink-0">
                    <button onClick={handleTTS} disabled={!!loadingAction} className="w-16 h-16 bg-slate-800 rounded-2xl hover:bg-brand-blue hover:text-brand-darker transition-all flex items-center justify-center text-slate-400 shadow-xl border border-white/5 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {loadingAction === 'audio' ? <LoaderIcon className="w-7 h-7 animate-spin"/> : <SpeakerIcon className="w-7 h-7 relative z-10"/>}
                    </button>
                    <button onClick={handleSummarize} disabled={!!loadingAction} className="w-16 h-16 bg-slate-800 rounded-2xl hover:bg-brand-blue hover:text-brand-darker transition-all flex items-center justify-center text-slate-400 shadow-xl border border-white/5 group relative overflow-hidden">
                         <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {loadingAction === 'summary' ? <LoaderIcon className="w-7 h-7 animate-spin"/> : <SparklesIcon className="w-7 h-7 relative z-10"/>}
                    </button>
                </div>
            </div>

            {lesson.videoUrl && (
                <CustomVideoPlayer url={lesson.videoUrl} />
            )}

            {audioUrl && (
                <div className="mb-12 p-10 bg-gradient-to-r from-brand-blue/5 to-transparent border border-brand-blue/20 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 animate-fade-in ring-1 ring-brand-blue/10">
                    <div className="bg-brand-blue p-6 rounded-3xl text-brand-darker shadow-2xl shadow-brand-blue/30 transform hover:scale-105 transition-transform cursor-pointer">
                        <SpeakerIcon className="w-10 h-10"/>
                    </div>
                    <div className="flex-grow w-full space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black uppercase text-brand-light-blue tracking-[0.3em] mb-1">AI Engine Synthesis</p>
                                <h4 className="text-white font-bold text-sm">Synthetic Lecture Audio</h4>
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">24kHz PCM</span>
                        </div>
                        <audio src={audioUrl} controls className="w-full h-10 opacity-70 hover:opacity-100 transition-opacity rounded-xl" />
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8">
                    <div 
                        className="markdown-content prose prose-invert prose-emerald max-w-none text-slate-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: markdownHtml }}
                    />
                    
                    {!isLessonComplete && (
                         <div className="mt-20 pt-10 border-t border-white/5">
                            <button 
                                onClick={onMarkComplete}
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl border border-white/10 transition-all flex items-center gap-4"
                            >
                                <CheckCircleIcon className="w-5 h-5 text-brand-blue" />
                                Mark Module as Complete
                            </button>
                         </div>
                    )}
                </div>
                
                <aside className="lg:col-span-4 space-y-12">
                    <div className="p-10 bg-slate-800/40 rounded-[2rem] border border-white/5 relative overflow-hidden group backdrop-blur-sm">
                        <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-all duration-700 transform group-hover:rotate-12 group-hover:scale-110">
                            <BrainCircuitIcon className="w-32 h-32 text-brand-blue" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 pb-4 border-b border-white/5">Learning Objectives</h4>
                        <ul className="space-y-6">
                            {[
                                'Proprietary Architecture Patterns',
                                'Industry Deployment Cycles',
                                'Automated Validation Labs',
                                'Real-time System Orchestration'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-sm font-bold text-slate-300 group/item">
                                    <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-brand-blue group-hover/item:text-brand-darker transition-colors">
                                        <CheckCircleIcon className="w-3 h-3" />
                                    </div>
                                    <span className="group-hover/item:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {summary && (
                        <div className="p-10 bg-brand-blue/5 rounded-[2rem] border border-brand-blue/20 animate-fade-in relative">
                            <div className="absolute top-4 right-6">
                                <SparklesIcon className="w-5 h-5 text-brand-light-blue/30" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-light-blue mb-6">AI Executive Insight</h4>
                            <p className="text-sm text-slate-300 leading-relaxed italic font-medium">"{summary}"</p>
                        </div>
                    )}
                </aside>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        <div className="bg-slate-900 p-12 lg:p-20 rounded-[3.5rem] border border-white/5 shadow-2xl flex flex-col justify-center relative overflow-hidden group ring-1 ring-white/5">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent"></div>
            <h2 className="text-5xl font-black text-white mb-8 uppercase italic tracking-tighter leading-none">Engineering <br /><span className="text-brand-light-blue">Validation</span></h2>
            <p className="text-slate-400 mb-12 text-lg font-medium leading-relaxed max-w-md">Verify your knowledge through our automated intelligence labs. Achieving >85% score issues a global Egreed credential.</p>
            <button 
                onClick={async () => {
                    setLoadingAction('quiz');
                    try {
                        const quiz = await generateQuiz(lesson.content, lesson.title);
                        setQuizData(quiz);
                        setIsQuizModalOpen(true);
                    } finally {
                        setLoadingAction(null);
                    }
                }}
                disabled={!!loadingAction}
                className="w-full py-6 bg-brand-blue text-brand-darker font-black rounded-[1.5rem] hover:bg-brand-light-blue hover:scale-[1.02] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-brand-blue/30 uppercase tracking-[0.2em] text-sm group-hover:shadow-brand-blue/50"
            >
                {loadingAction === 'quiz' ? <LoaderIcon className="w-6 h-6 animate-spin"/> : <ClipboardListIcon className="w-6 h-6"/>}
                Initialize Lab Assessment
            </button>
        </div>

        <ChatInterface lesson={lesson} courseTitle={courseTitle} />
      </div>

      {quizData && (
        <QuizModal 
          isOpen={isQuizModalOpen} 
          onClose={() => setIsQuizModalOpen(false)}
          quiz={quizData} 
          onSuccess={onQuizSuccess}
        />
      )}
    </div>
  );
};

export default LessonContent;
