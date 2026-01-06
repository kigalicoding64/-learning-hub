
import React from 'react';
import { SparklesIcon, BookOpenIcon, BrainIcon, VideoIcon, CheckCircleIcon, PlayIcon, SearchIcon, ArrowLeftIcon, ExternalLinkIcon } from './Icons';

interface LandingPageProps {
    onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
    return (
        <div className="relative">
            {/* Background Grid & Blobs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-grid opacity-20"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-blob delay-2000"></div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4">
                <div className="container mx-auto max-w-6xl text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-light-blue text-xs font-black uppercase tracking-[0.2em] mb-10 animate-fade-in">
                        <SparklesIcon className="w-4 h-4" />
                        <span>Empowering Global Technology Solutions</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase italic animate-slide-up">
                        Engineering <br />
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light-blue via-emerald-400 to-blue-500">Future</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed opacity-0 animate-fade-in delay-300">
                        Egreed Technology isn't just a platform; it's an industry-leading AI ecosystem designed to bridge the gap between education and high-tier engineering excellence.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in delay-500">
                        <button 
                            onClick={onExplore}
                            className="w-full sm:w-auto px-10 py-5 bg-brand-blue text-brand-darker text-lg font-black rounded-xl hover:bg-brand-light-blue hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] uppercase tracking-widest"
                        >
                            Access Ecosystem
                        </button>
                        <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white text-lg font-black rounded-xl hover:bg-white/5 border border-white/10 transition-all uppercase tracking-widest flex items-center justify-center gap-3">
                            <PlayIcon className="w-5 h-5" />
                            Core Services
                        </button>
                    </div>

                    {/* Stats strip */}
                    <div className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/5 pt-16 opacity-0 animate-fade-in delay-700">
                        {[
                            { val: '150+', label: 'Proprietary Models' },
                            { val: '24/7', label: 'AI Mentorship' },
                            { val: '98%', label: 'Industry Placement' },
                            { val: 'GLOBAL', label: 'Egreed Partner Network' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <p className="text-3xl font-black text-white mb-2 tracking-tighter group-hover:text-brand-light-blue transition-colors">{stat.val}</p>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Egreed Tech Section */}
            <section className="py-32 relative bg-brand-darker/50 border-y border-white/5">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic leading-tight">
                                More Than Just <br /> 
                                <span className="text-brand-light-blue">Learning</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Our solutions are integrated into real-world software cycles. When you learn at Egreed, you are working with the same tools used by our global engineering teams.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'AI-Driven Software Architecture',
                                    'Automated Quality Assurance Labs',
                                    'Predictive Development Cycles',
                                    'Generative Media Production'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-slate-200 font-bold uppercase text-xs tracking-widest bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative">
                            <div className="space-y-6 pt-12">
                                <div className="bg-gradient-to-br from-brand-secondary to-brand-dark border border-white/10 p-8 rounded-2xl aspect-square flex flex-col justify-end group hover:border-brand-blue/50 transition-all">
                                    <BrainIcon className="w-10 h-10 text-brand-blue mb-4" />
                                    <h4 className="text-white font-bold uppercase text-sm mb-2">Cognitive Labs</h4>
                                    <p className="text-xs text-slate-500">Gemini Pro Integration</p>
                                </div>
                                <div className="bg-gradient-to-br from-brand-secondary to-brand-dark border border-white/10 p-8 rounded-2xl aspect-square flex flex-col justify-end group hover:border-brand-blue/50 transition-all">
                                    <VideoIcon className="w-10 h-10 text-brand-blue mb-4" />
                                    <h4 className="text-white font-bold uppercase text-sm mb-2">Veo Visuals</h4>
                                    <p className="text-xs text-slate-500">Next-Gen Video AI</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-brand-secondary to-brand-dark border border-white/10 p-8 rounded-2xl aspect-square flex flex-col justify-end group hover:border-brand-blue/50 transition-all">
                                    <CheckCircleIcon className="w-10 h-10 text-brand-blue mb-4" />
                                    <h4 className="text-white font-bold uppercase text-sm mb-2">Pro Certs</h4>
                                    <p className="text-xs text-slate-500">Global Recognition</p>
                                </div>
                                <div className="bg-gradient-to-br from-brand-secondary to-brand-dark border border-white/10 p-8 rounded-2xl aspect-square flex flex-col justify-end group hover:border-brand-blue/50 transition-all">
                                    <BookOpenIcon className="w-10 h-10 text-brand-blue mb-4" />
                                    <h4 className="text-white font-bold uppercase text-sm mb-2">Curriculum</h4>
                                    <p className="text-xs text-slate-500">Engineer-Led</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Tracks */}
            <section className="py-32 bg-brand-dark">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <h2 className="text-4xl font-black text-white uppercase italic mb-16">Proprietary <span className="text-brand-light-blue">Career Tracks</span></h2>
                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {[
                            { title: 'AI Solutions Architect', level: 'ADVANCED', count: 12, desc: 'Master the implementation of LLMs and generative agents in enterprise environments.' },
                            { title: 'Modern Fullstack Engineer', level: 'INTERMEDIATE', count: 8, desc: 'Build scalable architectures using eGreed-standard tech stacks and automation tools.' },
                            { title: 'Cloud Infrastructure Expert', level: 'ADVANCED', count: 10, desc: 'Manage massive-scale deployments with predictive AI monitoring systems.' }
                        ].map((track, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-brand-secondary border border-white/5 hover:border-brand-blue/50 transition-all group">
                                <div className="text-[10px] font-black text-brand-light-blue uppercase tracking-widest mb-4">{track.level} TRACK</div>
                                <h3 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-brand-light-blue transition-colors">{track.title}</h3>
                                <p className="text-slate-400 text-sm mb-8 leading-relaxed">{track.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-500 uppercase">{track.count} Modules</span>
                                    <button onClick={onExplore} className="text-white font-bold text-xs uppercase flex items-center gap-2 group-hover:gap-4 transition-all">
                                        Explore <ExternalLinkIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-32 container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-blue to-emerald-800 p-16 rounded-[3rem] shadow-[0_0_100px_rgba(16,185,129,0.2)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-none uppercase italic">Build With <br /> Egreed Tech</h2>
                        <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-medium">Join a global community of engineers building the next generation of digital infrastructure.</p>
                        <button onClick={onExplore} className="px-12 py-6 bg-white text-brand-darker font-black text-xl rounded-2xl hover:bg-slate-100 hover:scale-105 transition-all uppercase tracking-widest shadow-2xl">
                            Enter Hub
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
