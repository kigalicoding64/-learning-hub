
import React, { useState, useMemo, useEffect } from 'react';
import { Course } from '../types';
import { BookOpenIcon, CheckCircleIcon, SearchIcon, ChevronUpIcon } from './Icons';

interface CourseSelectionProps {
  courses: Course[];
  purchasedCourses: string[];
  onSelectCourse: (course: Course) => void;
}

const COURSES_PER_PAGE = 9;

const CourseSelection: React.FC<CourseSelectionProps> = ({ courses, purchasedCourses, onSelectCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
  }
  
  const handlePageChange = (page: number) => {
      if(page > 0 && page <= totalPages) {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 bg-gradient-to-r from-brand-light-blue to-blue-400 bg-clip-text text-transparent">Expand Your Knowledge</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">Choose from our curated collection of technical courses. Learn from anywhere, at your own pace, with AI-powered tools.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative group">
            <input
              type="text"
              placeholder="Search for a skill, topic or course..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-brand-secondary border border-slate-700 rounded-2xl py-4 pl-14 pr-6 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all shadow-xl group-hover:border-slate-600"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                <SearchIcon className="w-6 h-6 text-slate-400 group-focus-within:text-brand-light-blue transition-colors"/>
            </div>
        </div>
      </div>
      
      {filteredCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-2">
            {paginatedCourses.map(course => {
              const isPurchased = purchasedCourses.includes(course.id);
              const isFree = course.price === 0;

              return (
                <div 
                  key={course.id} 
                  onClick={() => onSelectCourse(course)}
                  className="bg-brand-secondary/40 border border-slate-700/80 rounded-2xl shadow-xl hover:shadow-brand-blue/20 hover:-translate-y-2 transform transition-all duration-300 cursor-pointer flex flex-col group overflow-hidden"
                >
                  <div className="flex-grow p-7">
                      <div className="flex justify-between items-start mb-6">
                          <div className="p-3 bg-brand-dark/50 rounded-xl group-hover:bg-brand-blue/20 transition-colors">
                            <BookOpenIcon className="w-8 h-8 text-brand-light-blue group-hover:scale-110 transition-transform" />
                          </div>
                          {isPurchased ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold bg-green-500/20 text-green-300 px-3 py-1.5 rounded-full border border-green-500/30 uppercase tracking-wider">
                               <CheckCircleIcon className="w-4 h-4" /> Enrolled
                            </span>
                          ) : isFree ? (
                            <span className="text-xs font-bold bg-brand-blue/20 text-brand-light-blue px-3 py-1.5 rounded-full border border-brand-blue/30 uppercase tracking-wider">
                                FREE COURSE
                            </span>
                          ) : (
                             <span className="text-xl font-black text-slate-100">
                               ${course.price.toFixed(2)}
                             </span>
                          )}
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-light-blue transition-colors line-clamp-2">{course.title}</h2>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 h-20 line-clamp-3">{course.description}</p>
                  </div>
                  <div className="mt-auto p-6 bg-slate-800/40 border-t border-slate-700/50">
                      <div className="flex justify-between items-center text-slate-400 text-sm font-bold uppercase tracking-widest">
                          <span>{course.lessons.length} Modules</span>
                          <span className="text-brand-light-blue group-hover:text-white transition-colors flex items-center gap-2">
                              {isPurchased || isFree ? 'Continue' : 'Unlock'} <span className="text-lg">&rarr;</span>
                          </span>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-6 py-3 bg-brand-secondary text-slate-200 font-bold rounded-xl hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700">
                      &larr; Prev
                  </button>
                  <div className="flex items-center gap-2 text-slate-400 font-medium">
                    <span className="text-brand-light-blue font-bold">{currentPage}</span>
                    <span>/</span>
                    <span>{totalPages}</span>
                  </div>
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-6 py-3 bg-brand-secondary text-slate-200 font-bold rounded-xl hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700">
                      Next &rarr;
                  </button>
              </div>
          )}
        </>
      ) : (
          <div className="text-center py-20 bg-brand-secondary/20 rounded-3xl border border-slate-800 border-dashed">
              <h2 className="text-3xl font-bold text-white mb-3">No results for "{searchTerm}"</h2>
              <p className="text-slate-400">Try searching for broader terms like "Web" or "Cloud".</p>
          </div>
      )}

      {showScrollTop && (
        <button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-brand-blue text-white rounded-2xl shadow-2xl shadow-brand-blue/40 hover:bg-brand-light-blue hover:-translate-y-1 transition-all z-50 animate-bounce"
        >
            <ChevronUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default CourseSelection;
