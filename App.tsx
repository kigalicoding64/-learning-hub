
import React, { useState, useEffect } from 'react';
import { Course, ViewState, User } from './types';
import { COURSES } from './constants';
import { XIcon, BrainIcon } from './components/Icons';
import LandingPage from './components/LandingPage';
import CourseSelection from './components/CourseSelection';
import CourseView from './components/CourseView';
import PaymentModal from './components/PaymentModal';
import AILab from './components/AILab';
import StaticPage from './components/StaticPage';
import VerificationPage from './components/VerificationPage';
import AuthModal from './components/AuthModal';
import AccountSettings from './components/AccountSettings';
import Header from './components/Header';
import Footer from './components/Footer';

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
  const [activeVerificationHash, setActiveVerificationHash] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const path = window.location.pathname;
    if (path.startsWith('/verify/')) {
        const hash = path.split('/verify/')[1];
        setActiveVerificationHash(hash);
        setView('verify');
    }

    const savedUser = localStorage.getItem('egreed_user');
    if (savedUser) {
        setUser(JSON.parse(savedUser));
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAuthSuccess = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('egreed_user', JSON.stringify(newUser));
    setIsAuthOpen(false);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('egreed_user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('egreed_user');
    handleGoToLanding();
  };

  const handleCourseSelection = (course: Course) => {
    if (!user) {
        setIsAuthOpen(true);
        return;
    }
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
    if (!user) {
        setIsAuthOpen(true);
        return;
    }
    setIsAILabOpen(true);
  }

  const scrollToSection = (id: string) => {
      if (view !== 'landing') {
          setView('landing');
          setTimeout(() => {
              const el = document.getElementById(id);
              el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      } else {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col text-slate-200">
      {/* Offline Banner */}
      <div className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out transform ${isOffline ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-amber-500 text-brand-darker py-2.5 px-6 flex justify-center items-center gap-4 shadow-lg backdrop-blur-xl bg-opacity-95 ring-1 ring-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-darker animate-pulse"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Network Inhibited. Check Connection.</p>
        </div>
      </div>

      {/* Offline Toast */}
      {showOfflineNotice && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
              <div className="bg-brand-darker/90 backdrop-blur-2xl border border-red-500/20 text-white px-12 py-6 rounded-[2.5rem] shadow-2xl flex items-center gap-8 ring-1 ring-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <XIcon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-red-500/70 mb-1">Access Inhibited</span>
                      <span className="text-xs font-black italic uppercase tracking-tighter">Connection Required for AI Lab</span>
                  </div>
              </div>
          </div>
      )}

      {view !== 'verify' && (
        <Header 
          user={user}
          onLoginClick={() => setIsAuthOpen(true)}
          onDashboardClick={() => setView('catalog')}
          onLogout={handleLogout}
          onNavigateHome={handleGoToLanding}
          scrollToSection={scrollToSection}
          isScrolled={scrolled}
          currentView={view}
        />
      )}

      <main className={`flex-grow ${view === 'verify' ? '' : 'transition-all duration-500'} ${scrolled || view !== 'landing' ? 'pt-24' : 'pt-0'}`}>
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
            user={user}
            completedLessons={completedLessons[selectedCourse.id] || []} 
            onMarkComplete={(lessonId) => markLessonComplete(selectedCourse.id, lessonId)} 
          />
        ) : view === 'static' ? (
          <StaticPage pageKey={staticPageKey} onReturn={() => setView('landing')} onExplore={() => setView('catalog')} />
        ) : view === 'verify' ? (
          <VerificationPage hash={activeVerificationHash || '0xDEMO'} onReturn={handleGoToLanding} />
        ) : view === 'settings' && user ? (
          <AccountSettings 
            user={user} 
            onUpdate={handleUserUpdate} 
            onReturn={handleGoToLanding} 
            onLogout={handleLogout} 
          />
        ) : null}
      </main>

      {view !== 'verify' && view !== 'settings' && (
        <Footer 
          scrollToSection={scrollToSection}
          onNavigateHome={handleGoToLanding}
          onOpenStatic={handleOpenStatic}
        />
      )}

      {/* Floating Neural Lab Button (Only if logged in and not on landing) */}
      {user && view !== 'landing' && view !== 'verify' && !isAILabOpen && (
        <button 
            onClick={toggleAILab}
            className="fixed bottom-8 right-8 z-[60] bg-brand-blue text-brand-darker p-5 rounded-[2rem] shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-4 group"
        >
            <BrainIcon className="w-7 h-7" />
            <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest pr-4 opacity-0 group-hover:opacity-100 transition-opacity max-w-0 group-hover:max-w-[200px] overflow-hidden">Invoke Neural Lab</span>
        </button>
      )}

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

      {isAuthOpen && (
          <AuthModal onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;
