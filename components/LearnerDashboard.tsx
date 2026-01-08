
import React from 'react';
import { User, Enrollment, Course } from '../types';
import { BookOpenIcon, AwardIcon, ZapIcon, StarIcon, CheckCircleIcon, ArrowRightIcon } from './Icons';

interface DashboardProps {
  user: User;
  enrollments: Record<string, Enrollment>;
  courses: Course[];
  onResume: (course: Course) => void;
  onExplore: () => void;
}

const LearnerDashboard: React.FC<DashboardProps> = ({ user, enrollments, courses, onResume, onExplore }) => {
  /* Fix: Explicitly cast enrollment values to Enrollment array to avoid 'unknown' type errors */
  const enrollmentList = Object.values(enrollments) as Enrollment[];
  const activeEnrollments = enrollmentList.filter(e => e.progress < 100);
  const completedEnrollments = enrollmentList.filter(e => e.progress === 100);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-slate-900/50 border border-white/5 rounded-[3rem] p-10 md:p-16 mb-12 flex flex-col md:flex-row justify-between items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.4em]">Personal Control Center</span>
              <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">Hello, <br />{user.fullName.split(' ')[0]}</h1>
              /* Fix: Use enrollmentList for calculation */
              <p className="text-slate-500 font-medium max-w-md">Your engineering journey is {Math.round(enrollmentList.reduce((acc, e) => acc + e.progress, 0) / (enrollmentList.length || 1))}% synchronized.</p>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0">
              <div className="p-8 bg-slate-950/50 rounded-3xl border border-white/5 text-center flex flex-col items-center gap-2">
                  <span className="text-4xl font-black text-brand-light-blue">{activeEnrollments.length}</span>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Tracks</span>
              </div>
              <div className="p-8 bg-brand-blue/10 rounded-3xl border border-brand-blue/20 text-center flex flex-col items-center gap-2">
                  <span className="text-4xl font-black text-brand-blue">{completedEnrollments.length}</span>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Credentials</span>
              </div>
          </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-white uppercase italic tracking-widest flex items-center gap-4">
                    <ZapIcon className="w-5 h-5 text-brand-blue" />
                    In-Flight Modules
                </h2>
                <button onClick={onExplore} className="text-[10px] font-black text-brand-light-blue hover:text-white uppercase tracking-widest">Browse More</button>
            </div>

            {activeEnrollments.length > 0 ? (
                <div className="grid gap-6">
                    {activeEnrollments.map(e => {
                        const course = courses.find(c => c.id === e.courseId);
                        if (!course) return null;
                        return (
                            <div key={e.courseId} onClick={() => onResume(course)} className="bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] hover:border-brand-blue/30 transition-all group cursor-pointer flex flex-col md:flex-row gap-8 items-center">
                                <div className="w-24 h-24 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                                    <BookOpenIcon className="w-10 h-10" />
                                </div>
                                <div className="flex-grow space-y-2 text-center md:text-left">
                                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{course.category}</span>
                                    <h3 className="text-2xl font-black text-white italic tracking-tighter group-hover:text-brand-light-blue transition-colors">{course.title}</h3>
                                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden mt-4">
                                        <div className="h-full bg-brand-blue transition-all duration-1000" style={{ width: `${e.progress}%` }}></div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center md:items-end shrink-0">
                                    <span className="text-2xl font-black text-white italic">{e.progress}%</span>
                                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Current Sync</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-slate-900/30 border border-dashed border-white/10 p-20 rounded-[3rem] text-center">
                    <p className="text-slate-500 font-medium mb-8 italic">No active engineering tracks found. Initialize a new module to begin.</p>
                    <button onClick={onExplore} className="px-10 py-5 bg-brand-blue text-brand-darker font-black text-[10px] rounded-2xl uppercase tracking-widest hover:scale-105 transition-all">Start Learning</button>
                </div>
            )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-12">
            <h2 className="text-xl font-black text-white uppercase italic tracking-widest flex items-center gap-4">
                <AwardIcon className="w-5 h-5 text-brand-blue" />
                Verified Creds
            </h2>
            <div className="grid gap-4">
                {completedEnrollments.length > 0 ? (
                    completedEnrollments.map(e => {
                        const course = courses.find(c => c.id === e.courseId);
                        return (
                            <div key={e.courseId} className="bg-slate-900/50 border border-brand-blue/20 p-6 rounded-3xl flex items-center gap-5 group">
                                <div className="p-3 bg-brand-blue rounded-xl text-brand-darker">
                                    <CheckCircleIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-sm font-black text-white uppercase tracking-tight">{course?.title}</h4>
                                    <p className="text-[9px] font-black text-brand-light-blue uppercase mt-1">ID: {e.certificateHash}</p>
                                </div>
                                <button className="p-3 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                                    <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="p-10 bg-slate-950/50 border border-white/5 rounded-3xl text-center">
                        <StarIcon className="w-8 h-8 text-slate-800 mx-auto mb-4" />
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Complete modules to earn validation hashes.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
