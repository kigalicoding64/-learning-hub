
import React, { useState } from 'react';
import { XIcon, EgreedLogoIcon, UserIcon, LockIcon, LoaderIcon, CheckCircleIcon, BrainIcon, SparklesIcon, ArrowLeftIcon, ShieldIcon, GoogleIcon, FacebookIcon } from './Icons';
import { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

type AuthMode = 'signin' | 'signup';
type OnboardingStep = 'identity' | 'verification' | 'goals' | 'experience' | 'terms';

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [step, setStep] = useState<OnboardingStep>('identity');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showCodeSent, setShowCodeSent] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    goals: [] as string[],
    experience: ''
  });

  const steps: OnboardingStep[] = ['identity', 'verification', 'goals', 'experience', 'terms'];
  const currentStepIndex = steps.indexOf(step);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Authentication Protocol
    setTimeout(() => {
      /* Fix: Added role property to mock user */
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        fullName: 'Verified RW Engineer',
        joinedAt: new Date().toISOString(),
        role: 'learner'
      };
      setIsLoading(false);
      onSuccess(mockUser);
    }, 1500);
  };

  const handleSocialAuth = (platform: 'google' | 'facebook') => {
    setIsLoading(true);
    setTimeout(() => {
      /* Fix: Added role property to mock user */
      const mockUser: User = {
        id: `${platform}-` + Math.random().toString(36).substr(2, 5),
        email: platform === 'google' ? 'user@gmail.com' : 'user@facebook.com',
        fullName: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Verified`,
        joinedAt: new Date().toISOString(),
        goals: ['AI Engineering'],
        experienceLevel: 'Practitioner',
        role: 'learner'
      };
      setIsLoading(false);
      onSuccess(mockUser);
    }, 1800);
  };

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowCodeSent(true);
      setStep('verification');
      setTimeout(() => setShowCodeSent(false), 5000);
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('goals');
    }, 800);
  };

  const handleFinalize = () => {
    if (!acceptedTerms) return;
    setIsLoading(true);
    setTimeout(() => {
      /* Fix: Added role property to new user */
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        fullName: formData.fullName,
        joinedAt: new Date().toISOString(),
        goals: formData.goals,
        experienceLevel: formData.experience,
        role: 'learner'
      };
      setIsLoading(false);
      onSuccess(newUser);
    }, 1200);
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal) 
        : [...prev.goals, goal]
    }));
  };

  const renderStepIndicator = () => {
    if (mode === 'signin') return null;
    return (
      <div className="px-10 mb-8">
        <div className="flex justify-between items-center mb-3">
           <span className="text-[9px] font-black text-brand-blue uppercase tracking-[0.3em]">Neural Sync Progress</span>
           <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Step {currentStepIndex + 1} of {steps.length}</span>
        </div>
        <div className="flex gap-2">
            {steps.map((_, idx) => (
                <div 
                    key={idx} 
                    className={`h-1 flex-grow rounded-full transition-all duration-700 ${
                        idx <= currentStepIndex 
                        ? 'bg-brand-blue shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                        : 'bg-white/5'
                    }`}
                />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-brand-darker/98 backdrop-blur-[40px] flex items-center justify-center z-[250] p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,1)] overflow-hidden relative ring-1 ring-white/5">
        
        {/* Verification Success Toast */}
        {showCodeSent && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-brand-blue text-brand-darker px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-2xl border border-white/20">
              <CheckCircleIcon className="w-4 h-4" />
              Validation Code Dispatched
            </div>
          </div>
        )}

        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-all z-20 group">
          <XIcon className="w-5 h-5 text-slate-500 group-hover:rotate-90 transition-transform" />
        </button>
        
        <header className="p-10 pb-6 flex flex-col items-center text-center">
          <div className="p-5 bg-brand-blue/10 rounded-[1.75rem] mb-6 border border-brand-blue/20 shadow-inner group">
            <EgreedLogoIcon className="w-10 h-10 text-brand-blue group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-1 leading-none">
            {mode === 'signin' ? 'Authorization' : 'Create Profile'}
          </h2>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
            {mode === 'signin' ? 'Accessing Neural Network' : 'Institutional Onboarding'}
          </p>
        </header>

        {renderStepIndicator()}

        {step === 'identity' && (
          <div className="px-10 mt-2 mb-6">
            <div className="bg-slate-950/50 p-1.5 rounded-2xl flex gap-1 border border-white/5">
              <button 
                onClick={() => setMode('signin')}
                className={`flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'signin' ? 'bg-brand-blue text-brand-darker shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setMode('signup')}
                className={`flex-grow py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'signup' ? 'bg-brand-blue text-brand-darker shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        <div className="p-10 pt-2 pb-12">
          {step === 'identity' && (
            <div className="space-y-4 animate-fade-in mb-10">
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => handleSocialAuth('google')}
                  disabled={isLoading}
                  className="w-full py-4.5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 shadow-xl disabled:opacity-50"
                >
                  <GoogleIcon className="w-5 h-5" />
                  {mode === 'signin' ? 'Authorize via Google' : 'Auto-Join via Google'}
                </button>
              </div>
              
              <div className="relative flex items-center gap-4 text-slate-700 py-3">
                <div className="flex-grow h-px bg-white/5"></div>
                <span className="text-[8px] font-black uppercase tracking-tighter">OR SECURE CREDENTIALS</span>
                <div className="flex-grow h-px bg-white/5"></div>
              </div>
            </div>
          )}

          {mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Engineering Email</label>
                <input
                  required
                  type="email"
                  placeholder="name@egreed.rw"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Access Key</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-bold"
                />
              </div>
              <button
                disabled={isLoading}
                className="w-full py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-xs shadow-2xl shadow-brand-blue/30 flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50 mt-4"
              >
                {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <ShieldIcon className="w-5 h-5" />}
                Initialize Hub Session
              </button>
            </form>
          ) : (
            <div className="animate-fade-in min-h-[300px] flex flex-col">
              {step === 'identity' && (
                <form onSubmit={handleIdentitySubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Identity Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jean Pierre Karasira"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Institutional Email</label>
                    <input
                      required
                      type="email"
                      placeholder="jean@egreed.tech"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Secure Access Key</label>
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-bold"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 mt-6 shadow-xl shadow-brand-blue/10"
                  >
                    {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : 'Begin Neural Sync'}
                  </button>
                </form>
              )}

              {step === 'verification' && (
                <form onSubmit={handleVerifyCode} className="space-y-10 animate-slide-up flex flex-col justify-center flex-grow">
                  <div className="text-center">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Acoustic Verification</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                      Handshake protocol sent to <br />
                      <span className="text-brand-light-blue font-black">{formData.email}</span>.
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-8">
                    <input
                      required
                      type="text"
                      maxLength={6}
                      autoFocus
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full max-w-[240px] bg-slate-950 border border-white/10 rounded-3xl py-6 text-center text-4xl font-black tracking-[0.4em] text-brand-blue focus:ring-4 focus:ring-brand-blue/20 outline-none transition-all placeholder:text-slate-900"
                      placeholder="••••••"
                    />
                    <div className="bg-brand-blue/5 border border-brand-blue/10 p-5 rounded-3xl max-w-[280px]">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center italic leading-relaxed">
                        Academic Simulation Mode: <br />Enter <span className="text-brand-blue">123456</span> to bypass.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={verificationCode.length !== 6 || isLoading}
                      className="w-full py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-xs disabled:opacity-50"
                    >
                      {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : 'Confirm Digital Identity'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep('identity')}
                      className="text-[9px] font-black text-slate-600 hover:text-white uppercase tracking-[0.4em] text-center"
                    >
                      Back to Identity Gate
                    </button>
                  </div>
                </form>
              )}

              {step === 'goals' && (
                <div className="space-y-10 animate-slide-up flex flex-col justify-center flex-grow">
                  <div className="text-center">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Calibration</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select primary engineering objectives</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['AI Architect', 'Cloud Eng', 'Cyber Sec', 'UX Design', 'Data Sci', 'Sys Design'].map(goal => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`p-5 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all text-center flex items-center justify-center gap-2 ${
                          formData.goals.includes(goal) 
                            ? 'bg-brand-blue/20 border-brand-blue text-brand-blue shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                            : 'bg-slate-950/50 border-white/5 text-slate-600 hover:border-white/20'
                        }`}
                      >
                        {formData.goals.includes(goal) && <SparklesIcon className="w-3 h-3" />}
                        {goal}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep('experience')}
                    disabled={formData.goals.length === 0}
                    className="w-full py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-xs"
                  >
                    Commit Trajectory
                  </button>
                </div>
              )}

              {step === 'experience' && (
                <div className="space-y-10 animate-slide-up flex flex-col justify-center flex-grow">
                  <div className="text-center">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Neural Tiering</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identify current technical baseline</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { l: 'New Initiate', d: 'Starting technical journey' },
                      { l: 'Practitioner', d: 'Active project implementation' },
                      { l: 'Senior Lead', d: 'Architectural oversight' },
                      { l: 'System Architect', d: 'Enterprise ecosystem design' }
                    ].map(lvl => (
                      <button
                        key={lvl.l}
                        onClick={() => setFormData({ ...formData, experience: lvl.l })}
                        className={`w-full p-6 rounded-3xl text-left border transition-all flex items-center justify-between group ${
                          formData.experience === lvl.l 
                            ? 'bg-brand-blue/20 border-brand-blue text-brand-blue shadow-lg' 
                            : 'bg-slate-950/50 border-white/5 text-slate-600 hover:border-white/20'
                        }`}
                      >
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest mb-1">{lvl.l}</span>
                            <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tighter group-hover:text-slate-500">{lvl.d}</span>
                        </div>
                        {formData.experience === lvl.l && <CheckCircleIcon className="w-5 h-5" />}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep('terms')}
                    disabled={!formData.experience}
                    className="w-full py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-xs"
                  >
                    Initialize Environment
                  </button>
                </div>
              )}

              {step === 'terms' && (
                <div className="space-y-10 animate-slide-up flex flex-col justify-center flex-grow">
                  <div className="text-center">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Protocol Finalization</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Compliance & Network Entry</p>
                  </div>
                  <div className="bg-slate-950 p-8 rounded-[2.5rem] border border-white/10 space-y-6">
                    <div className="flex items-start gap-5 text-slate-400">
                      <ShieldIcon className="w-8 h-8 shrink-0 text-brand-blue mt-1" />
                      <div className="text-[10px] leading-relaxed font-medium">
                        By activating this profile, you adhere to the <span className="text-brand-light-blue font-black underline cursor-pointer">Egreed Technology Standards of Excellence</span> and allow valid performance telemetry for industrial certification.
                      </div>
                    </div>
                    <label className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors border border-white/10 group">
                      <input 
                        type="checkbox" 
                        checked={acceptedTerms} 
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-6 h-6 rounded-lg accent-brand-blue bg-slate-800 border-white/10"
                      />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-brand-light-blue transition-colors">I accept all protocols</span>
                    </label>
                  </div>
                  <button
                    onClick={handleFinalize}
                    disabled={!acceptedTerms || isLoading}
                    className="w-full py-7 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.3em] text-xs disabled:opacity-50 flex items-center justify-center gap-4 shadow-2xl shadow-brand-blue/40"
                  >
                    {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <BrainIcon className="w-5 h-5" />}
                    Complete Neural Link
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-10 border-t border-white/5 bg-slate-950/40 text-center flex flex-col gap-2">
          <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.6em]">Academic Integrity Protocol v4.2</p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
