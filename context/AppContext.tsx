import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Page, User, Task, Department, Designation } from '../types';
import { INITIAL_TASKS } from '../constants';

// Supabase is loaded from CDN in index.html
// @ts-ignore
const { createClient } = supabase;
const supabaseUrl = 'https://kescaddzecbnhnhpifha.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlc2NhZGR6ZWNibmhuaHBpZmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MzAxMjksImV4cCI6MjA3NTQwNjEyOX0.h69xRfbJSzq_7xd4bR40AmmXoa9zgcMUjxPeWBmkynM';
const supabaseClient = createClient(supabaseUrl, supabaseKey);

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
  login: (userId: string, department: Department) => Promise<{ success: boolean; error?: string }>;
  signup: (details: { userId: string, name: string, department: Department, designation: Designation }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  tasks: Task[];
  updateTaskCompletion: (taskId: string, completedSteps: number, scoreEarned: number) => Promise<void>;
  resetTasks: () => Promise<void>;
  getVideoProgress: (userId: string) => Promise<any>;
  updateVideoProgress: (videoId: string, watchedSeconds: number, isComplete: boolean) => Promise<void>;
  getSubmission: (taskId: string) => Promise<{ data: { image_url: string }[] | null, error: any }>;
  submitImageUrl: (taskId: string, imageUrl: string) => Promise<{ success: boolean; error?: any }>;
  getTopScores: () => Promise<{ name: string; designation: string; score: number }[]>;
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
  md_message_title: 'A Message from the Managing Director',
  start_quiz: 'Start Quiz (7 Points)',
  task_completed_title: 'Task Completed!',
  task_completed_message: "You've successfully completed the MD Message module.",
      dashboard: 'Dashboard',
      welcome: 'Welcome,',
      score: 'Score',
      points_label: 'Points',
      progress_label: 'Progress',
      start_task: 'Start Task',
      completed: 'Completed',
      view_top_scores: 'View Top Scores',
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
      back_to_dashboard: 'Back to Dashboard',
      submission_received: 'Submission Received',
      thank_you_submission: 'Thank you for your submission! You have earned',
      image_preview: 'Image Preview:',
      click_to_upload: 'Click to upload',
      png_jpg_gif: 'PNG, JPG, GIF (MAX. 500KB)',
      configuration_needed: 'Configuration Needed!',
      uploading: 'Uploading...',
      loading: 'Loading...',
      submit_image: 'Submit Image',
      mark_as_complete: 'Mark as Complete',
      coming_soon: 'Coming Soon!'
      ,
      correct_answer_was: 'The correct answer was:'
    },
    kn: {
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
      knowledge_centre: 'ಜ್ಞಾನ ಕೇಂದ್ರ',
      logout: 'ಲಾಗ್ ಔಟ್',
      question_label: 'ಪ್ರಶ್ನೆ',
      time_up_incorrect: 'ಸಮಯ ಮುಗಿಯಿತು! ತಪ್ಪಾಗಿದೆ!',
      correct: 'ಸರಿಯಾಗಿದೆ!',
      incorrect: 'ತಪ್ಪಾಗಿದೆ!',
      next_question: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
      finish_quiz: 'ಕ್ವಿಜ್ ಪೂರ್ಣಗೊಳಿಸಿ',
      back: '← ಹಿಂದಕ್ಕೆ',
      warning_title: 'ಎಚ್ಚರಿಕೆ',
      warning_text_prefix: 'ಎಚ್ಚರಿಕೆ!! ನಿಮಗೆ ಕೇವಲ',
      warning_text_suffix: 'ಅಂಕಗಳು ಸಿಗುತ್ತವೆ. ಉಳಿದ ಎಲ್ಲಾ ಉತ್ತರಗಳನ್ನು ತಪ್ಪು ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ. ನೀವು ಖಚಿತರೇ ಆಗಿರೆ? ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      yes_go_back: 'ಹೌದು, ಹಿಂದಕ್ಕೆ ಹೋಗಿ',
      // Image submission / placeholder
      back_to_dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂದಿರುಗಿ',
      submission_received: 'ಸಲ್ಲಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
      thank_you_submission: 'ನಿಮ್ಮ ಸಲ್ಲಿಕೆಗೆ ಧನ್ಯವಾದಗಳು! ನಿಮಗೆ ಸಿಗುತ್ತದೆ',
      image_preview: 'ಚಿತ್ರ ಪೂರ್ವದೃಶ್ಯ:',
      click_to_upload: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      png_jpg_gif: 'PNG, JPG, GIF (ಗರಿಷ್ಟ. 500KB)',
      configuration_needed: 'ಕಾನ್ಫಿಗರೇಶನ್ ಅಗತ್ಯವಿದೆ!',
      uploading: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      loading: 'ಲೋಡಿಂಗ್...',
      submit_image: 'ಚಿತ್ರ ಸಲ್ಲಿಸಿ',
      mark_as_complete: 'ಸಂಪೂರ್ಣವಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',
      coming_soon: 'ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತದೆ!'
      ,
      correct_answer_was: 'ಸರಿಯಾದ ಉತ್ತರ:'
      ,
      // Quiz-specific translations (full option strings used as keys)
      'Which automobile company commonly uses the Atkinson cycle in its hybrid vehicles?': 'ಯಾವ್ ಕಂಪನಿ ಸಾಮಾನ್ಯವಾಗಿ ಅದರ ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ ಅಟ್ಕಿನ್‌ಸನ್ ಚಕ್ರವನ್ನು ಬಳಸುತ್ತದೆ?',
      'Honda': 'ಹೋಂಡಾ',
      'Ford': 'ಫೋರ್ಡ್',
      'Toyota': 'ಟೊಯೋಟಾ',
      'Hyundai': 'ಹುಂಡೈ'
    }
  };

  // Translation helper - uses selected language
  const t = (key: string) => {
    return (translations[language] && translations[language][key]) || key;
  };

  const login = async (userId: string, department: Department): Promise<{ success: boolean; error?: string }> => {
    const trimmedUserId = userId.trim();
    const email = `${trimmedUserId}@quality-event.internal`;

    // Check for existing session first
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError) {
      console.error('Error getting session:', sessionError);
      // Fall through to sign in
    } else if (session?.user) {
      // Already signed in, verify designation
      const { data: profile, error: profileError } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

      if (profileError || !profile) {
          await logout();
          return { success: false, error: "Could not find user profile." };
      }

      if (profile.department !== department) {
          return { success: false, error: "The selected department does not match this User ID." };
      }

      // Department matches, save session and treat as successful login
      const user: User = {
        id: profile.id,
        userId: profile.user_id,
        name: profile.name,
        department: profile.department,
        designation: profile.designation,
        score: profile.score,
      };
      saveSession(user);
      setCurrentUser(user);
      await fetchUserTasks(user.id);
      setCurrentPage(Page.DASHBOARD);
      return { success: true };
    }

    // No existing session or mismatch, attempt sign in
    const password = trimmedUserId;
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) return { success: false, error: "Invalid User ID or you may need to register." };
    if (!data.user) return { success: false, error: "Authentication failed. Please try again."};

    // Fetch profile to verify designation
    const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

    if (profileError || !profile) {
        await logout();
        return { success: false, error: "Could not find user profile." };
    }

    if (profile.department !== department) {
        return { success: false, error: "The selected department does not match this User ID." };
    }

    // Success, save session
    const user: User = {
      id: profile.id,
      userId: profile.user_id,
      name: profile.name,
      department: profile.department,
      designation: profile.designation,
      score: profile.score,
    };
    saveSession(user);
    setCurrentUser(user);
    await fetchUserTasks(user.id);
    setCurrentPage(Page.DASHBOARD);
    return { success: true };
  };
  
  const signup = async (details: { userId: string; name: string; department: Department, designation: Designation }): Promise<{ success: boolean; error?: string }> => {
    const { userId, name, department, designation } = details;
    const trimmedUserId = userId.trim();
    const email = `${trimmedUserId}@quality-event.internal`;
    const password = trimmedUserId;

    // The trigger 'on_auth_user_created' will create the profile.
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: { userId: trimmedUserId, name, department, designation }
        }
    });
    if (error) return { success: false, error: error.message };
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

  const addScore = async (points: number) => {
    if (!currentUser) return;

    console.log('Adding score:', points);

    // Get current score
    const { data: profile, error: fetchError } = await supabaseClient
      .from('profiles')
      .select('score')
      .eq('id', currentUser.id)
      .single();

    if (fetchError) {
      console.error('Error fetching score:', fetchError.message);
      return;
    }

    console.log('Current score from DB:', profile.score);

    const newScore = profile.score + points;

    console.log('New score to be set:', newScore);

    // Update total score
    const { error: scoreError } = await supabaseClient
      .from('profiles')
      .update({ score: newScore })
      .eq('id', currentUser.id);

    if (scoreError) {
      console.error('Error updating score:', scoreError.message);
      return;
    }

    console.log('Score updated successfully in DB');

    // Update local state
    const updatedUser = { ...currentUser, score: newScore };
    setCurrentUser(updatedUser);
    saveSession(updatedUser);

    console.log('Local state updated, new user score:', updatedUser.score);
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
    const { error: taskError } = await supabaseClient
      .from('user_tasks')
      .upsert(
        { user_id: currentUser.id, task_id: taskId, completed_steps: completedSteps, score: scoreEarned },
        { onConflict: 'user_id,task_id' }
      );

    if (taskError) {
      console.error('Error updating task:', taskError.message);
      return;
    }

    // Fetch all user_tasks for this user and sum their scores
    const { data: allTasks, error: allTasksError } = await supabaseClient
      .from('user_tasks')
      .select('score')
      .eq('user_id', currentUser.id);

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

  const getTopScores = async (): Promise<{ name: string; department: string; score: number }[]> => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('name, department, score')
      .order('score', { ascending: false })
  .limit(5);

    if (error) {
      console.error('Error fetching top scores:', error);
      return [];
    }
    return data;
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

  return (
    <AppContext.Provider value={{ theme, setTheme, currentPage, setCurrentPage, currentUser, language, setLanguage, t, login, signup, logout, tasks, updateTaskCompletion, resetTasks, getVideoProgress, updateVideoProgress, getSubmission, submitImageUrl, getTopScores, addScore }}>
      {children}
    </AppContext.Provider>
  );
};