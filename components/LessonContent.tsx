
import React, { useState, useCallback, useRef } from 'react';
import { Lesson, Quiz } from '../types';
import { generateQuiz, summarizeContent, generateTTS, decodeBase64, decodeAudioData } from '../services/geminiService';
// Fix: Added CheckCircleIcon to imports to fix missing name error on lines 86 and 90
import { BrainCircuitIcon, ClipboardListIcon, LoaderIcon, SparklesIcon, SpeakerIcon, PlayIcon, CheckCircleIcon } from './Icons';
import ChatInterface from './ChatInterface';
import QuizModal from './QuizModal';

interface LessonContentProps {
  lesson: Lesson;
  courseTitle: string;
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson, courseTitle }) => {
  const [summary, setSummary] = useState('');
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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
      const b64 = await generateTTS(lesson.content.substring(0, 1000)); // Sample first 1000 chars
      setAudioUrl(`data:audio/wav;base64,${b64}`);
    } catch (e) {
      alert("TTS generation failed. This feature requires credits.");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="space-y-12 animate-slide-in-up max-w-5xl mx-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-8 lg:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">{lesson.title}</h1>
                    <div className="flex items-center gap-4 text-slate-500 text-sm font-bold uppercase tracking-widest">
                        <span>{lesson.duration} Minute Read</span>
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        <span className="text-emerald-400">{courseTitle}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleTTS} disabled={!!loadingAction} className="p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all text-slate-300">
                        {loadingAction === 'audio' ? <LoaderIcon className="w-6 h-6 animate-spin"/> : <SpeakerIcon className="w-6 h-6"/>}
                    </button>
                    <button onClick={handleSummarize} disabled={!!loadingAction} className="p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all text-slate-300">
                        {loadingAction === 'summary' ? <LoaderIcon className="w-6 h-6 animate-spin"/> : <SparklesIcon className="w-6 h-6"/>}
                    </button>
                </div>
            </div>

            {audioUrl && (
                <div className="mb-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-6">
                    <div className="bg-emerald-500 p-3 rounded-full text-slate-900"><PlayIcon className="w-6 h-6"/></div>
                    <div className="flex-grow">
                        <p className="text-xs font-black uppercase text-emerald-400 tracking-tighter mb-1">AI Audio Lecture</p>
                        <audio src={audioUrl} controls className="w-full h-8" />
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-white prose-strong:text-emerald-400">
                    {lesson.content.split('\n').map((p, i) => p.trim() && <p key={i} className="mb-6 leading-relaxed">{p}</p>)}
                </div>
                
                <aside className="space-y-8">
                    <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">In this lesson</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-400">
                            <li className="flex items-start gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                Core concepts of architecture
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                Modern framework ecosystems
                            </li>
                        </ul>
                    </div>

                    {summary && (
                        <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 animate-fade-in">
                            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-4">AI Insight</h4>
                            <p className="text-sm text-slate-300 leading-relaxed italic">{summary}</p>
                        </div>
                    )}
                </aside>
            </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="bg-slate-900 p-8 lg:p-10 rounded-3xl border border-slate-800 shadow-xl">
            <h2 className="text-3xl font-black text-white mb-6">Mastery Check</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">Validate your understanding of this module with a dynamic quiz generated specifically for your learning pace.</p>
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
                className="w-full py-4 bg-emerald-500 text-slate-900 font-black rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3"
            >
                {loadingAction === 'quiz' ? <LoaderIcon className="w-6 h-6 animate-spin"/> : <ClipboardListIcon className="w-6 h-6"/>}
                START QUIZ
            </button>
        </div>

        <ChatInterface lesson={lesson} courseTitle={courseTitle} />
      </div>

      {quizData && (
        <QuizModal 
          isOpen={isQuizModalOpen} 
          onClose={() => setIsQuizModalOpen(false)}
          quiz={quizData} 
        />
      )}
    </div>
  );
};

export default LessonContent;
