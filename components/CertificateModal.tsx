
import React, { useRef } from 'react';
import { XIcon, EgreedLogoIcon, AwardIcon, SparklesIcon, CheckCircleIcon } from './Icons';

interface CertificateModalProps {
  courseTitle: string;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ courseTitle, onClose }) => {
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
      window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[200] p-4 animate-fade-in overflow-y-auto">
      <div className="w-full max-w-5xl flex flex-col gap-10 py-10">
        
        <div className="flex justify-between items-center text-white px-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-blue rounded-2xl text-brand-darker shadow-2xl shadow-brand-blue/30">
                    <AwardIcon className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">Credential <span className="text-brand-light-blue">Unlocked</span></h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Validation ID: EG-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
            </div>
            <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10">
                <XIcon className="w-6 h-6" />
            </button>
        </div>

        {/* Certificate Content */}
        <div 
            ref={certRef}
            className="relative bg-white text-slate-900 rounded-[3rem] p-12 md:p-24 shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-[16px] border-slate-100 overflow-hidden print:shadow-none print:border-none print:m-0"
        >
            {/* Background Textures */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-0 w-full h-full bg-grid"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
                <EgreedLogoIcon className="w-[800px] h-[800px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-slate-900 p-2 rounded-lg">
                        <EgreedLogoIcon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-3xl font-black tracking-tighter uppercase italic">Egreed<span className="text-brand-blue not-italic">Tech</span></span>
                </div>

                <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Certificate of Engineering Excellence</span>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-slate-900 uppercase">Credential Issued</h1>
                </div>

                <div className="w-32 h-1 bg-brand-blue mx-auto rounded-full"></div>

                <div className="space-y-6 max-w-2xl">
                    <p className="text-lg font-medium text-slate-500 leading-relaxed">
                        This document officially certifies that the bearer has successfully completed the rigorous curriculum and technical assessments required for:
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none border-y-2 border-slate-100 py-10">
                        {courseTitle}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-12 pt-12 items-end">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-48 h-[1px] bg-slate-300"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date of Validation</span>
                        <span className="text-sm font-bold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex items-center justify-center relative">
                            <CheckCircleIcon className="w-16 h-16 text-brand-blue" />
                            <div className="absolute inset-0 border border-slate-200 rounded-full animate-ping opacity-20"></div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                         <div className="w-48 h-[1px] bg-slate-300"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chief Engineer Signature</span>
                        <span className="text-xl italic font-serif">E. G. Reed</span>
                    </div>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 right-0 p-8">
                <SparklesIcon className="w-12 h-12 text-slate-100" />
            </div>
            <div className="absolute bottom-0 left-0 p-8">
                <SparklesIcon className="w-12 h-12 text-slate-100" />
            </div>
        </div>

        <div className="flex justify-center gap-6 pb-20">
            <button 
                onClick={handlePrint}
                className="px-12 py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue shadow-2xl shadow-brand-blue/30 transition-all uppercase tracking-widest text-sm flex items-center gap-3"
            >
                Download PDF
            </button>
            <button 
                onClick={onClose}
                className="px-12 py-6 bg-white/5 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm border border-white/10"
            >
                Dismiss
            </button>
        </div>
      </div>

      <style>{`
        @media print {
            body * { visibility: hidden; }
            .print\\:shadow-none { box-shadow: none !important; }
            .fixed { position: relative !important; inset: 0 !important; background: white !important; }
            div[ref="certRef"], div[ref="certRef"] * { visibility: visible; }
            div[ref="certRef"] { position: absolute; left: 0; top: 0; width: 100%; height: auto; }
            footer, header, button { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default CertificateModal;
