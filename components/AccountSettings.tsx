
import React, { useState } from 'react';
import { User } from '../types';
import { UserIcon, ShieldIcon, CheckCircleIcon, SparklesIcon, TrashIcon, ArrowLeftIcon, LoaderIcon, BrainIcon, LockIcon } from './Icons';

interface AccountSettingsProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onReturn: () => void;
  onLogout: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ user, onUpdate, onReturn, onLogout }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    goals: user.goals || [],
    experienceLevel: user.experienceLevel || 'Practitioner'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate database update
    setTimeout(() => {
      const updatedUser = { ...user, ...formData };
      onUpdate(updatedUser);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
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
    <div className="animate-fade-in max-w-5xl mx-auto pb-32 pt-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20 px-4">
          <div className="space-y-4">
            <h2 className="text-6xl font-black text-white uppercase italic leading-none tracking-tighter">Neural <span className="text-brand-light-blue">Profile</span></h2>
            <div className="flex items-center gap-4">
                <span className="h-[2px] w-16 bg-brand-blue"></span>
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Credential & Identity Configuration Hub</p>
            </div>
          </div>
          <button onClick={onReturn} className="w-fit px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all font-black uppercase text-[10px] tracking-widest flex items-center gap-3 group active:scale-95 shadow-xl">
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              With Egreed technology BY EGREEDLEARNING PLATFORM Dashboard
          </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Sidebar Status Card */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-12 flex flex-col items-center text-center shadow-2xl relative overflow-hidden ring-1 ring-white/5">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"></div>
                <div className="w-32 h-32 bg-brand-blue/10 rounded-[2.5rem] flex items-center justify-center text-brand-blue mb-8 border border-brand-blue/20 shadow-inner group cursor-pointer">
                    <UserIcon className="w-16 h-16 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-3xl font-black text-white italic tracking-tighter mb-2">{user.fullName}</h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Active Since {new Date(user.joinedAt).getFullYear()}</p>
                
                <div className="w-full pt-8 border-t border-white/5 space-y-6">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-600">Verification Score</span>
                        <span className="text-brand-light-blue">Level 4 Tier</span>
                    </div>
                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                        <div className="w-3/4 h-full bg-brand-blue shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 border border-white/5 rounded-[2.5rem] p-10 space-y-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                    <LockIcon className="w-4 h-4 text-slate-600" />
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Security Management</h4>
                </div>
                <div className="flex items-center justify-between p-5 bg-slate-950 border border-white/5 rounded-2xl hover:border-brand-blue/30 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <ShieldIcon className="w-5 h-5 text-brand-blue" />
                        <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">Neural Key Sync</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></div>
                </div>
                {/* Fix: changed handleLogout to onLogout */}
                <button onClick={onLogout} className="w-full flex items-center justify-center gap-4 p-5 bg-red-500/5 rounded-2xl border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all text-[10px] font-black uppercase tracking-[0.2em]">
                    <TrashIcon className="w-4 h-4" />
                    Terminate Local Link
                </button>
            </div>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-8 space-y-8">
            <div className="bg-slate-900 border border-white/10 rounded-[3.5rem] p-10 lg:p-16 space-y-16 shadow-2xl ring-1 ring-white/5">
                
                {/* Identity Parameters */}
                <div className="space-y-10">
                    <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                             <SparklesIcon className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-black text-white uppercase italic tracking-widest">Identity Configuration</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Legal Full Name</label>
                            <input 
                                value={formData.fullName}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Verified Contact</label>
                            <input 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-8 text-white focus:ring-2 focus:ring-brand-blue outline-none transition-all placeholder:text-slate-800 font-bold"
                            />
                        </div>
                    </div>
                </div>

                {/* Neural Mapping */}
                <div className="space-y-10">
                    <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                             <BrainIcon className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-black text-white uppercase italic tracking-widest">Neural Calibration</h4>
                    </div>
                    <div className="space-y-6">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Active Engineering Tracks</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {['AI Engineering', 'Cloud Arch', 'Cyber Security', 'UI/UX Design', 'Data Science', 'System Design'].map(goal => (
                                <button
                                    key={goal}
                                    onClick={() => toggleGoal(goal)}
                                    className={`p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all text-center ${
                                        formData.goals.includes(goal) 
                                        ? 'bg-brand-blue/20 border-brand-blue text-brand-blue shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                                        : 'bg-slate-950 border-white/5 text-slate-600 hover:border-white/20'
                                    }`}
                                >
                                    {goal}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6 pt-6">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-2">Experience Protocol</label>
                        <div className="flex flex-wrap gap-4">
                            {['New Initiate', 'Practitioner', 'Senior Lead', 'System Architect'].map(lvl => (
                                <button
                                    key={lvl}
                                    onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                                    className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                                        formData.experienceLevel === lvl 
                                        ? 'bg-brand-blue/20 border-brand-blue text-brand-blue' 
                                        : 'bg-slate-950 border-white/5 text-slate-600 hover:border-white/20'
                                    }`}
                                >
                                    {lvl}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit Section */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        {saveSuccess && (
                            <div className="flex items-center gap-3 text-brand-blue animate-fade-in bg-brand-blue/10 px-6 py-3 rounded-xl border border-brand-blue/20">
                                <CheckCircleIcon className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronization Complete</span>
                            </div>
                        )}
                        {!saveSuccess && (
                             <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest max-w-[200px]">Update parameters to recalibrate your personalized curriculum hub.</p>
                        )}
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full md:w-fit px-16 py-6 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue hover:scale-[1.02] transition-all uppercase tracking-[0.3em] text-[11px] shadow-2xl shadow-brand-blue/20 flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                    >
                        {isSaving ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <ShieldIcon className="w-5 h-5" />}
                        Save System Parameters
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
