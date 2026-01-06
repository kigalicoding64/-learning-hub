
import React, { useState } from 'react';
import { Course } from './types';
import { COURSES } from './constants';
import { EgreedLogoIcon, ArrowLeftIcon, BrainIcon } from './components/Icons';
import CourseSelection from './components/CourseSelection';
import CourseView from './components/CourseView';
import PaymentModal from './components/PaymentModal';
import AILab from './components/AILab';


function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [courseToPurchase, setCourseToPurchase] = useState<Course | null>(null);
  const [isAILabOpen, setIsAILabOpen] = useState(false);

  const handleCourseSelection = (course: Course) => {
    if (course.price === 0 || purchasedCourses.includes(course.id)) {
      setSelectedCourse(course);
    } else {
      setCourseToPurchase(course);
    }
  };

  const handleReturnToCourses = () => {
    setSelectedCourse(null);
  };
  
  const handleSuccessfulPurchase = (course: Course) => {
      setPurchasedCourses(prev => [...prev, course.id]);
      setCourseToPurchase(null);
      setSelectedCourse(course);
  }

  return (
    <div className="min-h-screen bg-brand-dark font-sans flex flex-col text-slate-200">
      <header className="bg-brand-dark/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-xl shadow-brand-blue/5">
        <nav className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-brand-blue p-2 rounded-xl">
              <EgreedLogoIcon className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase italic">Egreed<span className="text-brand-light-blue not-italic">Tech</span></span>
          </div>

          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsAILabOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-blue to-blue-600 text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-blue/30"
              >
                <BrainIcon className="w-5 h-5" />
                <span className="hidden sm:inline">AI Lab Hub</span>
              </button>
              
              {selectedCourse && (
                <button onClick={handleReturnToCourses} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-slate-200 font-bold rounded-xl hover:bg-slate-700 transition-colors border border-slate-700">
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">All Courses</span>
                </button>
              )}
          </div>
        </nav>
      </header>
      
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-10">
        {selectedCourse ? (
          <CourseView key={selectedCourse.id} course={selectedCourse} />
        ) : (
          <CourseSelection 
            courses={COURSES} 
            purchasedCourses={purchasedCourses}
            onSelectCourse={handleCourseSelection} 
           />
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

       <footer className="text-center py-8 border-t border-slate-800 text-slate-500 text-sm">
          <p className="font-medium tracking-widest uppercase mb-2">&copy; {new Date().getFullYear()} Egreed Technology Solutions</p>
          <div className="flex justify-center gap-6 opacity-60">
              <a href="#" className="hover:text-brand-light-blue">Privacy</a>
              <a href="#" className="hover:text-brand-light-blue">Terms</a>
              <a href="#" className="hover:text-brand-light-blue">Support</a>
          </div>
      </footer>
    </div>
  );
}

export default App;
