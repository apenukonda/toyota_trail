import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Page } from '../types';
import EventCard from './EventCard';
import CongratulationsModal from './CongratulationsModal';
import TopScoresModal from './TopScoresModal';
import KnowledgeCentreModal from './KnowledgeCentreModel';

const Dashboard: React.FC = () => {
  const { tasks } = useContext(AppContext);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showTopScores, setShowTopScores] = useState(false);
  const [showKnowledgeCentre, setShowKnowledgeCentre] = useState(false);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [showWelcomeClose, setShowWelcomeClose] = useState(false);
  const welcomeVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const countdownIntervalRef = React.useRef<number | null>(null);
  const revealTimeoutRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const { setCurrentPage } = useContext(AppContext);

  const allTasksCompleted = tasks.every(task => task.completedSteps === task.totalSteps);

  useEffect(() => {
    if (allTasksCompleted) {
      const timer = setTimeout(() => setShowCongrats(true), 500);
      return () => clearTimeout(timer);
    }
  }, [allTasksCompleted]);

  // Play a welcome video after signup. Auth flow sets localStorage 'show_welcome_video' = '1'
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage.getItem('show_welcome_video')) {
        window.localStorage.removeItem('show_welcome_video');
        setShowWelcomeVideo(true);
        // start a strict 10s countdown (independent of playback) and reveal Close when it ends
        setCountdown(10);
        setShowWelcomeClose(false);
        // Start a DOM-based countdown/reveal as a robust fallback
        const start = Date.now();
        // update DOM countdown text and reveal Close button after 10s
        const update = () => {
          const cdEl = document.getElementById('welcome-countdown');
          const closeEl = document.getElementById('welcome-close-wrapper');
          const elapsed = Math.floor((Date.now() - start) / 1000);
          const sec = Math.max(0, 10 - elapsed);
          if (cdEl) cdEl.textContent = `Close available in ${sec}s`;
          if (sec <= 0) {
            if (closeEl) closeEl.style.display = 'inline-block';
            return;
          }
          // schedule next update
          window.setTimeout(update, 300);
        };
        update();

        // Also ensure React state fallback is set so UI can re-render if needed
        setCountdown(10);
        setShowWelcomeClose(false);

        return () => {
          // clear the countdown text and ensure Close hidden
          const cdEl = document.getElementById('welcome-countdown'); if (cdEl) cdEl.textContent = '';
          const closeEl = document.getElementById('welcome-close-wrapper'); if (closeEl) closeEl.style.display = 'none';
        };
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const { t, language } = useContext(AppContext);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 animate-fade-in">
      <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {language === 'kn' ? '2025 - ಗುಣಮಟ್ಟ ತಿಂಗಳ ಇವೆಂಟ್ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ' : 'Welcome to Quality Month - 2025 Event Portal'}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'kn' ? 'ಅಂಕಗಳನ್ನು ಗಳಿಸಲು ಮತ್ತು ಸ್ಪರ್ಧಿಸಲು ಎಲ್ಲಾ ಮಾದರಿಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ!.' : 'Complete the modules below to earn your points and compete.'}
          </p>
        <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(Page.TOP_PERFORMERS)}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full transform hover:scale-105 transition-transform duration-200 ease-in-out shadow-md"
            >
              {t('view_top_scores')}
            </button>
             <button
                onClick={() => setCurrentPage(Page.KNOWLEDGE_CENTRE)}
                className="px-6 py-2 bg-white border border-gray-200 text-gray-800 font-semibold rounded-full transform hover:scale-105 transition-transform duration-200 ease-in-out shadow-sm"
              >
                {t('knowledge_centre')}
              </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks.map((task, index) => (
          <div key={task.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
            <EventCard task={task} />
          </div>
        ))}
      </div>
      
      {showCongrats && <CongratulationsModal onClose={() => setShowCongrats(false)} />}
      {showWelcomeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-auto overflow-hidden shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0b2136] text-white">
              <div className="flex items-center gap-3">
                <img src="/company-logo.png" alt="logo" className="h-8 w-8 rounded" />
                <div>
                  <div className="text-sm font-semibold">Welcome to Quality Month</div>
                  <div className="text-xs opacity-80">Watch this short welcome video to get started</div>
                </div>
              </div>
              <div className="flex items-center gap-3" id="welcome-controls">
                <button
                  onClick={() => {
                    const v = !muted;
                    setMuted(v);
                    try { if (welcomeVideoRef.current) welcomeVideoRef.current.muted = v; } catch {}
                  }}
                  className="text-sm px-3 py-1 bg-white/10 rounded-md hover:bg-white/20"
                >
                  {muted ? 'Muted' : 'Unmuted'}
                </button>
                <span id="welcome-close-wrapper" style={{display: 'none'}}>
                  <button
                    onClick={() => {
                      try { welcomeVideoRef.current?.pause(); } catch {};
                      setShowWelcomeVideo(false);
                      setShowWelcomeClose(false);
                      setCountdown(10);
                      // cleanup any DOM timers if present
                      const cd = document.getElementById('welcome-countdown'); if (cd) cd.textContent = '';
                    }}
                    className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Close
                  </button>
                </span>
                <span id="welcome-countdown" className="text-sm opacity-80">Close available in {countdown}s</span>
              </div>
            </div>

            {/* Debug overlay removed */}

            <div className="bg-white">
              <video
                ref={welcomeVideoRef}
                src="/welcome.mp4"
                autoPlay
                muted={muted}
                playsInline
                controls
                preload="auto"
                className="w-full h-auto block bg-white"
                onLoadedMetadata={(e) => {
                  const d = (e.target as HTMLVideoElement).duration || 0;
                  setDuration(d);
                }}
                onTimeUpdate={(e) => {
                  const cur = (e.target as HTMLVideoElement).currentTime || 0;
                  setCurrentTime(cur);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => { setIsPlaying(false); setShowWelcomeClose(true); }}
              />
              <div className="p-4 bg-[#0b2136] text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const v = welcomeVideoRef.current;
                      if (!v) return;
                      if (v.paused) { v.play(); setIsPlaying(true); }
                      else { v.pause(); setIsPlaying(false); }
                    }}
                    className="px-3 py-1 bg-white text-black rounded-md hover:opacity-90"
                  >
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <div className="flex-1">
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      step={0.1}
                      value={currentTime}
                      onChange={(e) => {
                        const v = welcomeVideoRef.current;
                        const val = Number(e.target.value);
                        if (v) { v.currentTime = val; setCurrentTime(val); }
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs opacity-70 mt-1">
                      <div>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</div>
                      <div>{duration ? new Date(duration * 1000).toISOString().substr(14, 5) : '00:00'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
  {/* Top performers and Knowledge Centre now have dedicated pages */}
    </div>
  );
};

export default Dashboard;