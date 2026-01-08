
import React, { useRef } from 'react';
import { 
  XIcon, 
  EgreedLogoIcon, 
  CheckCircleIcon,
  MicrosoftLogo,
  SupabaseLogo,
  GoogleCloudLogo,
  EdTechLogo,
  ELearningLogo,
  RWIotLogo,
  AwardIcon,
  SparklesIcon
} from './Icons';

interface CertificateModalProps {
  courseTitle: string;
  userName: string;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ courseTitle, userName, onClose }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const verificationHash = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const verificationLink = `https://egreedtech.org/verify/${verificationHash}`;
  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase();

  const handlePrint = () => {
    window.print();
  };

  const partnerLogos = [
    { name: "Microsoft", logo: MicrosoftLogo },
    { name: "Supabase", logo: SupabaseLogo },
    { name: "Google Cloud", logo: GoogleCloudLogo },
    { name: "EdTechnology", logo: EdTechLogo },
    { name: "E-Learning", logo: ELearningLogo },
    { name: "RW IOT Agency", logo: RWIotLogo }
  ];

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl flex items-center justify-center z-[200] p-4 animate-fade-in overflow-y-auto no-print">
      <div className="w-full max-w-6xl flex flex-col gap-8 py-10">
        
        {/* Modal Navigation */}
        <div className="flex justify-between items-center text-white px-6 no-print">
            <div className="flex items-center gap-5">
                <div className="p-3.5 bg-brand-blue rounded-2xl text-brand-darker shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-pulse">
                    <AwardIcon className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase italic leading-none">Credential <span className="text-brand-light-blue">Forge</span></h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">Institutional Academic Output Protocol</p>
                </div>
            </div>
            <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group">
                <XIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
        </div>

        {/* Premium International Certificate */}
        <div 
            ref={certRef}
            id="printable-certificate"
            className="relative bg-[#fcfbf7] text-[#1a202c] rounded-none p-12 md:p-24 shadow-[0_80px_160px_rgba(0,0,0,1)] border-[24px] border-[#0f172a] overflow-hidden print:shadow-none print:border-[15mm] print:m-0 print:p-[20mm] print:w-full print:h-full"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* Guilloché Security Pattern Layer */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a202c_0.8px,transparent_0.8px)] [background-size:24px_24px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,#d4af37_0deg,#d4af37_10deg,transparent_10deg,transparent_20deg)] opacity-10 blur-xl animate-[spin_60s_linear_infinite]"></div>
            </div>

            {/* Inset Gold Ornamental Border */}
            <div className="absolute inset-4 border-[3px] border-[#d4af37] pointer-events-none"></div>
            <div className="absolute inset-8 border-[1px] border-[#d4af37]/40 pointer-events-none"></div>

            {/* Corner Embellishments */}
            <div className="absolute top-0 left-0 p-10 opacity-10"><SparklesIcon className="w-24 h-24 text-[#d4af37]" /></div>
            <div className="absolute top-0 right-0 p-10 opacity-10"><SparklesIcon className="w-24 h-24 text-[#d4af37]" /></div>
            <div className="absolute bottom-0 left-0 p-10 opacity-10"><SparklesIcon className="w-24 h-24 text-[#d4af37]" /></div>
            <div className="absolute bottom-0 right-0 p-10 opacity-10"><SparklesIcon className="w-24 h-24 text-[#d4af37]" /></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center h-full justify-between gap-12">
                
                {/* Header Section */}
                <div className="space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="bg-[#0f172a] p-4 rounded-xl shadow-2xl mb-4 group hover:scale-105 transition-transform duration-500">
                             <EgreedLogoIcon className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-[#d4af37] text-xl font-black uppercase tracking-[0.6em] mb-1">Egreed Technology</h3>
                        <p className="text-[10px] font-black text-[#0f172a]/60 uppercase tracking-[0.4em] italic mb-8">“Empowering Businesses Through Digital Innovation”</p>
                    </div>
                    
                    <div className="relative inline-block py-6">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                         <h1 className="text-5xl md:text-7xl font-serif text-[#0f172a] font-light italic tracking-tight uppercase leading-none px-20">
                            Certificate of Completion
                        </h1>
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                    </div>
                </div>

                {/* Recipient Identity Section */}
                <div className="w-full space-y-8 py-8">
                    <p className="text-sm md:text-lg font-bold text-slate-500 uppercase tracking-[0.5em]">This document officially certifies that</p>
                    <div className="relative inline-block">
                        <h2 className="text-5xl md:text-7xl font-serif font-black text-[#0f172a] tracking-tight px-16 relative z-10">
                            {userName}
                        </h2>
                        {/* Elegant underlined element */}
                        <div className="absolute bottom-[-10px] left-0 w-full h-[3px] bg-[#d4af37]"></div>
                        <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-[#d4af37]/50"></div>
                    </div>
                    <div className="max-w-2xl mx-auto space-y-6 pt-4">
                        <p className="text-xs md:text-base font-medium text-slate-600 leading-relaxed italic">
                            has successfully completed the prescribed advanced industrial curriculum and met all required engineering standards for the professional validation of:
                        </p>
                        <div className="bg-[#0f172a]/5 border-y border-[#0f172a]/10 py-6">
                            <h4 className="text-2xl md:text-4xl font-black text-[#0f172a] uppercase tracking-[0.1em] italic">
                                {courseTitle}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Footer Orchestration */}
                <div className="w-full flex flex-col items-center gap-16">
                    
                    {/* Signatures & Seal */}
                    <div className="grid grid-cols-3 w-full items-end pt-4">
                        <div className="flex flex-col items-center space-y-3">
                            <span className="text-2xl font-serif italic text-[#1a202c]">Eli G. Reed</span>
                            <div className="w-48 h-[1px] bg-[#0f172a]/30"></div>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em]">Managing Director</p>
                        </div>

                        <div className="flex justify-center relative">
                            {/* Official Seal - Dynamic & Attractive */}
                            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[8px] border-[#d4af37]/20 flex items-center justify-center relative shadow-2xl">
                                <div className="absolute inset-0 rounded-full border-[2px] border-[#d4af37]/40 border-dashed animate-[spin_30s_linear_infinite]"></div>
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[1px] border-[#d4af37] flex flex-col items-center justify-center bg-white shadow-inner p-5 space-y-1">
                                    <EgreedLogoIcon className="w-12 h-12 text-[#0f172a]" />
                                    <span className="text-[6px] font-black text-[#0f172a]/40 uppercase tracking-widest">OFFICIAL SEAL</span>
                                </div>
                                <div className="absolute -bottom-5 bg-[#0f172a] text-white px-5 py-2 rounded-lg text-[8px] font-black uppercase tracking-[0.4em] shadow-2xl border border-[#d4af37]/30">
                                    AUTHENTICATED
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center space-y-3">
                            <span className="text-2xl font-serif italic text-[#1a202c]">Sarah J. Miller</span>
                            <div className="w-48 h-[1px] bg-[#0f172a]/30"></div>
                            <p className="text-[9px] font-black uppercase tracking-[0.3em]">Training Manager</p>
                        </div>
                    </div>

                    {/* Partners & ID Info */}
                    <div className="w-full space-y-12">
                         <div className="flex flex-wrap justify-center items-center gap-10 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                            {partnerLogos.map(p => (
                                <div key={p.name} className="flex flex-col items-center gap-2 group">
                                    <p.logo className="w-8 h-8 text-[#0f172a] transition-transform group-hover:scale-110" />
                                    <span className="text-[7px] font-black uppercase tracking-widest">{p.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-end border-t border-[#0f172a]/5 pt-8 px-4">
                            <div className="text-left space-y-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    Validated On: <span className="text-[#0f172a]">{issueDate}</span>
                                </p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    Credential ID: <span className="text-[#0f172a] font-mono tracking-tighter">{verificationHash}</span>
                                </p>
                            </div>

                            {/* Institutional Verification Hub */}
                            <div className="flex items-center gap-6 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                                <div className="w-16 h-16 bg-white p-1">
                                    <svg viewBox="0 0 100 100" fill="#0f172a" className="w-full h-full">
                                        <path d="M0 0h30v10H10v20H0V0zm70 0h30v30h-10V10H70V0zM0 70h10v20h20v10H0V70zm100 0v30H70v-10h20V70h10zM25 25h20v20H25V25zm30 0h20v20H55V25zm0 30h20v20H55V55zm-30 0h20v20H25V55z" />
                                    </svg>
                                </div>
                                <div className="text-right border-l border-slate-100 pl-6">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Verify Authenticity at:</p>
                                    <p className="text-[10px] font-black text-[#0f172a] uppercase tracking-tighter hover:text-brand-blue cursor-pointer transition-colors">egreedtech.org/verify</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 pb-20 px-4 no-print">
            <button 
                onClick={handlePrint}
                className="w-full sm:w-auto px-16 py-7 bg-white text-brand-darker font-black rounded-3xl hover:bg-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-5 group active:scale-95"
            >
                <AwardIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Export Institutional Copy (PDF)
            </button>
            <button 
                onClick={onClose}
                className="w-full sm:w-auto px-12 py-7 bg-white/5 text-white font-black rounded-3xl hover:bg-white/10 transition-all uppercase tracking-[0.2em] text-xs border border-white/10"
            >
                Dismiss Protocol
            </button>
        </div>
      </div>

      <style>{`
        @media print {
            @page { 
                size: landscape; 
                margin: 0; 
            }
            body {
                background: white !important;
                margin: 0 !important;
                padding: 0 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            #root {
                display: none !important;
            }
            .no-print {
                display: none !important;
            }
            #printable-certificate {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                padding: 20mm !important;
                border: 20mm solid #0f172a !important;
                background-color: #fcfbf7 !important;
                box-shadow: none !important;
                visibility: visible !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                z-index: 9999 !important;
            }
            #printable-certificate * {
                visibility: visible !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
      `}</style>
    </div>
  );
};

export default CertificateModal;
