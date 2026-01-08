
import React, { useState } from 'react';
import { User } from '../types';
import { 
  RwandaFlagIcon, 
  CheckCircleIcon, 
  BrainIcon, 
  SparklesIcon, 
  ShieldIcon, 
  ArrowRightIcon, 
  LoaderIcon 
} from './Icons';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

type OnboardingStep = 1 | 2 | 3;

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<OnboardingStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    country: 'Rwanda',
    language: 'English',
    educationLevel: 'Undergraduate',
    interests: [] as string[],
    careerGoal: ''
  });

  const interests = ['AI Engineering', 'Full Stack Web', 'Cloud Infrastructure', 'Cyber Security', 'Data Science', 'Mobile Dev', 'UI/UX Design', 'Digital Marketing'];

  const handleToggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => setStep(prev => (prev + 1) as OnboardingStep);
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulation of profile data commit
    setTimeout(() => {
      const savedUser = JSON.parse(localStorage.getItem('egreed_user') || '{}');
      const updatedUser: User = {
        ...savedUser,
        fullName: formData.fullName || savedUser.fullName,
        country: formData.country,
        language: formData.language,
        educationLevel: formData.educationLevel,
        goals: formData.interests,
        experienceLevel: 'New Initiate', // Default for onboarding
        role: savedUser.role || 'learner'
      };
      onComplete(updatedUser);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative ring-1 ring-white/5">
        
        {/* Progress Bar */}
        <div className="flex h-1.5 w-full bg-slate-950">
           <div className={`h-full bg-brand-blue transition-all duration-700 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>

        <div className="p-10 md:p-16 flex flex-col items-center">
            <header className="text-center mb-12 space-y-4">
                <div className="p-4 bg-brand-blue/10 rounded-2xl w-fit mx-auto border border-brand-blue/20">
                    <BrainIcon className="w-8 h-8 text-brand-blue" />
                </div>
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
                    Profile <span className="text-brand-light-blue">Calibration</span>
                </h1>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Step {step} of 3: Personalized Sync</p>
            </header>

            {step === 1 && (
                <div className="w-full space-y-8 animate-slide-up">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Confirmation</label>
                            <input 
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={e => setFormData({...formData, fullName: e.target.value})}
                                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-bold"
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Operational Region</label>
                                <div className="relative group">
                                    <select 
                                        value={formData.country}
                                        onChange={e => setFormData({...formData, country: e.target.value})}
                                        className="appearance-none w-full bg-slate-950 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-white focus:ring-2 focus:ring-brand-blue outline-none cursor-pointer font-bold"
                                    >
                                        <option value="Rwanda">Rwanda</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="Tanzania">Tanzania</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="Global">Outside EA</option>
                                    </select>
                                    <RwandaFlagIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Native Protocol</label>
                                <select 
                                    value={formData.language}
                                    onChange={e => setFormData({...formData, language: e.target.value})}
                                    className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none cursor-pointer font-bold"
                                >
                                    <option value="English">English</option>
                                    <option value="Kinyarwanda">Kinyarwanda</option>
                                    <option value="French">French</option>
                                    <option value="Swahili">Swahili</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={handleNext}
                        disabled={!formData.fullName}
                        className="w-full py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-xs shadow-2xl shadow-brand-blue/30 flex items-center justify-center gap-4 active:scale-95 disabled:opacity-30"
                    >
                        Initialize Parameters <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="w-full space-y-10 animate-slide-up">
                    <div className="space-y-6 text-center">
                        <h3 className="text-xl font-bold text-white uppercase italic tracking-widest">Select Your Specializations</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {interests.map(i => (
                                <button
                                    key={i}
                                    onClick={() => handleToggleInterest(i)}
                                    className={`p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-3 ${
                                        formData.interests.includes(i)
                                        ? 'bg-brand-blue/20 border-brand-blue text-brand-blue shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                        : 'bg-slate-950 border-white/5 text-slate-500 hover:border-white/20'
                                    }`}
                                >
                                    {formData.interests.includes(i) && <SparklesIcon className="w-3 h-3" />}
                                    {i}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setStep(1)} className="flex-grow py-6 bg-white/5 text-slate-500 font-black rounded-2xl hover:text-white transition-all uppercase tracking-widest text-[10px]">Back</button>
                        <button 
                            onClick={handleNext}
                            disabled={formData.interests.length === 0}
                            className="flex-[2] py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-xs shadow-2xl shadow-brand-blue/30 disabled:opacity-30"
                        >
                            Sync Objectives
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="w-full space-y-10 animate-slide-up">
                    <div className="space-y-8">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Academic Level</label>
                            <div className="grid grid-cols-1 gap-2">
                                {['High School', 'Undergraduate', 'Post-Graduate', 'Self-Taught'].map(lvl => (
                                    <button 
                                        key={lvl}
                                        onClick={() => setFormData({...formData, educationLevel: lvl})}
                                        className={`w-full text-left px-8 py-4 rounded-xl border transition-all text-xs font-bold uppercase ${
                                            formData.educationLevel === lvl 
                                            ? 'bg-brand-blue/10 border-brand-blue text-white' 
                                            : 'bg-slate-950 border-white/5 text-slate-600 hover:border-white/20'
                                        }`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-brand-blue/5 border border-brand-blue/20 rounded-3xl flex items-start gap-5">
                            <ShieldIcon className="w-10 h-10 text-brand-blue shrink-0 mt-1" />
                            <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                                "By finalizing this profile, you are entering Rwanda's premier AI-native engineering ecosystem. Your credentials will be locally issued and globally verifiable."
                            </p>
                        </div>
                    </div>

                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full py-7 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-[13px] shadow-2xl shadow-brand-blue/40 flex items-center justify-center gap-4 active:scale-95"
                    >
                        {isSubmitting ? (
                            <>
                                <LoaderIcon className="w-6 h-6 animate-spin" />
                                Synchronizing Neural Link...
                            </>
                        ) : (
                            <>
                                Complete Profile Setup
                                <CheckCircleIcon className="w-6 h-6" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
