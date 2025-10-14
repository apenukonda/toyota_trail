
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Page, Question } from '../types';
import Quiz from './Quiz';
import { MD_MESSAGE_QUIZ } from '../constants';
import { MD_MESSAGE_QUIZ_KN } from '../constants_kn';
import { ChevronLeftIcon, CheckIcon, XCircleIcon } from './icons';

// Function to get 7 random questions from MD_MESSAGE_QUIZ
const getRandomQuestions = (questions: typeof MD_MESSAGE_QUIZ, count: number) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const MdMessageTask: React.FC = () => {
  const { setCurrentPage, updateTaskCompletion, tasks, addScore, t, language } = useContext(AppContext);
  const [view, setView] = useState<'message' | 'quiz' | 'completed'>('message');
  const [startedQuiz, setStartedQuiz] = useState(false);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuizScore, setCurrentQuizScore] = useState(0);

  useEffect(() => {
    const task = tasks.find(t => t.id === 'task1');
    if (task && task.completedSteps > 0) {
      setView('completed');
    }
  }, [tasks]);

  useEffect(() => {
    if (view === 'quiz') {
      setStartedQuiz(true);
      // Always refresh questions when language or view changes
      setQuizQuestions(getRandomQuestions(language === 'kn' ? MD_MESSAGE_QUIZ_KN : MD_MESSAGE_QUIZ, 7));
    }
    // eslint-disable-next-line
  }, [view, language]);

  const handleQuizComplete = (score: number) => {
    updateTaskCompletion('task1', 7, score);
    setView('completed');
  };

  const handleBack = () => {
    if (startedQuiz) {
      setShowBackWarning(true);
    } else {
      setCurrentPage(Page.DASHBOARD);
    }
  };

  const confirmBack = () => {
    setShowBackWarning(false);
    // Mark as completed with current score
    updateTaskCompletion('task1', 7, currentQuizScore);
    setView('completed');
  };

  const cancelBack = () => {
    setShowBackWarning(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24 animate-fade-in">
      <button
        onClick={handleBack}
        className="absolute top-20 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-black hover:text-red-500 transition-colors"
      >
        <ChevronLeftIcon className="w-6 h-6"/>
        {t('back_to_dashboard')}
      </button>

      {view === 'message' && (
        <div className="w-full max-w-3xl text-center">
            <h1 className="text-4xl font-bold mb-4">{t('md_message_title')}</h1>
      <div>
        {/* Show English poster by default; switch to Kannada poster when language === 'kn' */}
        <img src={language === 'kn' ? '/assets/MDKan.png' : '/assets/MDEng.png'} alt={t('md_message_title')} className="w-full h-auto rounded-lg mb-4" />
      </div>
            <button onClick={() => setView('quiz')} className="mt-8 px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">{t('start_quiz')}</button>
        </div>
      )}

      {view === 'quiz' && quizQuestions.length > 0 && <Quiz questions={quizQuestions} onComplete={handleQuizComplete} onScoreUpdate={setCurrentQuizScore} />}
      
      {view === 'completed' && (
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="w-16 h-16 text-white"/>
          </div>
          <h2 className="text-3xl font-bold">{t('task_completed_title') || 'Task Completed!'}</h2>
          <p className="mt-2 text-lg text-black">{t('task_completed_message') || "You've successfully completed the MD Message module."}</p>
          <button onClick={() => setCurrentPage(Page.DASHBOARD)} className="mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">{t('back_to_dashboard')}</button>
        </div>
      )}

      {showBackWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center transform transition-all scale-95 opacity-0 animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'forwards', animationName: 'zoomIn' }}>
            <style>{`@keyframes zoomIn { to { transform: scale(1); opacity: 1; } }`}</style>
            <button onClick={cancelBack} className="absolute top-3 right-3 text-black hover:text-red-500">
              <XCircleIcon className="w-8 h-8"/>
            </button>
            <h2 className="text-2xl font-extrabold text-black mb-4">Warning!!</h2>
            <p className="text-black mb-6">You will get only <strong>{currentQuizScore} points</strong>. All others answers will be considered incorrect answers. Are you sure want to do that?</p>
            <div className="flex gap-4">
              <button onClick={cancelBack} className="flex-1 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              <button onClick={confirmBack} className="flex-1 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MdMessageTask;
