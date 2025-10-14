import React, { useContext, useState } from 'react';
import { ADVANCED_MODULES } from '../constants';
import { ChevronLeftIcon, XCircleIcon } from './icons';
import { AppContext } from '../context/AppContext';
import { Page, VideoModule, VideoItem } from '../types';

const KnowledgeCentrePage: React.FC = () => {
  const { setCurrentPage, language, t } = useContext(AppContext);
  const [selectedModule, setSelectedModule] = useState<VideoModule | null>(null);

  return (
    <div className="min-h-screen p-6 pt-24 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => setCurrentPage(Page.DASHBOARD)} className="flex items-center gap-2 text-black hover:text-red-500 mb-6">
          <ChevronLeftIcon className="w-6 h-6" />
          {t('back_to_dashboard')}
        </button>

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">{t('knowledge_centre') || (language === 'kn' ? 'ಜ್ಞಾನ ಕೇಂದ್ರ' : 'Knowledge Centre')}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('Knowledge Centre Sub') || (language === 'kn' ? 'ಎಲ್ಲಾ ವಿದ್ಯಾ ಸಂಪನ್ಮೂಲಗಳ ಸಂಗ್ರಹ' : 'A curated collection of learning resources')}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANCED_MODULES.map((module: VideoModule) => (
            <div key={module.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-red-600 mb-1">{module.id}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{language === 'kn' ? (module.titleKn || module.title) : module.title}</h3>
                    <p className="text-sm text-gray-500">{module.videos.length} {t('videos') || (language === 'kn' ? 'ವೀಡಿಯೋಗಳು' : 'videos')}</p>
                  </div>
                  <div className="ml-4 flex items-center">
                    <button onClick={() => setSelectedModule(module)} className="px-4 py-2 bg-red-600 text-white rounded-lg">{t('Open') || (language === 'kn' ? 'ತೆರೆ' : 'Open')}</button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {module.videos.slice(0,4).map((v: VideoItem) => (
                  <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} className="w-full h-28 object-cover" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedModule && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full text-left overflow-hidden">
            <button onClick={() => setSelectedModule(null)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-10">
              <XCircleIcon className="w-8 h-8" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{language === 'kn' ? (selectedModule.titleKn || selectedModule.title) : selectedModule.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{selectedModule.videos.length} {t('videos') || (language === 'kn' ? 'ವೀಡಿಯೋಗಳು' : 'videos')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedModule.videos.map((vid: VideoItem) => (
                  <a key={vid.id} href={`https://www.youtube.com/watch?v=${vid.id}`} target="_blank" rel="noopener noreferrer" className="block bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4 p-3">
                      <img src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`} alt={vid.title} className="w-36 h-20 object-cover rounded-md" />
                      <div>
                        <div className="font-semibold text-gray-900">{vid.title}</div>
                        <div className="text-sm text-gray-500">{t('Play on YouTube') || (language === 'kn' ? 'YouTube ನಲ್ಲಿ ಆಡಿ' : 'Play on YouTube')}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeCentrePage;