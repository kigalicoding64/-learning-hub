
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
    EgreedLogoIcon,
    ShieldIcon,
    RwandaFlagIcon
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
                return (
                    <div className="max-w-4xl mx-auto space-y-16 animate-fade-in py-10">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-light-blue text-[10px] font-black uppercase tracking-widest">
                                <ShieldIcon className="w-4 h-4" />
                                Global Privacy Protocol
                            </div>
                            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">Privacy <span className="text-brand-light-blue">Compliance</span></h2>
                            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Data Sovereignty & Local Regulatory Alignment</p>
                        </div>

                        <div className="space-y-12 bg-slate-900/50 p-12 rounded-[3rem] border border-white/5 shadow-3xl">
                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-blue"></div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">1. Data Sovereignty & Collection</h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    At Egreed Technology, we adhere to the Law N° 058/2021 of 13/10/2021 relating to the protection of personal data and privacy in Rwanda, alongside GDPR standards for global users. We collect only essential telemetry required to validate engineering credentials and optimize AI-tutoring performance. This includes identity parameters, academic progress, and synthetic interaction logs.
                                </p>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-blue"></div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">2. Neural Processing Infrastructure</h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    Interaction data with E-Tutor and our AI Labs is processed via encrypted pipelines. Technical prompts are utilized for real-time inference and are not stored in permanent archives beyond the scope of your active learning session, ensuring your proprietary code and architectural ideas remain secure. We utilize state-of-the-art encryption at rest and in transit (TLS 1.3).
                                </p>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-blue"></div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">3. Financial Integrity & Third Parties</h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    Payment information processed via MoMo, Airtel Money, or Global Gateways is handled directly by licensed financial partners. Egreed Technology does not store raw financial keys, card numbers, or PIN codes within our local ecosystem. Telemetry shared with AI model providers (Google GenAI) is limited to the minimum technical context required for response generation.
                                </p>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-blue"></div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">4. User Rights & Data Control</h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    Users maintain full control over their digital footprint. You have the right to request full extraction of your academic records, correction of credential metadata, or permanent termination of your local neural link (account deletion). Requests are processed within 72 hours of verification.
                                </p>
                            </section>
                        </div>

                        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
                            <div className="flex items-center gap-4">
                                <RwandaFlagIcon className="w-5 h-5 shadow-sm" />
                                <span>Compliant with RW DP Law 2021</span>
                            </div>
                            <span className="flex items-center gap-2">Last Revision: 2025.03.14 • Secure v4.2</span>
                        </div>
                    </div>
                );
            case 'terms':
                return (
                    <div className="max-w-4xl mx-auto space-y-16 animate-fade-in py-10">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-light-blue text-[10px] font-black uppercase tracking-widest">
                                <LockIcon className="w-4 h-4" />
                                Platform Operations Code
                            </div>
                            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">Protocol <span className="text-brand-light-blue">Terms</span></h2>
                            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Usage Agreement & Academic Standards</p>
                        </div>

                        <div className="space-y-12 bg-slate-900/50 p-12 rounded-[3rem] border border-white/5 shadow-3xl">
                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-blue"></div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">1. Acceptance of Engineering Code</h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    By accessing the Egreed Technology hub, you agree to utilize the provided tools—including but not limited to Gemini Pro, Veo, and LLM Orchestration—within the ethical boundaries of professional engineering. You agree not to reverse-engineer the platform components or utilize AI tools for the production of harmful, illegal, or deceptive digital artifacts.
                                </p>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-blue"></div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">2. Academic Integrity & IP</h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    Certificates of Completion are proprietary intellectual property of Egreed Technology. Credentials are issued based on valid performance in automated Lab Assessments. Attempts to bypass assessment logic using external scripts or automated solve-engines invalidate the credential and will result in a permanent block. All curriculum content is copyright protected.
                                </p>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-blue"></div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">3. Enrollment & Dispute Resolution</h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    Enrollment in premium modules is finalized upon successful transaction validation through our Rwandan (MoMo/Airtel) or Global partners. Disputes regarding access or billing must be raised through the Contact Foundry within 14 days. Refunds are processed solely if content delivery fails due to Egreed system failures. Administrative decisions regarding credentialing are final.
                                </p>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-6 bg-brand-blue"></div>
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm">4. Limitation of Liability</h3>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    Egreed Technology provides advanced training and intelligence tools; however, we are not liable for the downstream implementation choices made by users in their own commercial or private projects. Our guidance is academic and consultative. Use of AI-generated code should always be verified by human practitioners before production deployment.
                                </p>
                            </section>
                        </div>

                        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-600">
                             <div className="flex items-center gap-4">
                                <EgreedLogoIcon className="w-5 h-5 opacity-40" />
                                <span>Institutional Compliance Active</span>
                            </div>
                            <span className="flex items-center gap-2">Standard Protocol v4.2 • Made in RW</span>
                        </div>
                    </div>
                );
            default:
                return <div className="text-center py-20 font-black uppercase text-slate-500 tracking-widest">Protocol Node Not Found</div>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <button onClick={onReturn} className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl border border-white/5 mb-20 transition-all group">
                <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Dashboard
            </button>
            {renderContent()}
        </div>
    );
};

export default StaticPage;
