
import React, { useState, useMemo, useEffect } from 'react';
import { Course } from '../types';
import { BookOpenIcon, CheckCircleIcon, SearchIcon, ChevronUpIcon, BrainIcon, SparklesIcon, AwardIcon, LoaderIcon, RwandaFlagIcon, ZapIcon, StarIcon, ShieldIcon, MenuIcon } from './Icons';

interface CourseSelectionProps {
  courses: Course[];
  purchasedCourses: string[];
  onSelectCourse: (course: Course) => void;
}

const COURSES_PER_PAGE = 12;
const CATEGORIES = ['All', 'TECHNOLOGY & IT', 'DATA, AI & ANALYTICS', 'DIGITAL MARKETING', 'DESIGN & CREATIVE', 'BUSINESS & ENTREPRENEURSHIP', 'LANGUAGES & EDUCATION', 'FINANCE & ECONOMICS', 'ENGINEERING & TECHNICAL', 'HEALTH & PERSONAL'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const COLLECTIONS = [
    { id: 'all', label: 'All Library', icon: BookOpenIcon },
    { id: 'popular', label: 'Top 100 Popular', icon: StarIcon },
    { id: 'trending', label: 'Top 100 Trending', icon: ZapIcon },
    { id: 'needed', label: 'Most Needed', icon: ShieldIcon },
];

const CourseSelection: React.FC<CourseSelectionProps> = ({ courses, purchasedCourses, onSelectCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [activeCollection, setActiveCollection] = useState('all');
  const [sortOption, setSortOption] = useState('popularity'); 
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
    const timer = setTimeout(() => setIsSearching(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, activeCategory, activeCollection, activeLevel, sortOption]);

  const filteredCourses = useMemo(() => {
    let result = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || course.category.includes(activeCategory);
      const matchesCollection = activeCollection === 'all' || (course.tags && course.tags.includes(activeCollection as any));
      const matchesLevel = activeLevel === 'All' || course.level === activeLevel;
      
      return matchesSearch && matchesCategory && matchesCollection && matchesLevel;
    });

    result = [...result].sort((a, b) => {
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        if (sortOption === 'popularity') return b.students - a.students;
        return 0;
    });

    return result;
  }, [courses, searchTerm, activeCategory, activeCollection, activeLevel, sortOption]);

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
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none tracking-tighter">Academic <span className="text-brand-light-blue">Catalog</span></h2>
            <div className="flex items-center gap-4">
                <span className="h-[2px] w-16 bg-brand-blue"></span>
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Processing {courses.length}+ Industrial Modules</p>
            </div>
          </div>

          <div className="max-w-xl w-full relative group">
            <input
              type="text"
              placeholder="Search curriculum title or engineering track..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/40 transition-all placeholder:text-slate-700 font-bold"
            />
            {isSearching ? (
                <LoaderIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-blue animate-spin" />
            ) : (
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-700 group-focus-within:text-brand-blue transition-colors" />
            )}
          </div>
      </div>

      {/* Collections & Filters */}
      <div className="flex flex-col xl:flex-row gap-6 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
              {COLLECTIONS.map(col => (
                  <button
                    key={col.id}
                    onClick={() => {setActiveCollection(col.id); setCurrentPage(1);}}
                    className={`flex items-center gap-4 p-5 rounded-3xl border transition-all ${
                        activeCollection === col.id 
                        ? 'bg-brand-blue border-brand-blue text-brand-darker shadow-2xl shadow-brand-blue/20' 
                        : 'bg-slate-900 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                    }`}
                  >
                      <col.icon className={`w-6 h-6 ${activeCollection === col.id ? 'text-brand-darker' : 'text-brand-blue/60'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{col.label}</span>
                  </button>
              ))}
          </div>

          <div className="flex gap-4">
              <div className="relative group min-w-[180px]">
                  <select 
                    value={sortOption}
                    onChange={(e) => {setSortOption(e.target.value); setCurrentPage(1);}}
                    className="appearance-none bg-slate-900 border border-white/10 rounded-2xl py-5 pl-12 pr-12 text-[10px] font-black text-white uppercase tracking-widest focus:ring-2 focus:ring-brand-blue/40 outline-none cursor-pointer w-full"
                  >
                    <option value="popularity">Sort: Popularity</option>
                    <option value="price-asc">Sort: Price Low-High</option>
                    <option value="price-desc">Sort: Price High-Low</option>
                  </select>
                  <ChevronUpIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none rotate-180" />
                  <StarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-blue/40 pointer-events-none" />
              </div>

              <div className="relative group min-w-[180px]">
                  <select 
                    value={activeLevel}
                    onChange={(e) => {setActiveLevel(e.target.value); setCurrentPage(1);}}
                    className="appearance-none bg-slate-900 border border-white/10 rounded-2xl py-5 pl-12 pr-12 text-[10px] font-black text-white uppercase tracking-widest focus:ring-2 focus:ring-brand-blue/40 outline-none cursor-pointer w-full"
                  >
                    {LEVELS.map(lvl => (
                        <option key={lvl} value={lvl}>Level: {lvl}</option>
                    ))}
                  </select>
                  <ChevronUpIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none rotate-180" />
                  <ShieldIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-blue/40 pointer-events-none" />
              </div>
          </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-3 mb-12 pb-4 no-scrollbar border-b border-white/5 scroll-smooth">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {setActiveCategory(cat); setCurrentPage(1);}}
            className={`whitespace-nowrap px-8 py-4 rounded-t-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
              activeCategory === cat ? 'text-brand-light-blue border-b-2 border-brand-light-blue bg-white/5' : 'text-slate-600 hover:text-white'
            }`}
          >
            {cat === 'All' ? 'Complete Library' : cat}
          </button>
        ))}
      </div>

      {/* Result Count Banner */}
      <div className="mb-12 flex items-center gap-8 bg-slate-900/50 p-4 rounded-3xl border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-4 px-6 py-2 bg-brand-blue/10 rounded-xl border border-brand-blue/20">
              <span className="text-[11px] font-black text-brand-blue">{filteredCourses.length}</span>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Results</span>
          </div>
          <div className="h-px flex-grow bg-white/5"></div>
          <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.5em] hidden md:block">Egreed Academic Ledger v4.2</p>
      </div>

      {/* Course Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-opacity duration-300 ${isSearching ? 'opacity-50' : 'opacity-100'}`}>
        {paginatedCourses.map((course) => {
          const isPurchased = purchasedCourses.includes(course.id);
          const isTrending = course.tags?.includes('trending');
          const isPopular = course.tags?.includes('popular');

          return (
            <div 
              key={course.id} 
              onClick={() => onSelectCourse(course)}
              className="bg-slate-900 border border-white/5 rounded-[3.5rem] overflow-hidden group cursor-pointer hover:border-brand-blue/50 transition-all flex flex-col hover:-translate-y-2 relative shadow-xl"
            >
              <div className="aspect-video bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
                     <BrainIcon className="w-32 h-32 text-brand-blue scale-110 group-hover:scale-100 transition-transform duration-[2000ms]" />
                </div>
                
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-brand-dark/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                        <RwandaFlagIcon className="w-4 h-4 shadow-sm" />
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Kigali Node</span>
                    </div>
                    {isTrending && (
                         <div className="bg-orange-500 text-white px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg animate-pulse border border-orange-400">
                            <ZapIcon className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Trending</span>
                        </div>
                    )}
                    {isPopular && !isTrending && (
                         <div className="bg-brand-blue text-brand-darker px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg border border-brand-light-blue">
                            <StarIcon className="w-3 h-3" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Bestseller</span>
                        </div>
                    )}
                </div>

                <div className={`absolute top-6 right-6 px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border backdrop-blur-md shadow-2xl ${
                    course.level === 'Advanced' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                    course.level === 'Intermediate' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                    'bg-brand-blue/10 border-brand-blue/30 text-brand-light-blue'
                }`}>
                    {course.level}
                </div>
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex text-amber-500">
                        <StarIcon className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="text-[11px] font-black text-slate-400">{course.rating.toFixed(1)}</span>
                    <span className="text-slate-800 mx-1">/</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{course.students.toLocaleString()} Graduates</span>
                </div>

                <h3 className="text-2xl font-black text-white leading-tight group-hover:text-brand-light-blue transition-colors mb-4 italic uppercase tracking-tighter">{course.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-10 font-medium leading-relaxed">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                    {course.skillsAcquired?.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-[8px] font-black text-slate-400 uppercase tracking-widest px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 group-hover:border-brand-blue/20 transition-colors">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="pt-8 mt-auto border-t border-white/5 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Authorization</span>
                        <span className="text-2xl font-black text-white italic tracking-tighter">${course.price === 0 ? 'FREE' : course.price.toFixed(2)}</span>
                    </div>
                    {isPurchased ? (
                        <button className="bg-brand-blue/10 text-brand-blue px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-brand-blue/30 shadow-inner">
                            Authorized Access
                        </button>
                    ) : (
                        <button className="bg-brand-blue text-brand-darker px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-light-blue hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-blue/20">
                            Initialize Sync
                        </button>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {!isSearching && totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-24">
          <button 
            onClick={() => {setCurrentPage(p => Math.max(1, p-1)); scrollToTop();}} 
            disabled={currentPage === 1} 
            className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-slate-900 text-slate-500 font-black uppercase tracking-widest text-[10px] disabled:opacity-20 border border-white/10 transition-all hover:border-brand-blue hover:text-white group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Previous Sector
          </button>
          
          <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-2xl border border-white/5">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;

                  return (
                      <button 
                        key={pageNum}
                        onClick={() => {setCurrentPage(pageNum); scrollToTop();}}
                        className={`w-12 h-12 rounded-xl font-black transition-all text-[11px] ${currentPage === pageNum ? 'bg-brand-blue text-brand-darker shadow-lg' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}
                      >
                          {pageNum}
                      </button>
                  );
              })}
          </div>

          <button 
            onClick={() => {setCurrentPage(p => Math.min(totalPages, p+1)); scrollToTop();}} 
            disabled={currentPage === totalPages} 
            className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-slate-900 text-slate-500 font-black uppercase tracking-widest text-[10px] disabled:opacity-20 border border-white/10 transition-all hover:border-brand-blue hover:text-white group"
          >
            Next Sector
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-12 right-12 p-6 bg-brand-blue text-brand-darker rounded-3xl shadow-[0_20px_60px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95 transition-all z-[60] animate-bounce">
          <ChevronUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

// Internal Icons Fallback
const ArrowLeftIcon = ({className}: {className?: string}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const ArrowRightIcon = ({className}: {className?: string}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

export default CourseSelection;
