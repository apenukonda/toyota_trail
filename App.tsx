import React, { useContext } from 'react';
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

const App: React.FC = () => {
  const { currentPage, theme, currentUser } = useContext(AppContext);
  const { language } = useContext(AppContext);

  const renderPage = () => {
    switch (currentPage) {
      case Page.LOGIN:
      case Page.SIGNUP:
        return <AuthPage />;
      case Page.DASHBOARD:
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
                    title="Slogan Writer" 
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
                    title="Suggestion Box" 
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
