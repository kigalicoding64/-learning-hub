
import React, { useState } from 'react';
import { Quiz, QuizQuestion } from '../types';
import { XIcon, CheckCircleIcon, XCircleIcon } from './Icons';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz;
  onSuccess?: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, quiz, onSuccess }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(quiz.questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  const handleSelectAnswer = (option: string) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsSubmitted(true);
      const score = selectedAnswers.reduce((score, answer, index) => {
          return answer === quiz.questions[index].correctAnswer ? score + 1 : score;
      }, 0);
      if (score / quiz.questions.length >= 0.7 && onSuccess) {
          onSuccess();
      }
    }
  };
  
  const handlePrev = () => {
     if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }
  
  const getScore = () => {
      return selectedAnswers.reduce((score, answer, index) => {
          return answer === quiz.questions[index].correctAnswer ? score + 1 : score;
      }, 0);
  }
  
  const resetQuiz = () => {
      setCurrentQuestionIndex(0);
      setSelectedAnswers(Array(quiz.questions.length).fill(null));
      setIsSubmitted(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[110] animate-fade-in p-4">
      <div className="bg-brand-secondary border border-slate-700 rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <header className="p-8 flex justify-between items-center border-b border-white/5 bg-brand-dark/50">
          <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Assessment Engine</span>
              <h2 className="text-xl font-black text-white italic">{quiz.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-xl">
            <XIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="p-10 flex-grow overflow-y-auto bg-slate-900/50">
          {isSubmitted ? (
             <div className="text-center flex flex-col items-center justify-center h-full animate-fade-in py-10">
                 <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 border-4 ${getScore() / quiz.questions.length >= 0.7 ? 'border-brand-blue text-brand-blue' : 'border-red-500 text-red-500'}`}>
                    {getScore() / quiz.questions.length >= 0.7 ? <CheckCircleIcon className="w-12 h-12"/> : <XCircleIcon className="w-12 h-12"/>}
                 </div>
                 <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Assessment Complete</h3>
                 <p className="text-6xl font-black my-6 tracking-tighter" style={{ color: getScore() / quiz.questions.length >= 0.7 ? '#4ade80' : '#f87171' }}>
                    {Math.round((getScore() / quiz.questions.length) * 100)}%
                 </p>
                 <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
                    {getScore() / quiz.questions.length >= 0.7 
                        ? "Protocol validated. Your engineering credentials for this module have been issued." 
                        : "Verification failed. Please review the curriculum and re-attempt the assessment."}
                 </p>
                 <div className="mt-12 flex gap-4 w-full">
                    <button onClick={resetQuiz} className="flex-grow py-5 bg-white/5 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 transition-all">
                        Retry Lab
                    </button>
                    <button onClick={onClose} className="flex-grow py-5 bg-brand-blue text-brand-darker font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-brand-light-blue shadow-lg shadow-brand-blue/20 transition-all">
                        Finish
                    </button>
                 </div>
             </div>
          ) : (
            <div>
              <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] font-black text-brand-light-blue uppercase tracking-[0.3em]">Query Process {currentQuestionIndex + 1}/{quiz.questions.length}</span>
                  <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-blue" style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}></div>
                  </div>
              </div>
              <h3 className="text-2xl font-black text-white mb-10 leading-snug">{currentQuestion.question}</h3>
              <div className="space-y-4">
                {currentQuestion.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectAnswer(option)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center gap-6 group
                      ${ selectedAnswer === option 
                        ? 'border-brand-blue bg-brand-blue/10 text-white' 
                        : 'border-white/5 hover:border-white/20 bg-slate-800/40 text-slate-400 hover:text-white' }
                    `}
                  >
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 transition-colors ${ selectedAnswer === option ? 'bg-brand-blue text-brand-darker' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'}`}>{String.fromCharCode(65 + i)}</span>
                    <span className="font-bold text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
        
        {!isSubmitted && (
          <footer className="p-8 flex justify-between items-center border-t border-white/5 bg-brand-dark/50">
             <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-8 py-4 text-slate-500 hover:text-white font-black uppercase tracking-widest text-xs disabled:opacity-0 transition-all">
                  Back
              </button>
              <button 
                onClick={handleNext} 
                disabled={!selectedAnswer} 
                className="px-10 py-4 bg-brand-blue text-brand-darker font-black uppercase tracking-widest text-xs rounded-xl hover:bg-brand-light-blue transition-all shadow-lg shadow-brand-blue/20 disabled:opacity-20"
              >
                  {currentQuestionIndex === quiz.questions.length - 1 ? 'Verify Protocol' : 'Next Cycle'}
              </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
