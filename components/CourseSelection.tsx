
import React, { useState, useMemo, useEffect } from 'react';
import { Course } from '../types';
import { BookOpenIcon, CheckCircleIcon, SearchIcon, ChevronUpIcon, BrainIcon, SparklesIcon, AwardIcon, LoaderIcon, RwandaFlagIcon } from './Icons';

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
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => setIsSearching(false), 600);
    return () => clearTimeout(timer);
  }, [searchTerm, activeCategory]);

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
    <div className="animate-fade-in max-w-7xl mx-auto pb-20 px-4">
      {/* Catalog Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-none tracking-tighter">Course <span className="text-brand-light-blue">Catalog</span></h2>
            <div className="flex items-center gap-4">
                <span className="h-[2px] w-12 bg-brand-blue"></span>
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">World-Class Engineering Built in Rwanda</p>
            </div>
          </div>

          <div className="max-w-xl w-full relative group">
            <input
              type="text"
              placeholder="Search architecture, UI/UX, or AI..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/40 transition-all placeholder:text-slate-700 font-medium"
            />
            {isSearching ? (
                <LoaderIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-blue animate-spin" />
            ) : (
                <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-700 group-focus-within:text-brand-blue transition-colors" />
            )}
          </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-3 mb-12 pb-4 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {setActiveCategory(cat); setCurrentPage(1);}}
            className={`whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border ${
              activeCategory === cat ? 'bg-brand-blue border-brand-blue text-brand-darker shadow-lg' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/20 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-opacity duration-300 ${isSearching ? 'opacity-50' : 'opacity-100'}`}>
        {paginatedCourses.map((course, idx) => {
          const isPurchased = purchasedCourses.includes(course.id);
          return (
            <div 
              key={course.id} 
              onClick={() => onSelectCourse(course)}
              className="bg-slate-900 border border-white/5 rounded-[2.5rem] overflow-hidden group cursor-pointer hover:border-brand-blue/50 transition-all flex flex-col hover:-translate-y-2 relative"
            >
              <div className="aspect-video bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                     <BookOpenIcon className="w-20 h-20 text-brand-blue group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <div className="absolute top-4 left-4">
                    <div className="bg-brand-dark/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                        <RwandaFlagIcon className="w-4 h-4" />
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">RW Node</span>
                    </div>
                </div>

                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    course.level === 'Advanced' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                    course.level === 'Intermediate' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                    'bg-brand-blue/10 border-brand-blue/20 text-brand-light-blue'
                }`}>
                    {course.level}
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-black text-white leading-tight group-hover:text-brand-light-blue transition-colors mb-4 italic uppercase tracking-tighter">{course.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-8 font-medium">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                    {course.skillsAcquired?.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/5">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="pt-6 mt-auto border-t border-white/5 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Tuition</span>
                        <span className="text-xl font-black text-white italic">${course.price === 0 ? 'FREE' : course.price.toFixed(2)}</span>
                    </div>
                    {isPurchased ? (
                        <span className="bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-brand-blue/20">Owned</span>
                    ) : (
                        <button className="bg-brand-blue text-brand-darker px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-light-blue transition-all">Enroll</button>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {!isSearching && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-20">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
            disabled={currentPage === 1} 
            className="px-6 py-3 rounded-xl bg-slate-900 text-slate-500 font-black uppercase tracking-widest text-[10px] disabled:opacity-20 border border-white/5"
          >
            Back
          </button>
          <span className="text-sm font-black text-white px-4">{currentPage} / {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} 
            disabled={currentPage === totalPages} 
            className="px-6 py-3 rounded-xl bg-slate-900 text-slate-500 font-black uppercase tracking-widest text-[10px] disabled:opacity-20 border border-white/5"
          >
            Next
          </button>
        </div>
      )}

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-10 right-10 p-5 bg-brand-blue text-brand-darker rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all z-50">
          <ChevronUpIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default CourseSelection;
