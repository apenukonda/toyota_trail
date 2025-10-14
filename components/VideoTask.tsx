import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { AppContext } from "../context/AppContext";
import { Page, Question } from "../types";
import Quiz from "./Quiz";
import { ADVANCED_MODULES } from "../constants";
import {
  ChevronLeftIcon,
  PlayIcon,
  CheckIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "./icons";

type View =
  | "instructions"
  | "modules"
  | "videos"
  | "player"
  | "quiz"
  | "completed";

interface VideoProgress {
  [videoId: string]: {
    watchedSeconds: number;
    isComplete: boolean;
  };
}

const VideoTask: React.FC = () => {
  const {
    currentUser,
    setCurrentPage,
    updateTaskCompletion,
    getVideoProgress,
    updateVideoProgress,
    addScore,
    t,
    language,
  } = useContext(AppContext);
  const [view, setView] = useState<View>("instructions");
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState<VideoProgress>({});
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>(
    []
  );
  
  const [startedQuiz, setStartedQuiz] = useState(false);
  const [showBackWarning, setShowBackWarning] = useState(false);
  const [currentQuizScore, setCurrentQuizScore] = useState(0);
  // Track per-video quiz scores
  const [quizScores, setQuizScores] = useState<{ [videoId: string]: number }>(
    {}
  );

  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const fetchInitialProgress = useCallback(async () => {
    if (currentUser) {
      const progress = await getVideoProgress(currentUser.id);
      const typedProgress = progress as VideoProgress;
      setVideoProgress(typedProgress || {});
      // Do NOT call updateTaskCompletion here; score should only update after quiz completion
    }
  }, [currentUser, getVideoProgress, updateTaskCompletion]);

  useEffect(() => {
    fetchInitialProgress();
  }, [fetchInitialProgress]);

  // Effect to manage the YouTube Player lifecycle
  useEffect(() => {
    // If we're not in player view, ensure any existing player is destroyed.
    if (view !== "player") {
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      return;
    }

    const currentModule = ADVANCED_MODULES[currentModuleIndex];
    const currentVideo = currentModule.videos[currentVideoIndex];
    const videoId = currentVideo.id;

    const createPlayer = () => {
      // Ensure the container exists and a player isn't already there.
      if (!playerContainerRef.current || playerRef.current) {
        return;
      }

      playerRef.current = new (window as any).YT.Player(
        playerContainerRef.current,
        {
          videoId,
          playerVars: { autoplay: 1, controls: 1, modestbranding: 1, rel: 0 },
          events: {
            onReady: (event: any) => {
              setVideoDuration(event.target.getDuration());
            },
            onStateChange: (event: any) => {
              if (event.data === (window as any).YT.PlayerState.ENDED) {
                const duration = event.target.getDuration();
                updateVideoProgress(videoId, duration, true);
                setVideoProgress((prev) => ({
                  ...prev,
                  [videoId]: {
                    ...prev[videoId],
                    watchedSeconds: duration,
                    isComplete: true,
                  },
                }));
              }
            },
          },
        }
      );
    };

    // If the YouTube script is already loaded, create the player immediately.
    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    } else {
      // Set the global callback function that the YouTube script will call when it's ready.
      (window as any).onYouTubeIframeAPIReady = createPlayer;

      // If the script tag isn't on the page yet, add it.
      if (
        !document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]'
        )
      ) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    // Cleanup function to destroy the player when the component unmounts or view changes.
    return () => {
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [view, currentVideoIndex]);

  // Effect for tracking progress periodically
  useEffect(() => {
    if (view !== "player") return;

    const progressInterval = setInterval(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.getCurrentTime === "function" &&
        playerRef.current.getPlayerState() === 1
      ) {
        // 1 = playing
        const currentTime = Math.floor(playerRef.current.getCurrentTime());
        const currentModule = ADVANCED_MODULES[currentModuleIndex];
        const currentVideo = currentModule.videos[currentVideoIndex];
        const videoId = currentVideo.id;

        setVideoProgress((prev) => {
          const currentProgress = prev[videoId] || {
            watchedSeconds: 0,
            isComplete: false,
          };
          if (currentTime > currentProgress.watchedSeconds) {
            updateVideoProgress(
              videoId,
              currentTime,
              currentProgress.isComplete
            );
            return {
              ...prev,
              [videoId]: { ...currentProgress, watchedSeconds: currentTime },
            };
          }
          return prev;
        });
      }
    }, 2000);

    return () => clearInterval(progressInterval);
  }, [view, currentVideoIndex, updateVideoProgress]);

  const selectModule = (index: number) => {
    setCurrentModuleIndex(index);
    setCurrentVideoIndex(0);
    setView("videos");
  };

  const selectVideo = (index: number) => {
    setCurrentVideoIndex(index);
    setCurrentQuizQuestions([]); // Reset quiz questions when selecting a new video
    setStartedQuiz(false); // Reset quiz started flag
    setCurrentQuizScore(0); // Reset quiz score
    setView("player");
  };

  const getRandomQuestions = (questions: Question[], count: number) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleQuizComplete = useCallback(
    async (score: number) => {
      const currentModule = ADVANCED_MODULES[currentModuleIndex];
      const currentVideo = currentModule.videos[currentVideoIndex];
      const videoId = currentVideo.id;

      // Mark video as complete and update progress
      await updateVideoProgress(
        videoId,
        videoProgress[videoId]?.watchedSeconds || videoDuration,
        true
      );
      const newProgress = {
        ...videoProgress,
        [videoId]: {
          watchedSeconds:
            videoProgress[videoId]?.watchedSeconds || videoDuration,
          isComplete: true,
        },
      };
      setVideoProgress(newProgress);

      setQuizScores((prev) => {
        const updated = { ...prev, [videoId]: score };
        // Check if current module is fully completed
        // const moduleVideoIds = currentModule.videos.map(v => v.id);   PREVIOUS CODE
        // const moduleCompleted = moduleVideoIds.every(id => newProgress[id]?.isComplete);
        // if (moduleCompleted) {
        //   // Only update score and steps when module is completed
        //   const moduleScore = moduleVideoIds.reduce((sum, id) => sum + (updated[id] || 0), 0);
        //   const questionsPerVideo = 7; // adjust if needed
        //   updateTaskCompletion('task6', moduleVideoIds.length * questionsPerVideo, moduleScore);
        // } PREVIOUS CODE

        // Update score after each quiz completion
        const completedVideos = Object.values(newProgress).filter(
          (p: { isComplete: boolean }) => p.isComplete
        ).length;
        const totalScore = Object.values(updated).reduce(
          (sum: number, s: number) => sum + s,
          0
        );
        const questionsPerVideo = 7; // adjust if needed
        updateTaskCompletion(
          "task6",
          completedVideos * questionsPerVideo,
          totalScore
        );
        return updated;
      });

      // Check if all videos in all modules are completed
      const completedCount = Object.values(newProgress).filter(
        (p) => (p as { isComplete: boolean }).isComplete
      ).length;
      const totalVideos = ADVANCED_MODULES.reduce(
        (sum, module) => sum + module.videos.length,
        0
      );
      if (completedCount === totalVideos) {
        setView("completed");
      } else {
        setView("videos");
      }
    },
    [
      currentModuleIndex,
      currentVideoIndex,
      videoDuration,
      updateTaskCompletion,
      updateVideoProgress,
      videoProgress,
      currentQuizQuestions,
    ]
  );

  const handleBack = () => {
    if (view === "modules" || view === "completed" || view === "instructions") {
      setCurrentPage(Page.DASHBOARD);
    } else if (view === "videos") {
      setView("modules");
    } else if (view === "quiz" && startedQuiz) {
      setShowBackWarning(true);
    } else {
      setView("videos");
    }
  };

  const confirmBack = () => {
    setShowBackWarning(false);
    // Mark as completed with current score for this video, and update total
    const currentModule = ADVANCED_MODULES[currentModuleIndex];
    const currentVideo = currentModule.videos[currentVideoIndex];
    const videoId = currentVideo.id;
    const maxQuizScore =
      currentQuizQuestions.length > 0 ? currentQuizQuestions.length : 7;
    // Update per-video quiz score
    setQuizScores((prev) => {
      const updated = { ...prev, [videoId]: currentQuizScore };
      // Calculate per-module completion and score
      let totalScore = 0;
      let completedSteps = 0;
      ADVANCED_MODULES.forEach((module) => {
        const moduleVideoIds = module.videos.map((v) => v.id);
        const moduleCompleted = moduleVideoIds.every(
          (id) => videoProgress[id]?.isComplete
        );
        if (moduleCompleted) {
          // Sum scores for this module
          const moduleScore = moduleVideoIds.reduce(
            (sum, id) => sum + (updated[id] || 0),
            0
          );
          totalScore += moduleScore;
          completedSteps += module.videos.length;
        }
      });
      updateTaskCompletion("task6", completedSteps, totalScore);
      return updated;
    });
    setView("videos");
  };

  const cancelBack = () => {
    setShowBackWarning(false);
  };

  const currentModule = ADVANCED_MODULES[currentModuleIndex];
  const currentVideo = currentModule?.videos[currentVideoIndex];
  const currentVideoId = currentVideo?.id;
  const isVideoWatched =
    currentVideoId &&
    (videoProgress[currentVideoId]?.isComplete ||
      ((videoProgress[currentVideoId]?.watchedSeconds || 0) >=
        videoDuration * 0.95 &&
        videoDuration > 0));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24 animate-fade-in">
      <button
        onClick={handleBack}
        className="absolute top-20 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-black hover:text-red-500 transition-colors"
      >
        <ChevronLeftIcon className="w-6 h-6" />
        {t("back")}
      </button>

      <div
        className={`w-full max-w-2xl text-center ${
          view === "instructions" ? "" : "hidden"
        }`}
      >
        <h1 className="text-4xl font-bold mb-4">
          {t("Advanced Quality Principles")}
        </h1>
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-semibold text-black mb-4">
            {t("Instructions Title") || "Instructions"}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-black text-left">
            <li>
              This module consists of video lessons and quizzes,worth a total of
              70 points.
            </li>
            <li>You must watch each video to unlock a 7-point quiz.</li>
            <li>Complete all videos and quizzes to finish this task.</li>
            <li>Your progress is saved automatically.</li>
          </ul>
        </div>
        <button
          onClick={() => setView("modules")}
          className="mt-8 px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
        >
          {t("Start Learning")}
        </button>
      </div>

      <div
        className={`w-full max-w-2xl text-center ${
          view === "modules" ? "" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">
          {t("Advanced Quality Principles")}
        </h1>
        <div className="space-y-4">
          {ADVANCED_MODULES.map((module, index) => {
            const moduleVideos = module.videos;
            const completedVideos = moduleVideos.filter(
              (video) => videoProgress[video.id]?.isComplete
            ).length;
            const isModuleComplete = completedVideos === moduleVideos.length;
            return (
              <button
                key={module.id}
                onClick={() => selectModule(index)}
                disabled={isModuleComplete}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between items-center text-left disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100/50 transition-colors"
              >
                <div className="flex items-center">
                  <span
                    className={`mr-4 font-bold ${
                      isModuleComplete ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isModuleComplete ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      module.id
                    )}
                  </span>
                  <span>
                    {language === "kn"
                      ? module.titleKn || module.title
                      : module.title}
                  </span>
                </div>
                {module.id === "M3" ? (
                  <span className="font-bold text-blue-500">
                    {t("Coming Soon")}
                  </span>
                ) : isModuleComplete ? (
                  <span className="font-bold text-green-500">{t("done")}</span>
                ) : (
                  <span className="text-sm text-gray-500">
                    {completedVideos}/{moduleVideos.length} {t("videos")}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`w-full max-w-2xl text-center ${
          view === "videos" ? "" : "hidden"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6">
          {language === "kn"
            ? currentModule?.titleKn || currentModule?.title
            : currentModule?.title}
        </h1>
        <div className="space-y-4">
          {currentModule?.videos.map((video, index) => {
            const progress = videoProgress[video.id];
            const isComplete = progress?.isComplete;
            return (
              <button
                key={video.id}
                onClick={() => selectVideo(index)}
                disabled={isComplete}
                className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between items-center text-left disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-100/50 transition-colors"
              >
                <div className="flex items-center">
                  <span
                    className={`mr-4 font-bold ${
                      isComplete ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      `V${index + 1}`
                    )}
                  </span>
                  <span>
                    {language === "kn"
                      ? video.titleKn || video.title
                      : video.title}
                  </span>
                </div>
                {isComplete ? (
                  <span className="font-bold text-green-500">{t("done")}</span>
                ) : (
                  <PlayIcon className="w-6 h-6" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`w-full max-w-4xl ${view === "player" ? "" : "hidden"}`}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {language === "kn"
            ? currentVideo?.titleKn || currentVideo?.title
            : currentVideo?.title}
        </h2>
        <div className="aspect-video bg-black rounded-lg shadow-lg overflow-hidden">
          <div ref={playerContainerRef} className="w-full h-full"></div>
        </div>
        <div className="mt-4 text-center">
          {isVideoWatched ? (
            <button
              onClick={() => {
                if (currentQuizQuestions.length === 0) {
                  const quizQuestions = getRandomQuestions(
                    currentModule?.quizzes[currentVideoIndex] || [],
                    7
                  );
                  setCurrentQuizQuestions(quizQuestions);
                }
                setStartedQuiz(true);
                setView("quiz");
              }}
              className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
            >
              {t("Proceed to Quiz")}
            </button>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("Watch to Unlock")}
            </p>
          )}
        </div>
      </div>

      {view === "quiz" && (
        <Quiz
          questions={currentQuizQuestions}
          onComplete={handleQuizComplete}
          onScoreUpdate={setCurrentQuizScore}
        />
      )}

      {/* {showBackWarning && (
        // <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        //   <div
        //     className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center transform transition-all scale-95 opacity-0 animate-fade-in"
        //     style={{
        //       animationDelay: "100ms",
        //       animationFillMode: "forwards",
        //       animationName: "zoomIn",
        //     }}
        //   >
        //     <style>{`@keyframes zoomIn { to { transform: scale(1); opacity: 1; } }`}</style>
        //     <button
        //       onClick={cancelBack}
        //       className="absolute top-3 right-3 text-black hover:text-red-500"
        //     >
        //       <XCircleIcon className="w-8 h-8" />
        //     </button>
        //     <h2 className="text-2xl font-extrabold text-black mb-4">
        //       {t("warning_title")}
        //     </h2>
        //     <p className="text-black mb-6">
        //       {t("warning_text_prefix")}{" "}
        //       <strong>
        //         {currentQuizScore} {t("points_label")}
        //       </strong>{" "}
        //       {t("warning_text_suffix")}
        //     </p>
        //     <div className="flex gap-4">
        //       <button
        //         onClick={cancelBack}
        //         className="flex-1 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-300 transition-colors"
        //       >
        //         {t("cancel")}
        //       </button>
        //       <button
        //         onClick={confirmBack}
        //         className="flex-1 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
        //       >
        //         {t("Yes Go Back")}
        //       </button>
        //     </div>
        //   </div>
        // </div> PREVIOUS CODE

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-4">
            <h3 className="text-xl font-bold text-red-600 mb-4">{t('warning_title')}</h3>
            <p className="text-gray-700 mb-4">
              {t('warning_text_prefix')} <strong>{currentQuizScore} {t('score')}</strong> {t('warning_text_suffix')}
            </p>
            <div className="flex gap-4 justify-end">
              <button onClick={cancelBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                {t('cancel')}
              </button>
              <button onClick={confirmBack} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                {t('Yes Go Back')}
              </button>
            </div>
          </div>
        </div>
      )} */}

      <div className={`text-center ${view === "completed" ? "" : "hidden"}`}>
        <CheckCircleIcon className="w-24 h-24 text-green-500 mx--auto mb-4" />
        <h2 className="text-3xl font-bold">{t("Task completed")}</h2>
        <p className="mt-2 text-lg text-black">
          {t("Video Task Completed Message")}
        </p>
        <button
          onClick={() => setCurrentPage(Page.DASHBOARD)}
          className="mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
        >
          {t("Return to Dashboard")}
        </button>
      </div>
    </div>
  );
};

export default VideoTask;
