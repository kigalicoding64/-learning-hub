
import React, { useState, useEffect } from 'react';
import { Course } from './types';
import { COURSES } from './constants';
// Added SparklesIcon to the imports
import { EgreedLogoIcon, ArrowLeftIcon, BrainIcon, SparklesIcon } from './components/Icons';
import LandingPage from './components/LandingPage';
import CourseSelection from './components/CourseSelection';
import CourseView from './components/CourseView';
import PaymentModal from './components/PaymentModal';
import AILab from './components/AILab';

type ViewState = 'landing' | 'catalog' | 'course';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [courseToPurchase, setCourseToPurchase] = useState<Course | null>(null);
  const [isAILabOpen, setIsAILabOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  
  const handleSuccessfulPurchase = (course: Course) => {
      setPurchasedCourses(prev => [...prev, course.id]);
      setCourseToPurchase(null);
      setSelectedCourse(course);
      setView('course');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col text-slate-200">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
                onClick={() => setIsAILabOpen(true)}
                className={`hidden md:flex items-center gap-2 px-5 py-2.5 bg-brand-secondary/50 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-secondary transition-all border border-white/5 ${view === 'landing' ? 'opacity-0 translate-x-10 pointer-events-none' : 'opacity-100 translate-x-0'} transition-all duration-500`}
              >
                <BrainIcon className="w-4 h-4 text-brand-blue" />
                <span>AI Lab</span>
              </button>
              
              {view === 'landing' ? (
                <button 
                    onClick={() => setView('catalog')}
                    className="px-8 py-3 bg-brand-blue text-brand-darker font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-light-blue transition-all shadow-xl shadow-brand-blue/20"
                >
                    Explore Hub
                </button>
              ) : view === 'course' ? (
                <button onClick={handleReturnToCatalog} className="flex items-center gap-2 px-6 py-3 bg-brand-secondary text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors border border-white/5">
                    <ArrowLeftIcon className="w-4 h-4" />
                    <span>Catalog</span>
                </button>
              ) : (
                <button 
                    onClick={handleGoToLanding}
                    className="px-6 py-3 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                >
                    Home
                </button>
              )}
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">
        {view === 'landing' && (
            <LandingPage onExplore={() => setView('catalog')} />
        )}
        
        {view === 'catalog' && (
            <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
                <CourseSelection 
                    courses={COURSES} 
                    purchasedCourses={purchasedCourses}
                    onSelectCourse={handleCourseSelection} 
                />
            </div>
        )}

        {view === 'course' && selectedCourse && (
            <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20">
                <CourseView key={selectedCourse.id} course={selectedCourse} />
            </div>
        )}
      </main>

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

       <footer className="bg-brand-darker text-center py-24 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-20"></div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left mb-20">
                  <div className="col-span-2 md:col-span-1">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-brand-blue p-1.5 rounded-lg">
                            <EgreedLogoIcon className="h-5 w-5 text-brand-darker" />
                        </div>
                        <span className="text-lg font-black text-white tracking-tighter uppercase italic">Egreed<span className="text-brand-light-blue not-italic">Tech</span></span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                          Building the software foundations for the next era of industrial intelligence.
                      </p>
                  </div>
                  <div>
                      <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em] opacity-50">Ecosystem</h4>
                      <ul className="space-y-3 text-sm font-bold text-slate-400">
                          <li><a href="#" className="hover:text-brand-blue transition-colors">Career Tracks</a></li>
                          <li><a href="#" className="hover:text-brand-blue transition-colors">AI Research</a></li>
                          <li><a href="#" className="hover:text-brand-blue transition-colors">Open Source</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em] opacity-50">Company</h4>
                      <ul className="space-y-3 text-sm font-bold text-slate-400">
                          <li><a href="#" className="hover:text-brand-blue transition-colors">About eGreed</a></li>
                          <li><a href="#" className="hover:text-brand-blue transition-colors">Partners</a></li>
                          <li><a href="#" className="hover:text-brand-blue transition-colors">Contact</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-white font-black mb-6 uppercase text-[10px] tracking-[0.2em] opacity-50">Compliance</h4>
                      <ul className="space-y-3 text-sm font-bold text-slate-400">
                          <li><a href="#" className="hover:text-brand-blue transition-colors">Privacy</a></li>
                          <li><a href="#" className="hover:text-brand-blue transition-colors">Terms</a></li>
                          <li><a href="#" className="hover:text-brand-blue transition-colors">Certifications</a></li>
                      </ul>
                  </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
                <p className="text-[10px] font-black text-slate-600 tracking-[0.3em] uppercase">
                    &copy; {new Date().getFullYear()} Egreed Technology Solutions LLC.
                </p>
                <div className="flex gap-6">
                   {/* Social placeholder icons */}
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-brand-darker transition-all cursor-pointer">
                       <SparklesIcon className="w-4 h-4" />
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-brand-darker transition-all cursor-pointer">
                       <BrainIcon className="w-4 h-4" />
                   </div>
                </div>
              </div>
          </div>
      </footer>
    </div>
  );
}

export default App;
