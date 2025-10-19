import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../context/AppContext';
// KText removed — use inline language ternaries instead
import { ChevronLeftIcon } from './icons';
import { Page } from '../types';

const TopPerformers: React.FC = () => {
  const { getTopScores, setCurrentPage, t, language, currentUser } = useContext(AppContext);
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Local ProfileMenu component (hover dropdown)
  const ProfileMenu: React.FC = () => {
    const { currentUser, language: lang, setLanguage, logout, t } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const onDocClick = (e: MouseEvent) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener('click', onDocClick);
      return () => document.removeEventListener('click', onDocClick);
    }, []);

    const initials = currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'U';

    return (
      <div ref={ref} className="relative">
        <button
          onMouseEnter={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Profile menu"
          className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm border border-white/10"
        >
          {initials}
        </button>

        {open && (
          <div onMouseLeave={() => setOpen(false)} className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-3 border-b border-gray-100 dark:border-gray-700">
              <div className="font-semibold text-gray-900 dark:text-white">{currentUser?.name}</div>
              <div className="text-xs text-gray-500">{currentUser?.designation || currentUser?.department}</div>
            </div>

            <div className="p-2">
              <div className="text-xs text-gray-500 px-2 pb-1">{t('language') || (lang === 'kn' ? 'Kannada' : 'Language')}</div>
              <div className="flex gap-2 px-2">
                <button onClick={() => { setLanguage('en'); setOpen(false); }} className={`flex-1 py-2 rounded text-sm ${lang === 'en' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>English</button>
                <button onClick={() => { setLanguage('kn'); setOpen(false); }} className={`flex-1 py-2 rounded text-sm ${lang === 'kn' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>Kannada</button>
              </div>
            </div>

            <div className="p-3 border-t border-gray-100 dark:border-gray-700">
              <button onClick={logout} className="w-full py-2 rounded bg-red-600 text-white font-semibold">{t('logout')}</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getTopScores().then(data => {
      setScores(data.slice(0, 5)); // top 5
      setLoading(false);
    });
  }, [getTopScores]);

  return (
    <div className="min-h-screen p-6 pt-24 relative">
      {/* Top-right fixed profile/score */}
      <div className="absolute top-4 sm:top-6 right-3 sm:right-6 flex items-center gap-3">
        {/* score block: label above, centered pill with the number */}
        <div className="flex flex-col items-end mr-2 text-right">
          <span className="text-xs text-gray-600">{t('score')}</span>
          <span className="mt-1 inline-flex items-center justify-center px-3 py-1 rounded-xl bg-gray-100 text-gray-900 font-semibold text-sm shadow-sm">{currentUser?.score ?? 0}</span>
        </div>
        <ProfileMenu />
      </div>
  <button data-kn-skip onClick={() => setCurrentPage(Page.DASHBOARD)} className="flex items-center gap-2 text-black hover:text-red-500 mb-6">
        <ChevronLeftIcon className="w-6 h-6" />
  {t('back')}
      </button>

      <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
  <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">{t('Top Performers') || (language === 'kn' ? 'ಉತ್ತಮ ಪ್ರದರ್ಶಕರು' : 'Top Performers')}</h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {scores.map((s, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-lg sm:text-2xl font-black ${i===0? 'bg-yellow-400 text-black' : i===1? 'bg-gray-300 text-black' : i===2? 'bg-yellow-600 text-white' : 'bg-gray-100 text-black'}`}>
                  {i < 3 ? ['1','2','3'][i] : `#${i+1}`}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-base sm:text-lg font-bold">{s.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{s.department || s.designation || ''}</div>
                </div>
                <div className="text-xl sm:text-3xl font-extrabold text-red-600">{s.score}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPerformers;
