
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, UserIcon, LogOutIcon, EgreedLogoIcon } from './Icons';

interface HeaderProps {
  user?: { fullName: string; email: string; role?: string } | null;
  onLoginClick: () => void;
  onDashboardClick: () => void;
  onAdminClick?: () => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  scrollToSection: (id: string) => void;
  isScrolled: boolean;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLoginClick, 
  onDashboardClick, 
  onAdminClick, 
  onLogout, 
  onNavigateHome,
  scrollToSection,
  isScrolled,
  currentView
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLinkClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-dark/95 shadow-2xl backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-3 group"
            >
              <div className="bg-brand-blue p-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                <EgreedLogoIcon className="h-7 w-7 text-brand-darker" />
              </div>
              <div className="flex flex-col -space-y-1 text-left">
                <span className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
                    Egreed<span className="text-brand-light-blue not-italic">Tech</span>
                </span>
                <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.3em] leading-none">KIGALI, RWANDA</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-8">
            <button onClick={onNavigateHome} className="text-[10px] font-black text-slate-400 hover:text-brand-light-blue transition-colors uppercase tracking-[0.3em]">Home</button>
            {currentView === 'landing' && (
              <>
                <button onClick={() => handleLinkClick('about')} className="text-[10px] font-black text-slate-400 hover:text-brand-light-blue transition-colors uppercase tracking-[0.3em]">About</button>
                <button onClick={() => handleLinkClick('hero')} className="text-[10px] font-black text-slate-400 hover:text-brand-light-blue transition-colors uppercase tracking-[0.3em]">Services</button>
                <button onClick={() => handleLinkClick('contact')} className="text-[10px] font-black text-slate-400 hover:text-brand-light-blue transition-colors uppercase tracking-[0.3em]">Contact</button>
              </>
            )}
            <button onClick={() => onDashboardClick()} className="text-[10px] font-black text-slate-400 hover:text-brand-light-blue transition-colors uppercase tracking-[0.3em]">Browse Courses</button>
            
            <a
              href="https://learn.egreedtech.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black text-brand-light-blue hover:text-white transition-colors uppercase tracking-[0.3em] bg-brand-blue/10 px-4 py-2 rounded-lg border border-brand-blue/20"
            >
              Learn Platform
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-brand-blue text-brand-darker px-5 py-2.5 rounded-xl hover:bg-brand-light-blue transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand-blue/20"
                >
                  <UserIcon className="h-4 w-4" />
                  <span>{user.fullName.split(' ')[0]}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-slide-up backdrop-blur-xl">
                    <button
                      onClick={() => { onDashboardClick(); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      Learning Dashboard
                    </button>
                    <button
                      onClick={() => { onLogout(); setShowUserMenu(false); }}
                      className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-xl transition-all flex items-center space-x-3"
                    >
                      <LogOutIcon className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-brand-blue text-brand-darker px-8 py-2.5 rounded-xl hover:bg-brand-light-blue transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-brand-blue/20"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-brand-blue transition-colors p-2 bg-white/5 rounded-xl border border-white/10"
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden animate-fade-in">
            <div className="px-2 pt-6 pb-8 space-y-2 bg-slate-900/95 backdrop-blur-2xl rounded-3xl mt-4 border border-white/10 shadow-3xl">
              <button onClick={onNavigateHome} className="block w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Home</button>
              {currentView === 'landing' && (
                <>
                  <button onClick={() => handleLinkClick('about')} className="block w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">About</button>
                  <button onClick={() => handleLinkClick('hero')} className="block w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Services</button>
                </>
              )}
              <button onClick={() => { onDashboardClick(); setIsMenuOpen(false); }} className="block w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Browse Courses</button>
              <a
                href="https://learn.egreedtech.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest text-brand-light-blue"
              >
                Learn Platform
              </a>
              {user ? (
                <>
                  <button
                    onClick={() => { onDashboardClick(); setIsMenuOpen(false); }}
                    className="block w-full text-left px-5 py-4 bg-brand-blue text-brand-darker rounded-xl font-black text-[10px] uppercase tracking-widest mt-4"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => { onLogout(); setIsMenuOpen(false); }}
                    className="block w-full text-left px-5 py-4 text-red-500 font-black text-[10px] uppercase tracking-widest mt-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                  className="block w-full text-left px-5 py-4 bg-brand-blue text-brand-darker rounded-xl font-black text-[10px] uppercase tracking-widest mt-4"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
