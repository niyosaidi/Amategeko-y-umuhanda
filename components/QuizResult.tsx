import React from 'react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onGoHome: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onRestart, onGoHome }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const isPass = percentage >= 50;

  return (
    <div className="text-center flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Ikizamini Kirarangiye!</h2>
      <p className="text-lg text-slate-600 mb-6">
        Wabonye amanota <span className="font-bold text-blue-600">{score}</span> kuri <span className="font-bold text-blue-600">{totalQuestions}</span>.
      </p>

      <div className={`text-4xl font-extrabold mb-4 ${isPass ? 'text-green-500' : 'text-red-500'}`}>
        {percentage}%
      </div>

      <div className={`p-4 rounded-lg text-center font-semibold mb-8 w-full ${isPass ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {isPass ? 'Watsinze! Urakoze neza.' : 'Watsinzwe. Ongera ugerageze.'}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={onGoHome}
          className="bg-slate-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-all duration-200 shadow-md"
        >
          Subira Aho Uhitiramo
        </button>
        <button 
          onClick={onRestart}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md"
        >
          Ongera Ugerageze
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
