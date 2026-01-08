
import React, { useState, useEffect } from 'react';
import { EgreedLogoIcon, CheckCircleIcon, SparklesIcon, AwardIcon, ShieldIcon, LoaderIcon, ArrowLeftIcon } from './Icons';

interface VerificationPageProps {
  hash: string;
  onReturn: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ hash, onReturn }) => {
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsValidating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-darker flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="w-full max-w-2xl z-10">
        <div className="flex flex-col items-center text-center space-y-8 mb-12">
            <div className="p-4 bg-brand-blue rounded-[1.5rem] text-brand-darker shadow-[0_20px_50px_rgba(16,185,129,0.3)] animate-bounce">
                <EgreedLogoIcon className="w-10 h-10" />
            </div>
            <div>
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Credential <span className="text-brand-light-blue">Authentication</span></h1>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">International Engineering Standard Verification Hub</p>
            </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Status Indicator */}
            <div className="absolute top-6 right-8">
                {isValidating ? (
                    <div className="flex items-center gap-3">
                        <LoaderIcon className="w-4 h-4 text-brand-blue animate-spin" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Validating Chain...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 bg-brand-blue/10 px-4 py-2 rounded-full border border-brand-blue/20">
                        <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                        <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Authentic Record</span>
                    </div>
                )}
            </div>

            <div className={`transition-all duration-1000 ${isValidating ? 'opacity-20 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'}`}>
                <div className="flex items-start gap-8 mb-12 pb-12 border-b border-white/5">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-brand-blue shadow-xl">
                        <AwardIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1 block">Validated Specialist</span>
                        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Enterprise Web <br />Architecture</h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-y-10 gap-x-6 mb-12">
                    <div>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Credential Recipient</span>
                        <span className="text-sm font-bold text-white uppercase">Validated With Egreed technology BY EGREEDLEARNING PLATFORM Student</span>
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Issuing Authority</span>
                        <span className="text-sm font-bold text-white uppercase italic">Egreed Academic Council</span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">System Identification Hash</span>
                        <code className="text-[11px] font-mono text-brand-light-blue bg-slate-950 px-4 py-3 rounded-xl border border-white/5 block break-all leading-relaxed">
                            {hash}
                        </code>
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Consortium Approval</span>
                        <div className="flex items-center gap-2 text-brand-blue">
                            <CheckCircleIcon className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-tighter">Verified by Partners</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 block">Validation Timestamp</span>
                        <span className="text-xs font-bold text-slate-400">MARCH 14, 2025 • 09:24 UTC</span>
                    </div>
                </div>

                <div className="bg-brand-blue/5 border border-brand-blue/20 p-8 rounded-[2rem] flex items-center gap-6">
                    <div className="p-3 bg-brand-blue rounded-xl text-brand-darker">
                        <SparklesIcon className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                        This digital credential is AI-native and verified across the global Egreed engineering ledger. It represents the highest standard of technical proficiency.
                    </p>
                </div>
            </div>

            {isValidating && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-darker/10 backdrop-blur-[2px]">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-brand-blue/10 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShieldIcon className="w-8 h-8 text-brand-blue animate-pulse" />
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] animate-pulse">Running Integrity Audit...</span>
                    </div>
                </div>
            )}
        </div>

        <div className="mt-12 flex justify-center">
            <button 
                onClick={onReturn}
                className="flex items-center gap-4 px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all font-black uppercase text-[10px] tracking-widest group"
            >
                <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to With Egreed technology BY EGREEDLEARNING PLATFORM Hub
            </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
