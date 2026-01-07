
import React from 'react';
import { Lesson } from '../types';
import { BookOpenIcon, CheckCircleIcon, ClockIcon } from './Icons';

interface SyllabusProps {
  lessons: Lesson[];
  currentLessonIndex: number;
  completedLessons: string[];
  onSelectLesson: (index: number) => void;
}

const Syllabus: React.FC<SyllabusProps> = ({ lessons, currentLessonIndex, completedLessons, onSelectLesson }) => {
  return (
    <div className="bg-brand-secondary/50 border border-slate-700 rounded-3xl p-5 sticky top-24 animate-fade-in backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6 px-2">
        <BookOpenIcon className="w-5 h-5 text-brand-light-blue" />
        <h2 className="text-sm font-black text-slate-100 uppercase tracking-widest italic">Curriculum Flow</h2>
      </div>
      <ul className="space-y-3">
        {lessons.map((lesson, index) => {
          const isCurrent = index === currentLessonIndex;
          const isCompleted = completedLessons.includes(lesson.id);

          return (
            <li key={lesson.id}>
              <button
                onClick={() => onSelectLesson(index)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-start gap-4 border ${
                  isCurrent
                    ? 'bg-brand-blue/10 border-brand-blue/30 shadow-lg shadow-brand-blue/5'
                    : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                        <CheckCircleIcon className="w-5 h-5 text-brand-blue" />
                    ) : (
                        <span className={`w-5 h-5 flex items-center justify-center rounded-lg text-[10px] font-black ${
                            isCurrent ? 'bg-brand-blue text-brand-darker shadow-sm' : 'bg-slate-700/50 text-slate-400'
                        }`}>
                            {index + 1}
                        </span>
                    )}
                </div>
                <div className="flex-grow">
                  <p className={`text-sm font-bold leading-tight ${isCurrent ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{lesson.title}</p>
                  <div className="flex items-center text-[10px] text-slate-600 mt-2 gap-2 font-black uppercase tracking-tighter">
                    <ClockIcon className="w-3 h-3" />
                    <span>{lesson.duration} min study</span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Syllabus;
