
import React, { useState } from 'react';
import { Course } from '../types';
import { XIcon, CreditCardIcon, LockIcon, LoaderIcon } from './Icons';

interface PaymentModalProps {
  course: Course;
  onClose: () => void;
  onConfirm: (course: Course) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ course, onClose, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(course);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-brand-secondary border border-slate-700 rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col transform transition-all animate-slide-in-up">
        <header className="p-4 flex justify-between items-center border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Complete Your Enrollment</h2>
          <button onClick={onClose} disabled={isProcessing} className="text-slate-400 hover:text-white transition-colors disabled:opacity-50">
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <form onSubmit={handlePayment}>
          <main className="p-6 flex-grow overflow-y-auto">
            <div className="mb-6 p-4 bg-brand-dark/50 rounded-lg border border-slate-700">
              <p className="text-slate-400 text-sm">You are enrolling in:</p>
              <h3 className="text-lg font-semibold text-white">{course.title}</h3>
              <p className="text-2xl font-bold text-brand-light-blue mt-1">${course.price.toFixed(2)}</p>
            </div>
            
            <h4 className="text-md font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5" />
              Payment Information
            </h4>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-400 mb-1">Card Number</label>
                <input type="text" id="cardNumber" defaultValue="**** **** **** 4242" disabled className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 focus:outline-none" />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="expiry" className="block text-sm font-medium text-slate-400 mb-1">Expiry Date</label>
                  <input type="text" id="expiry" defaultValue="12 / 28" disabled className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 focus:outline-none" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvc" className="block text-sm font-medium text-slate-400 mb-1">CVC</label>
                  <input type="text" id="cvc" defaultValue="***" disabled className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-slate-300 focus:outline-none" />
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">This is a demo. No real payment will be processed.</p>
            </div>
          </main>
          
          <footer className="p-4 bg-brand-dark/30 rounded-b-lg">
            <button 
              type="submit" 
              disabled={isProcessing} 
              className="w-full flex items-center justify-center gap-2 bg-brand-blue text-white font-bold px-6 py-3 rounded-lg hover:bg-brand-light-blue transition-colors disabled:bg-slate-600 disabled:cursor-wait"
            >
              {isProcessing ? (
                <>
                  <LoaderIcon className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <LockIcon className="w-5 h-5" />
                  Pay ${course.price.toFixed(2)} and Enroll
                </>
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
