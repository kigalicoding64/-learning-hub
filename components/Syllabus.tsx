
import React from 'react';
import { Lesson } from '../types';
import { BookOpenIcon, CheckCircleIcon, ClockIcon } from './Icons';

interface SyllabusProps {
  lessons: Lesson[];
  currentLessonIndex: number;
  onSelectLesson: (index: number) => void;
}

const Syllabus: React.FC<SyllabusProps> = ({ lessons, currentLessonIndex, onSelectLesson }) => {
  return (
    <div className="bg-brand-secondary/50 border border-slate-700 rounded-lg p-4 sticky top-24 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <BookOpenIcon className="w-6 h-6 text-brand-light-blue" />
        <h2 className="text-xl font-bold text-slate-100">Course Syllabus</h2>
      </div>
      <ul className="space-y-2">
        {lessons.map((lesson, index) => {
          const isCurrent = index === currentLessonIndex;
          const isCompleted = index < currentLessonIndex;

          return (
            <li key={lesson.id}>
              <button
                onClick={() => onSelectLesson(index)}
                className={`w-full text-left p-3 rounded-md transition-all duration-200 flex items-start gap-4 ${
                  isCurrent
                    ? 'bg-brand-blue/20 border-l-4 border-brand-blue text-white'
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex-shrink-0 pt-1">
                    {isCompleted ? (
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                    ) : (
                        <span className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${
                            isCurrent ? 'bg-brand-blue text-white' : 'bg-slate-600 text-slate-200'
                        }`}>
                            {index + 1}
                        </span>
                    )}
                </div>
                <div className="flex-grow">
                  <p className={`font-semibold ${isCurrent ? 'text-brand-light-blue' : 'text-slate-200'}`}>{lesson.title}</p>
                  <div className="flex items-center text-xs text-slate-400 mt-1 gap-1.5">
                    <ClockIcon className="w-3 h-3" />
                    <span>{lesson.duration} min read</span>
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
