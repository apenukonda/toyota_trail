
import React, { useState, useEffect, useContext } from 'react';
import { Question } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';
import { AppContext } from '../context/AppContext';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onScoreUpdate?: (score: number) => void;
}

const TIMER_DURATION = 20;

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, onScoreUpdate }) => {
  // Parent component should persist the quiz score (via updateTaskCompletion or addScore)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBackWarning, setShowBackWarning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  const { t, language } = useContext(AppContext);

  // helper to get localized text. The codebase sometimes uses strings in the
  // format 'English-Kannada' inside constants. When language === 'kn' prefer
  // the Kannada suffix after the last '-' if present. Otherwise use the
  // translations map via t().
  const localize = (text: string) => {
    // If translations map has the key, prefer that
    const translated = t(text);
    if (translated !== text) return translated;

    // If user selected Kannada and the text contains a dash-separated pair,
    // return the last segment which is often the Kannada version.
      if (language === 'kn' && text.includes('-')) {
        const parts = text.split('-');
        const last = parts[parts.length - 1].trim();
        return last;
      }

    return text;
  };

  useEffect(() => {
    if (showFeedback) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          if (!selectedOption) {
            setSelectedOption('timeout');
            setShowFeedback(true);
          } else {
            handleNext();
          }
          return TIMER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, showFeedback]);

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setScore(s => {
        const newScore = s + 1;
        onScoreUpdate?.(newScore);
        return newScore;
      });
    } else {
      onScoreUpdate?.(score);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setTimer(TIMER_DURATION);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onComplete(score); // Pass the final score
    }
  };

  const getButtonClass = (option: string) => {
    if (!showFeedback) {
      return 'bg-gray-200 dark:bg-gray-700 hover:bg-red-200 dark:hover:bg-red-900/50';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-500 text-white';
    }
    if ((option === selectedOption && option !== currentQuestion.correctAnswer) || (selectedOption === 'timeout' && option !== currentQuestion.correctAnswer)) {
      return 'bg-red-500 text-white';
    }
    return 'bg-gray-200 dark:bg-gray-700 opacity-50';
  };

  const handleBackClick = () => {
    setShowBackWarning(true);
  };

  const confirmBack = () => {
    // Calculate points earned so far (correct answers up to current question)
    const pointsEarned = score;
    onComplete(pointsEarned);
  };

  const cancelBack = () => {
    setShowBackWarning(false);
  };

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-2xl animate-fade-in relative">
      <button onClick={handleBackClick} className="absolute top-4 left-4 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors">
        {t('back')}
      </button>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{t('question_label')} {currentQuestionIndex + 1}/{questions.length}</h3>
        <div className="text-2xl font-bold text-red-500" style={{'--value': timer} as React.CSSProperties}>{timer}s</div>
      </div>
  <p className="text-2xl font-bold mb-8">{localize(currentQuestion.text)}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map(option => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            disabled={showFeedback}
            className={`p-4 rounded-lg text-left font-semibold transition-all duration-300 ${getButtonClass(option)}`}
          >
            {localize(option)}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-6 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-xl font-bold">
            {selectedOption === currentQuestion.correctAnswer ? <CheckCircleIcon className="w-8 h-8 text-green-500" /> : <XCircleIcon className="w-8 h-8 text-red-500" />}
            <span className={selectedOption === currentQuestion.correctAnswer ? 'text-green-500' : 'text-red-500'}>
              {selectedOption === 'timeout' ? t('time up incorrect') : selectedOption === currentQuestion.correctAnswer ? t('correct') : t('incorrect')}
            </span>
          </div>
          {selectedOption !== currentQuestion.correctAnswer && <p className="mt-2 text-gray-600 dark:text-gray-400">{t('correct answer was')} <strong>{localize(currentQuestion.correctAnswer)}</strong></p>}
          <button onClick={handleNext} className="mt-4 px-8 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
            {currentQuestionIndex < questions.length - 1 ? t('next question') : t('finish quiz')}
          </button>
        </div>
      )}

      {showBackWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
            <h3 className="text-xl font-bold text-red-600 mb-4">{t('warning_title')}</h3>
            <p className="text-gray-700 mb-4">
              {t('warning_text_prefix')} <strong>{score} {t('score')}</strong> {t('warning_text_suffix')}
            </p>
            <div className="flex gap-4 justify-end">
              <button onClick={cancelBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                {t('cancel')}
              </button>
              <button onClick={confirmBack} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                {t('yes go back')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
