
import React, { useState, useEffect, useMemo } from 'react';
import { Course, ViewState, User, Enrollment } from './types';
import { COURSES } from './constants';
import { BrainIcon, LoaderIcon } from './components/Icons';
import LandingPage from './components/LandingPage';
import CourseSelection from './components/CourseSelection';
import CourseView from './components/CourseView';
import LearnerDashboard from './components/LearnerDashboard';
import Onboarding from './components/Onboarding';
import PaymentModal from './components/PaymentModal';
import VerificationPage from './components/VerificationPage';
import AuthModal from './components/AuthModal';
import StaticPage from './components/StaticPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [activeStaticPage, setActiveStaticPage] = useState<string>('about');
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Record<string, Enrollment>>({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [courseToPurchase, setCourseToPurchase] = useState<Course | null>(null);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('egreed_user');
    const savedEnrollments = localStorage.getItem('egreed_enrollments');
    if (saved) setUser(JSON.parse(saved));
    if (savedEnrollments) setEnrollments(JSON.parse(savedEnrollments));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('egreed_user', JSON.stringify(user));
    localStorage.setItem('egreed_enrollments', JSON.stringify(enrollments));
  }, [user, enrollments]);

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    setIsAuthOpen(false);
    if (!u.educationLevel) { 
        setView('onboarding');
    } else {
        setView('dashboard');
    }
  };

  const handleOpenStatic = (key: string) => {
    setActiveStaticPage(key);
    setView('static');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnroll = (course: Course) => {
    if (!user) return setIsAuthOpen(true);
    if (course.price > 0 && !enrollments[course.id]) return setCourseToPurchase(course);
    
    if (!enrollments[course.id]) {
      setEnrollments(prev => ({
        ...prev,
        [course.id]: {
          courseId: course.id,
          progress: 0,
          completedLessons: [],
          completedQuizzes: [],
          enrolledAt: new Date().toISOString()
        }
      }));
    }
    setSelectedCourse(course);
    setView('course');
  };

  const updateProgress = (courseId: string, lessonId: string, isQuiz: boolean = false) => {
    setEnrollments(prev => {
      const e = prev[courseId];
      if (!e) return prev;
      
      const lessons = isQuiz ? e.completedLessons : Array.from(new Set([...e.completedLessons, lessonId]));
      const quizzes = isQuiz ? Array.from(new Set([...e.completedQuizzes, lessonId])) : e.completedQuizzes;
      
      const course = COURSES.find(c => c.id === courseId);
      if (!course) return prev;

      const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      const totalQuizzes = course.modules.length;
      
      const lessonProgress = (lessons.length / totalLessons) * 40;
      const quizProgress = (quizzes.length / totalQuizzes) * 30;
      const progress = Math.min(100, Math.round(lessonProgress + quizProgress));

      const newEnrollment = { ...e, completedLessons: lessons, completedQuizzes: quizzes, progress };
      
      if (progress === 100 && !newEnrollment.certificateHash) {
          newEnrollment.certificateHash = `EGR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      }

      return { ...prev, [courseId]: newEnrollment };
    });
  };

  return (
    <div className={`min-h-screen bg-brand-dark flex flex-col ${isLowBandwidth ? 'low-bandwidth' : ''}`}>
      <Header 
        user={user} 
        onLoginClick={() => setIsAuthOpen(true)} 
        onDashboardClick={() => setView('dashboard')}
        onLogout={() => { setUser(null); setView('landing'); }}
        onNavigateHome={() => setView('landing')}
        currentView={view}
        scrollToSection={() => {}}
        isScrolled={false}
      />

      <main className="flex-grow pt-24">
        {view === 'landing' && <LandingPage onExplore={() => setView('catalog')} onNavigate={handleOpenStatic} />}
        {view === 'catalog' && <CourseSelection courses={COURSES} purchasedCourses={Object.keys(enrollments)} onSelectCourse={handleEnroll} />}
        {view === 'onboarding' && <Onboarding onComplete={(u) => { setUser(u); setView('dashboard'); }} />}
        {view === 'dashboard' && user && <LearnerDashboard user={user} enrollments={enrollments} courses={COURSES} onResume={handleEnroll} onExplore={() => setView('catalog')} />}
        {view === 'static' && <StaticPage pageKey={activeStaticPage} onReturn={() => setView('landing')} onExplore={() => setView('catalog')} />}
        {view === 'course' && selectedCourse && user && (
            <CourseView 
              course={selectedCourse} 
              enrollment={enrollments[selectedCourse.id]} 
              onMarkComplete={(lid, isQ) => updateProgress(selectedCourse.id, lid, isQ)} 
              onBack={() => setView('dashboard')}
              user={user}
            />
        )}
      </main>

      <Footer onNavigateHome={() => setView('landing')} scrollToSection={() => {}} onOpenStatic={handleOpenStatic} />

      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} onSuccess={handleAuthSuccess} />}
      {courseToPurchase && <PaymentModal course={courseToPurchase} onClose={() => setCourseToPurchase(null)} onConfirm={handleEnroll} />}

      <button 
        onClick={() => setIsLowBandwidth(!isLowBandwidth)}
        className="fixed bottom-8 left-8 z-[100] bg-slate-900 border border-white/10 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all"
      >
        {isLowBandwidth ? 'High Def Mode' : 'Low Bandwidth Mode'}
      </button>
    </div>
  );
}

export default App;
