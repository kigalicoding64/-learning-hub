
import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, ExternalLinkIcon, EgreedLogoIcon, LinkedInIcon, TwitterIcon, GithubIcon, InstagramIcon } from './Icons';

interface FooterProps {
    scrollToSection: (id: string) => void;
    onNavigateHome: () => void;
    onOpenStatic: (key: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection, onNavigateHome, onOpenStatic }) => {
  return (
    <footer className="bg-brand-darker border-t border-white/5 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="bg-brand-blue p-2 rounded-lg">
                <EgreedLogoIcon className="h-6 w-6 text-brand-darker" />
              </div>
              <span className="text-2xl font-black text-white italic uppercase tracking-tighter">Egreed <span className="text-brand-light-blue not-italic">Technology</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium">
              Empowering Rwanda's digital landscape through innovative software engineering and elite education. 
              Serving global clients from our base in Kigali with industrial-grade, scalable technology solutions.
            </p>
            
            {/* Social Media Section */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Network Protocols</h4>
              <div className="flex items-center gap-3">
                {[
                  { icon: LinkedInIcon, link: "https://linkedin.com/company/egreed", label: "LinkedIn" },
                  { icon: TwitterIcon, link: "https://twitter.com/egreedtech", label: "Twitter" },
                  { icon: GithubIcon, link: "https://github.com/egreed", label: "GitHub" },
                  { icon: InstagramIcon, link: "https://instagram.com/egreedtech", label: "Instagram" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-brand-blue hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all group"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-brand-darker transition-all">
                    <MailIcon className="h-4 w-4" />
                </div>
                <span className="text-slate-300 text-[11px] font-black uppercase tracking-widest">egreedtechnology@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-brand-darker transition-all">
                    <PhoneIcon className="h-4 w-4" />
                </div>
                <span className="text-slate-300 text-[11px] font-black uppercase tracking-widest">+250 795 822 290</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-brand-blue group-hover:bg-brand-blue group-hover:text-brand-darker transition-all">
                    <MapPinIcon className="h-4 w-4" />
                </div>
                <span className="text-slate-300 text-[11px] font-black uppercase tracking-widest">Kigali, Rwanda</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-b border-brand-blue/20 pb-4">Core Directory</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={onNavigateHome} className="text-slate-500 hover:text-brand-light-blue transition-colors text-[10px] font-black uppercase tracking-widest">Home Hub</button>
              </li>
              <li>
                <button onClick={() => onOpenStatic('about')} className="text-slate-500 hover:text-brand-light-blue transition-colors text-[10px] font-black uppercase tracking-widest">About Academy</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-slate-500 hover:text-brand-light-blue transition-colors text-[10px] font-black uppercase tracking-widest">Engineering Services</button>
              </li>
              <li>
                <button onClick={() => onOpenStatic('contact')} className="text-slate-500 hover:text-brand-light-blue transition-colors text-[10px] font-black uppercase tracking-widest">Contact Foundry</button>
              </li>
              <li>
                <a
                  href="https://learn.egreedtech.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-light-blue hover:text-white transition-colors flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest"
                >
                  <span>Learning Portal</span>
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-8">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] border-b border-brand-blue/20 pb-4">Specializations</h3>
            <ul className="space-y-4">
              <li className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40"></div>
                  Strategic Planning
              </li>
              <li className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40"></div>
                  Web Architecture
              </li>
              <li className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40"></div>
                  Software Development
              </li>
              <li className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40"></div>
                  Digital Transformation
              </li>
              <li className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40"></div>
                  AI Implementation
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.3em]">
            © 2024-2025 Egreed Technology. Built With Egreed technology BY EGREEDLEARNING PLATFORM.
          </p>
          <div className="flex items-center space-x-8">
            <button onClick={() => onOpenStatic('privacy')} className="text-slate-600 hover:text-white text-[9px] font-black uppercase tracking-widest transition-all">Privacy Compliance</button>
            <button onClick={() => onOpenStatic('terms')} className="text-slate-600 hover:text-white text-[9px] font-black uppercase tracking-widest transition-all">Protocol Terms</button>
            <div className="flex items-center space-x-3 text-slate-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
              <span className="text-[9px] font-black uppercase tracking-widest">MADE IN</span>
              <span className="text-brand-blue font-bold">RWANDA</span>
              <div className="w-4 h-3 bg-brand-blue rounded-sm opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
