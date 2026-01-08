
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

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate Authentication
    setTimeout(() => {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        fullName: 'Verified RW Engineer',
        joinedAt: new Date().toISOString()
      };
      setIsLoading(false);
      onSuccess(mockUser);
    }, 1500);
  };

  const handleSocialAuth = (platform: 'google' | 'facebook') => {
    setIsLoading(true);
    setTimeout(() => {
      const mockUser: User = {
        id: `${platform}-` + Math.random().toString(36).substr(2, 5),
        email: platform === 'google' ? 'user@gmail.com' : 'user@facebook.com',
        fullName: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Authenticated User`,
        joinedAt: new Date().toISOString(),
        goals: ['AI Engineering'],
        experienceLevel: 'Practitioner'
      };
      setIsLoading(false);
      onSuccess(mockUser);
    }, 1800);
  };

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate sending 6-digit code to email
    setTimeout(() => {
      setIsLoading(false);
      setShowCodeSent(true);
      setStep('verification');
      // Hide the "Code Sent" toast after a few seconds
      setTimeout(() => setShowCodeSent(false), 5000);
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) return;
    setIsLoading(true);
    // Simulate verification success
    setTimeout(() => {
      setIsLoading(false);
      setStep('goals');
    }, 800);
  };

  const handleFinalize = () => {
    if (!acceptedTerms) return;
    setIsLoading(true);
    setTimeout(() => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        fullName: formData.fullName,
        joinedAt: new Date().toISOString(),
        goals: formData.goals,
        experienceLevel: formData.experience
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

  return (
    <div className="fixed inset-0 bg-brand-darker/95 backdrop-blur-3xl flex items-center justify-center z-[250] p-4 animate-fade-in">
      <div className="bg-slate-900/80 border border-white/10 w-full max-w-md rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden relative ring-1 ring-white/5">
        
        {/* Animated Code Sent Notification */}
        {showCodeSent && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="bg-brand-blue text-brand-darker px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 shadow-2xl">
              <CheckCircleIcon className="w-4 h-4" />
              Access Code Dispatched to {formData.email}
            </div>
          </div>
        )}

        <button onClick={onClose} className="absolute top-8 right-8 p-2.5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all z-20 group">
          <XIcon className="w-5 h-5 text-slate-500 group-hover:rotate-90 transition-transform" />
        </button>
        
        <header className="p-10 pb-4 flex flex-col items-center text-center">
          <div className="p-4 bg-brand-blue/10 rounded-[1.5rem] mb-6 border border-brand-blue/20">
            <EgreedLogoIcon className="w-10 h-10 text-brand-blue" />
          </div>
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
            {mode === 'signin' ? 'Authorization' : step === 'identity' ? 'Platform Entry' : step === 'verification' ? 'Email Verify' : 'Neural Profile'}
          </h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            {mode === 'signin' ? 'RW Protocol v4.2' : 'Institutional Registration'}
          </p>
        </header>

        {step === 'identity' && (
          <div className="px-10 mt-4">
            <div className="bg-slate-950 p-1.5 rounded-2xl flex gap-1 border border-white/5">
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

        <div className="p-10 pt-6">
          {(mode === 'signin' || (mode === 'signup' && step === 'identity')) && (
            <div className="space-y-4 animate-fade-in mb-8">
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => handleSocialAuth('google')}
                  disabled={isLoading}
                  className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 shadow-xl shadow-white/5 disabled:opacity-50"
                >
                  <GoogleIcon className="w-5 h-5" />
                  {mode === 'signin' ? 'Authorize with Google' : 'Auto-Join with Google'}
                </button>
                <button 
                  onClick={() => handleSocialAuth('facebook')}
                  disabled={isLoading}
                  className="w-full py-4 bg-[#1877F2] text-white font-black rounded-2xl hover:bg-[#166fe5] transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 shadow-xl shadow-blue-500/10 disabled:opacity-50"
                >
                  <FacebookIcon className="w-5 h-5 fill-current" />
                  {mode === 'signin' ? 'Authorize with Facebook' : 'Auto-Join with Facebook'}
                </button>
              </div>
              
              <div className="relative flex items-center gap-4 text-slate-600 py-2">
                <div className="flex-grow h-px bg-white/5"></div>
                <span className="text-[9px] font-black uppercase">OR SECURE CREDENTIALS</span>
                <div className="flex-grow h-px bg-white/5"></div>
              </div>
            </div>
          )}

          {mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
                <input
                  required
                  type="email"
                  placeholder="name@egreed.rw"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4.5 px-6 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4.5 px-6 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-medium"
                />
              </div>
              <button
                disabled={isLoading}
                className="w-full py-5 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-brand-blue/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <CheckCircleIcon className="w-5 h-5" />}
                Open Session
              </button>
            </form>
          ) : (
            <div className="animate-fade-in">
              {step === 'identity' && (
                <form onSubmit={handleIdentitySubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Legal Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jean Pierre"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4.5 px-6 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
                    <input
                      required
                      type="email"
                      placeholder="jean@egreed.rw"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4.5 px-6 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Define Access Key</label>
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4.5 px-6 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-5 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 mt-4 shadow-xl shadow-brand-blue/10"
                  >
                    {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : 'Request Validation Code'}
                  </button>
                </form>
              )}

              {step === 'verification' && (
                <form onSubmit={handleVerifyCode} className="space-y-8 animate-slide-up">
                  <div className="text-center">
                    <h3 className="text-sm font-black text-white uppercase italic tracking-tighter mb-1">Neural Handshake</h3>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                      Confirming secure link to <span className="text-brand-light-blue">{formData.email}</span>. <br />
                      Input the 6-digit access code below:
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-6">
                    <input
                      required
                      type="text"
                      maxLength={6}
                      autoFocus
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      className="w-52 bg-slate-950 border border-white/10 rounded-2xl py-5 text-center text-3xl font-black tracking-[0.4em] text-brand-blue focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-900"
                      placeholder="••••••"
                    />
                    <div className="bg-brand-blue/5 border border-brand-blue/10 p-4 rounded-2xl">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center italic">
                        Demo Hack: Use access code <span className="text-brand-blue">123456</span> to proceed.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={verificationCode.length !== 6 || isLoading}
                      className="w-full py-5 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.2em] text-xs disabled:opacity-50"
                    >
                      {isLoading ? <LoaderIcon className="w-5 h-5 animate-spin" /> : 'Confirm Identity'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setStep('identity')}
                      className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest text-center"
                    >
                      Incorrect email? Back to entry.
                    </button>
                  </div>
                </form>
              )}

              {step === 'goals' && (
                <div className="space-y-8 animate-slide-up">
                  <div className="text-center">
                    <h3 className="text-sm font-black text-white uppercase italic tracking-tighter mb-1">Calibration</h3>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Select your engineering objectives</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['AI Engineering', 'Cloud Arch', 'Cyber Security', 'UI/UX Design', 'Data Science', 'System Design'].map(goal => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`p-4 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all text-center ${
                          formData.goals.includes(goal) 
                            ? 'bg-brand-blue/20 border-brand-blue text-brand-blue shadow-lg' 
                            : 'bg-slate-950/50 border-white/5 text-slate-500 hover:border-white/20'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep('experience')}
                    disabled={formData.goals.length === 0}
                    className="w-full py-5 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Set Trajectory
                  </button>
                </div>
              )}

              {step === 'experience' && (
                <div className="space-y-8 animate-slide-up">
                  <div className="text-center">
                    <h3 className="text-sm font-black text-white uppercase italic tracking-tighter mb-1">Neural Depth</h3>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Identify starting technical level</p>
                  </div>
                  <div className="space-y-3">
                    {['New Initiate', 'Practitioner', 'Senior Lead', 'System Architect'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setFormData({ ...formData, experience: lvl })}
                        className={`w-full p-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border transition-all text-left flex items-center justify-between ${
                          formData.experience === lvl 
                            ? 'bg-brand-blue/20 border-brand-blue text-brand-blue shadow-lg' 
                            : 'bg-slate-950/50 border-white/5 text-slate-500 hover:border-white/20'
                        }`}
                      >
                        {lvl}
                        {formData.experience === lvl && <CheckCircleIcon className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep('terms')}
                    disabled={!formData.experience}
                    className="w-full py-5 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.2em] text-xs"
                  >
                    Initialize Hub
                  </button>
                </div>
              )}

              {step === 'terms' && (
                <div className="space-y-8 animate-slide-up">
                  <div className="text-center">
                    <h3 className="text-sm font-black text-white uppercase italic tracking-tighter mb-1">Protocol Acceptance</h3>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Final Egreed Technology Compliance</p>
                  </div>
                  <div className="bg-slate-950/80 p-6 rounded-3xl border border-white/5 space-y-4">
                    <div className="flex items-start gap-4 text-slate-400">
                      <ShieldIcon className="w-6 h-6 shrink-0 text-brand-blue mt-1" />
                      <div className="text-[11px] leading-relaxed">
                        I acknowledge the <span className="text-brand-light-blue font-black underline cursor-pointer">RW Engineering Code</span> and agree to valid data collection for certification.
                      </div>
                    </div>
                    <label className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors border border-white/5">
                      <input 
                        type="checkbox" 
                        checked={acceptedTerms} 
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-5 h-5 rounded-lg accent-brand-blue bg-slate-800 border-white/10"
                      />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Accept Egreed Technology Terms</span>
                    </label>
                  </div>
                  <button
                    onClick={handleFinalize}
                    disabled={!acceptedTerms || isLoading}
                    className="w-full py-5 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.2em] text-xs disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isLoading ? <LoaderIcon className="w-4 h-4 animate-spin" /> : <SparklesIcon className="w-4 h-4" />}
                    Activate Account
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-8 border-t border-white/5 bg-slate-950/40 text-center">
          <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em]">Egreed Technology • Academic Integrity Protocol</p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
