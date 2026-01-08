
import React, { useState, useMemo } from 'react';
import { Course, Enrollment, Lesson, Module, User } from '../types';
import Syllabus from './Syllabus';
import LessonContent from './LessonContent';
import CertificateModal from './CertificateModal';
import { AwardIcon, ArrowLeftIcon, LockIcon, CheckCircleIcon } from './Icons';

interface CourseViewProps {
  course: Course;
  enrollment: Enrollment;
  onMarkComplete: (lessonId: string, isQuiz: boolean) => void;
  onBack: () => void;
  /* Fix: Added User to props */
  user: User;
}

const CourseView: React.FC<CourseViewProps> = ({ course, enrollment, onMarkComplete, onBack, user }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const activeModule = course.modules[activeModuleIndex];
  const activeLesson = activeModule.lessons[activeLessonIndex];

  // Sequential Unlocking Logic
  const isModuleLocked = (index: number) => {
    if (index === 0) return false;
    const prevModule = course.modules[index - 1];
    return !enrollment.completedQuizzes.includes(prevModule.id);
  };

  const isLessonLocked = (mIdx: number, lIdx: number) => {
    if (isModuleLocked(mIdx)) return true;
    if (lIdx === 0) return false;
    const prevLesson = course.modules[mIdx].lessons[lIdx - 1];
    return !enrollment.completedLessons.includes(prevLesson.id);
  };

  const progress = enrollment?.progress || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 animate-fade-in flex flex-col lg:flex-row gap-12 pb-32">
        {/* Sequential Syllabus Sidebar */}
        <aside className="w-full lg:w-1/3 lg:max-w-sm space-y-8">
            <button onClick={onBack} className="flex items-center gap-4 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-all">
                <ArrowLeftIcon className="w-4 h-4" />
                Return to Command
            </button>

            <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-2xl">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Course Progress</span>
                    <span className="text-3xl font-black text-white italic">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-blue shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ width: `${progress}%` }}></div>
                </div>
                {progress === 100 && (
                     <button onClick={() => setIsCertificateOpen(true)} className="w-full py-4 bg-brand-blue text-brand-darker font-black text-[10px] rounded-xl uppercase tracking-widest animate-pulse shadow-lg shadow-brand-blue/30">
                        View Official Credential
                    </button>
                )}
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 no-scrollbar">
                {course.modules.map((m, mIdx) => {
                    const isLocked = isModuleLocked(mIdx);
                    const isCompleted = enrollment.completedQuizzes.includes(m.id);
                    return (
                        <div key={m.id} className={`p-6 rounded-3xl border transition-all ${isLocked ? 'opacity-40 border-white/5 pointer-events-none' : activeModuleIndex === mIdx ? 'bg-white/5 border-brand-blue/50' : 'bg-slate-900/50 border-white/5 hover:border-white/10'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Module {mIdx + 1}</span>
                                {isLocked ? <LockIcon className="w-3 h-3 text-slate-700" /> : isCompleted ? <CheckCircleIcon className="w-3 h-3 text-brand-blue" /> : null}
                            </div>
                            <h4 className="text-sm font-black text-white uppercase mb-4">{m.title}</h4>
                            <div className="space-y-2">
                                {m.lessons.map((l, lIdx) => {
                                    const lessonLocked = isLessonLocked(mIdx, lIdx);
                                    const lessonDone = enrollment.completedLessons.includes(l.id);
                                    return (
                                        <button 
                                            key={l.id} 
                                            disabled={lessonLocked}
                                            onClick={() => { setActiveModuleIndex(mIdx); setActiveLessonIndex(lIdx); }}
                                            className={`w-full text-left p-3 rounded-xl flex items-center justify-between text-[10px] font-bold uppercase transition-all ${activeModuleIndex === mIdx && activeLessonIndex === lIdx ? 'bg-brand-blue text-brand-darker' : lessonDone ? 'text-brand-blue hover:bg-white/5' : 'text-slate-500 hover:text-white'}`}
                                        >
                                            <span className="truncate">{l.title}</span>
                                            {lessonLocked ? <LockIcon className="w-2 h-2" /> : lessonDone ? <CheckCircleIcon className="w-3 h-3" /> : null}
                                        </button>
                                    );
                                })}
                                {!isLocked && (
                                    <button 
                                        disabled={!m.lessons.every(l => enrollment.completedLessons.includes(l.id))}
                                        onClick={() => { setActiveModuleIndex(mIdx); setActiveLessonIndex(-1); }} // -1 for Quiz view
                                        className={`w-full text-left p-3 rounded-xl text-[10px] font-black uppercase border-t border-white/5 mt-2 ${activeLessonIndex === -1 && activeModuleIndex === mIdx ? 'bg-brand-blue text-brand-darker' : 'text-brand-light-blue'}`}
                                    >
                                        Module Assessment
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>

        {/* Content Area */}
        <div className="flex-grow min-w-0">
            {activeLessonIndex === -1 ? (
                <div className="bg-slate-900 border border-white/5 p-12 lg:p-20 rounded-[4rem] text-center shadow-2xl">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">Phase Assessment</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-12">Complete this validation protocol to unlock the next module. Minimum passing score is 60%.</p>
                    <button onClick={() => onMarkComplete(activeModule.id, true)} className="px-16 py-6 bg-brand-blue text-brand-darker font-black text-xs rounded-2xl uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-blue/30">
                        Initialize Validation Lab
                    </button>
                </div>
            ) : (
                <LessonContent 
                    lesson={activeLesson} 
                    courseTitle={course.title} 
                    isLessonComplete={enrollment.completedLessons.includes(activeLesson.id)}
                    onMarkComplete={() => onMarkComplete(activeLesson.id, false)}
                />
            )}
        </div>

        {isCertificateOpen && (
            <CertificateModal 
                courseTitle={course.title} 
                /* Fix: Corrected userName access via user prop */
                userName={user?.fullName || 'Egreed Learner'} 
                onClose={() => setIsCertificateOpen(false)} 
            />
        )}
    </div>
  );
};

export default CourseView;
