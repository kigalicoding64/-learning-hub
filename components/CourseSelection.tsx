
import React, { useState, useMemo, useEffect } from 'react';
import { Course } from '../types';
import { BookOpenIcon, CheckCircleIcon, SearchIcon, ChevronUpIcon, BrainIcon, SparklesIcon } from './Icons';

interface CourseSelectionProps {
  courses: Course[];
  purchasedCourses: string[];
  onSelectCourse: (course: Course) => void;
}

const COURSES_PER_PAGE = 12;
const CATEGORIES = ['All', 'Computer Science', 'Data Science', 'Business', 'Design', 'Personal Development'];

const CourseSelection: React.FC<CourseSelectionProps> = ({ courses, purchasedCourses, onSelectCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, activeCategory]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(startIndex, startIndex + COURSES_PER_PAGE);
  }, [filteredCourses, currentPage]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="animate-fade-in max-w-7xl mx-auto pb-20">
      {/* Catalog Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-black text-white uppercase italic leading-none tracking-tighter">Course <span className="text-brand-light-blue">Hub</span></h2>
            <div className="flex items-center gap-4">
                <span className="h-[2px] w-12 bg-brand-blue"></span>
                <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Access {filteredCourses.length} Engineered Modules</p>
            </div>
          </div>

          <div className="max-w-xl w-full relative group">
            <input
              type="text"
              placeholder="Filter by technology, skill, or certification..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="w-full bg-brand-secondary/50 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all placeholder:text-slate-600 font-medium"
            />
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600 group-focus-within:text-brand-blue transition-colors" />
          </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-4 mb-12 pb-2 no-scrollbar scroll-smooth">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {setActiveCategory(cat); setCurrentPage(1);}}
            className={`whitespace-nowrap px-8 py-3 rounded-full text-xs font-black tracking-widest uppercase transition-all border ${
              activeCategory === cat ? 'bg-brand-blue border-brand-blue text-brand-darker shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-transparent border-white/10 text-slate-500 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedCourses.map((course, idx) => {
          const isPurchased = purchasedCourses.includes(course.id);
          const isFree = course.price === 0;

          return (
            <div 
              key={course.id} 
              onClick={() => onSelectCourse(course)}
              className="bg-brand-secondary border border-white/5 rounded-[2rem] overflow-hidden group cursor-pointer hover:border-brand-blue transition-all flex flex-col hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="aspect-[1.5] bg-slate-900 flex items-center justify-center relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <BookOpenIcon className="w-12 h-12 text-slate-700 group-hover:text-brand-light-blue transition-all duration-500 transform group-hover:scale-110" />
                
                <div className="absolute bottom-4 left-4 flex gap-2">
                    {course.rating > 4.5 && (
                        <div className="bg-brand-blue/20 backdrop-blur-md text-brand-light-blue px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border border-brand-blue/30">
                            Top Rated
                        </div>
                    )}
                    {isFree && (
                        <div className="bg-emerald-500 text-brand-darker px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest">
                            FREE
                        </div>
                    )}
                </div>
                
                <div className="absolute top-4 right-4 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-brand-dark/50 px-3 py-1 rounded-full border border-white/5">
                    {course.category}
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                    <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${course.partner || 'E'}`} className="w-6 h-6 rounded-lg bg-slate-800 border border-white/10" alt="" />
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{course.partner || 'Egreed Engineering'}</span>
                </div>

                <h3 className="text-xl font-black text-white leading-tight group-hover:text-brand-light-blue transition-colors line-clamp-2">{course.title}</h3>
                
                <div className="flex items-center gap-4 py-2">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-brand-light-blue">{course.rating}</span>
                        <div className="flex text-brand-light-blue opacity-50"><SparklesIcon className="w-3 h-3" /></div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{course.students.toLocaleString()} Professionals</span>
                </div>

                <div className="pt-6 mt-auto border-t border-white/5 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Investment</span>
                        <span className="text-lg font-black text-white">{isFree ? '0.00' : `$${course.price}`}</span>
                    </div>
                    {isPurchased ? (
                        <div className="flex items-center gap-2 bg-brand-blue/10 px-4 py-2 rounded-xl border border-brand-blue/20">
                            <CheckCircleIcon className="w-4 h-4 text-brand-blue"/>
                            <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Owned</span>
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-brand-darker transition-all">
                            <ChevronUpIcon className="w-5 h-5 rotate-90" />
                        </div>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
          <div className="py-32 text-center animate-fade-in">
              <div className="inline-flex p-10 rounded-full bg-brand-secondary border border-white/5 mb-8">
                  <SearchIcon className="w-16 h-16 text-slate-700" />
              </div>
              <h3 className="text-3xl font-black text-white uppercase italic mb-4">No Modules Found</h3>
              <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any technical courses matching your current filter. Try adjusting your keywords.</p>
              <button onClick={() => {setSearchTerm(''); setActiveCategory('All');}} className="mt-10 px-8 py-3 bg-brand-blue text-brand-darker font-black rounded-xl uppercase tracking-widest text-xs">Clear All Filters</button>
          </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-20 pt-10 border-t border-white/5">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
            disabled={currentPage === 1} 
            className="px-8 py-4 rounded-xl bg-brand-secondary text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-800 disabled:opacity-20 transition-all border border-white/5"
          >
            Prev
          </button>
          <div className="flex items-center gap-4">
              <span className="text-2xl font-black text-white italic tracking-tighter">{currentPage}</span>
              <span className="text-slate-700 font-black text-lg">/</span>
              <span className="text-slate-500 font-black text-lg">{totalPages}</span>
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} 
            disabled={currentPage === totalPages} 
            className="px-8 py-4 rounded-xl bg-brand-secondary text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-800 disabled:opacity-20 transition-all border border-white/5"
          >
            Next
          </button>
        </div>
      )}

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-10 right-10 p-5 bg-brand-blue text-brand-darker rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all z-50">
          <ChevronUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default CourseSelection;
