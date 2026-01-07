
import React, { useState, useEffect } from 'react';
import { Course } from './types';
import { COURSES } from './constants';
import { EgreedLogoIcon, ArrowLeftIcon, BrainIcon, SparklesIcon, XIcon } from './components/Icons';
import LandingPage from './components/LandingPage';
import CourseSelection from './components/CourseSelection';
import CourseView from './components/CourseView';
import PaymentModal from './components/PaymentModal';
import AILab from './components/AILab';
import StaticPage from './components/StaticPage';

export type ViewState = 'landing' | 'catalog' | 'course' | 'static';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [staticPageKey, setStaticPageKey] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>({}); // courseId -> lessonIds[]
  const [courseToPurchase, setCourseToPurchase] = useState<Course | null>(null);
  const [isAILabOpen, setIsAILabOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showOfflineNotice, setShowOfflineNotice] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleCourseSelection = (course: Course) => {
    if (course.price === 0 || purchasedCourses.includes(course.id)) {
      setSelectedCourse(course);
      setView('course');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCourseToPurchase(course);
    }
  };

  const handleReturnToCatalog = () => {
    setSelectedCourse(null);
    setView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToLanding = () => {
    setSelectedCourse(null);
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStatic = (key: string) => {
    setStaticPageKey(key);
    setView('static');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSuccessfulPurchase = (course: Course) => {
      setPurchasedCourses(prev => [...prev, course.id]);
      setCourseToPurchase(null);
      setSelectedCourse(course);
      setView('course');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const markLessonComplete = (courseId: string, lessonId: string) => {
    setCompletedLessons(prev => {
        const current = prev[courseId] || [];
        if (current.includes(lessonId)) return prev;
        return { ...prev, [courseId]: [...current, lessonId] };
    });
  }

  const toggleAILab = () => {
    if (isOffline) {
        setShowOfflineNotice(true);
        setTimeout(() => setShowOfflineNotice(false), 4000);
        return;
    }
    setIsAILabOpen(true);
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col text-slate-200">
      {/* High-Fidelity Offline Protocol Banner */}
      <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out transform ${isOffline ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-amber-500 text-brand-darker py-2.5 px-6 flex justify-center items-center gap-4 shadow-[0_10px_40px_rgba(245,158,11,0.2)] backdrop-blur-xl bg-opacity-95 ring-1 ring-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-darker animate-pulse ring-4 ring-brand-darker/10"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Critical Notice: Offline Environment Detected. Real-time AI Synthetic Modules Temporarily Offline.</p>
        </div>
      </div>

      {/* Access Inhibited Notification Toast */}
      {showOfflineNotice && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
              <div className="bg-brand-darker/90 backdrop-blur-2xl border border-red-500/20 text-white px-12 py-6 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex items-center gap-8 ring-1 ring-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                    <XIcon className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/70 mb-1">Access Protocol Failed</span>
                      <span className="text-sm font-black italic uppercase tracking-tighter">Connection Lost: Satellite Internet Required for AI Lab Authorization</span>
                  </div>
              </div>
          </div>
      )}

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isOffline ? 'mt-11' : ''
      } ${
        scrolled || view !== 'landing' 
        ? 'py-4 bg-brand-darker/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
        : 'py-8 bg-transparent'
      }`}>
        <nav className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-5 cursor-pointer group" onClick={handleGoToLanding}>
            <div className="bg-brand-blue p-2.5 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
              <EgreedLogoIcon className="h-7 w-7 text-brand-darker" />
            </div>
            <div className="flex flex-col -space-y-1">
                <span className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
                    Egreed<span className="text-brand-light-blue not-italic">Tech</span>
                </span>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none">Engineering Ecosystem</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <button 
                onClick={toggleAILab}
                className={`hidden md:flex items-center gap-2 px-5 py-2.5 font-black text-xs uppercase tracking-widest rounded-xl transition-all border ${
                    isOffline 
                    ? 'bg-slate-800/40 text-slate-600 border-white/5 cursor-pointer grayscale opacity-70' 
                    : 'bg-brand-secondary/50 text-white border-white/5 hover:bg-brand-secondary active:scale-95'
                } ${view === 'landing' ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'} transition-all duration-500`}
              >
                <BrainIcon className={`w-4 h-4 ${isOffline ? 'text-slate-700' : 'text-brand-blue'}`} />
                <span>AI Lab</span>
              </button>
              
              {view === 'landing' ? (
                <button 
                    onClick={() => setView('catalog')}
                    className="px-8 py-3 bg-brand-blue text-brand-darker font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-light-blue transition-all shadow-xl shadow-brand-blue/20 active:scale-95"
                >
                    Explore Hub
                </button>
              ) : view === 'catalog' ? (
                <button 
                    onClick={handleGoToLanding}
                    className="px-6 py-3 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                >
                    Home
                </button>
              ) : (
                <button onClick={handleReturnToCatalog} className="flex items-center gap-2 px-6 py-3 bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl border border-white/10 hover:bg-slate-800 transition-all active:scale-95">
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Catalog</span>
                </button>
              )}
          </div>
        </nav>
      </header>

      <main className={`flex-grow container mx-auto px-6 lg:px-12 transition-all duration-500 ${scrolled || view !== 'landing' ? 'pt-32' : 'pt-0'}`}>
        {view === 'landing' ? (
          <LandingPage onExplore={() => setView('catalog')} onNavigate={handleOpenStatic} />
        ) : view === 'catalog' ? (
          <CourseSelection 
            courses={COURSES} 
            purchasedCourses={purchasedCourses} 
            onSelectCourse={handleCourseSelection} 
          />
        ) : view === 'course' && selectedCourse ? (
          <CourseView 
            course={selectedCourse} 
            completedLessons={completedLessons[selectedCourse.id] || []} 
            onMarkComplete={(lessonId) => markLessonComplete(selectedCourse.id, lessonId)} 
          />
        ) : view === 'static' ? (
          <StaticPage pageKey={staticPageKey} onReturn={() => setView('landing')} onExplore={() => setView('catalog')} />
        ) : null}
      </main>

      <footer className="py-12 border-t border-white/5 bg-brand-darker/50">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-slate-800 p-2 rounded-lg">
                            <EgreedLogoIcon className="h-5 w-5 text-brand-blue" />
                        </div>
                        <span className="text-lg font-black text-white tracking-tighter uppercase italic">Egreed<span className="text-brand-light-blue not-italic">Tech</span></span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">© 2025 Egreed Engineering Ecosystem. All Rights Reserved.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                  {['about', 'career-tracks', 'partners', 'contact', 'privacy', 'terms'].map(key => (
                      <button 
                        key={key} 
                        onClick={() => handleOpenStatic(key)} 
                        className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors"
                      >
                        {key.replace('-', ' ')}
                      </button>
                  ))}
              </div>
          </div>
      </footer>

      {courseToPurchase && (
          <PaymentModal 
            course={courseToPurchase} 
            onClose={() => setCourseToPurchase(null)} 
            onConfirm={handleSuccessfulPurchase} 
          />
      )}

      {isAILabOpen && (
          <AILab onClose={() => setIsAILabOpen(false)} />
      )}
    </div>
  );
}

// Fix: Added missing default export for the App component to resolve import error in index.tsx
export default App;
