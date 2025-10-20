import React, { useContext, useEffect } from 'react';
import { AppContext } from './context/AppContext';
import { Page } from './types';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import MdMessageTask from './components/MdMessageTask';
import PlaceholderTask from './components/PlaceholderTask';
import VideoTask from './components/VideoTask';
import ImageSubmissionTask from './components/ImageSubmissionTask';
import TopPerformers from './components/TopPerformers';
import KnowledgeCentrePage from './components/KnowledgeCentrePage';
import KnFontScaler from './components/KnFontScaler';
import Admin from './components/admin/Admin';
import KaizenSuggestionTask from './components/KaizenSuggestionTask';

const App: React.FC = () => {
  const { currentPage, theme, currentUser } = useContext(AppContext);
  const { language } = useContext(AppContext);

  const renderPage = () => {
    const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'ADMIN');
    const pathnameIsAdmin = typeof window !== 'undefined' && window.location.pathname === '/admin';

    // If user directly navigates to /admin, handle it first
    if (pathnameIsAdmin) {
      if (isAdmin) return <Admin />;
      // non-admin trying to access /admin -> fall back to home
      return <HomePage />;
    }
    switch (currentPage) {
      case Page.LOGIN:
      case Page.SIGNUP:
        return <AuthPage />;
      case Page.DASHBOARD:
        // if the logged in user has an admin role, show the admin landing
        if (isAdmin) {
          return <Admin />;
        }
        return <Dashboard />;
      case Page.MD_MESSAGE:
        return <MdMessageTask />;
      case Page.TOP_PERFORMERS:
        return <TopPerformers />;
      case Page.KNOWLEDGE_CENTRE:
        return <KnowledgeCentrePage />;
      case Page.VIDEO_TASK:
        return <VideoTask />;
    case Page.IMAGE_SUBMISSION:
      return <ImageSubmissionTask />;
    case Page.SLOGAN_WRITER:
      return <PlaceholderTask
          taskId="task4" 
          title="Slogan Competition" 
          instructions={[
            "The theme for this year is 'Think Differently.'",
            "Craft a catchy and inspiring slogan related to quality and innovation.",
            "Submissions will be reviewed by the management committee.",
            "The winning slogan will be featured in next month's company-wide newsletter."
          ]}
          score={3}
         />;
    case Page.SUGGESTION_BOX:
      return <PlaceholderTask
          taskId="task5"
          title="Kaizen Suggestion"
          instructions={[
            "This is your chance to contribute to Kaizen (Continuous Improvement).",
            "Think about a process in your daily work that could be more efficient or safer.",
            "Describe the problem and your proposed solution.",
            "All suggestions will be evaluated for feasibility and impact."
          ]}
          score={3}
         />;
      case Page.HOME:
      default:
        return <HomePage />;
    }
  };

  // Keep the browser URL in sync: if an admin is viewing dashboard, push /admin.
  useEffect(() => {
    const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.role === 'ADMIN');
    if (typeof window === 'undefined') return;

    if (isAdmin && (currentPage === Page.DASHBOARD || window.location.pathname === '/admin')) {
      if (window.location.pathname !== '/admin') {
        window.history.replaceState(null, '', '/admin');
      }
    } else {
      // if a non-admin is on /admin, push them to home
      if (window.location.pathname === '/admin' && !isAdmin) {
        window.history.replaceState(null, '', '/');
      }
    }
  }, [currentUser, currentPage]);

  return (
    <div className={`${theme} transition-colors duration-500`}>
      <div className="bg-white text-gray-900 min-h-screen">
        {/* Global Kannada font-size scaler */}
        <KnFontScaler enabled={language === 'kn'} />
        {currentUser && <Navbar />}
        <main>{renderPage()}</main>
      </div>
    </div>
  );
};

export default App;
