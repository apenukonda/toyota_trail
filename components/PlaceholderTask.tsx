import React, { useContext, useState } from 'react';
// @ts-ignore
const { createClient } = supabase;
const supabaseUrl = 'https://kescaddzecbnhnhpifha.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlc2NhZGR6ZWNibmhuaHBpZmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MzAxMjksImV4cCI6MjA3NTQwNjEyOX0.h69xRfbJSzq_7xd4bR40AmmXoa9zgcMUjxPeWBmkynM';
const supabaseClient = createClient(supabaseUrl, supabaseKey);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24 text-center animate-fade-in">
      <button 
        onClick={() => setCurrentPage(Page.DASHBOARD)} 
        className="absolute top-20 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-black hover:text-red-500 transition-colors"
      >
        <ChevronLeftIcon className="w-6 h-6"/>
        {t('back_to_dashboard')}
      </button>

      <div className="w-full max-w-2xl">
  <h1 className="text-4xl font-bold mb-4">{language === 'kn' && (title === 'Slogan Writer' || title === 'Suggestion Box') ? (title === 'Slogan Writer' ? 'ಸ್ಲೋಗನ್ ರಚನೆ' : 'ಸಲಹೆ ಪೆಟ್ಟಿಗೆ') : title}</h1>
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
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-black">{t('coming_soon')}</h2>
            <p className="mt-4 text-black">
              {language === 'kn' ? 'ಈ ಇಂಟರಾಕ್ಟಿವ್ ಮಾಡ್ಯೂಲ್ ಪ್ರಸ್ತುತ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿ ಇದೆ. ಪೂರ್ಣ ಅನುಭವಕ್ಕಾಗಿ ದಯವಿಟ್ಟು ನಂತರ ಪರಿಶೀಲಿಸಿ.' : 'This interactive module is currently under development. Please check back later for the full experience.'}
              {language === 'kn' ? 'ಈಗ ತಾತ್ಕಾಲಿಕವಾಗಿ ಈ ಟಾಸ್ಕ್ ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಬಹುದು.' : 'For now, you can mark this task as complete to proceed.'}
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
    "This is your chance to contribute to Kaizen (Continuous Improvement).": 'ಕೈಝೆನ್ (ನಿರಂತರ ಸುಧಾರಣೆ) ಗೆ ನಿಮ್ಮ ಕೊಡುಗೆ ನೀಡಲು ಇದು ನಿಮ್ಮ ಅವಕಾಶ.',
    "Think about a process in your daily work that could be more efficient or safer.": 'ನಿಮ್ಮ ದೈನಂದಿನ ಕೆಲಸದಲ್ಲಿನ ಹೆಚ್ಚು ಕಾರ್ಯಕ್ಷಮ ಅಥವಾ ಸುರಕ್ಷಿತವಾಗಲು ಸಾಧ್ಯವಾಗುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಕುರಿತು ಯೋಚಿಸಿ.' ,
    "Describe the problem and your proposed solution.": 'ಸಮಸ್ಯೆಯನ್ನು ಮತ್ತು ನಿಮಗೆ ತೋರಿಸಿದ ಪರಿಹಾರವನ್ನು ವಿವರಿಸಿ.' ,
    "All suggestions will be evaluated for feasibility and impact.": 'ಎಲ್ಲಾ ಸಲಹೆಗಳನ್ನೂ ಕಾರ್ಯಪ್ರವೃತ್ತಿಗಾಗಿ ಮತ್ತು ಪರಿಣಾಮಕ್ಕಾಗಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುತ್ತದೆ.'
  };
  return map[inst] || inst;
}

export default PlaceholderTask;
