
import React, { useState } from 'react';
import { 
    SparklesIcon, 
    BookOpenIcon, 
    BrainIcon, 
    CheckCircleIcon, 
    PlayIcon, 
    SearchIcon, 
    AwardIcon, 
    ZapIcon, 
    UsersIcon, 
    StarIcon, 
    ArrowRightIcon,
    ShieldIcon,
    MicrosoftLogo,
    SupabaseLogo,
    GoogleCloudLogo,
    ChevronUpIcon,
    RwandaFlagIcon
} from './Icons';

interface LandingPageProps {
    onExplore: () => void;
    onNavigate: (key: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onNavigate }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);

    return (
        <div className="relative overflow-hidden selection:bg-brand-blue selection:text-brand-darker">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-grid opacity-20"></div>
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-brand-blue/10 rounded-full blur-[140px] animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[140px] animate-blob delay-2000"></div>
            </div>

            {/* Hero Section - Rwandan Context */}
            <section id="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-6xl text-center z-10">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-brand-light-blue text-[10px] font-black uppercase tracking-[0.3em] mb-12 animate-fade-in shadow-2xl backdrop-blur-md">
                        <RwandaFlagIcon className="w-5 h-5 shadow-sm" />
                        <span>Empowering Rwanda's Next Gen Engineers</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-[8rem] font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase italic animate-slide-up select-none">
                        Master <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light-blue via-emerald-400 to-blue-500">Global Tech</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed opacity-0 animate-fade-in delay-300">
                        Join Rwanda's elite e-learning hub for high-end engineering. <br className="hidden md:block" />
                        Built locally, validated globally. Experience AI-native education today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in delay-500">
                        <button 
                            onClick={onExplore}
                            className="group w-full sm:w-auto px-12 py-5 bg-brand-blue text-brand-darker text-lg font-black rounded-2xl hover:bg-brand-light-blue hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] uppercase tracking-[0.2em] flex items-center justify-center gap-4"
                        >
                            Get Started
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a 
                            href="#about"
                            className="w-full sm:w-auto px-12 py-5 bg-white/5 text-white text-lg font-black rounded-2xl hover:bg-white/10 border border-white/10 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4 backdrop-blur-md"
                        >
                            Our Vision
                        </a>
                    </div>

                    <div className="mt-24 opacity-40 flex flex-wrap justify-center items-center gap-12 grayscale hover:grayscale-0 transition-all duration-1000">
                        <MicrosoftLogo className="h-6 md:h-8" />
                        <SupabaseLogo className="h-6 md:h-8" />
                        <GoogleCloudLogo className="h-6 md:h-8" />
                        <div className="text-lg font-black tracking-tighter italic text-white flex items-center gap-2 border-l border-white/10 pl-12">
                            <RwandaFlagIcon className="w-6 h-6" />
                            MADE IN RW
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-24 border-y border-white/5 bg-slate-900/30 backdrop-blur-md">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Local Students', val: '5,000+', icon: UsersIcon },
                            { label: 'Courses', val: '15+', icon: BookOpenIcon },
                            { label: 'MoMo Enabled', val: '100%', icon: ZapIcon },
                            { label: 'Certificates Issued', val: '1.2k', icon: AwardIcon },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                                <div className="p-3 bg-brand-blue/10 rounded-xl text-brand-blue">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{stat.val}</div>
                                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features / Why Choose Us */}
            <section id="about" className="py-32 container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-20 items-center mb-32">
                    <div className="md:w-1/2 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">Elevating <br />Rwanda's <span className="text-brand-light-blue">Tech Hub</span></h2>
                        <p className="text-slate-400 text-lg leading-relaxed font-medium">
                            Egreed Technology is more than a platform—it's a mission to bring world-class technical education to our borders. We combine local payment accessibility with global standard curricula.
                        </p>
                        <div className="space-y-4">
                            {[
                                'MoMo & Local Payment Integrated',
                                'AI-Powered Personal Tutoring',
                                'Global Standard Certifications',
                                'Direct Industry Career Tracks'
                            ].map((p, i) => (
                                <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-300">
                                    <div className="w-6 h-6 bg-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue"><CheckCircleIcon className="w-4 h-4" /></div>
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2 relative group">
                        <div className="absolute inset-0 bg-brand-blue/10 rounded-[3rem] blur-3xl"></div>
                        <div className="relative aspect-square bg-slate-800/50 rounded-[3rem] border border-white/10 overflow-hidden flex items-center justify-center">
                            <BrainIcon className="w-48 h-48 text-brand-blue/20 animate-pulse" />
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-brand-dark/80 px-6 py-3 rounded-full border border-brand-blue/30 backdrop-blur-xl">
                                <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Active Neural Core</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: 'Strategic Focus', desc: 'Curriculum designed for the Rwandan digital transformation roadmap.', icon: ZapIcon },
                        { title: 'Quality Content', desc: 'Learn from industry experts using interactive AI models.', icon: ShieldIcon },
                        { title: 'Local Access', desc: 'Pay easily with MoMo and study anytime, anywhere.', icon: RwandaFlagIcon },
                    ].map((val, i) => (
                        <div key={i} className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem] hover:border-brand-blue/30 transition-all group">
                            <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform">
                                <val.icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-black text-white mb-4 uppercase italic">{val.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-slate-900/40 border-y border-white/5">
                <div className="container mx-auto px-4 max-w-6xl text-center">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-20">Student <span className="text-brand-light-blue">Success</span></h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { name: 'Karasira J.', role: 'Web Architect', text: 'Egreed technology enabled me to master cloud architecture without leaving Kigali. Best platform in RW!' },
                            { name: 'Mutoni S.', role: 'AI Specialist', text: 'The AI E-Tutor is like having a private mentor. I finished the engineering track in record time.' },
                            { name: 'Gatete P.', role: 'Fullstack Lead', text: 'MoMo integration made it so easy to enroll. The certification is recognized globally.' },
                        ].map((test, i) => (
                            <div key={i} className="p-10 bg-slate-950 border border-white/5 rounded-[2.5rem] text-left relative group">
                                <div className="flex gap-1 text-brand-blue mb-6">
                                    {[1,2,3,4,5].map(s => <StarIcon key={s} className="w-3 h-3 fill-current" />)}
                                </div>
                                <p className="text-slate-400 mb-8 italic">"{test.text}"</p>
                                <div>
                                    <h4 className="text-white font-black text-sm">{test.name}</h4>
                                    <p className="text-brand-light-blue text-[9px] font-black uppercase tracking-widest">{test.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-brand-blue/20 to-brand-dark p-16 md:p-24 rounded-[4rem] border border-brand-blue/30 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase italic tracking-tighter leading-none">Ready to <span className="text-brand-light-blue">Level Up?</span></h2>
                        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-medium">Join the community of Rwandan engineers building the future.</p>
                        <button 
                            onClick={onExplore}
                            className="px-16 py-6 bg-brand-blue text-brand-darker font-black text-xl rounded-3xl hover:bg-brand-light-blue hover:scale-105 transition-all uppercase tracking-[0.2em] shadow-2xl shadow-brand-blue/20"
                        >
                            Explore Courses
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
