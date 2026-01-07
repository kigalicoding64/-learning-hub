
import React, { useState } from 'react';
import { Course } from '../types';
import Syllabus from './Syllabus';
import LessonContent from './LessonContent';
import CertificateModal from './CertificateModal';
import { AwardIcon, SparklesIcon } from './Icons';

interface CourseViewProps {
  course: Course;
  completedLessons: string[];
  onMarkComplete: (lessonId: string) => void;
}

const CourseView: React.FC<CourseViewProps> = ({ course, completedLessons, onMarkComplete }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const currentLesson = course.lessons[currentLessonIndex];
  
  const progressPercent = Math.round((completedLessons.length / course.lessons.length) * 100);
  const isComplete = completedLessons.length === course.lessons.length;

  return (
    <div className="animate-slide-in-up flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 lg:max-w-xs shrink-0 flex flex-col gap-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Training Progress</span>
                  <span className="text-brand-light-blue font-black text-xs">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-blue shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
              </div>
              
              {isComplete && (
                  <button 
                    onClick={() => setIsCertificateOpen(true)}
                    className="w-full mt-6 py-4 bg-brand-blue text-brand-darker font-black text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <AwardIcon className="w-4 h-4" />
                    Claim Certificate
                  </button>
              )}
          </div>

          <Syllabus
            lessons={course.lessons}
            currentLessonIndex={currentLessonIndex}
            completedLessons={completedLessons}
            onSelectLesson={setCurrentLessonIndex}
          />
        </aside>
        
        <div className="flex-grow min-w-0">
          <LessonContent 
            key={currentLesson.id} 
            lesson={currentLesson} 
            courseTitle={course.title} 
            isLessonComplete={completedLessons.includes(currentLesson.id)}
            onMarkComplete={() => onMarkComplete(currentLesson.id)}
          />
        </div>

        {isCertificateOpen && (
            <CertificateModal 
                courseTitle={course.title} 
                onClose={() => setIsCertificateOpen(false)} 
            />
        )}
    </div>
  );
};

export default CourseView;
