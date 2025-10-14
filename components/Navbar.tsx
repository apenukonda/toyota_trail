import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Page } from '../types';
import {  HomeIcon } from './icons';

// Profile menu with dropdown on click/hover
const ProfileMenu: React.FC<{ initials: string }> = ({ initials }) => {
  const { currentUser, language, setLanguage, logout, t } = useContext(AppContext);
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

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
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
            <div className="text-xs text-gray-500 px-2 pb-1">{t('language') || (language === 'kn' ? 'ಭಾಷೆ' : 'Language')}</div>
            <div className="flex gap-2 px-2">
              <button onClick={() => { setLanguage('en'); setOpen(false); }} className={`flex-1 py-2 rounded text-sm ${language === 'en' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>English</button>
              <button onClick={() => { setLanguage('kn'); setOpen(false); }} className={`flex-1 py-2 rounded text-sm ${language === 'kn' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>Kannada</button>
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

const Navbar: React.FC = () => {
  const { currentUser, logout, setCurrentPage, t, language, setLanguage } = useContext(AppContext);
  const initials = currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'U';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/75 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/50 shadow-sm z-50 animate-fade-in">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
       <button onClick={() => setCurrentPage(Page.DASHBOARD)} className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors">
        <HomeIcon className="w-6 h-6" />
        <span className="font-semibold hidden sm:inline">{t('dashboard')}</span>
      </button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <img src="/company-logo.png" alt="company-logo" className="h-8 text-red-600 dark:text-red-500 hidden md:block" />
        </div>

        <div className="flex items-center space-x-3">
          {/* score display left of avatar */}
          <div className="hidden sm:flex flex-col items-end mr-2 text-right">
            <span className="text-sm text-gray-600 dark:text-gray-300">{t('score')}</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">{currentUser?.score ?? 0}</span>
          </div>

          <ProfileMenu initials={initials} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// Small self-contained language dropdown component
const LanguageDropdown: React.FC = () => {
  const { language, setLanguage } = useContext(AppContext);
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

  const select = (lang: 'en' | 'kn') => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative text-right">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-2 bg-gray-900 border border-white/20 text-white text-sm px-3 py-1 rounded hover:bg-gray-800 transition-colors">
        {language === 'kn' ? 'Kannada' : 'English'}
        <svg className={`w-3 h-3 transform transition-transform ${open ? '-rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-black border border-white/10 rounded shadow-lg z-50 py-1">
          <button onClick={() => select('en')} className={`w-full text-left px-3 py-2 text-white hover:bg-gray-800 ${language === 'en' ? 'bg-gray-800' : ''}`}>English</button>
          <button onClick={() => select('kn')} className={`w-full text-left px-3 py-2 text-white hover:bg-gray-800 ${language === 'kn' ? 'bg-gray-800' : ''}`}>Kannada</button>
        </div>
      )}
    </div>
  );
};
