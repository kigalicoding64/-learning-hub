
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
  SparklesIcon,
  ShieldIcon
} from './Icons';

interface CertificateModalProps {
  courseTitle: string;
  userName: string;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ courseTitle, userName, onClose }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const verificationHash = `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
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
    <div className="fixed inset-0 bg-brand-darker/98 backdrop-blur-3xl flex items-center justify-center z-[200] p-4 animate-fade-in overflow-y-auto no-print">
      <div className="w-full max-w-6xl flex flex-col gap-8 py-10">
        
        {/* Modal Navigation */}
        <div className="flex justify-between items-center text-white px-6 no-print">
            <div className="flex items-center gap-5">
                <div className="p-4 bg-brand-blue rounded-2xl text-brand-darker shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse">
                    <AwardIcon className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-black tracking-tight uppercase italic leading-none">Credential <span className="text-brand-light-blue">Forge</span></h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">Institutional Academic Output Protocol v4.2</p>
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
            className="relative bg-[#fdfcf9] text-[#1a202c] rounded-none p-12 md:p-24 shadow-[0_80px_160px_rgba(0,0,0,1)] border-[32px] border-[#0f172a] overflow-hidden group/cert"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* Advanced Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_6s_infinite] pointer-events-none z-20"></div>

            {/* Guilloché Security Pattern Layer */}
            <div className="absolute inset-0 opacity-[0.1] pointer-events-none overflow-hidden select-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a202c_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg,#d4af37_0deg,#d4af37_2deg,transparent_2deg,transparent_10deg)] opacity-10 blur-3xl animate-[spin_180s_linear_infinite]"></div>
            </div>

            {/* Multi-layered Gold Ornamental Borders */}
            <div className="absolute inset-6 border-[6px] border-[#d4af37] pointer-events-none"></div>
            <div className="absolute inset-10 border-[1.5px] border-[#d4af37]/60 pointer-events-none"></div>
            <div className="absolute inset-[44px] border-[0.5px] border-[#d4af37]/30 pointer-events-none"></div>

            {/* Ornaments */}
            <div className="absolute top-0 left-0 p-10 opacity-30 transform -rotate-12 group-hover/cert:rotate-0 transition-transform duration-1000"><SparklesIcon className="w-24 h-24 text-[#d4af37]" /></div>
            <div className="absolute top-0 right-0 p-10 opacity-30 transform rotate-12 group-hover/cert:rotate-0 transition-transform duration-1000"><SparklesIcon className="w-24 h-24 text-[#d4af37]" /></div>
            <div className="absolute bottom-0 left-0 p-10 opacity-30 transform rotate-12 group-hover/cert:rotate-0 transition-transform duration-1000"><SparklesIcon className="w-24 h-24 text-[#d4af37]" /></div>
            <div className="absolute bottom-0 right-0 p-10 opacity-30 transform -rotate-12 group-hover/cert:rotate-0 transition-transform duration-1000"><SparklesIcon className="w-24 h-24 text-[#d4af37]" /></div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center text-center h-full justify-between gap-16 py-12">
                
                {/* Header */}
                <div className="space-y-8">
                    <div className="flex flex-col items-center">
                        <div className="bg-[#0f172a] p-6 rounded-[2rem] shadow-2xl mb-8 relative group-hover/cert:scale-110 transition-transform duration-1000 ring-4 ring-[#d4af37]/20">
                             <div className="absolute inset-0 bg-brand-blue/30 blur-2xl opacity-0 group-hover/cert:opacity-100 transition-opacity"></div>
                             <EgreedLogoIcon className="w-16 h-16 text-white relative z-10" />
                        </div>
                        <h3 className="text-[#d4af37] text-3xl font-black uppercase tracking-[0.8em] mb-3 leading-none drop-shadow-sm">Egreed Technology</h3>
                        <p className="text-[12px] font-black text-[#0f172a]/80 uppercase tracking-[0.6em] italic mb-12">Industrial Academy of Global Engineering</p>
                    </div>
                    
                    <div className="relative inline-block py-10">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                         <h1 className="text-7xl md:text-9xl font-serif text-[#0f172a] font-light italic tracking-tight uppercase leading-none px-24 scale-y-110 drop-shadow-sm">
                            Certificate
                        </h1>
                        <p className="text-[14px] font-black text-[#d4af37] uppercase tracking-[1em] mt-6">OF INDUSTRIAL MASTERY</p>
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                    </div>
                </div>

                {/* Recipient Identity Section */}
                <div className="w-full space-y-12">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.7em] mb-4">This institutional credential confirms that</p>
                    <div className="relative inline-block group/name">
                        <h2 className="text-6xl md:text-8xl font-serif font-black text-[#0f172a] tracking-tight px-24 relative z-10 mb-4 drop-shadow-sm">
                            {userName}
                        </h2>
                        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-[#d4af37]/50"></div>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-10 pt-12">
                        <p className="text-sm md:text-xl font-medium text-slate-700 leading-relaxed italic max-w-2xl mx-auto">
                            Has demonstrated unparalleled technical expertise and successfully validated all rigorous engineering benchmarks required for the mastery of the curriculum:
                        </p>
                        <div className="relative py-14 px-12 bg-[#0f172a]/5 border-y-2 border-[#0f172a]/10 overflow-hidden group/title transition-all hover:bg-[#d4af37]/5">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent -translate-x-full group-hover/title:translate-x-full transition-transform duration-[3000ms] ease-in-out"></div>
                            <h4 className="text-4xl md:text-6xl font-black text-[#0f172a] uppercase tracking-[0.02em] italic leading-tight relative z-10 drop-shadow-sm">
                                {courseTitle}
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Signature Orchestration */}
                <div className="w-full flex flex-col items-center gap-20">
                    <div className="grid grid-cols-3 w-full items-end px-12">
                        <div className="flex flex-col items-center space-y-6">
                            <div className="relative h-16 flex items-end">
                                <span className="text-4xl font-serif italic text-[#1a202c] relative z-10 px-6 opacity-90">Eli G. Reed</span>
                                <div className="absolute top-1/2 left-0 w-full h-px bg-[#0f172a]/15 -rotate-2"></div>
                            </div>
                            <div className="w-64 h-[1.5px] bg-[#0f172a]/40"></div>
                            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500">Executive Director</p>
                        </div>

                        <div className="flex justify-center relative">
                            {/* Official Seal - Ultra Refined */}
                            <div className="w-40 h-40 md:w-64 md:h-64 rounded-full border-[16px] border-[#d4af37]/10 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-[3px] border-[#d4af37]/40 border-dashed animate-[spin_100s_linear_infinite]"></div>
                                <div className="absolute inset-6 rounded-full border-[1px] border-[#d4af37]/30 animate-[spin_60s_linear_infinite_reverse]"></div>
                                
                                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[3px] border-[#d4af37] flex flex-col items-center justify-center bg-white shadow-2xl p-8 space-y-3 relative overflow-hidden group/seal">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/10 to-transparent opacity-60"></div>
                                    <EgreedLogoIcon className="w-20 h-20 text-[#0f172a] relative z-10 group-hover/seal:scale-110 transition-transform duration-700" />
                                    <span className="text-[8px] font-black text-[#0f172a]/60 uppercase tracking-[0.5em] relative z-10">VALIDATED 2025</span>
                                </div>
                                
                                <div className="absolute -bottom-8 bg-[#0f172a] text-[#d4af37] px-10 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.6em] shadow-2xl border-2 border-[#d4af37]/60 ring-8 ring-white">
                                    CERTIFIED
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center space-y-6">
                            <div className="relative h-16 flex items-end">
                                <span className="text-4xl font-serif italic text-[#1a202c] relative z-10 px-6 opacity-90">Sarah J. Miller</span>
                                <div className="absolute top-1/2 left-0 w-full h-px bg-[#0f172a]/15 rotate-2"></div>
                            </div>
                            <div className="w-64 h-[1.5px] bg-[#0f172a]/40"></div>
                            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-500">Academic Dean</p>
                        </div>
                    </div>

                    {/* Footer Partners & ID Info */}
                    <div className="w-full space-y-16">
                         <div className="flex flex-wrap justify-center items-center gap-16 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                            {partnerLogos.map(p => (
                                <div key={p.name} className="flex flex-col items-center gap-4 group">
                                    <p.logo className="w-10 h-10 text-[#0f172a] transition-all group-hover:scale-125 group-hover:text-brand-blue" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-[#0f172a]">{p.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-end border-t-2 border-[#0f172a]/10 pt-12 px-10">
                            <div className="text-left space-y-4">
                                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-4">
                                    <ShieldIcon className="w-4 h-4 text-[#d4af37]" />
                                    Institutional Issue Date: <span className="text-[#0f172a] font-black">{issueDate}</span>
                                </p>
                                <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-4">
                                    <CheckCircleIcon className="w-4 h-4 text-brand-blue" />
                                    Egreed Network Hash: <span className="text-[#0f172a] font-mono tracking-tighter">{verificationHash}</span>
                                </p>
                            </div>

                            {/* Verification Hub QR Mock */}
                            <div className="flex items-center gap-10 bg-white border-2 border-slate-100 p-6 rounded-[2.5rem] shadow-2xl hover:shadow-brand-blue/10 transition-all group/qr">
                                <div className="w-24 h-24 bg-white p-1 relative overflow-hidden ring-1 ring-slate-100 rounded-xl">
                                    <svg viewBox="0 0 100 100" fill="#0f172a" className="w-full h-full group-hover/qr:scale-95 transition-transform duration-500">
                                        <path d="M0 0h35v12H12v23H0V0zm65 0h35v35h-12V12H65V0zM0 65h12v23h23v12H0V65zm100 0v35H65v-12h23V65h12zM28 28h22v22H28V28zm25 0h22v22H53V28zm0 25h22v22H53V53zm-25 0h22v22H28V53z" />
                                    </svg>
                                </div>
                                <div className="text-right border-l-2 border-slate-100 pl-10">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-3">Global Institutional Validator</p>
                                    <p className="text-[14px] font-black text-[#0f172a] uppercase tracking-tighter hover:text-brand-blue cursor-pointer transition-colors flex items-center gap-3 justify-end">
                                        VERIFY.EGREED.RW
                                        <AwardIcon className="w-4 h-4" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 pb-20 px-4 no-print">
            <button 
                onClick={handlePrint}
                className="w-full sm:w-auto px-20 py-8 bg-white text-brand-darker font-black rounded-3xl hover:bg-slate-100 shadow-[0_30px_70px_rgba(0,0,0,0.6)] transition-all uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-6 group active:scale-95"
            >
                <AwardIcon className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                Initialize High-Resolution Export
            </button>
            <button 
                onClick={onClose}
                className="w-full sm:w-auto px-16 py-8 bg-white/5 text-white font-black rounded-3xl hover:bg-white/10 transition-all uppercase tracking-[0.3em] text-xs border border-white/10"
            >
                Return to Engineering Dashboard
            </button>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
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
            #root { display: none !important; }
            .no-print { display: none !important; }
            #printable-certificate {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                padding: 10mm !important;
                border: 15mm solid #0f172a !important;
                background-color: #fdfcf9 !important;
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
