import React, { useContext, useState } from 'react';
import supabaseClient from '../context/supabaseClient';
import { AppContext } from '../context/AppContext';
import { Page } from '../types';
import { ChevronLeftIcon } from './icons';

interface PlaceholderTaskProps {
  taskId: string;
  title: string;
  instructions: string[];
  score: number;
}

const PlaceholderTask: React.FC<PlaceholderTaskProps> = ({ taskId, title, instructions, score }) => {
  const { setCurrentPage, updateTaskCompletion, t, language, currentUser } = useContext(AppContext);
  const [slogan, setSlogan] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSloganSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      // Save slogan to Supabase (user_slogans table)
      const { error } = await supabaseClient
        .from('user_slogans')
        .upsert({ user_id: currentUser?.id, slogan });
      if (error) throw new Error(error.message || 'Failed to submit slogan');
      await updateTaskCompletion(taskId, 1, score);
      setSuccess(true);
      setTimeout(() => setCurrentPage(Page.DASHBOARD), 1200);
    } catch (e: any) {
      setError(e.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleKaizenComplete = async () => {
    setSubmitting(true);
    setError('');
    try {
      // Just update task completion, no data submission to our DB for this one.
      await updateTaskCompletion(taskId, 1, score);
      setSuccess(true);
      setTimeout(() => setCurrentPage(Page.DASHBOARD), 1200);
    } catch (e: any)      {
      setError(e.message || 'Failed to mark as complete.');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24 text-center animate-fade-in">
      <button 
        data-kn-skip
        onClick={() => setCurrentPage(Page.DASHBOARD)} 
        className="absolute top-20 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-black hover:text-red-500 transition-colors"
      >
        <ChevronLeftIcon className="w-6 h-6"/>
          {t('back')}
      </button>

      <div className="w-full max-w-2xl">
  <h1 className="text-4xl font-bold mb-4">{language === 'kn' && (title === 'Slogan Writer' || title === 'Suggestion Box' || title === 'Slogan Competition' || title === 'Kaizen Suggestion') ? (title === 'Slogan Writer' ? 'ಸ್ಲೋಗನ್ ರಚನೆ' : title === 'Suggestion Box' ? 'ಸಲಹೆ ಪೆಟ್ಟಿಗೆ' : title === 'Slogan Competition' ? 'ಸ್ಲೋಗನ್ ಸ್ಪರ್ಧೆ' : 'ಕೈಝೆನ್ ಸಲಹೆ') : title}</h1>
        <div className="bg-white p-8 rounded-2xl shadow-xl text-left mb-8">
      <h2 className="text-2xl font-semibold text-black mb-4">{language === 'kn' ? 'ಸೂಚನೆಗಳು' : 'Instructions'}</h2>
            <ul className="list-disc list-inside space-y-2 text-black">
        {instructions.map((inst, index) => <li key={index}>{language === 'kn' ? translateInstruction(inst) : inst}</li>)}
            </ul>
        </div>
        {title === 'Slogan Competition' ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-black mb-4">{language === 'kn' ? 'ನಿಮ್ಮ ಸ್ಲೋಗನ್ ಅನ್ನು ನಮೂದಿಸಿ' : 'Enter your slogan'}</h2>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 min-h-[80px]"
              placeholder={language === 'kn' ? 'ಇಲ್ಲಿ ನಿಮ್ಮ ಸ್ಲೋಗನ್ ಅನ್ನು ಬರೆಯಿರಿ...' : 'Type your slogan here...'}
              value={slogan}
              onChange={e => setSlogan(e.target.value)}
              disabled={submitting || success}
              maxLength={200}
            />
            <button
              onClick={() => setShowConfirm(true)}
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              disabled={submitting || !slogan.trim() || success}
            >
              {submitting ? (language === 'kn' ? 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Submitting...') : (language === 'kn' ? 'ಸಲ್ಲಿಸಿ' : 'Submit')}
            </button>
            {/* Confirmation Modal */}
            {showConfirm && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
                  <h2 className="text-2xl font-bold mb-4">{language === 'kn' ? 'ದಯವಿಟ್ಟು ದೃಢೀಕರಿಸಿ' : 'Please Confirm'}</h2>
                  <p className="mb-4">{language === 'kn' ? 'ನೀವು ಸಲ್ಲಿಸಲು ಬಯಸುವ ಸ್ಲೋಗನ್:' : 'You are about to submit this slogan:'}</p>
                  <div className="bg-gray-100 rounded-lg p-4 mb-4 text-black text-lg">{slogan}</div>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                      {language === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                    </button>
                    <button
                      onClick={async () => { setShowConfirm(false); await handleSloganSubmit(); }}
                      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      disabled={submitting}
                    >
                      {language === 'kn' ? 'ದೃಢೀಕರಿಸಿ ಮತ್ತು ಸಲ್ಲಿಸಿ' : 'Confirm & Submit'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {error && <div className="mt-2 text-red-600">{error}</div>}
            {success && <div className="mt-2 text-green-600">{language === 'kn' ? 'ಸ್ಲೋಗನ್ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!' : 'Slogan submitted successfully!'}</div>}
          </div>
        ) : title === 'Kaizen Suggestion' ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-2xl font-semibold text-black mb-4">{language === 'kn' ? 'ಸಲಹೆ ಫಾರ್ಮ್' : 'Suggestion Form'}</h2>
            <p className="text-black mb-6">{language === 'kn' ? 'ನಿಮ್ಮ ಕೈಜೆನ್ ಸಲಹೆಯನ್ನು ಸಲ್ಲಿಸಲು ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ. ಫಾರ್ಮ್ ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ ನಂತರ, ಅಂಕಗಳನ್ನು ಪಡೆಯಲು ಇಲ್ಲಿಗೆ ಹಿಂತಿರುಗಿ ಮತ್ತು "ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ" ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.' : 'Please click the button below to open the Google Form to submit your Kaizen suggestion. After completing the form, return here and click "Mark as Complete" to get your points.'}</p>
            <a 
              href="https://forms.office.com/r/vJ2dA7FUGW" // <-- TODO: Replace with your actual Google Form URL
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors mb-6"
            >
              {language === 'kn' ? 'Google ಫಾರ್ಮ್ ತೆರೆಯಿರಿ' : 'Open Google Form'}
            </a>
            <hr className="my-4 border-gray-200" />
            <p className="text-sm text-gray-600 mb-4">{language === 'kn' ? 'ಫಾರ್ಮ್ ಸಲ್ಲಿಸಿದ ನಂತರ, ದಯವಿಟ್ಟು ಕೆಳಗೆ ಕ್ಲಿಕ್ ಮಾಡಿ:' : 'Once you have submitted the form, please click below:'}</p>
            <button
              onClick={handleKaizenComplete}
              className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              disabled={submitting || success}
            >
              {submitting ? (language === 'kn' ? 'ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...' : 'Submitting...') : success ? (language === 'kn' ? 'ಪೂರ್ಣಗೊಂಡಿದೆ!' : 'Completed!') : (language === 'kn' ? 'ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ' : 'Mark as Complete')}
            </button>
            {error && <div className="mt-2 text-red-600">{error}</div>}
            {success && <div className="mt-2 text-green-600">{language === 'kn' ? 'ಕಾರ್ಯ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ!' : 'Task completed successfully!'}</div>}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-black">{t('coming_soon')}</h2>
            <p className="mt-4 text-black">
              {t('placeholder_dev_line1')}
              {' '}
              {t('placeholder_dev_line2')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Minimal translation for the hardcoded instruction lines used in Slogan Writer / Suggestion Box.
function translateInstruction(inst: string) {
  // Map a few known English instruction sentences to Kannada. For other sentences return original.
  const map: Record<string, string> = {
    "The theme for this year is 'Think Differently.'": 'ಈ ವರ್ಷದ ವಿಷಯ: ವಿಭಿನ್ನವಾಗಿ ಯೋಚಿಸಿ.',
    "Craft a catchy and inspiring slogan related to quality and innovation.": 'ಗುಣಮಟ್ಟ ಮತ್ತು ನಾವೀನ್ಯತೆಗೆ ಸಂಬಂಧಿಸಿದ ಕ್ಯಾಚಿ ಮತ್ತು ಪ್ರೇರಣಾದಾಯಕ ಸ್ಲೋಗನ್ ರಚಿಸಿ.',
    "Submissions will be reviewed by the management committee.": 'ಸಲ್ಲಿಕೆಗಳನ್ನು ನಿರ್ವಹಣಾ ಸಮಿತಿ ಪರಿಶೀಲಿಸುವುದು.' ,
    "The winning slogan will be featured in next month's company-wide newsletter.": 'ವಿಜೇತ ಸ್ಲೋಗನ್ ಮುಂದಿನ ತಿಂಗಳ ಸಂಸ್ಥಾಪ್ರಚಾರ ಪತ್ರಿಕೆಯಲ್ಲಿ ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ.',
    "This is your chance to contribute to Kaizen (Continuous Improvement).": 'ಕೈಝೆನ್ (ನಿರಂತರ ಸುಧಾರಣೆ) ಗೆ ನಿಮ್ಮ ಕೊಡುಗೆ ನೀಡಲು ಇದು ನಿಮ್ಮ ಅವಕಾಶ.',
    "Think about a process in your daily work that could be more efficient or safer.": 'ನಿಮ್ಮ ದೈನಂದಿನ ಕೆಲಸದಲ್ಲಿನ ಹೆಚ್ಚು ಕಾರ್ಯಕ್ಷಮ ಅಥವಾ ಸುರಕ್ಷಿತವಾಗಲು ಸಾಧ್ಯವಾಗುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಕುರಿತು ಯೋಚಿಸಿ.' ,
    "Describe the problem and your proposed solution.": 'ಸಮಸ್ಯೆಯನ್ನು ಮತ್ತು ನಿಮಗೆ ತೋರಿಸಿದ ಪರಿಹಾರವನ್ನು ವಿವರಿಸಿ.' ,
    "All suggestions will be evaluated for feasibility and impact.": 'ಎಲ್ಲಾ ಸಲಹೆಗಳನ್ನೂ ಕಾರ್ಯಪ್ರವೃತ್ತಿಗಾಗಿ ಮತ್ತು ಪರಿಣಾಮಕ್ಕಾಗಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುತ್ತದೆ.'
  };
  return map[inst] || inst;
}

export default PlaceholderTask;
