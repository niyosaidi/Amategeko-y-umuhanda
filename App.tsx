import React, { useState, useCallback, useMemo } from 'react';
import { quizData } from './data/quizData';
import type { QuizQuestion, QuizCategory } from './types';
import QuizCard from './components/QuizCard';
import QuizResult from './components/QuizResult';
import ProgressBar from './components/ProgressBar';
import HomeScreen from './components/HomeScreen';
import { BackArrowIcon } from './components/icons';

const App: React.FC = () => {
  const [activeQuizCategory, setActiveQuizCategory] = useState<QuizCategory | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const activeQuizData = useMemo(() => {
    if (!activeQuizCategory) return [];
    return quizData.filter(q => q.category === activeQuizCategory);
  }, [activeQuizCategory]);

  const currentQuestion: QuizQuestion | undefined = activeQuizData[currentQuestionIndex];

  const handleSelectCategory = useCallback((category: QuizCategory) => {
    setActiveQuizCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
  }, []);

  const handleGoHome = useCallback(() => {
    setActiveQuizCategory(null);
  }, []);

  const handleSelectAnswer = useCallback((answerKey: string) => {
    if (showFeedback || !currentQuestion) return;

    setSelectedAnswer(answerKey);
    setShowFeedback(true);

    if (answerKey === currentQuestion.correct_answer_key) {
      setScore(prevScore => prevScore + 1);
    }
  }, [showFeedback, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < activeQuizData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, activeQuizData]);
  
  const handleRestartQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
  }, []);

  if (!activeQuizCategory) {
    return <HomeScreen onSelectCategory={handleSelectCategory} />;
  }
  
  if (!currentQuestion) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans text-center">
            <h2 className="text-2xl font-bold text-slate-700">Nta bibazo bibonetse.</h2>
            <button 
                onClick={handleGoHome}
                className="mt-6 bg-blue-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md"
            >
                Subira Ahabanza
            </button>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <div className="w-full mb-2 flex justify-start">
          <button 
              onClick={handleGoHome}
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition-colors duration-200"
              aria-label="Subira Aho Uhitiramo"
          >
              <BackArrowIcon className="w-5 h-5" />
              <span>Ahabanza</span>
          </button>
        </div>
        <main className="bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300">
          {quizCompleted ? (
            <QuizResult score={score} totalQuestions={activeQuizData.length} onRestart={handleRestartQuiz} onGoHome={handleGoHome} />
          ) : (
            <>
              <ProgressBar current={currentQuestionIndex + 1} total={activeQuizData.length} />
              <QuizCard 
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
                onSelectAnswer={handleSelectAnswer}
              />
              {showFeedback && (
                <div className="mt-6 text-center">
                  <button 
                    onClick={handleNextQuestion}
                    className="bg-blue-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md"
                  >
                    {currentQuestionIndex < activeQuizData.length - 1 ? 'Ikibazo Gikurikira' : 'RANGIZA'}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;