
import React, { useState } from 'react';
import { Course, User } from '../types';
import Syllabus from './Syllabus';
import LessonContent from './LessonContent';
import CertificateModal from './CertificateModal';
import { AwardIcon, SparklesIcon, CheckCircleIcon, BrainIcon } from './Icons';

interface CourseViewProps {
  course: Course;
  user: User | null;
  completedLessons: string[];
  onMarkComplete: (lessonId: string) => void;
}

const CourseView: React.FC<CourseViewProps> = ({ course, user, completedLessons, onMarkComplete }) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const currentLesson = course.lessons[currentLessonIndex];
  
  const progressPercent = Math.round((completedLessons.length / course.lessons.length) * 100);
  const isComplete = completedLessons.length === course.lessons.length;

  return (
    <div className="animate-slide-in-up flex flex-col lg:flex-row gap-8 pb-32">
        <aside className="w-full lg:w-1/4 lg:max-w-xs shrink-0 flex flex-col gap-6">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sticky top-24 z-10 overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
              
              <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Deployment Progress</span>
                    <div className="flex items-end justify-between mb-4">
                        <span className="text-4xl font-black text-white italic tracking-tighter">{progressPercent}%</span>
                        <span className="text-[10px] font-black text-brand-light-blue uppercase tracking-widest mb-1">Status: {isComplete ? 'Validated' : 'In Flight'}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-brand-blue shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all duration-700 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">Skills Authorization</span>
                    <div className="flex flex-wrap gap-2">
                        {course.skillsAcquired?.map((skill, idx) => {
                            const isEarned = (idx / (course.skillsAcquired?.length || 1)) < (completedLessons.length / course.lessons.length);
                            return (
                                <span key={skill} className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all duration-500 ${
                                    isEarned ? 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue shadow-[0_0_10px_rgba(16,185,129,0.15)]' : 'bg-transparent border-white/5 text-slate-700'
                                }`}>
                                    {skill}
                                </span>
                            );
                        })}
                    </div>
                  </div>

                  {isComplete && (
                      <button 
                        onClick={() => setIsCertificateOpen(true)}
                        className="w-full mt-4 py-5 bg-brand-blue text-brand-darker font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-brand-blue/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 animate-bounce"
                      >
                        <AwardIcon className="w-5 h-5" />
                        Claim Engineering Cert
                      </button>
                  )}
              </div>
          </div>

          <Syllabus
            lessons={course.lessons}
            currentLessonIndex={currentLessonIndex}
            completedLessons={completedLessons}
            onSelectLesson={setCurrentLessonIndex}
            onToggleComplete={onMarkComplete}
          />

          <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-3xl p-6 flex items-center gap-4 group cursor-pointer hover:bg-brand-blue/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-darker flex items-center justify-center shadow-lg">
                  <BrainIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                  <span className="text-[10px] font-black text-brand-light-blue uppercase tracking-widest">Active Mentor</span>
                  <span className="text-xs font-bold text-white group-hover:text-brand-blue transition-colors">Neural E-Tutor Online</span>
              </div>
          </div>
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
                userName={user?.fullName || 'Validated With Egreed technology BY EGREEDLEARNING PLATFORM Student'}
                onClose={() => setIsCertificateOpen(false)} 
            />
        )}
    </div>
  );
};

export default CourseView;
