import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Page, User, Task, Department, Designation } from '../types';
import { INITIAL_TASKS } from '../constants';

import supabaseClient from './supabaseClient';

interface AppContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  currentUser: User | null;
  language: 'en' | 'kn';
  setLanguage: (lang: 'en' | 'kn') => void;
  // language selection removed; translations are fixed to English
  t: (key: string) => string;
  login: (userId: string, passcode: string, role: 'user' | 'admin') => Promise<{ success: boolean; error?: string }>;
  signup: (details: { userId: string, name: string, department: Department, designation: Designation, passcode: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  tasks: Task[];
  updateTaskCompletion: (taskId: string, completedSteps: number, scoreEarned: number) => Promise<void>;
  updateModuleTask?: (moduleName: string, taskIndex: number, completed: boolean, score: number) => Promise<number | null>;
  resetTasks: () => Promise<void>;
  getVideoProgress: (userId: string) => Promise<any>;
  updateVideoProgress: (videoId: string, watchedSeconds: number, isComplete: boolean) => Promise<void>;
  getSubmission: (taskId: string) => Promise<{ data: { image_url: string }[] | null, error: any }>;
  submitImageUrl: (taskId: string, imageUrl: string) => Promise<{ success: boolean; error?: any }>;
  getTopScores: (department?: string) => Promise<{ name: string; department: string; score: number }[]>;
  getTaskScore: (taskId: string) => Promise<number>;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setLanguageState] = useState<'en' | 'kn'>('en');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const SESSION_EXPIRY_DAYS = 7;
  const SESSION_KEY = 'toyota_quality_session';
  const LANG_KEY = 'toyota_quality_lang';
  const PAGE_KEY = 'toyota_quality_page';

  const saveSession = (user: User) => {
    const expiry = Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const session = { user, expiry };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  };

  // For compatibility with Supabase password requirements (min length 6),
  // transform the user-facing 4-digit passcode into a stronger password by
  // appending a fixed suffix. This keeps the UX of a 4-digit passcode while
  // ensuring signup/login to Supabase succeeds. The suffix must be kept
  // consistent between signup and login. Note: storing plaintext passcodes in
  // metadata (done elsewhere) is insecure but preserved for backward-compatibility
  // with the existing DB trigger that populates profiles.passcode.
  const PASSCODE_SUFFIX = '!TQM';
  const mapPasscodeToPassword = (passcode: string) => `${passcode}${PASSCODE_SUFFIX}`;

  const loadSession = (): User | null => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    try {
      const session = JSON.parse(stored);
      if (Date.now() > session.expiry) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return session.user;
    } catch {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
  };
  
  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const fetchUserTasks = async (userId: string) => {
    const { data, error } = await supabaseClient
        .from('user_tasks')
        .select('task_id, completed_steps, score')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching tasks:', error.message);
        setTasks(INITIAL_TASKS);
        return;
    }
    
    // FIX: Explicitly typing the Map avoids type inference issues, allowing safe property access.
    const userProgress = new Map<string, { completed: number; score: number; }>(data.map(item => [item.task_id, { completed: item.completed_steps, score: item.score }]));
    const updatedTasks = INITIAL_TASKS.map(task => ({
        ...task,
        // FIX: The property 'completed' can now be safely accessed. Redundant Number() wrapper removed.
        completedSteps: userProgress.get(task.id)?.completed || 0,
    }));
    setTasks(updatedTasks);
  };


  useEffect(() => {
    setTheme('dark');

    // Load saved language preference (if any)
    try {
      const savedLang = localStorage.getItem(LANG_KEY);
      if (savedLang === 'kn' || savedLang === 'en') setLanguageState(savedLang as 'en' | 'kn');
    } catch (e) {
      // ignore localStorage errors
    }

    // Load session from localStorage on mount
    const storedUser = loadSession();

    // Restore saved page (if any). Support both numeric values and enum-name strings.
    let savedPage: Page | null = null;
    try {
      const sp = localStorage.getItem(PAGE_KEY);
      if (sp !== null) {
        const p = parseInt(sp, 10);
        if (!Number.isNaN(p)) {
          savedPage = p as Page;
        } else {
          // Try enum name -> value, e.g. 'VIDEO_TASK'
          // TypeScript enums are reverse-mapped, so Page['VIDEO_TASK'] is a number
          const enumVal = (Page as any)[sp];
          if (typeof enumVal === 'number') savedPage = enumVal as Page;
        }
      }
    } catch (e) {
      // ignore localStorage errors
    }

    if (storedUser) {
      setCurrentUser(storedUser);
      fetchUserTasks(storedUser.id);
      // If savedPage is one of the pre-login pages, prefer dashboard
      if (savedPage === null || savedPage === Page.HOME || savedPage === Page.LOGIN || savedPage === Page.SIGNUP) {
        setCurrentPage(Page.DASHBOARD);
      } else {
        setCurrentPage(savedPage);
      }
    } else {
      setCurrentUser(null);
      setTasks(INITIAL_TASKS);
      setCurrentPage(Page.HOME);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist current page so refresh restores where user was
  useEffect(() => {
    try {
      localStorage.setItem(PAGE_KEY, String(currentPage));
    } catch (e) {
      // ignore
    }
  }, [currentPage]);

  const setLanguage = (lang: 'en' | 'kn') => {
    setLanguageState(lang);
    localStorage.setItem('toyota_quality_lang', lang);
  };

  // Basic translations map used by components via context.t(key)
  const translations: Record<'en' | 'kn', Record<string, string>> = {
    en: {
      // Advanced Quality Principles page
      'Advanced Quality Principles': 'Advanced Quality Principles',
      'Instructions Title': 'Instructions Title',
      advanced_instructions_bullet_1: 'This module consists of video lessons and quizzes, worth a total of 70 points.',
      advanced_instructions_bullet_2: 'You must watch each video to unlock a 7-point quiz.',
      advanced_instructions_bullet_3: 'Complete all videos and quizzes to finish this task.',
      advanced_instructions_bullet_4: 'Your progress is saved automatically.',
      'Start Learning': 'Start Learning',
      md_message_title: 'A Message from the Managing Director',
      start_quiz: 'Start Quiz (7 Points)',
      task_completed_title: 'Task Completed!',
      task_completed_message: "You've successfully completed the MD Message module.",
      dashboard: 'Dashboard',
      welcome: 'Welcome,',
      score: 'Score',
      points: 'Points',
      points_label: 'Points',
      progress_label: 'Progress',
      start_task: 'Start Task',
      completed: 'Completed',
      view_top_scores: 'View Top Scores',
  top_performers: 'Top Performers',
      knowledge_centre: 'Knowledge Centre',
      logout: 'Logout',
      question_label: 'Question',
      time_up_incorrect: 'Time up! Incorrect!',
      correct: 'Correct!',
      incorrect: 'Incorrect!',
      next_question: 'Next Question',
      finish_quiz: 'Finish Quiz',
  back: 'Back',
      warning_title: 'Warning',
      warning_text_prefix: 'Warning!! You will get only',
      warning_text_suffix: 'points. All others answers will be considered incorrect answers. Are you sure want to do that?',
      cancel: 'Cancel',
      yes_go_back: 'Yes, Go Back',
      // Image submission / placeholder
      
      submission_received: 'Submission Received',
      thank_you_submission: 'Thank you for your submission! You have earned',
      image_preview: 'Image Preview:',
  upload_cartoon_instruction: 'Upload an image of a cartoon related to quality or teamwork.',
  submit_hardcopy_instruction: 'Submit the hard copy of your drawing at the HR office.',
  file_size_instruction: 'The uploaded image file size must be below 500kb.',
      click_to_upload: 'Click to upload',
  or_drag_and_drop: 'or drag and drop',
  image_submission_title: 'Image Submission (5 Points)',
  Instructions: 'Instructions',
      png_jpg_gif: 'PNG, JPG, GIF (MAX. 500KB)',
      configuration_needed: 'Configuration Needed!',
      uploading: 'Uploading...',
      loading: 'Loading...',
      submit_image: 'Submit Image',
      mark_as_complete: 'Mark as Complete',
  coming_soon: 'Coming Soon!'
  ,
  // Placeholder / development messages
  placeholder_dev_line1: 'This interactive module is currently under development. Please check back later for the full experience.',
  placeholder_dev_line2: 'For now, you can mark this task as complete to proceed.',
      correct_answer_was: 'The correct answer was:'
    },
    kn: {
  // Advanced Quality Principles translations
  'Advanced Quality Principles': 'ಅತ್ಯಾಧುನಿಕ ಗುಣಮಟ್ಟದ ತತ್ವಗಳು',
  'Video awareness and evaluation module': '\u0cb5\u0cc0\u0ca1\u0cbf\u0caf\u0cca \u0c9c\u0cbe\u0c97\u0cc3\u0ca4\u0cbf \u0cae\u0ca4\u0ccd\u0ca4\u0cc1 \u0cae\u0ccc\u0cb2\u0ccd\u0faf\u0cae\u0cbe\u0caa\u0ca8 \u0cae\u0cbe\u0ca1\u0ccd\u0caf\u0cc2\u0cb2\u0ccd',
  'Instructions Title': 'ಸೂಚನೆಗಳ ಶೀರ್ಷಿಕೆ',
  advanced_instructions_bullet_1: 'ಈ ಘಟಕವು ವೀಡಿಯೊ ಪಾಠಗಳು ಮತ್ತು ಕ್ವಿಜ್‌ಗಳನ್ನು ಒಳಗೊಂಡಿದೆ, ಒಟ್ಟು 70 ಅಂಕಗಳವರೆಗೆ.',
  advanced_instructions_bullet_2: 'ಪ್ರತೀ ವೀಡಿಯೋವನ್ನು ವೀಕ್ಷಿಸಲು ನೀವು 7 ಅಂಕಗಳ ಕ್ವಿಜ್ ಅನ್ನು ಅನ್ಲಾಕ್ ಮಾಡಬೇಕು.',
  advanced_instructions_bullet_3: 'ಈ ಟಾಸ್ಕ್ ಅನ್ನು ಮುಗಿಸಲು ಎಲ್ಲಾ ವೀಡಿಯೊಗಳು ಮತ್ತು ಕ್ವಿಜ್‌ಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.',
  advanced_instructions_bullet_4: 'ನಿಮ್ಮ ಪ್ರಗತಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಂರಕ್ಷಿಸಲಾಗುತ್ತದೆ.',
  'Start Learning': 'ಅಭ್ಯಾಸ ಪ್ರಾರಂಭಿಸಿ',
  md_message_title: 'ವ್ಯವಸ್ಥಾಪಕ ನಿರ್ದೇಶಕರಿಂದ ಸಂದೇಶ',
  start_quiz: 'ಕ್ವಿಜ್ ಪ್ರಾರಂಭಿಸಿ (7 ಅಂಕಗಳು)',
  task_completed_title: 'ಕಾರ್ಯ ಪೂರ್ಣವಾಗಿದೆ!',
  task_completed_message: 'ನೀವು ಯಶಸ್ವಿಯಾಗಿ MD ಸಂದೇಶ ಘಟಕವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ.',
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      welcome: 'ಸ್ವಾಗತ,',
      score: 'ಸ್ಕೋರ್',
      points_label: 'ಅಂಕಗಳು',
      progress_label: 'ಪ್ರಗತಿ',
      start_task: 'ಟಾಸ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಿ',
      completed: 'ಸಂಪೂರ್ಣಗೊಂಡಿದೆ',
      view_top_scores: 'ಉತ್ತಮ ಅಂಕಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
  top_performers: 'ಉತ್ತಮ ಪ್ರದರ್ಶಕರು',
      knowledge_centre: 'ಜ್ಞಾನ ಕೇಂದ್ರ',
      logout: 'ಲಾಗ್ ಔಟ್',
      question_label: 'ಪ್ರಶ್ನೆ',
      time_up_incorrect: 'ಸಮಯ ಮುಗಿಯಿತು! ತಪ್ಪಾಗಿದೆ!',
      correct: 'ಸರಿಯಾಗಿದೆ!',
      incorrect: 'ತಪ್ಪಾಗಿದೆ!',
      next_question: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
      finish_quiz: 'ಕ್ವಿಜ್ ಪೂರ್ಣಗೊಳಿಸಿ',
  back: 'ಹಿಂದಕ್ಕೆ',
      warning_title: 'ಎಚ್ಚರಿಕೆ',
      warning_text_prefix: 'ಎಚ್ಚರಿಕೆ!! ನಿಮಗೆ ಕೇವಲ',
      warning_text_suffix: 'ಅಂಕಗಳು ಸಿಗುತ್ತವೆ. ಉಳಿದ ಎಲ್ಲಾ ಉತ್ತರಗಳನ್ನು ತಪ್ಪು ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ. ನೀವು ಖಚಿತರೇ ಆಗಿರೆ? ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      yes_go_back: 'ಹೌದು, ಹಿಂದಕ್ಕೆ ಹೋಗಿ',
      // Image submission / placeholder
      
      submission_received: 'ಸಲ್ಲಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
      thank_you_submission: 'ನಿಮ್ಮ ಸಲ್ಲಿಕೆಗೆ ಧನ್ಯವಾದಗಳು! ನಿಮಗೆ ಸಿಗುತ್ತದೆ',
      image_preview: 'ಚಿತ್ರ ಪೂರ್ವದೃಶ್ಯ:',
    upload_cartoon_instruction: 'ಗುಣಮಟ್ಟ ಅಥವಾ ತಂಡಕಾರ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಕಾರ್ಟೂನ್ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    submit_hardcopy_instruction: 'ನಿಮ್ಮ ಚಿತ್ರದ ಹಾರ್ಡ್ ಕಾಪಿಯನ್ನು HR ಕಚೇರಿಗೆ ಸಲ್ಲಿಸಿ.',
    file_size_instruction: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರದ ಗಾತ್ರವು 500KB ಕಿಂತ ಕಡಿಮೆ ಇರಬೇಕು.',
      click_to_upload: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
  or_drag_and_drop: 'ಅಥವಾ ಡ್ರ್ಯಾಗ್ ಮಾಡಿ',
  image_submission_title: 'ಚಿತ್ರ ಸಲ್ಲಿಕೆ (5 ಅಂಕಗಳು)',
  Instructions: 'ಸೂಚನೆಗಳು',
      png_jpg_gif: 'PNG, JPG, GIF (ಗರಿಷ್ಟ. 500KB)',
      configuration_needed: 'ಕಾನ್ಫಿಗರೇಶನ್ ಅಗತ್ಯವಿದೆ!',
      uploading: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      loading: 'ಲೋಡಿಂಗ್...',
      submit_image: 'ಚಿತ್ರ ಸಲ್ಲಿಸಿ',
      mark_as_complete: 'ಸಂಪೂರ್ಣವಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',
  coming_soon: 'ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತದೆ!'
  ,
  // Placeholder / development messages
  placeholder_dev_line1: 'ಈ ಇಂಟರಾಕ್ಟಿವ್ ಮಾಡ್ಯೂಲ್ ಪ್ರಸ್ತುತ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿ ಇದೆ. ಪೂರ್ಣ ಅನುಭವಕ್ಕಾಗಿ ದಯವಿಟ್ಟು ನಂತರ ಪರಿಶೀಲಿಸಿ.',
  placeholder_dev_line2: 'ಈಗ ತಾತ್ಕಾಲಿಕವಾಗಿ ಈ ಟಾಸ್ಕ್ ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಬಹುದು.',
      correct_answer_was: 'ಸರಿಯಾದ ಉತ್ತರ:'
      ,
      // Quiz-specific translations (full option strings used as keys)
      'Which automobile company commonly uses the Atkinson cycle in its hybrid vehicles?': 'ಯಾವ್ ಕಂಪನಿ ಸಾಮಾನ್ಯವಾಗಿ ಅದರ ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ ಅಟ್ಕಿನ್‌ಸನ್ ಚಕ್ರವನ್ನು ಬಳಸುತ್ತದೆ?',
      'Honda': 'ಹೋಂಡಾ',
      'Ford': 'ಫೋರ್ಡ್',
      'Toyota': 'ಟೊಯೋಟಾ',
      'Hyundai': 'ಹುಂಡೈ'
  ,
  // M1 video quiz translations (questions + some options)
  'Who first proposed the Atkinson cycle?': 'ಅಟ್ಕಿನ್ಸನ್ ಚಕ್ರವನ್ನು ಮೊದಲು ಯಾರು ಪ್ರಸ್ತಾವಿಸಿದರು?',
  'Nikolaus Otto': 'ನಿಕೋಲೌಸ್ ಒಟ್ಟೋ',
  'James Atkinson': 'ಜೆಮ್ಸ್ ಅಟ್ಕಿನ್ಸನ್',
  'Rudolf Diesel': 'ರುಡೋಲ್ಫ್ ಡೀಸೆಲ್',
  'Karl Benz': 'ಕಾರ್ಲ್ ಬೆನ್ಜ್',
  'In which year was the Atkinson cycle first proposed?': 'ಅಟ್ಕಿನ್ಸನ್ ಚಕ್ರ ಯಾವ ವರ್ಷದಲ್ಲಿ ಮೊದಲೇ ಪ್ರಸ್ತಾವಿಸಲಾಯಿತು?',
  '1876': '1876',
  '1882': '1882',
  '1890': '1890',
  '1901': '1901',
  'The Atkinson cycle uses a different thermodynamic process than which common engine cycle?': 'ಅಟ್ಕಿನ್ಸನ್ ಚಕ್ರವು ಯಾವ ಸಾಮಾನ್ಯ ಎಂಜಿನ್ ಚಕ್ರದಂತಹ ವಿಭಿನ್ನ ತಾಪಗತಿಶಾಸ್ತ್ರೀಯ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಬಳಸುತ್ತದೆ?',
  'Diesel cycle': 'ಡೀಸೆಲ್ ಚಕ್ರ',
  'Otto cycle': 'ಒಟ್ಟೋ ಚಕ್ರ',
  'Rankine cycle': 'ರಾಂಕಿನ್ ಚಕ್ರ',
  'Brayton cycle': 'ಬ್ರೇಟನ್ ಚಕ್ರ',
  'What is the main advantage of the Atkinson cycle over the Otto cycle?': 'ಒಟ್ಟೋ ಚಕ್ರಕ್ಕೆ ಹೋಲಿಸಿದರೆ ಅಟ್ಕಿನ್ಸನ್ ಚಕ್ರದ ಮುಖ್ಯ ಲಾಭವೇನು?',
  'Higher power output': 'ಹೆಚ್ಚಿನ ಶಕ್ತಿ ಔಟ್ಪುಟ್',
  'Lower fuel consumption': 'ಕಡಿಮೆ ಇಂಧನ ಬಳಕೆ',
  'Better fuel efficiency': 'ಉತ್ತಮ ಇಂಧನ ದಕ್ಷತೆ',
  'Simpler design': 'ಸರಳ ವಿನ್ಯಾಸ',
  'What is the main trade-off of using the Atkinson cycle?': 'ಅಟ್ಕಿನ್ಸನ್ ಚಕ್ರವನ್ನು ಬಳಸುವುದರಿಂದ ಮುಖ್ಯ ತ್ಯಾಗವೇನು?',
  'Reduced power output': 'ಕಡಿಮೆಯಾದ ಶಕ್ತಿ ಔಟ್ಪುಟ್',
  'Higher emissions': 'ಹೆಚ್ಚಿನ ನಿರ್ಗಮನಗಳು',
  'Lower fuel efficiency': 'ಕಡಿಮೆ ಇಂಧನ ದಕ್ಷತೆ',
  'Complex cooling system': 'ಸಂಕೀರ್ಣ ಶೀತಲಕರಣ ವ್ಯವಸ್ಥೆ',
  'How has Toyota compensated for the power loss in non-hybrid vehicles using the Atkinson cycle?': 'ಅಟ್ಕಿನ್ಸನ್ ಚಕ್ರವನ್ನು ಬಳಸುವಿರುವ ಗೆರ-ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ ಟೊಯೋಟಾ ಶಕ್ತಿ ನಷ್ಟವನ್ನು ಹೇಗೆ ಪರಿಹರಿಸಿದೆ?',
  'By switching between Atkinson and Otto cycles': 'ಅಟ್ಕಿನ್ಸನ್ ಮತ್ತು ಒಟ್ಟೋ ಚಕ್ರಗಳ ನಡುವೆ ಸ್ವಿಚ್ ಮಾಡುವ ಮೂಲಕ',
  'By using a turbocharger': 'ಟರ್ಬೋಚಾರ್ಜರ್ ಬಳಸಿ',
  'By adding more cylinders': 'ಹೆಚ್ಚಿನ ಸಿಲಿಂಡರ್‍ಗಳನ್ನು ಸೇರಿಸುವ ಮೂಲಕ',
  'By increasing compression ratio': 'ಸಂಕುಚಿತ ಅನುಪಾತವನ್ನು ಹೆಚ್ಚಿಸುವ ಮೂಲಕ',
  'In hybrid vehicles, what component helps overcome the reduced power of the Atkinson cycle?': 'ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ, ಅಟ್ಕಿನ್ಸನ್ ಚಕ್ರದ ಕಡಿಮೆಯಾದ ಶಕ್ತಿಯನ್ನು ಏನು ಪರಿಹರಿಸುತ್ತದೆ?',
  'Electric motor': 'ವಿದ್ಯುತ್ ಮೋಟಾರ್',
  'Supercharger': 'ಸೂಪರ್‌ಚಾರ್ಜರ್',
  'Turbocharger': 'ಟರ್ಬೋಚಾರ್ಜರ್',
  'Extra piston': 'ಹೆಚ್ಚಿನ ಪಿಸ್ಟನ್',
  'What stores the additional power used by the electric motor in hybrid vehicles?': 'ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ ವಿದ್ಯುತ್ ಮೋಟಾರ್ ಬಳಕೆಯ ಹೆಚ್ಚುವರಿ ಶಕ್ತಿಯನ್ನು ಏನು ಸಂಗ್ರಹಿಸುತ್ತದೆ?',
  'Battery': 'ಬ್ಯಾಟರಿ',
  'Capacitor': 'ಕ್ಯಾಪಾಸಿಟರ್',
  'Flywheel': 'ಫ್ಲೈವೀಲ್',
  'Fuel cell': 'ಫ್ಯುಯಲ್ ಸೆಲ್',
  'What does the Atkinson cycle do with the intake valves during the compression stroke?': 'Compression stroke ಸಮಯದಲ್ಲಿ ಅಟ್ಕಿನ್ಸನ್ ಚಕ್ರ intake ಕವಾಟಗೊಳವನ್ನು ಏನು ಮಾಡುತ್ತದೆ?',
  'Closes them earlier': 'ಅವುಗಳನ್ನು ಬೇಗ ಮುಚ್ಚುತ್ತದೆ',
  'Keeps them open longer': 'ಅವುಗಳನ್ನು ಹೆಚ್ಚು ಸಮಯ ತೆರೆದಿರಿಸುತ್ತದೆ',
  'Does not open them': 'ಅವುಗಳನ್ನು ತೆರೆಯುವುದಿಲ್ಲ',
  'Opens them partially': 'ಭಾಗಶಃ ತೆರೆಯುತ್ತದೆ'
    }
  };

  // Translation helper - uses selected language with English fallback
  const t = (key: string) => {
    // Resolve value according to selected language with English fallback
    const val = (language === 'en' || !translations[language]?.[key]) ? (translations['en']?.[key] || key) : translations[language][key];
    // Targeted debug: if it's the placeholder text, log what we returned so we can trace language switching issues
    if (key === 'placeholder_dev_line1' || key === 'placeholder_dev_line2') {
      // Use debug level to avoid spamming production consoles; helpful during local dev
      // eslint-disable-next-line no-console
      console.debug(`[i18n] t(${key}) -> lang=${language} => ${val}`);
    }
    return val;
  };

  const login = async (userId: string, passcode: string, role: 'user' | 'admin'): Promise<{ success: boolean; error?: string }> => {
    const trimmedUserId = userId.trim();
  const email = `${trimmedUserId}@quality-event.internal`;

  // Map the 4-digit passcode to a Supabase-compliant password
  const passwordForAuth = mapPasscodeToPassword(passcode);

  // Attempt sign in with provided passcode (transformed)
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: passwordForAuth });

    if (error) return { success: false, error: "Invalid credentials or you may need to register." };
    if (!data.user) return { success: false, error: "Authentication failed. Please try again."};

    // Fetch profile to populate app user and verify role in user metadata
    const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

    if (profileError || !profile) {
        await logout();
        return { success: false, error: "Could not find user profile." };
    }

    // Verify role from auth user metadata (Supabase returns user metadata in data.user.user_metadata)
    // Default to 'user' if metadata missing
    // @ts-ignore
    const userMetaRole = (data.user.user_metadata && data.user.user_metadata.role) || 'user';
    if (userMetaRole !== role) {
      return { success: false, error: 'Selected role does not match account role.' };
    }

    // Success, save session
    const user: User = {
      id: profile.id,
      userId: profile.user_id,
      name: profile.name,
      department: profile.department,
      designation: profile.designation,
      score: profile.score,
      role: profile.role || 'user',
    };
    saveSession(user);
    setCurrentUser(user);
    await fetchUserTasks(user.id);
    setCurrentPage(Page.DASHBOARD);
    return { success: true };
  };
  
  const signup = async (details: { userId: string; name: string; department: Department, designation: Designation, passcode: string }): Promise<{ success: boolean; error?: string }> => {
    const { userId, name, department, designation, passcode } = details;
    const trimmedUserId = userId.trim();
  const email = `${trimmedUserId}@quality-event.internal`;
  // Transform user-facing passcode to a stronger password for Supabase
  const password = mapPasscodeToPassword(passcode);

    // The trigger 'on_auth_user_created' will create the profile. Include role='user' in metadata.
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      // include passcode in user metadata so the DB trigger can populate profiles.passcode
      // NOTE: storing plaintext passcode in metadata is insecure; only do this if expected by your backend.
      data: { userId: trimmedUserId, name, department, designation, role: 'user', passcode }
    }
  });
    if (error) {
      // Normalize common 'already exists' messages into a friendlier message
      const em = (error.message || '').toLowerCase();
      if (em.includes('already registered') || em.includes('already exists') || em.includes('user already')) {
        return { success: false, error: 'User already registered. Try logging in or use a different Employee ID.' };
      }
      return { success: false, error: error.message };
    }
    if (!data.user) return { success: false, error: "Signup failed. Please try again." };

    // Fetch profile with retry to handle trigger delay
    const fetchProfileWithRetry = async (userId: string, retries = 5, delay = 500) => {
      for (let i = 0; i < retries; i++) {
        const { data: profile, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();
        if (error) return { profile: null, error };
        if (profile) return { profile, error: null };
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      return { profile: null, error: null };
    };

    const { profile, error: profileError } = await fetchProfileWithRetry(data.user.id);

    if (profileError || !profile) {
      console.error("Profile not found after signup retries.");
      await logout();
      return { success: false, error: "Account created but profile setup failed. Please login manually." };
    }

    // Success, save session
    const user: User = {
      id: profile.id,
      userId: profile.user_id,
      name: profile.name,
      department: profile.department,
      designation: profile.designation,
      score: profile.score,
      role: profile.role || 'user',
    };
    saveSession(user);
    setCurrentUser(user);
    await fetchUserTasks(user.id);
    setCurrentPage(Page.DASHBOARD);
    return { success: true };
  };

  const logout = async () => {
    clearSession();
    setCurrentUser(null);
    setTasks(INITIAL_TASKS);
    setCurrentPage(Page.HOME);
    await supabaseClient.auth.signOut();
  };



  const updateTaskCompletion = async (taskId: string, completedSteps: number, scoreEarned: number) => {
    if (!currentUser) return;

    console.log('Updating task completion:', { taskId, completedSteps, scoreEarned });
    // Prefer server-side RPC which handles inserting/updating the user_tasks row
    // and recalculates the user's total score in `profiles` atomically.
    try {
      const { data: rpcData, error: rpcError } = await supabaseClient.rpc('handle_task_completion', {
        task_id_in: taskId,
        user_id_in: currentUser.id,
        completed_steps_in: completedSteps,
        score_earned_in: scoreEarned,
      });

      console.debug('RPC handle_task_completion result:', { rpcData, rpcError });

      if (!rpcError && rpcData != null) {
        // rpc can return scalar or an object depending on DB function; try to normalize
        let newScore: number = currentUser.score + scoreEarned;
        if (typeof rpcData === 'number') {
          newScore = rpcData as number;
        } else if (Array.isArray(rpcData) && rpcData.length > 0 && typeof rpcData[0] === 'number') {
          newScore = rpcData[0] as number;
        } else if (rpcData && typeof rpcData === 'object' && 'score' in rpcData) {
          // e.g. { score: 42 }
          // @ts-ignore
          newScore = Number(rpcData.score);
        }

        // Update local state from authoritative DB result
        setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, completedSteps } : task));
        const updatedUser = { ...currentUser, score: newScore };
        setCurrentUser(updatedUser);
        saveSession(updatedUser);
        console.log('Score updated via RPC, new score:', newScore);
        return;
      }
      if (rpcError) console.warn('RPC handle_task_completion failed, falling back to client update:', rpcError.message || rpcError);
    } catch (err) {
      console.warn('RPC call threw, falling back to client update:', err);
    }

    // Fallback: update user_tasks and profiles from the client if RPC isn't available.
    // Include the per-task `score` in the upsert so DB-side logic (if any) can depend on it.
    // Fallback: set the per-task score to the provided `scoreEarned` (this matches the RPC behavior
    // where the caller passes the intended per-task total score).
    console.debug('Fallback upsert will set score to passed value (scoreEarned):', { taskId, userId: currentUser.id, scoreEarned, completedSteps });

    const { error: taskError } = await supabaseClient
      .from('user_tasks')
      .upsert(
        { user_id: currentUser.id, task_id: taskId, completed_steps: completedSteps, score: scoreEarned },
        { onConflict: 'user_id,task_id' }
      );

    if (taskError) {
      console.error('Error updating task (upsert):', taskError.message || taskError);
      // continue to attempt to recalc total from whatever is available
    } else {
      console.debug('Upsert successful for user_tasks', { userId: currentUser.id, taskId, scoreEarned, completedSteps });
    }

    // Fetch all user_tasks for this user and sum their scores
    const { data: allTasks, error: allTasksError } = await supabaseClient
      .from('user_tasks')
      .select('score')
      .eq('user_id', currentUser.id);

    console.debug('Fetched all user_tasks for score sum', { allTasks, allTasksError });
    if (allTasksError) {
      console.error('Error fetching user_tasks for score sum:', allTasksError.message);
      return;
    }

    const totalScore = (allTasks || []).reduce((sum, t) => sum + (t.score || 0), 0);

    // Update total score in profiles
    const { error: scoreError } = await supabaseClient
      .from('profiles')
      .update({ score: totalScore })
      .eq('id', currentUser.id);

    if (scoreError) {
      console.error('Error updating score:', scoreError.message);
      return;
    }

    console.log('Score updated successfully in DB (fallback)');

    // Fetch latest user profile to ensure UI reactivity
    const { data: userProfile, error: userProfileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', currentUser.id)
      .single();

    console.debug('Fetched userProfile after score update', { userProfile, userProfileError });

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completedSteps } : task
      )
    );
    if (!userProfileError && userProfile) {
      const updatedUser = { ...currentUser, ...userProfile };
      setCurrentUser(updatedUser);
      saveSession(updatedUser);
      console.log('Local state updated, new user score (from DB):', updatedUser.score);
    } else {
      // fallback to local update if fetch fails
      const updatedUser = { ...currentUser, score: totalScore };
      setCurrentUser(updatedUser);
      saveSession(updatedUser);
      console.log('Local state updated, new user score (local fallback):', updatedUser.score);
    }
  };

  const getTopScores = async (department?: string): Promise<{ name: string; department: string; score: number }[]> => {
    let query = supabaseClient
      .from('profiles')
      .select('name, department, score')
      .order('score', { ascending: false })
      .limit(5);

    if (department) {
      // filter by department string as stored in profiles.department
      query = query.eq('department', department) as any;
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching top scores:', error);
      return [];
    }
  return data;
  };

  const getTaskScore = async (taskId: string) => {
    if (!currentUser) return 0;
    try {
      const { data, error } = await supabaseClient
        .from('user_tasks')
        .select('score')
        .eq('user_id', currentUser.id)
        .eq('task_id', taskId)
        .single();
      if (error) {
        console.warn('getTaskScore fetch error:', error.message || error);
        return 0;
      }
      return data?.score || 0;
    } catch (err) {
      console.error('getTaskScore exception:', err);
      return 0;
    }
  };

  const getVideoProgress = async (userId: string) => {
    const { data, error } = await supabaseClient
      .from('user_video_progress')
      .select('video_id, watched_seconds, is_complete')
      .eq('user_id', userId);
    
    if (error) {
        console.error("Error fetching video progress:", error.message);
        return {};
    }
    return data.reduce((acc, item) => {
        acc[item.video_id] = { watchedSeconds: item.watched_seconds, isComplete: item.is_complete };
        return acc;
    }, {});
  };

  const updateVideoProgress = async (videoId: string, watchedSeconds: number, isComplete: boolean) => {
      if (!currentUser) return;
      const { error } = await supabaseClient
          .from('user_video_progress')
          .upsert(
              { user_id: currentUser.id, video_id: videoId, watched_seconds: watchedSeconds, is_complete: isComplete },
              { onConflict: 'user_id, video_id' }
          );
      if (error) {
          console.error("Error updating video progress:", error.message);
      }
  };
  
  const getSubmission = async (taskId: string) => {
    if (!currentUser) return { data: null, error: 'No user authenticated' };
    const { data, error } = await supabaseClient
      .from('image_submissions')
      .select('image_url')
      .eq('user_id', currentUser.id)
      .eq('task_id', taskId)
      .limit(1);
    return { data, error };
  };

  const submitImageUrl = async (taskId: string, imageUrl: string) => {
    if (!currentUser) return { success: false, error: 'No user authenticated' };
    const { error } = await supabaseClient
      .from('image_submissions')
      .insert({ user_id: currentUser.id, task_id: taskId, image_url: imageUrl });
    
    if (error) {
      console.error('Error submitting image URL:', error);
      return { success: false, error };
    }
    return { success: true };
  };
  
  const resetTasks = async () => {
    setTasks(INITIAL_TASKS);
    if (!currentUser) return;
     await supabaseClient
        .from('user_tasks')
        .delete()
        .eq('user_id', currentUser.id);
     await supabaseClient
        .from('user_video_progress')
        .delete()
        .eq('user_id', currentUser.id);
     await supabaseClient
        .from('image_submissions')
        .delete()
        .eq('user_id', currentUser.id);
     // Also reset total score
     const { error } = await supabaseClient
        .from('profiles')
        .update({ score: 0 })
        .eq('id', currentUser.id);
     if (!error) {
         setCurrentUser(prev => prev ? {...prev, score: 0} : null);
     }
  };

  const updateModuleTask = async (moduleName: string, taskIndex: number, completed: boolean, score: number): Promise<number | null> => {
    if (!currentUser) {
      console.debug('updateModuleTask: no currentUser, skipping RPC', { moduleName, taskIndex, completed, score });
      return null;
    }
    try {
      console.debug('updateModuleTask: calling RPC', { moduleName, taskIndex, completed, score, userId: currentUser.id });
      const { data, error } = await supabaseClient.rpc('update_module_task', { module_name: moduleName, user_id_in: currentUser.id, task_index: taskIndex, completed: completed, score: score });
      console.debug('update_module_task rpc response', { data, error });
      if (error) {
        console.error('update_module_task RPC error:', error.message || error);
        return null;
      }
      // RPC returns new total; normalize numeric return
      if (typeof data === 'number') return data as number;
      if (Array.isArray(data) && typeof data[0] === 'number') return data[0] as number;
      if (data && typeof data === 'object' && 'new_total' in data) return Number((data as any).new_total);
      return null;
    } catch (err) {
      console.error('update_module_task exception:', err);
      return null;
    }
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, currentPage, setCurrentPage, currentUser, language, setLanguage, t, login, signup, logout, tasks, updateTaskCompletion, updateModuleTask, resetTasks, getVideoProgress, updateVideoProgress, getSubmission, submitImageUrl, getTopScores, getTaskScore }}>
      {children}
    </AppContext.Provider>
  );
};