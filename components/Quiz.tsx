
import React, { useState, useEffect, useContext } from 'react';
import { Question } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';
import { AppContext } from '../context/AppContext';

interface QuizProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onScoreUpdate?: (score: number) => void;
  quizId?: string;
}

const TIMER_DURATION = 20;

const Quiz: React.FC<QuizProps> = ({ questions, onComplete, onScoreUpdate, quizId }) => {
  // Parent component should persist the quiz score (via updateTaskCompletion or addScore)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions && questions.length > 0 ? questions[currentQuestionIndex] : undefined;
  const isCorrect = currentQuestion ? selectedOption === currentQuestion.correctAnswer : false;
  const { t, language } = useContext(AppContext);
  const [langVersion, setLangVersion] = useState(0);

  useEffect(() => {
    // bump version to cause dependent effects/renders when language changes
    setLangVersion(v => v + 1);
  }, [language]);

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
    // Be liberal about dash characters: support hyphen-minus, en-dash and em-dash.
    if (language === 'kn') {
      const dashSplit = text.split(/[-–—]/).map(s => s.trim()).filter(Boolean);
      if (dashSplit.length >= 2) {
        // prefer the last segment as the Kannada portion
        return dashSplit[dashSplit.length - 1];
      }
    }

    return text;
  };

  // Prefer per-question Kannada fields where available. This helper will be
  // used for question text and options below.
  const localizeQuestionText = (q: Question) => {
    if (language === 'kn' && (q as any).textKn) return (q as any).textKn as string;
    return localize(q.text);
  };

  const localizeOption = (q: Question, idx: number) => {
    if (language === 'kn' && Array.isArray((q as any).optionsKn) && (q as any).optionsKn[idx]) {
      return (q as any).optionsKn[idx] as string;
    }
    return localize(q.options[idx]);
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
  }, [currentQuestionIndex, showFeedback, langVersion]);

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;
    if (!currentQuestion) return;
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
    if (!currentQuestion) return 'bg-gray-200 dark:bg-gray-700 opacity-50';
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-500 text-white';
    }
    if ((option === selectedOption && option !== currentQuestion.correctAnswer) || (selectedOption === 'timeout' && option !== currentQuestion.correctAnswer)) {
      return 'bg-red-500 text-white';
    }
    return 'bg-gray-200 dark:bg-gray-700 opacity-50';
  };

  // Back navigation/confirmation is handled by the parent component (MdMessageTask).
  // Removing local back UI to avoid duplicate controls and keep a single source
  // of truth for the confirmation modal.

  // Reset local quiz state only when the quiz identity changes (new quiz load).
  // This prevents language-only updates to the questions array from resetting
  // the user's progress during an in-progress quiz.
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTimer(TIMER_DURATION);
    setShowFeedback(false);
  }, [quizId]);

  // If there are no questions or currentQuestion is undefined, render a loading fallback
  if (!questions || questions.length === 0 || !currentQuestion) {
    return (
      <div className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-2xl animate-fade-in relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{t('question_label') || 'Question'}</h3>
        </div>
        <p className="text-lg mb-4">{t('loading_questions') || 'Loading questions...'}</p>
      </div>
    );
  }

  // Diagnostic: log whether currentQuestion includes Kannada fields when rendering
  try {
    // eslint-disable-next-line no-console
    console.log('[i18n][Quiz] render language=', language, 'currentQuestion.textKn=', (currentQuestion as any)?.textKn);
  } catch (e) {}

  return (
    <div className="bg-white backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-2xl animate-fade-in relative">
      {/* debug overlay removed */}
      {/* Back button removed from inside the quiz card. Parent provides the
          external back control and confirmation modal (see MdMessageTask). */}
  <div className="flex justify-between items-center mb-6" data-kn-skip>
  <h3 className="text-xl font-semibold">{t('question_label')} {currentQuestionIndex + 1}/{questions.length}</h3>
        <div className="text-2xl font-bold text-red-500" style={{'--value': timer} as React.CSSProperties}>{timer}s</div>
      </div>
  <p className="text-2xl font-bold mb-8">{localizeQuestionText(currentQuestion)}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            disabled={showFeedback}
            className={`p-4 rounded-lg text-left font-semibold transition-all duration-300 ${getButtonClass(option)}`}
          >
            {localizeOption(currentQuestion, idx)}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-6 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-xl font-bold">
            {selectedOption === currentQuestion.correctAnswer ? <CheckCircleIcon className="w-8 h-8 text-green-500" /> : <XCircleIcon className="w-8 h-8 text-red-500" />}
            <span className={selectedOption === currentQuestion.correctAnswer ? 'text-green-500' : 'text-red-500'}>
              {selectedOption === 'timeout' ? t('time_up_incorrect') : selectedOption === currentQuestion.correctAnswer ? t('correct') : t('incorrect')}
            </span>
          </div>
          {selectedOption !== currentQuestion.correctAnswer && <p className="mt-2 text-gray-600 dark:text-gray-400">{t('correct_answer_was').replace(':','')} <strong>{localize(currentQuestion.correctAnswer)}</strong></p>}
          <button onClick={handleNext} className="mt-4 px-8 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
            {currentQuestionIndex < questions.length - 1 ? t('next_question') : t('finish_quiz')}
          </button>
        </div>
      )}

      {/* Confirmation modal removed from the quiz. Parent component shows the
          confirmation when the external back button is clicked. */}
    </div>
  );
};

export default Quiz;
