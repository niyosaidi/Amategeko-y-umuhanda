
import React from 'react';
import type { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  showFeedback: boolean;
  onSelectAnswer: (answerKey: string) => void;
}

const Option: React.FC<{
  optionKey: 'a' | 'b' | 'c' | 'd';
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  onClick: () => void;
}> = ({ optionKey, text, isSelected, isCorrect, showFeedback, onClick }) => {
  
  const getOptionClasses = () => {
    let baseClasses = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer flex items-center space-x-4";

    if (!showFeedback) {
      return `${baseClasses} bg-white border-slate-300 hover:bg-slate-50 hover:border-blue-500`;
    }
    
    if (isCorrect) {
      return `${baseClasses} bg-green-100 border-green-500 text-green-800 font-semibold`;
    }
    
    if (isSelected && !isCorrect) {
      return `${baseClasses} bg-red-100 border-red-500 text-red-800`;
    }

    return `${baseClasses} bg-white border-slate-300 text-slate-600`;
  };

  const Icon: React.FC<{isCorrect: boolean, isSelected: boolean, showFeedback: boolean}> = ({isCorrect, isSelected, showFeedback}) => {
    if (!showFeedback) return null;
    if (isCorrect) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
    if (isSelected && !isCorrect) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    }
    return null;
  }

  return (
    <button onClick={onClick} disabled={showFeedback} className={getOptionClasses()}>
      <div className="flex-shrink-0 h-8 w-8 rounded-full border-2 border-slate-400 flex items-center justify-center font-bold text-slate-600">
        {optionKey.toUpperCase()}
      </div>
      <span className="flex-grow">{text}</span>
      <Icon isCorrect={isCorrect} isSelected={isSelected} showFeedback={showFeedback} />
    </button>
  );
};


const QuizCard: React.FC<QuizCardProps> = ({ question, selectedAnswer, showFeedback, onSelectAnswer }) => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">{question.question_number}. {question.question}</h2>
      
      {question.visual_required === 'Yego' && (
        <div className="my-6 p-4 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 flex flex-col items-center justify-center">
          <img 
            src={`https://picsum.photos/seed/${question.question_number}/400/250`} 
            alt={question.visual_description} 
            className="rounded-md shadow-sm object-cover"
          />
          <p className="text-sm text-slate-500 italic mt-2 text-center">{question.visual_description}</p>
        </div>
      )}
      
      <div className="space-y-3">
        {Object.entries(question.options).map(([key, value]) => (
          <Option
            key={key}
            optionKey={key as 'a' | 'b' | 'c' | 'd'}
            text={value}
            isSelected={selectedAnswer === key}
            isCorrect={question.correct_answer_key === key}
            showFeedback={showFeedback}
            onClick={() => onSelectAnswer(key)}
          />
        ))}
      </div>

      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg text-center font-semibold ${selectedAnswer === question.correct_answer_key ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {selectedAnswer === question.correct_answer_key ? 'Igisubizo ni Cyo!' : 'Washubije Nabi.'}
            {' '}Igisubizo cy'ukuri ni: <span className="font-bold">{question.correct_answer_text}</span>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
