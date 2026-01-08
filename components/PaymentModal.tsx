
import React, { useState } from 'react';
import { Course } from '../types';
import { XIcon, CreditCardIcon, LockIcon, LoaderIcon, PayPalIcon, AppleIcon, GoogleIcon, CheckCircleIcon, MTNIcon, AirtelIcon, ArrowLeftIcon, RwandaFlagIcon } from './Icons';

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  onConfirm: (course: Course) => void;
}

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google' | 'mtn' | 'airtel';

const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose, onConfirm }) => {
  const [method, setMethod] = useState<PaymentMethod>('mtn'); // Default to MoMo for local context
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'selection' | 'details' | 'success'>('selection');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      setTimeout(() => onConfirm(course), 1500);
    }, 2500);
  };

  const renderPaymentContent = () => {
    if (step === 'success') {
      return (
        <div className="p-12 text-center flex flex-col items-center gap-6 animate-fade-in">
          <div className="w-20 h-20 bg-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <CheckCircleIcon className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Payment Confirmed</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Opening Course Module {course.id.split('-')[0]}...</p>
          </div>
        </div>
      );
    }

    if (step === 'details') {
      return (
        <form onSubmit={handlePayment} className="animate-fade-in p-10 space-y-8">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setStep('selection')} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeftIcon className="w-3 h-3" />
              Change Method
            </button>
            <div className="flex items-center gap-2">
                <LockIcon className="w-3 h-3 text-brand-blue" />
                <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest">Secure TLS 1.3</span>
            </div>
          </div>

          {(method === 'mtn' || method === 'airtel') ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-5 bg-white/5 rounded-3xl border border-white/10">
                 {method === 'mtn' ? <MTNIcon className="w-12 h-12" /> : <AirtelIcon className="w-12 h-12" />}
                 <div>
                    <p className="text-sm font-black text-white uppercase tracking-widest">{method === 'mtn' ? 'MTN MoMo' : 'Airtel Money'}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">Rwanda Local Gateway</p>
                 </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-black text-sm">+250</div>
                  <input 
                    required 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="78X XXX XXX" 
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-white focus:ring-2 focus:ring-brand-blue outline-none placeholder:text-slate-800 font-bold text-lg" 
                  />
                </div>
                <p className="text-[9px] text-slate-400 text-center italic tracking-widest">A PIN prompt will be sent to your phone for confirmation.</p>
              </div>
            </div>
          ) : method === 'card' ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Card Number</label>
                <input required type="text" placeholder="**** **** **** 4242" className="w-full bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-white focus:ring-2 focus:ring-brand-blue outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="MM / YY" className="bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-white focus:ring-2 focus:ring-brand-blue outline-none" />
                <input required type="text" placeholder="CVC" className="bg-slate-950 border border-white/10 rounded-2xl py-5 px-6 text-white focus:ring-2 focus:ring-brand-blue outline-none" />
              </div>
            </div>
          ) : (
            <div className="p-10 bg-slate-950/50 rounded-3xl border border-white/5 text-center flex flex-col items-center gap-4">
                {method === 'paypal' && <PayPalIcon className="w-12 h-12 text-[#003087]" />}
                {method === 'apple' && <AppleIcon className="w-12 h-12 text-white" />}
                {method === 'google' && <GoogleIcon className="w-12 h-12" />}
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Auth Gateway</p>
            </div>
          )}

          <button
            disabled={isProcessing || (['mtn', 'airtel'].includes(method) && phoneNumber.length < 9)}
            className="w-full py-5 bg-brand-blue text-brand-darker font-black rounded-2xl hover:bg-brand-light-blue transition-all uppercase tracking-[0.2em] text-xs shadow-2xl shadow-brand-blue/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <CheckCircleIcon className="w-5 h-5" />}
            Confirm Payment ${course.price.toFixed(2)}
          </button>
        </form>
      );
    }

    return (
      <div className="p-10 pt-4 space-y-4 animate-fade-in max-h-[60vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-center gap-2 mb-6">
            <RwandaFlagIcon className="w-4 h-4 shadow-sm" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Recommended Local Methods</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
           {[
             { id: 'mtn', label: 'MTN Mobile Money', icon: MTNIcon, type: 'local' },
             { id: 'airtel', label: 'Airtel Money', icon: AirtelIcon, type: 'local' },
             { id: 'card', label: 'Debit / Credit Card', icon: CreditCardIcon, type: 'global' },
             { id: 'paypal', label: 'PayPal', icon: PayPalIcon, type: 'global' }
           ].map((m) => (
             <button
               key={m.id}
               onClick={() => { 
                 setMethod(m.id as PaymentMethod); 
                 setStep('details');
               }}
               className={`flex items-center justify-between p-5 bg-slate-950 border transition-all group rounded-2xl ${m.type === 'local' ? 'border-brand-blue/30 hover:border-brand-blue' : 'border-white/5 hover:border-white/20'}`}
             >
               <div className="flex items-center gap-5">
                  <div className="p-2 bg-white/5 rounded-xl">
                     <m.icon className="w-8 h-8" />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest ${m.type === 'local' ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>{m.label}</span>
               </div>
               {m.type === 'local' && <span className="text-[7px] font-black bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-md uppercase tracking-tighter">Fastest</span>}
             </button>
           ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-brand-darker/95 backdrop-blur-3xl flex items-center justify-center z-[300] p-4 animate-fade-in">
      <div className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-[3rem] shadow-[0_50px_150px_rgba(0,0,0,1)] overflow-hidden relative">
        <button onClick={onClose} disabled={isProcessing} className="absolute top-8 right-8 p-2.5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all z-20 group">
          <XIcon className="w-5 h-5 text-slate-500 group-hover:rotate-90 transition-transform" />
        </button>

        <header className="p-10 pb-6 bg-slate-950/40">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black text-brand-blue uppercase tracking-[0.4em]">Payment Hub</span>
            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Enroll Now</h2>
          </div>
          <div className="mt-8 p-6 bg-brand-blue/5 border border-brand-blue/20 rounded-3xl flex justify-between items-center">
            <div className="flex flex-col">
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Course Total</span>
               <span className="text-2xl font-black text-white italic tracking-tighter">${course.price.toFixed(2)}</span>
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Module</span>
               <span className="text-[10px] font-black text-brand-light-blue uppercase tracking-tighter truncate max-w-[120px]">{course.title}</span>
            </div>
          </div>
        </header>

        <div className="min-h-[380px] flex flex-col justify-center">
          {renderPaymentContent()}
        </div>

        <div className="p-8 border-t border-white/5 bg-slate-950/40 text-center">
            <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.5em]">Egreed Technology • Made with ❤️ in Rwanda</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
