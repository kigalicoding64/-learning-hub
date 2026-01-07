import React from 'react';
import { 
    ArrowLeftIcon, 
    BrainIcon, 
    SparklesIcon, 
    CheckCircleIcon, 
    ExternalLinkIcon, 
    BookOpenIcon, 
    UserIcon, 
    BotIcon,
    VideoIcon,
    SearchIcon,
    MicIcon,
    LockIcon,
    ImageIcon,
    // Fix: Added missing EgreedLogoIcon import
    EgreedLogoIcon
} from './Icons';

interface StaticPageProps {
    pageKey: string;
    onReturn: () => void;
    onExplore: () => void;
}

const StaticPage: React.FC<StaticPageProps> = ({ pageKey, onReturn, onExplore }) => {
    const renderContent = () => {
        switch (pageKey) {
            case 'career-tracks':
                return (
                    <div className="space-y-20 animate-fade-in">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6">Career <span className="text-brand-light-blue">Tracks</span></h2>
                            <p className="text-slate-400 text-lg leading-relaxed">Engineered pathways designed to take you from foundational understanding to elite industry implementation.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { title: 'AI Solutions Architect', level: 'Senior', salary: '$180k+', modules: 14, icon: BrainIcon },
                                { title: 'Modern Fullstack Engineer', level: 'Mid-Senior', salary: '$140k+', modules: 10, icon: BookOpenIcon },
                                { title: 'Cloud Infrastructure Expert', level: 'Expert', salary: '$160k+', modules: 12, icon: ExternalLinkIcon },
                                { title: 'Machine Learning Specialist', level: 'Senior', salary: '$190k+', modules: 16, icon: SparklesIcon },
                                { title: 'UI/UX Design Lead', level: 'Senior', salary: '$130k+', modules: 8, icon: ImageIcon },
                                { title: 'Security Architect', level: 'Expert', salary: '$170k+', modules: 15, icon: LockIcon },
                            ].map((track, i) => (
                                <div key={i} className="bg-brand-secondary/40 border border-white/5 p-8 rounded-[2rem] hover:border-brand-blue/40 transition-all group">
                                    <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform">
                                        <track.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">{track.title}</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">{track.level} Engineering Level</p>
                                    <div className="flex justify-between items-center py-4 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-600 font-black uppercase">Avg. Reward</span>
                                            <span className="text-white font-black">{track.salary}</span>
                                        </div>
                                        <button onClick={onExplore} className="px-4 py-2 bg-white/5 hover:bg-brand-blue hover:text-brand-darker transition-all rounded-lg text-[10px] font-black uppercase tracking-widest">Enroll Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'ai-research':
                return (
                    <div className="space-y-20 animate-fade-in">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2 space-y-8">
                                <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">AI <span className="text-brand-light-blue">Research</span></h2>
                                <p className="text-slate-300 text-xl leading-relaxed">Our labs at Egreed are dedicated to pushing the boundaries of neural orchestration and edge-native intelligence.</p>
                                <div className="p-8 bg-slate-900/80 rounded-[2rem] border border-white/5 border-l-brand-blue border-l-4">
                                    <h4 className="text-brand-light-blue font-black uppercase tracking-widest text-xs mb-4">Latest Breakthrough</h4>
                                    <p className="text-white font-bold leading-relaxed">"Orchestra-v3: A multi-agent framework for zero-latency industrial automation."</p>
                                    <button className="mt-4 text-[10px] text-slate-500 hover:text-white font-black uppercase tracking-[0.2em] flex items-center gap-2">View Whitepaper <ExternalLinkIcon className="w-3 h-3" /></button>
                                </div>
                            </div>
                            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                                {[
                                    'Computer Vision', 'NLP Synthesis', 'Robotics Edge', 'Generative Code', 'Predictive Analysis', 'Neural Nets'
                                ].map((topic, i) => (
                                    <div key={i} className="h-40 bg-brand-secondary/30 rounded-2xl flex items-center justify-center border border-white/5 hover:bg-brand-blue/5 transition-colors group">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-white transition-colors text-center px-4">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'open-source':
                return (
                    <div className="space-y-20 animate-fade-in">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6">Open <span className="text-brand-light-blue">Source</span></h2>
                            <p className="text-slate-400">We believe in a transparent future. Explore our core libraries and contribute to the engineering ecosystem.</p>
                        </div>
                        <div className="space-y-6">
                            {[
                                { name: 'Egreed Core SDK', lang: 'TypeScript', stars: '4.2k', desc: 'The base framework for building AI-native educational platforms.' },
                                { name: 'Neural-Sync-JS', lang: 'Rust/WASM', stars: '1.8k', desc: 'High-performance audio/video synchronization for web-based tutoring.' },
                                { name: 'Gemini-Live-React', lang: 'TypeScript', stars: '2.5k', desc: 'React hooks and components for the Gemini 2.5 Live API.' },
                            ].map((repo, i) => (
                                <div key={i} className="p-8 bg-slate-900 border border-white/5 rounded-[2rem] hover:border-white/20 transition-all flex flex-col md:flex-row justify-between items-center gap-8 group">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-2xl font-black text-white italic">{repo.name}</h3>
                                            <span className="px-2 py-1 bg-brand-blue/10 text-brand-light-blue text-[8px] font-black rounded border border-brand-blue/20">{repo.lang}</span>
                                        </div>
                                        <p className="text-slate-500 text-sm">{repo.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <SparklesIcon className="w-4 h-4" />
                                            <span className="text-xs font-bold">{repo.stars}</span>
                                        </div>
                                        <button className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all">View on Github</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="space-y-20 animate-fade-in">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="relative aspect-square bg-slate-900 rounded-[4rem] overflow-hidden group border border-white/10">
                                <div className="absolute inset-0 bg-grid opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <div className="absolute inset-0 flex items-center justify-center p-20">
                                    <div className="w-full h-full border-2 border-brand-blue/20 rounded-full animate-pulse flex items-center justify-center">
                                        <EgreedLogoIcon className="w-32 h-32 text-brand-blue" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">About <span className="text-brand-light-blue">eGreed</span></h2>
                                <p className="text-slate-300 text-xl leading-relaxed font-medium">Founded at the intersection of Silicon Valley and global engineering hubs, Egreed Technology exists to build the technical foundation of the next industrial era.</p>
                                <div className="space-y-6">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0"><BrainIcon className="w-6 h-6 text-brand-blue" /></div>
                                        <div>
                                            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">Our Mission</h4>
                                            <p className="text-slate-500 text-sm">To democratize elite engineering education through high-fidelity AI orchestration.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0"><SearchIcon className="w-6 h-6 text-brand-blue" /></div>
                                        <div>
                                            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">Our Vision</h4>
                                            <p className="text-slate-500 text-sm">A future where every professional has an infinitely capable technical mentor at their fingertips.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'partners':
                return (
                    <div className="space-y-20 animate-fade-in">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6">Our <span className="text-brand-light-blue">Partners</span></h2>
                            <p className="text-slate-400">Collaboration is the core of innovation. We work with the world's leading technology and industry leaders.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                                <div key={i} className="aspect-video bg-brand-secondary/30 rounded-2xl border border-white/5 flex items-center justify-center grayscale hover:grayscale-0 hover:bg-white/5 transition-all opacity-40 hover:opacity-100 cursor-pointer">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Partner-{(i+100).toString(16).toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="max-w-4xl mx-auto p-12 bg-brand-blue/5 border border-brand-blue/20 rounded-[3rem] text-center">
                            <h3 className="text-2xl font-black text-white mb-4 uppercase italic">Become a Technical Partner</h3>
                            <p className="text-slate-400 mb-10 max-w-xl mx-auto">Integrate your enterprise systems with Egreed Technology or provide specialized curriculum to our global talent pool.</p>
                            <button className="px-10 py-5 bg-brand-blue text-brand-darker font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-light-blue transition-all">Partner Inquiry</button>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="space-y-20 animate-fade-in">
                         <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6">Contact <span className="text-brand-light-blue">Foundry</span></h2>
                            <p className="text-slate-400">Reach out to our engineering or support teams.</p>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                { title: 'Engineering Support', detail: 'support@egreed.tech', action: 'Open Ticket' },
                                { title: 'Enterprise Solutions', detail: 'biz@egreed.tech', action: 'Request Demo' },
                                { title: 'General Inquiries', detail: 'hello@egreed.tech', action: 'Send Email' },
                            ].map((box, i) => (
                                <div key={i} className="p-10 bg-slate-900 rounded-[2.5rem] border border-white/5 text-center group">
                                    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6">{box.title}</h4>
                                    <p className="text-xl font-black text-white mb-8 italic">{box.detail}</p>
                                    <button className="w-full py-4 bg-white/5 group-hover:bg-brand-blue group-hover:text-brand-darker transition-all rounded-xl text-[10px] font-black uppercase tracking-widest">{box.action}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'privacy':
            case 'terms':
                return (
                    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in py-10">
                        <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">{pageKey === 'privacy' ? 'Privacy' : 'Terms of'} <span className="text-brand-light-blue">Compliance</span></h2>
                        <div className="prose prose-invert prose-emerald max-w-none text-slate-400 space-y-8">
                            <section>
                                <h3 className="text-white font-bold uppercase tracking-widest text-sm">1. Introduction</h3>
                                <p>Welcome to Egreed Technology. We are committed to transparency in our technical operations and user data management. This document outlines our standard industrial compliance protocols.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-bold uppercase tracking-widest text-sm">2. Data Sovereignty</h3>
                                <p>All technical input provided during Egreed modules is processed via encrypted neural pipelines. We prioritize your intellectual property and project security.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-bold uppercase tracking-widest text-sm">3. Usage Policies</h3>
                                <p>Users are expected to utilize Egreed AI tools (Gemini, Veo, Orchestra) within the scope of ethical engineering guidelines. Misuse of generative systems will result in account termination.</p>
                            </section>
                        </div>
                        <div className="pt-10 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
                            <span>Last Revision: 2025.03.14</span>
                            <span className="flex items-center gap-2"><LockIcon className="w-3 h-3" /> Secure Protocol v4.2</span>
                        </div>
                    </div>
                );
            case 'certifications':
                return (
                    <div className="space-y-20 animate-fade-in">
                        <div className="text-center max-w-2xl mx-auto">
                            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-6">Technical <span className="text-brand-light-blue">Certs</span></h2>
                            <p className="text-slate-400">Validated by the global Egreed engineering council.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {[
                                { name: 'Egreed AI Associate', code: 'EAA-001', color: 'emerald' },
                                { name: 'Neural Systems Architect', code: 'NSA-402', color: 'blue' },
                                { name: 'Full-Stack Technical Lead', code: 'FTL-305', color: 'purple' },
                                { name: 'Open-Edge Security Specialist', code: 'OESS-501', color: 'amber' },
                            ].map((cert, i) => (
                                <div key={i} className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-blue"></div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                                            <CheckCircleIcon className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{cert.code}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white italic mb-2">{cert.name}</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6 italic">Validated Engineering Status</p>
                                    <button onClick={onExplore} className="text-[10px] font-black text-brand-light-blue uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">Start Certification Track <ArrowLeftIcon className="w-3 h-3 rotate-180" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return <div>Page Not Found</div>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <button onClick={onReturn} className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl border border-white/5 mb-20 transition-all">
                <ArrowLeftIcon className="w-4 h-4" />
                Return to Hub
            </button>
            {renderContent()}
        </div>
    );
};

export default StaticPage;