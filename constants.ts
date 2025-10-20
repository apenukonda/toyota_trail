import { Task, Page, Question } from './types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task1',
    title: 'Message from Managing Director',
    titleKn: 'ವ್ಯವಸ್ಥಾಪಕ ನಿರ್ದೇಶಕರಿಂದ ಸಂದೇಶ',
    description: 'Watch the opening message and complete a short quiz.',
    descriptionKn: 'ತಿಡಿ ಸಂದೇಶವನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ಒಂದು ಹಾದು ಕ್ವಿಜ್ ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.',
    page: Page.MD_MESSAGE,
    totalSteps: 7, // 7 quiz questions
    completedSteps: 0,
    maxScore: 7,
  },
  {
    id: 'task6',
    title: 'Video awareness and evaluation module',
    titleKn: 'ವೀಡಿಯೊ ಜಾಗೃತಿ ಮತ್ತು ಮೌಲ್ಯಮಾಪನ ಮಾಡ್ಯೂಲ್',
// NOTE: placeholders for missing Kannada fields (textKn/optionsKn)
// should be populated as static data (or via an external script that
// writes updated constants) rather than by running code at module
// evaluation time. A follow-up step will insert safe, static
// placeholder copies for any remaining M1/M2 questions.
    description: 'Self learning courses related to quality with quiz evaluation.',
    descriptionKn: 'ಗುಣಮಟ್ಟಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಸ್ವಯಂ ಕಲಿಕಾ ಕೋರ್ಸ್‌ಗಳು ಕ್ವಿಜ್ ಮೌಲ್ಯಮಾಪನದೊಂದಿಗೆ.',
    page: Page.VIDEO_TASK,
    totalSteps: 105, // 70 questions total
    completedSteps: 0,
    maxScore: 105,
  },
  {
    id: 'task3',
    title: 'Cartoon competition',
    titleKn: 'ಕಾರ್ಟೂನ್ ಸಲ್ಲಿಕೆ',
    description: 'Submit your cartoon image for the quality month contest.',
    descriptionKn: 'ಗುಣಮಟ್ಟದ ತಿಂಗಳ ಸ್ಪರ್ಧೆಗಾಗಿ ನಿಮ್ಮ ಕಾರ್ಟೂನ್ ಚಿತ್ರವನ್ನು ಸಲ್ಲಿಸಿ.',
    page: Page.IMAGE_SUBMISSION,
    totalSteps: 1,
    completedSteps: 0,
    maxScore: 5,
  },
  {
    id: 'task4',
    title: 'Slogan competition',
    titleKn: 'ಸ್ಲೋಗನ್ ಸ್ಪರ್ಧೆ',
    description: 'Contribute a slogan for this year\'s quality theme.',
    descriptionKn: 'ಈ ವರ್ಷದ ಗುಣಮಟ್ಟದ ಥೀಮಿಗೆ ಸ್ಲೋಗನ್ ರಚನೆ ಮಾಡಿ.',
    page: Page.SLOGAN_WRITER,
    totalSteps: 1,
    completedSteps: 0,
    maxScore: 3,
  },
  {
    id: 'task5',
    title: 'Kaizen Suggestion',
    titleKn: 'ಕೈಜೆನ್ ಸಲಹೆ ',
    description: 'Share your ideas for continuous improvement (Kaizen).',
    descriptionKn: 'ನಿರಂತರ ಸುಧಾರಣೆಗೆ (Kaizen) ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.',
    page: Page.SUGGESTION_BOX,
    totalSteps: 1,
    completedSteps: 0,
    maxScore: 3,
  },
];

// NOTE: Do NOT run placeholder population code at module-evaluation time
// that references `ADVANCED_MODULES` before it is declared — doing so
// causes a runtime ReferenceError when the module is loaded. Instead,
// populate `textKn`/`optionsKn` as static edits in this file (preferred)
// or run a build-time script that writes this file prior to bundling.
// Placeholder population will be performed in small, explicit patches
// (see TODO: Populate M1 placeholders - next).

export const MD_MESSAGE_QUIZ: Question[] = [

// Kannada version of MD_MESSAGE_QUIZ for translation

  { 
    text: 'Which month is celebrated as Quality Month?', 
    options: ['October', 'November', 'December', 'January'], 
    correctAnswer: 'November' 
  }, 
  { 
    text: 'Who delivered the Quality Month message?', 
    options: ['Top management', 'TICO group', 'Managing Director', 'Quality head'], 
    correctAnswer: 'Managing Director' 
  }, 
  { 
    text: 'Which of the following is the theme for Quality Month 2025?', 
    options: ['Quality First, Safety Always', 'Zero Defects, Zero Complaints', 'Enhance Quality: Think Differently with Waku Waku Spirit', 'Customer Satisfaction is Key'], 
    correctAnswer: 'Enhance Quality: Think Differently with Waku Waku Spirit' 
  }, 
  { 
    text: 'Which principle is emphasized in the message?', 
    options: ['Safety first', 'Productivity first', 'Customer second', 'Quality last'], 
    correctAnswer: 'Safety first' 
  }, 
  { 
    text: 'Which trend is mentioned as improving?', 
    options: ['Production delays', 'Customer complaints', 'Employee turnover', 'Supplier issues'], 
    correctAnswer: 'Customer complaints' 
  }, 
  { 
    text: 'What does one defect mean to a customer?', 
    options: ['Minor inconvenience', 'Partial dissatisfaction', '100% dissatisfaction', 'No impact'], 
    correctAnswer: '100% dissatisfaction' 
  }, 
  { 
    text: 'Which challenge is highlighted for this year?', 
    options: ['Decrease in production', 'Frequent supplier shutdowns', 'Increase in production volume and frequent change points', 'Lack of customer feedback'], 
    correctAnswer: 'Increase in production volume and frequent change points' 
  }, 
  { 
    text: 'Which focus is recommended to meet challenges?', 
    options: ['Cost reduction', 'Customer First and strong processes', 'Speed of delivery', 'Employee satisfaction'], 
    correctAnswer: 'Customer First and strong processes' 
  }, 
  { 
    text: 'Which practice helps achieve zero defects?', 
    options: ['Hiring more staff', 'Strong standardized work', 'Reducing customer expectations', 'Increasing production speed'], 
    correctAnswer: 'Strong standardized work' 
  }, 
  { 
    text: 'Which of the following is part of 4M?', 
    options: ['Measure', 'Money', 'Material', 'Metrics'], 
    correctAnswer: 'Material' 
  }, 
  { 
    text: 'Which factor should be enhanced to catch abnormalities?', 
    options: ['Productivity', 'Detectability', 'Customer feedback', 'Supplier audits'], 
    correctAnswer: 'Detectability' 
  }, 
  { 
    text: 'Which item should never be allowed to outflow?', 
    options: ['Raw materials', 'Abnormalities', 'Customer complaints', 'Production delays'], 
    correctAnswer: 'Abnormalities' 
  }, 
  { 
    text: 'Which quality approach is associated with passion and creativity?', 
    options: ['Compliance', 'Waku Waku Spirit', 'Strict discipline', 'Customer complaints'], 
    correctAnswer: 'Waku Waku Spirit' 
  }, 
  { 
    text: 'Which goal is emphasized in the message?', 
    options: ['Zero production', 'Zero outflow, zero complaints, complete customer trust', 'Maximum profit', 'Minimum cost'], 
    correctAnswer: 'Zero outflow, zero complaints, complete customer trust' 
  }, 
  { 
    text: 'Which ability should be strengthened to handle abnormalities?', 
    options: ['Supplier contracts', 'Ability to see and act quickly', 'Customer surveys', 'Production speed'], 
    correctAnswer: 'Ability to see and act quickly' 
  }, 
  { 
    text: 'Which type of work ensures correct method every time?', 
    options: ['Flexible work', 'Standardized work', 'Creative work', 'Remote work'], 
    correctAnswer: 'Standardized work' 
  }, 
  { 
    text: 'Which activity is encouraged during Quality Month?', 
    options: ['Avoiding change', 'Active participation and learning', 'Reducing workload', 'Skipping meetings'], 
    correctAnswer: 'Active participation and learning' 
  }, 
  { 
    text: 'Which should be applied in daily work?', 
    options: ['Customer complaints', 'Reflections from activities', 'Production delays', 'Supplier feedback'], 
    correctAnswer: 'Reflections from activities' 
  }, 
  { 
    text: 'Which journey is mentioned in the message?', 
    options: ['Sales journey', 'Quality journey', 'Marketing journey', 'Supplier journey'], 
    correctAnswer: 'Quality journey' 
  }, 
  { 
    text: 'Which of the following is NOT a focus area for achieving zero defects?', 
    options: ['Standardized work', 'Change point management', 'Enhanced detectability', 'Cost cutting'], 
    correctAnswer: 'Cost cutting' 
  }, 
  { 
    text: 'Which of the following is a key element in change point management?', 
    options: ['4M changes', 'Customer surveys', 'Sales reports', 'Marketing plans'], 
    correctAnswer: '4M changes' 
  }, 
  { 
    text: 'Which of the following is encouraged during Quality Month?', 
    options: ['Passive observation', 'Skipping activities', 'Active participation', 'Avoiding feedback'], 
    correctAnswer: 'Active participation' 
  }, 
  { 
    text: 'Which of the following is NOT mentioned as a challenge in 2025?', 
    options: ['Increase in production volume', 'Frequent change points', 'Customer dissatisfaction', 'Employee training'], 
    correctAnswer: 'Employee training' 
  }, 
  { 
    text: 'Which of the following is a sign of strong process?', 
    options: ['Zero outflow', 'High defect rate', 'Customer complaints', 'Frequent breakdowns'], 
    correctAnswer: 'Zero outflow' 
  }, 
  { 
    text: 'Which of the following is NOT part of the fundamental principle?-ಮೂಲಭೂತ ತತ್ವದ ಭಾಗವಲ್ಲದ್ದು (NOT part of the fundamental principle) ಯಾವುದು?', 
    options: ['Safety first-Safety first', 'Quality second-Quality second', 'Productivity third-Productivity third', 'Profit first-ಲಾಭವೇ ಮೊದಲು (Profit first)'], 
    correctAnswer: 'Profit first-ಲಾಭವೇ ಮೊದಲು (Profit first)' 
  }, 
  { 
    text: 'Which of the following reflects the Waku Waku spirit?-ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ವಕು ವಕು ಸ್ಪಿರಿಟ್ ಅನ್ನು ಉತ್ತಮವಾಗಿ ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ?', 
    options: ['Compliance only-ಕೇವಲ ಅನುಸರಣೆ', 'Routine work-ದಿನನಿತ್ಯದ ಕೆಲಸ', 'Thrill & Excitement-ರೋಮಾಂಚನ ಮತ್ತು ಉತ್ಸಾಹ (Thrill & Excitement)', 'Strict rules-ಕಟ್ಟುನಿಟ್ಟಾದ ನಿಯಮಗಳು'], 
    correctAnswer: 'Thrill & Excitement-ರೋಮಾಂಚನ ಮತ್ತು ಉತ್ಸಾಹ (Thrill & Excitement)' 
  }, 
  { 
    text: 'Which of the following is a desired outcome mentioned in the message?-ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಸಂದೇಶದಲ್ಲಿ ಉಲ್ಲೇಖಿಸಲಾದ ಅಪೇಕ್ಷಿತ ಫಲಿತಾಂಶವಾಗಿದೆ?', 
    options: ['Zero complaints-ಶೂನ್ಯ ದೂರುಗಳು', 'Increased defects-ಹೆಚ್ಚಿದ ದೋಷಗಳು', 'Reduced safety-ಕಡಿಮೆ ಸುರಕ್ಷತೆ', 'Customer loss-ಗ್ರಾಹಕರ ನಷ್ಟ'], 
    correctAnswer: 'Zero complaints-ಶೂನ್ಯ ದೂರುಗಳು' 
  }, 
  { 
    text: 'Which of the following is NOT a recommended action during Quality Month?-ಗುಣಮಟ್ಟದ ತಿಂಗಳಲ್ಲಿ ಶಿಫಾರಸು ಮಾಡದ (NOT a recommended action) ಕ್ರಮ ಯಾವುದು?', 
    options: ['Learning from reflections-ಪ್ರತಿಫಲನಗಳಿಂದ ಕಲಿಯುವುದು', 'Applying lessons daily-ದಿನನಿತ್ಯ ಪಾಠಗಳನ್ನು ಅನ್ವಯಿಸುವುದು', 'Ignoring feedback-ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದು (Ignoring feedback)', 'Participating in activities-ಚಟುವಟಿಕೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸುವುದು'], 
    correctAnswer: 'Ignoring feedback-ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದು (Ignoring feedback)' 
  }, 
  { 
    text: 'Which of the following best supports building customer trust?', 
    options: ['Zero outflow', 'High productivity', 'Fast delivery', 'Low cost'], 
    correctAnswer: 'Zero outflow' 
  }, 
  { 
    text: "What is the objective of 'Robust change point management' during 4M changes?-4M ಬದಲಾವಣೆಗಳ ಸಮಯದಲ್ಲಿ ಯಾವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುವುದು 'Robust change point management' ನ ಉದ್ದೇಶ?", 
    options: ['To avoid profit loss-ಯಾವುದೇ ಲಾಭವಾಗದಂತೆ', 'To ensure no misses-ಯಾವುದೇ ಲೋಪವಾಗದಂತೆ (no misses)', 'To avoid production delays-ಯಾವುದೇ ವಿಳಂಬವಾಗದಂತೆ', 'To prevent customer complaints-ಯಾವುದೇ ದೂರುಗಳಾಗದಂತೆ'], 
    correctAnswer: 'To ensure no misses-ಯಾವುದೇ ಲೋಪವಾಗದಂತೆ (no misses)' 
  }
  
    
];


export const ADVANCED_MODULES = [
  {
    id: 'M1',
    title: 'Basics of Engine, its parts and functions',
    titleKn: 'ಎಂಜಿನ್ ಆಧಾರಭೂತಗಳು, ಅದರ ಭಾಗಗಳು ಮತ್ತು ಕಾರ್ಯಗಳು',
    videos: [
      { id: 'WKKILW3Zj_Y', title: 'About TNGA engine working principle', titleKn: 'TNGA ಎಂಜಿನ್ ಕಾರ್ಯನಿರ್ವಹಣೆಯ ತತ್ವದ ಬಗ್ಗೆ' },
      { id: 'gqK3dCpwzxE', title: 'Basics of engine components and its functions', titleKn: 'ಎಂಜಿನ್ ಘಟಕಗಳ ಮೂಲಗಳು ಮತ್ತು ಅದರ ಕಾರ್ಯಗಳು' },
      { id: 'hRYWqdiUlbA', title: 'Know your Toyota Hybrid vehicle', titleKn: 'ನಿಮ್ಮ ಟೊಯೋಟಾ ಹೈಬ್ರಿಡ್ ವಾಹನವನ್ನು ತಿಳಿಯಿರಿ' },
      { id: 'Ad_WHkBIvlo', title: 'About dynamic force engine', titleKn: 'ಡೈನಾಮಿಕ್ ಫೋರ್ಸ್ ಎಂಜಿನ್ ಬಗ್ಗೆ' },
      { id: 'JqA5Keel6Js', title: 'About engine Valvetrain mechanism', titleKn: 'ಎಂಜಿನ್ ವರ್ಲ್‌ಟ್ರೈನ್ ಯಂತ್ರವಿಜ್ಞಾನ ಬಗ್ಗೆ' },
      { id: 'XFVd_fCiO88', title: 'Toyota hybrid engine system', titleKn: 'ಟೊಯೋಟಾ ಹೈಬ್ರಿಡ್ ಎಂಜಿನ್ ಸಿಸ್ಟಮ್' },
    ],
    quizzes: [
      // Dummy quiz for video 1: 7 questions
      [
  { text: 'Who first proposed the Atkinson cycle?', textKn: 'ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರವನ್ನು ಮೊದಲು ಪ್ರಸ್ತಾವಿಸಿದವರು ಯಾರು?', options: ['Nikolaus Otto', 'James Atkinson', 'Rudolf Diesel', 'Karl Benz'], optionsKn: ['ನಿಕೊಲಾಸ್ ಓಟ್ಟೋ', 'ಜೆಮ್ಸ್ ಅಟ್ಕಿನ್ಸನ್', 'ರೂಡೊಲ್ಫ್ ಡೀಸೆಲ್', 'ಕಾರ್ಲ್ ಬೆನ್‌ಜ್'], correctAnswer: 'James Atkinson' },

  { text: 'In which year was the Atkinson cycle first proposed?', textKn: 'ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರವನ್ನು ಯಾವ ವರ್ಷದಲ್ಲಿ ಪ್ರಸ್ತಾವಿಸಲಾಯಿತು?', options: ['1876', '1882', '1890', '1901'], optionsKn: ['1876', '1882', '1890', '1901'], correctAnswer: '1882' },

  { text: 'The Atkinson cycle uses a different thermodynamic process than which common engine cycle?', textKn: 'ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರವು ಯಾವ ಸಾಮಾನ್ಯ ಎಂಜಿನ್ ಚಕ್ರದೊಂದಿಗೆ ಭಿನ್ನ ಥರ್ಮೋಡೈನಾಮಿಕ್ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಬಳಸುತ್ತದೆ?', options: ['Diesel cycle', 'Otto cycle', 'Rankine cycle', 'Brayton cycle'], optionsKn: ['ಡೀಸೆಲ್ ಚಕ್ರ', 'ಒಟ್ಟೋ ಚಕ್ರ', 'ರ್ಯಾಂಕ್‌ಕಿನ್ ಚಕ್ರ', 'ಬ್ರೇಟನ್ ಚಕ್ರ'], correctAnswer: 'Otto cycle' },

  { text: 'Which automobile company commonly uses the Atkinson cycle in its hybrid vehicles?', textKn: 'ಯಾವ ಕಾರು ಕಂಪನಿಯು ಸಾಮಾನ್ಯವಾಗಿ ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರವನ್ನು ಬಳಸುತ್ತದೆ?', options: ['Honda', 'Ford', 'Toyota', 'Hyundai'], optionsKn: ['ಹೋಂಡಾ', 'ಫೋರ್ಡ್', 'ಟೊಯೋಟಾ', 'ಹುಂಡೈ'], correctAnswer: 'Toyota' },

  { text: 'What is the main advantage of the Atkinson cycle over the Otto cycle?', textKn: 'ಒಟ್ಟೋ ಚಕ್ರಕ್ಕಿಂತ ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರದ ಪ್ರಮುಖ ಲಾಭ ಏನು?', options: ['Higher power output', 'Lower fuel consumption', 'Better fuel efficiency', 'Simpler design'], optionsKn: ['ಹೆಚ್ಚು ಶಕ್ತಿ ಉತ್ಪಾದನೆ', 'ಕಡಿಮೆ ಇಂಧನ ಬಳಕೆ', 'ಉತ್ತಮ ಇಂಧನ ದಕ್ಷತೆ', 'ಸರಳ ವಿನ್ಯಾಸ'], correctAnswer: 'Better fuel efficiency' },

  { text: 'What is the main trade-off of using the Atkinson cycle?', textKn: 'ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರವನ್ನು ಬಳಸುವ ಮುಖ್ಯ ವ್ಯತ್ಯಾಸ ಏನು?', options: ['Reduced power output', 'Higher emissions', 'Lower fuel efficiency', 'Complex cooling system'], optionsKn: ['ಶಕ್ತಿ ಉತ್ಪಾದನೆ ಕಡಿಮೆಯಾಗುವುದು', 'ಹೆಚ್ಚಿನ ಉತ್ಸರ್ಜನೆಗಳು', 'ಇಂಧನ ದಕ್ಷತೆ ಕಡಿಮೆಯಾಗುವುದು', 'ಸಂಕೀರ್ಣ ಕೂಲಿಂಗ್ ಸಿಸ್ಟಮ್'], correctAnswer: 'Reduced power output' },

  { text: 'How has Toyota compensated for the power loss in non-hybrid vehicles using the Atkinson cycle?', textKn: 'ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರ ಬಳಕೆಯಿಂದ ಅಸ್ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ ಶಕ್ತಿ ಕಳೆತವನ್ನು ಟೊಯೋಟಾ ಹೇಗೆ ಪರಿಹರಿಸಿದೆ?', options: ['By using a turbocharger', 'By switching between Atkinson and Otto cycles', 'By adding more cylinders', 'By increasing compression ratio'], optionsKn: ['ಟರ್ಬೊಚಾರ್ಜರ್ ಬಳಸಿ', 'ಅಟ್ಕಿನ್‍ಸನ್ ಮತ್ತು ಒಟ್ಟೋ ಚಕ್ರಗಳನ್ನು ಬದಲಿಸುವ ಮೂಲಕ', 'ಹೆಚ್ಚಿನ ಸಿಲಿಂಡರ್‌ಗಳನ್ನು ಸೇರಿಸಿ', 'ಸಂಕೋಚನ ಅನುಪಾತವನ್ನು ಹೆಚ್ಚಿಸಿ'], correctAnswer: 'By switching between Atkinson and Otto cycles' },

  { text: 'In hybrid vehicles, what component helps overcome the reduced power of the Atkinson cycle?', textKn: 'ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ ಅಟ્કಿನ್‍ಸನ್ ಚಕ್ರದ ಕಡಿಮೆ ಶಕ್ತಿಯನ್ನು which ಘಟಕ ಪರಿಹರಿಸುತ್ತದೆ?', options: ['Electric motor', 'Supercharger', 'Turbocharger', 'Extra piston'], optionsKn: ['ವಿದ್ಯುತ್ ಮೋಟಾರ್', 'ಸೂಪರ್‌ಚಾರ್ಜರ್', 'ಟರ್ಬೊಚಾರ್ಜರ್', 'ಹೆಚ್ಚಿನ ಪಿಸ್ಟನ್'], correctAnswer: 'Electric motor' },

  { text: 'What stores the additional power used by the electric motor in hybrid vehicles?', textKn: 'ಹೈಬ್ರಿಡ್ ವಾಹನಗಳಲ್ಲಿ ವಿದ್ಯುತ್ ಮೋಟಾರ್ ಬಳಸುವ ಹೆಚ್ಚುವರಿ ಶಕ್ತಿಯನ್ನು ಏನು ಸಂಗ್ರಹಿಸುತ್ತದೆ?', options: ['Battery', 'Capacitor', 'Flywheel', 'Fuel cell'], optionsKn: ['ಬ್ಯಾಟರಿ', 'ಕ್ಯಾಪಾಸಿಟರ್', 'ಫ್ಲೈವೀಲ್', 'ಇಂಧನ ಕೋಶ'], correctAnswer: 'Battery' },
        
  { text: 'In the Otto cycle, how do the compression and expansion strokes compare?', textKn: 'ಒಟ್ಟೋ ಚಕ್ರದಲ್ಲಿ ಸಂಕುಚನ ಮತ್ತು ವಿಸ್ತರಣೆ ಸ್ಟ್ರೋಕ್‌ಗಳು ಹೇಗೆ ಹೋಲುತ್ತವೆ?', options: ['Expansion is smaller', 'Compression is larger', 'They are equal', 'Expansion doesn’t occur'], optionsKn: ['ವಿಸ್ತರಣೆ ಕಡಿಮೆ', 'ಸಂಕೋಚನ ದೊಡ್ಡದು', 'ಇವು ಸಮಾನ', 'ವಿಸ್ತರಣೆ ಸಂಭವಿಸುವುದಿಲ್ಲ'], correctAnswer: 'They are equal' },

  { text: 'What does the Atkinson cycle do with the intake valves during the compression stroke?', textKn: 'ಸಂಕೋಚನ ಸ್ಟ್ರೋಕ್ ಸಮಯದಲ್ಲಿ ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರ ಇಂಟೇಕ್ ವೆಲ್ವ್ಗಳೊಂದಿಗೆ ಏನು ಮಾಡುತ್ತದೆ?', options: ['Closes them earlier', 'Keeps them open longer', 'Does not open them', 'Opens them partially'], optionsKn: ['ಮುಂಬರುವವಾಗಿ ಮುಚ್ಚುತ್ತದೆ', 'ಹೆಚ್ಚು ಕಾಲ ತೆರೆಯಿಟ್ಟು ಇರುತ್ತದೆ', 'ತೆರೆಯುವುದಿಲ್ಲ', 'ಭಾಗವಾಗಿ ತೆರೆಯುತ್ತದೆ'], correctAnswer: 'Keeps them open longer' },

  { text: 'Keeping the intake valves open longer causes some of the air-fuel mixture to be:', textKn: 'ಇಂಟೇಕ್ ವೆಲ್ವ್‌ಗಳನ್ನು ಹೆಚ್ಚು ಸಮಯ ತೆರೆಯಿಟ್ಟರೆ ಗಾಳಿ-ಇಂಧನ ಮಿಶ್ರಣದ ಕೆಲವು ಭಾಗವು ಏನಾಗುತ್ತದೆ?', options: ['Forced into the cylinder', 'Pushed back into the intake manifold', 'Vaporized completely', 'Leaked into the crankcase'], optionsKn: ['ಸಿಲಿಂಡರ್‌ಗೆ ಒತ್ತಿಹಾಕಲಾಗುತ್ತದೆ', 'ಇಂಟೇಕ್ ಮ್ಯಾನಿಫೋಲ್ಡ್‌ಗೆ ಹಿಂದಕ್ಕೆ ತಳ್ಳಲ್ಪಡುತ್ತದೆ', 'ಪೂರ್ಣವಾಗಿ ವಾಷ್ಪೀಕರಿಸಲಾಗುತ್ತದೆ', 'ಕ್ರ್ಯಾಂಕೇಸ್ಗೆ ರಾಸಾಯನಿಕವಾಗಿ ಹರಿದುಬರುತ್ತದೆ'], correctAnswer: 'Pushed back into the intake manifold' },

  { text: 'Delaying the compression stroke in the Atkinson cycle results in:', textKn: 'ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರದಲ್ಲಿ ಸಂಕುಚನ ಸ್ಟ್ರೋಕ್ ವಿಳಂಬವಾದರೆ ಪರಿಣಾಮವೇನು?', options: ['More air entering the cylinder', 'Less air-fuel mixture in the cylinder', 'Higher compression pressure', 'Shorter expansion stroke'], optionsKn: ['ಹೆಚ್ಚಿನ ಗಾಳಿ ಸಿಲಿಂಡರ್‌ಗೆ ಪ್ರವೇಶಿಸುತ್ತದೆ', 'ಸಿಲಿಂಡರ್‌ನಲ್ಲಿನ ಗಾಳಿ-ಇಂಧನ ಮಿಶ್ರಣ ಕಡಿಮೆಯಾಗಿದೆ', 'ಹೆಚ್ಚಿನ ಸಂಕುಚನ ಒತ್ತಡ', 'ಕಡಿಮೆ ವಿಸ್ತರಣೆ ಸ್ಟ್ರೋಕ್'], correctAnswer: 'Less air-fuel mixture in the cylinder' },

  { text: 'Compared to compression, the expansion stroke in the Atkinson cycle is:', textKn: 'ಸಂಕೋಚನದ ಹೋಲಿಕೆಯಲ್ಲಿ ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರದ ವಿಸ್ತರಣೆ ಸ್ಟ್ರೋಕ್ ಹೇಗಿದೆ?', options: ['Smaller', 'Equal', 'Larger', 'Eliminated'], optionsKn: ['ಸಣ್ಣದು', 'ಸಮಾನ', 'ದೊಡ್ಡದು', 'ನಿರಾಕರಿಸಲಾಗಿದೆ'], correctAnswer: 'Larger' },

  { text: 'A larger expansion stroke allows what benefit?', textKn: 'ಹೆಚ್ಚಾದ ವಿಸ್ತರಣೆ ಸ್ಟ್ರೋಕ್ ಯಾವ ಪ್ರಯೋಜನವನ್ನು ಒದಗಿಸುತ್ತದೆ?', options: ['More energy extracted from fuel', 'Faster ignition', 'Less heat loss', 'More fuel burned'], optionsKn: ['ಇಂಧನದಿಂದ ಹೆಚ್ಚು ಶಕ್ತಿ ಹೊರತೆಗೆಯುತ್ತಾರೆ', 'ವೇಗವಾಗಿ ಇಗ್ನಿಷನ್ ಆಗುತ್ತದೆ', 'ಕಡಿಮೆ ತಾಪ ನಷ್ಟ', 'ಹೆಚ್ಚು ಇಂಧನದ ದಹನ'], correctAnswer: 'More energy extracted from fuel' },

  { text: 'With intake valves open during compression, the piston faces:', textKn: 'ಸಂಕುಚನದ ಸಮಯದಲ್ಲಿ ಇಂಟೇಕ್ ವೆಲ್ವ್ ತೆರೆಯಲ್ಪಟ್ಟಾಗ ಪಿಸ್ಟನ್ ಎದುರಿಸುವುದು ಯಾವಾಗ?', options: ['Higher resistance', 'Less resistance', 'Equal resistance', 'No resistance'], optionsKn: ['ಹೆಚ್ಚಿನ ಪ್ರತಿರೋಧ', 'ಕಡಿಮೆ ಪ್ರತಿರೋಧ', 'ಸಮಾನ ಪ್ರತಿರೋಧ', 'ಪ್ರತಿರೋಧವಿಲ್ಲ'], correctAnswer: 'Less resistance' },

  { text: 'Reduced pumping losses mean that the engine:', textKn: 'ಕಡಿಮೆ ಪಂಪಿಂಗ್ ನಷ್ಟಗಳು ಎಂಜಿನ್ ಮೇಲೆ ಏನು ಪರಿಣಾಮ ಬೀರುತ್ತದೆ?', options: ['Consumes less power for self-operation', 'Burns more fuel', 'Requires higher octane fuel', 'Has higher emissions'], optionsKn: ['ಸ್ವಯಂ ಕಾರ್ಯಾಚರಣೆಗಾಗಿ ಕಡಿಮೆ ಶಕ್ತಿ ಬಳಿಸುತ್ತದೆ', 'ಹೆಚ್ಚು ಇಂಧನದ ಬಿರುಗಾಳಿ', 'ಹೆಚ್ಚಿನ ಆಕ್ಟೇನ್ ಇಂಧನ ಅಗತ್ಯ', 'ಹೆಚ್ಚಿನ ಉತ್ಸರ್ಜನೆಗಳು'], correctAnswer: 'Consumes less power for self-operation' },

  { text: 'In both hybrid and non-hybrid Toyota vehicles, the Atkinson cycle helps optimize:', textKn: 'ಹೈಬ್ರಿಡ್ ಮತ್ತು ಅಸ್ಹೈಬ್ರಿಡ್ ಟೊಯೋಟಾ ವಾಹನಗಳಲ್ಲಿ ಅಟ್ಕಿನ್‍ಸನ್ ಚಕ್ರ ಯಾವವನ್ನೂ ಉತ್ತಮಗೊಳಿಸುತ್ತದೆ?', options: ['Speed', 'Torque', 'Fuel efficiency', 'Engine sound'], optionsKn: ['ವೇಗ', 'ಟಾರ್ಕ್', 'ಇಂಧನ ದಕ್ಷತೆ', 'ಎಂಜಿನ್ ಶಬ್ದ'], correctAnswer: 'Fuel efficiency' },

  { text: 'What does Toyota use to eliminate any compromise in performance from the Atkinson cycle?', textKn: 'ಅಟ್ಖಿನ್‍ಸನ್ ಚಕ್ರದಿಂದ ಪರಿಣಾಮದಲ್ಲಿ ಯಾವುದೇ ತೊರೆತನ್ನವನ್ನು ನಿರ್ಮೂಲಗೊಳಿಸಲು ಟೊಯೋಟಾ ಏನು ಬಳಸುತ್ತದೆ?', options: ['Turbochargers', 'Advanced engine management and hybrid powertrains', 'Increased fuel injection', 'Cylinder deactivation'], optionsKn: ['ಟರ್ಬೋಚಾರ್ಜರ್‌ಗಳು', 'ಅಡ್ವಾನ್ಸ್ಡ್ ಎಂಜಿನ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಹೈಬ್ರಿಡ್ ಪವರ್‌ಟ್ರೇನ್ಸ್', 'ಇಂಧನ ಇಂಜೆಕ್ಷನ್ ಹೆಚ್ಚಿಸಲಾಗಿದೆ', 'ಸಿಲಿಂಡರ್ ನಿಷ್ಕ್ರಿಯತೆ'], correctAnswer: 'Advanced engine management and hybrid powertrains' },

  { text: 'According to the video, where should drivers look for detailed feature applicability?', textKn: 'ವೀಡಿಯೋ ಪ್ರಕಾರ, ಚಾಲಕರು ವೈಶಿಷ್ಟ್ಯಗಳ ಅನ್ವಯಿತೆಯನ್ನು ವಿವರವಾಗಿ ಎಲ್ಲಿಂದ ನೋಡಬಹುದು?', options: ['Toyota website', 'Service manual', 'Owner’s manual', 'Mechanic’s guide'], optionsKn: ['ಟೊಯೋಟಾ ವೆಬ್‌ಸೈಟ್', 'ಸೇವಾ ಕೈಪಿಡಿ', 'ಮಾಲೀಕರಿನ ಕೈಪുസ്തಕ', 'ಯಂತ್ರ ತಜ್ಞರ ಮಾರ್ಗದರ್ಶಿ'], correctAnswer: 'Owner’s manual' }
      ]
      ,
      // Repeat for other videos in M1
      [
        { text: 'What is the main source of power for a typical automobile?', textKn: 'ಸಾಮಾನ್ಯ ಕಾರಿನ ಪ್ರಮುಖ ಶಕ್ತಿ ಮೂಲವೇನು?', options: ['Battery', 'Engine', 'Motor', 'Transmission'], optionsKn: ['ಬ್ಯಾಟರಿ', 'ಎಂಜಿನ್', 'ಮೋಟಾರ್', 'ಟ್ರಾನ್ಸ್ಮಿಷನ್'], correctAnswer: 'Engine' },

        { text: 'What is the main purpose of an automobile engine?', textKn: 'ಕಾರಿನ ಎಂಜಿನ್‌ನ ಮುಖ್ಯ ಉದ್ದೇಶ ಏನು?', options: ['Pump air', 'Rotate the crankshaft to drive the wheels', 'Burn fuel for heat', 'Store electricity'], optionsKn: ['ಗಾಳಿಯನ್ನು ಪಂಪ್ ಮಾಡುವುದು', 'ಚಕ್ರಗಳನ್ನು ಚಾಲನೆ ಮಾಡಲು ಕ್ರಾಂಕ್ಶಾಫ್ಟ್ ಅನ್ನು ತಿರುಗಿಸುವುದು', 'ಬಾಲೆಗೆ ಇಂಧನವನ್ನು ದಹಿಸುವುದು', 'ವಿದ್ಯುತ್ ಸಂಗ್ರಹಿಸುವುದು'], correctAnswer: 'Rotate the crankshaft to drive the wheels' },

        { text: 'The crankshaft in an engine is responsible for:', textKn: 'ಎಂಜಿನ್‌ನಲ್ಲಿನ ಕ್ರಾಂಕ್ಶಾಫ್ಟ್ ಯಾವದಕ್ಕೆ ಜವಾಬ್ದಾರಿ?', options: ['Opening valves', 'Rotating the wheels', 'Cooling the engine', 'Controlling the exhaust'], optionsKn: ['ವೆಲ್ವ್‌ಗಳನ್ನು ತೆರೆಯುವುದು', 'ಚಕ್ರಗಳನ್ನು ತಿರುಗಿಸುವುದು', 'ಎಂಜಿನ್ ಅನ್ನು ತಣಿಸುವುದು', 'ಏಗಜಾಸ್ಟ್ ಆಯಂತ್ರಣ'], correctAnswer: 'Rotating the wheels' },

        { text: 'Pistons move due to:', textKn: 'ಪಿಸ್ಟನ್‌ಗಳು ಏಕೆ ಸರಿಯಾಗುತ್ತವೆ?', options: ['Oil pressure', 'Combustion of air and gasoline', 'Electric current', 'Cooling system'], optionsKn: ['ಎಣ್ಣೆ ಒತ್ತಡ', 'ಗಾಳಿ ಮತ್ತು ಗುಲೀಸಘಟಕದ ದಹನ', 'ವಿದ್ಯುತ್ ಹರಿವು', 'ತಂಪು ವ್ಯವಸ್ಥೆ'], correctAnswer: 'Combustion of air and gasoline' },

        { text: 'What are the two main parts of an engine?', textKn: 'ಎಂಜಿನ್‌ನ ಎರಡು ಪ್ರಮುಖ ಭಾಗಗಳು ಯಾವುವು?', options: ['Head and block', 'Cylinder and carburetor', 'Crankshaft and piston', 'Gearbox and clutch'], optionsKn: ['ಹೆಡ್ ಮತ್ತು ಬ್ಲಾಕ್', 'ಸಿಲಿಂಡರ್ ಮತ್ತು ಕಾರ್ಭುರೇಟರ್', 'ಕ್ರಾಂಕ್ಶಾಫ್ಟ್ ಮತ್ತು ಪಿಸ್ಟನ್', 'ಗಿಯರ್ಬಾಕ್ಸ್ ಮತ್ತು ಕ್ಲಚ್'], correctAnswer: 'Head and block' },

        { text: 'Which part of the engine houses pistons, cylinders, and the crankshaft?', textKn: 'ಎಂಜಿನ್‌ನ ಯಾವ ಭಾಗವು ಪಿಸ್ಟನ್‌ಗಳು, ಸಿಲಿಂಡರ್‌ಗಳು ಮತ್ತು ಕ್ರಾಂಕ್ಶಾಫ್ಟ್‌ ಅನ್ನು ಒಳಗೊಂಡಿದೆ?', options: ['Cylinder head', 'Engine block', 'Fuel chamber', 'Crankcase cover'], optionsKn: ['ಸಿಲಿಂಡರ್ ಹೆಡ್', 'ಎಂಜಿನ್ ಬ್ಲಾಕ್', 'ಇಂಧನ ಚೇಂಬರ್', 'ಕ್ರ್ಯಾಂಕೇಸ್ ಮುಚ್ಚುಣ'], correctAnswer: 'Engine block' },

        { text: 'The cylinder head manages combustion through which systems?', textKn: 'ಸಿಲಿಂಡರ್ ಹೆಡ್ ಯಾವುದೇ ವ್ಯವಸ್ಥೆಗಳ ಮೂಲಕ ದಹನವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ?', options: ['Fuel, oil, cooling', 'Valvetrain, fuel injection, ignition', 'Lubrication, exhaust, intake', 'Turbo, valve, pressure'], optionsKn: ['ಇಂಧನ, ಎಣ್ಣೆ, ತಂಪೀಕರಣ', 'ವೆಲ್ವ್‌ಟ್ರೈನ್, ಇಂಧನ ಇಂಜೆಕ್ಷನ್, ಇಗ್ನಿಷನ್', 'ಸ್ನಿಗ್ಧೀಕರಣ, ಏಗಜಾಸ್ಟ್, ಇಂಟೇಕ್', 'ಟರ್ಬೊ, ವೆಲ್ವ್, ಒತ್ತಡ'], correctAnswer: 'Valvetrain, fuel injection, ignition' },

        { text: 'How many stages of operation does a four-stroke engine have?', textKn: 'ನಾಲ್ಕು-ಸ्ट्रೋಕ್ ಎಂಜಿನ್‌ಗೆ ಎಷ್ಟು ಕಾರ್ಯ ಚರಣಗಳಿವೆ?', options: ['Two', 'Three', 'Four', 'Five'], optionsKn: ['ಎರಡು', 'ಮೂರು', 'ನಾಲ್ಕು', 'ಐದು'], correctAnswer: 'Four' },

        { text: 'During the intake stroke, the piston moves:', textKn: 'ಇಂಟೇಕ್ ಸ್ಟ್ರೋಕ್ ಸಮಯದಲ್ಲಿ ಪಿಸ್ಟನ್ ಹೇಗೆ ಚಲಿಸುತ್ತದೆ?', options: ['Upward', 'Downward', 'Sideways', 'Remains still'], optionsKn: ['ಮೇಲಕ್ಕೆ', 'ಡೌನ್', 'ಬದಕ್ಕೆ', 'ಸ್ಥಿರವಾಗಿರುತ್ತದೆ'], correctAnswer: 'Downward' },

        { text: 'What happens when the piston moves down in the first stroke?', textKn: 'ಪ್ರಥಮ ಸ್ಟ್ರೋಕ್‌ನಲ್ಲಿ ಪಿಸ್ಟನ್ ಕೆಳಗೆ ಹೋದಾಗ ಏನಾಗುತ್ತದೆ?', options: ['Air is compressed', 'Air-fuel mixture is ejected', 'Air is drawn into the cylinder', 'Fuel is ignited'], optionsKn: ['ಗಾಳಿ ಒತ್ತಡಗೊಳ್ಳುತ್ತದೆ', 'ಗಾಳಿ-ಇಂಧನ ಮಿಶ್ರಣ ಹೊರಗೆ ಹೊರಡುತ್ತದೆ', 'ಗಾಳಿ ಸಿಲಿಂಡರ್‌ಗೆ ಸೆಳೆಯುತ್ತದೆ', 'ಇಂಧನ ಇಗ್ನೈಟ್ ಆಗುತ್ತದೆ'], correctAnswer: 'Air is drawn into the cylinder' },

        { text: 'Which valves control the air entering the cylinder?', textKn: 'ಸಿಲಿಂಡರ್‌ಗೆ ಹೊಂದುತ್ತಿರುವ ಗಾಳಿಯನ್ನು ಯಾವ ವೆಲ್ವ್‌ಗಳು ನಿಯಂತ್ರಿಸುತ್ತವೆ?', options: ['Exhaust valves', 'Intake valves', 'Relief valves', 'Spark valves'], optionsKn: ['ಏಗಜಾಸ್ಟ್ ವೆಲ್ವ್‌ಗಳು', 'ಇಂಟೇಕ್ ವೆಲ್ವ್‌ಗಳು', 'ರಿಲೀಫ್ ವೆಲ್ವ್‌ಗಳು', 'ಸ್ಪಾರ್ಕ್ ವೆಲ್ವ್‌ಗಳು'], correctAnswer: 'Intake valves' },

        { text: 'What occurs during the compression stroke?', textKn: 'ಸಂಕುಚನ ಸ್ಟ್ರೋಕ್ ಸಮಯದಲ್ಲಿ ಏನಾಗುತ್ತದೆ?', options: ['Air-fuel mixture ignites', 'Air-fuel mixture is compressed', 'Exhaust gases exit', 'Valves open'], optionsKn: ['ಗಾಳಿ-ಇಂಧನ ಮಿಶ್ರಣ ಇಗ್ನೈಟ್ ಆಗುತ್ತದೆ', 'ಗಾಳಿ-ಇಂಧನ ಮಿಶ್ರಣ ಸುಂಕಲಾಗಿದೆ', 'ಏಗಜಾಸ್ಟ್ ಅನಿಲಗಳು ಹೊರಹೋಗುತ್ತವೆ', 'ವೆಲ್ವ್‌ಗಳು ತೆರೆಯುತ್ತವೆ'], correctAnswer: 'Air-fuel mixture is compressed' },

        { text: 'The spark plug creates a spark during which stroke?', textKn: 'ಸ್ಪಾರ್ಕ್ ಪ್ಲಗ್ ಯಾವ ಸ್ಟ್ರೋಕ್‌ನಲ್ಲಿ ಸ್ಪಾರ್ಕ್ ಉಂಟುಮಾಡುತ್ತದೆ?', options: ['Compression', 'Power', 'Exhaust', 'Intake'], optionsKn: ['ಸಂಕುಚನ', 'ಪವರ್', 'ಏಗಜಾಸ್ಟ್', 'ಇಂಟೇಕ್'], correctAnswer: 'Power' },

        { text: 'What happens as a result of the spark plug ignition?', textKn: 'ಸ್ಪಾರ್ಕ್ ಪ್ಲಗ್ ಇಗ್ನಿಷನ್ ಫಲವಾಗಿ ಏನಾಗುತ್ತದೆ?', options: ['Fuel evaporates', 'Controlled explosion pushes piston down', 'Crankshaft stops rotating', 'Valves open'], optionsKn: ['ಇಂಧನ ವಾಷ್ಟಿ ಆಗುತ್ತದೆ', 'ನಿಯಂತ್ರಿತ ಸ್ಫೋಟ ಪಿಸ್ಟನನ್ನು ಕೆಳಗೆ ಒತ್ತುತ್ತದೆ', 'ಕ್ರಾಂಕ್ಶಾಫ್ಟ್ ತಿರುಗುವುದು ನಿಲ್ಲುತ್ತದೆ', 'ವೆಲ್ವ್‌ಗಳು ತೆರೆಯುತ್ತವೆ'], correctAnswer: 'Controlled explosion pushes piston down' },

        { text: 'During the exhaust stroke, the piston moves:', textKn: 'ಏಗಜಾಸ್ಟ್ ಸ್ಟ್ರೋಕ್ ಸಮಯದಲ್ಲಿ ಪಿಸ್ಟನ್ ಹೇಗೆ ಚಲಿಸುತ್ತದೆ?', options: ['Down', 'Up', 'Sideways', 'Stationary'], optionsKn: ['ಕೆಳಗೆ', 'ಮೇಲಕ್ಕೆ', 'ಬದಕ್ಕೆ', 'ಸ್ಥಿರ'], correctAnswer: 'Up' },

        { text: 'Exhaust gases exit through:', textKn: 'ಏಗಜಾಸ್ಟ್ ಅನಿಲಗಳು ಮೂಲಕ ಹೊರಹೊಮ್ಮುತ್ತವೆ:', options: ['Intake valves', 'Exhaust valves', 'Crankshaft ports', 'Fuel injectors'], optionsKn: ['ಇಂಟೇಕ್ ವೆಲ್ವ್‌ಗಳು', 'ಏಗಜಾಸ್ಟ್ ವೆಲ್ವ್‌ಗಳು', 'ಕ್ರಾಂಕ್ಶಾಫ್ಟ್ ಪೋರ್ಟ್ಸ್', 'ಇಂಧನ ಇಂಜೆಕ್ಟರ್‌ಗಳು'], correctAnswer: 'Exhaust valves' },

        { text: 'Multiple cylinders working together help:', textKn: 'ಬಹು ಸಿಲಿಂಡರ್‌ಗಳು ಒಟ್ಟಿಗೆ ಕೆಲಸ ಮಾಡಿದಾಗ ಸಹಾಯಮಾಡುವುದು:', options: ['Reduce power', 'Balance the four-stroke process', 'Increase fuel usage', 'Cool the engine'], optionsKn: ['ಶಕ್ತಿ ಕಡಿಮೆ', 'ನಾಲ್ಕು-ಸ್ಟ್ರೋಕ್ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸಮತೋಲಗೊಳಿಸುತ್ತದೆ', 'ಇಂಧನ ಬಳಕೆ ಹೆಚ್ಚಿಸುತ್ತದೆ', 'ಎಂಜಿನ್ ತಣಿಸುತ್ತದೆ'], correctAnswer: 'Balance the four-stroke process' },

        { text: 'What is the most common engine configuration today?', textKn: 'ಇಂದು ಅತ್ಯಂತ ಸಾಮಾನ್ಯ ಎಂಜಿನ್ ವಿನ್ಯಾಸ ಯಾವುದು?', options: ['V8', 'Inline-four', 'V6', 'Boxer'], optionsKn: ['V8', 'ಇನ್‍ಲೈನ್-ನಾಲ್ಕು', 'V6', 'ಬಾಕ್ಸರ್'], correctAnswer: 'Inline-four' },

        { text: 'In a V6 engine, how are the cylinders arranged?', textKn: 'V6 ಎಂಜಿನ್‌ನಲ್ಲಿ ಸಿಲಿಂಡರ್‌ಗಳು ಹೇಗೆ ವ್ಯವಸ್ಥೆಗೊಳ್ಳುತ್ತವೆ?', options: ['All in one line', 'In two banks of three cylinders', 'In three rows', 'Horizontally opposite'], optionsKn: ['ಎಲ್ಲಾ ಒಂದೇ ಸಾಲಿನಲ್ಲಿ', 'ಮೂರು ಸಿಲಿಂಡರ್‌ಗಳ ಎರಡು ಬ್ಯಾಂಕ್‌ಗಳಲ್ಲಿ', 'ಮೂರು ಸರಣಿಗಳಲ್ಲಿ', 'ಅಡ್ಡದಿಕ್ಕಿನಲ್ಲಿ ಎದುರಿಗೆ'], correctAnswer: 'In two banks of three cylinders' },

        { text: 'What is a boxer or flat engine?', textKn: 'ಬಾಕ್ಸರ್ ಅಥವಾ ಫ್ಲಾಟ್ ಎಂಜಿನ್ ಎಂದರೆ ಏನು?', options: ['V-shaped engine', 'Inline engine', '180-degree flat engine', 'Hybrid electric engine'], optionsKn: ['V-ಆಕಾರದ ಎಂಜಿನ್', 'ಇನ್‍ಲೈನ್ ಎಂಜಿನ್', '180-ಡಿಗ್ರಿ ಫ್ಲಾಟ್ ಎಂಜಿನ್', 'ಹೈಬ್ರಿಡ್ ಎಲೆಕ್ಟ್ರಿಕ್ ಎಂಜಿನ್'], correctAnswer: '180-degree flat engine' },

        { text: 'What does the number 2.0 or 3.5 refer to in engines?', textKn: 'ಎಂಜಿನ್ ಸಂಖ್ಯೆ 2.0 ಅಥವಾ 3.5 ಯಾವವನ್ನು ಸೂಚಿಸುತ್ತದೆ?', options: ['Fuel capacity', 'Cylinder diameter', 'Engine displacement', 'Compression ratio'], optionsKn: ['ಇಂಧನ ಸಾಮರ್ಥ್ಯ', 'ಸಿಲಿಂಡರ್ ವ್ಯಾಸ', 'ಎಂಜಿನ್ ಡಿಸ್ಪ್ಲೇಸ್‌ಮೆಂಟ್', 'ಕಂಪ್ರೆಷನ್ ಅನುಪಾತ'], correctAnswer: 'Engine displacement' },

        { text: 'Engine displacement is measured in:', textKn: 'ಎಂಜಿನ್ ಡಿಸ್ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಯಾವ ಘಟಕದಲ್ಲಿ ಅಳೆಯಲಾಗುತ್ತದೆ?', options: ['Gallons', 'Liters', 'Kilograms', 'Horsepower'], optionsKn: ['ಗ್ಯಾಲನ್', 'ಲೀಟರ್', 'ಕಿಲೋಗ್ರಾಂ', 'ಹಾರ್ಸ್‌ಪವರ್'], correctAnswer: 'Liters' },

        { text: 'A 2.0-liter engine with four cylinders displaces how much per cylinder?', textKn: 'ನಾಲ್ಕು ಸಿಲಿಂಡರ್‌ಗಳೊಂದಿಗೆ 2.0-ಲೀಟರ್ ಎಂಜಿನ್ ಪ್ರತಿ ಸಿಲಿಂಡರ್‌ಗೆ ಎಷ್ಟು ಡಿಸ್ಪ್ಲೇಸ್ ಮಾಡುತ್ತದೆ?', options: ['1 liter', '0.5 liter', '0.25 liter', '2 liters'], optionsKn: ['1 ಲೀಟರ್', '0.5 ಲೀಟರ್', '0.25 ಲೀಟರ್', '2 ಲೀಟರ್'], correctAnswer: '0.5 liter' },

        { text: 'Torque refers to:', textKn: 'ಟಾರ್ಕ್ ಎಂದರೆ ಏನು?', options: ['Speed of the engine', 'Strength with which crankshaft turns', 'Fuel efficiency', 'Compression ratio'], optionsKn: ['ಎಂಜಿನ್ ವೇಗ', 'ಕ್ರಾಂಕ್ಶಾಫ್ಟ್ ತಿರುಗುವ ಶಕ್ತಿ', 'ಇಂಧನ ದಕ್ಷತೆ', 'ಕಂಪ್ರೆಷನ್ ಅನುಪಾತ'], correctAnswer: 'Strength with which crankshaft turns' },

        { text: 'Torque is measured in:', textKn: 'ಟಾರ್ಕ್ ಅನ್ನು ಯಾವ ಘಟಕದಲ್ಲಿ ಅಳೆಯುತ್ತಾರೆ?', options: ['Horsepower', 'Newton meters', 'Pound-feet', 'RPM'], optionsKn: ['ಹಾರ್ಸ್‌ಪವರ್', 'ನ್ಯೂಟನ್ ಮೀಟರ್', 'ಪೌಂಡ್-ಫೀಟ್', 'ಆರ್‌ಪಿಎಂ'], correctAnswer: 'Pound-feet' },

        { text: 'Horsepower is defined as:', textKn: 'ಹಾರ್ಸ್‌ಪವರ್ ಅನ್ನು ಹೇಗೆ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗುತ್ತದೆ?', options: ['Torque over time', 'Torque per cycle', 'RPM per stroke', 'Cylinder pressure'], optionsKn: ['ಸಮಯಕ್ಕೆ ಟಾರ್ಕ್', 'ಪ್ರತಿ ಚಕ್ರಕ್ಕೆ ಟಾರ್ಕ್', 'ಪ್ರತಿ ಸ್ಟ್ರೋಕ್‌ಗೆ ಆರ್‌ಪಿಎಂ', 'ಸಿಲಿಂಡರ್ ಒತ್ತಡ'], correctAnswer: 'Torque over time' },

        { text: 'Horsepower increases when:', textKn: 'ಹಾರ್ಸ್‌ಪವರ್ ಯಾವಾಗ ಹೆಚ್ಚುತ್ತದೆ?', options: ['Torque decreases', 'Engine speed increases', 'Fuel injection stops', 'Pistons move slower'], optionsKn: ['ಟಾರ್ಕ್ ಕಡಿಮೆಯಾಗುತ್ತದೆ', 'ಎಂಜಿನ್ ವೇಗ ಹೆಚ್ಚುತ್ತದೆ', 'ಇಂಧನ ಇಂಜೆಕ್ಷನ್ ನಿಲ್ಲುತ್ತದೆ', 'ಪಿಸ್ಟನ್ಗಳು ನಿಧಾನವಾಗುತ್ತವೆ'], correctAnswer: 'Engine speed increases' },

        { text: 'The formula for horsepower in simple terms is:', textKn: 'ಸರಳವಾಗಿ ಹೇಳುವ ಹಾರ್ಸ್‌ಪವರ್ ಸೂತ್ರ ಯಾವುದು?', options: ['Torque + RPM', 'Torque × RPM', 'Torque ÷ RPM', 'RPM ÷ Torque'], optionsKn: ['ಟಾರ್ಕ್ + ಆರ್‌ಪಿಎಂ', 'ಟಾರ್ಕ್ × ಆರ್‌ಪಿಎಂ', 'ಟಾರ್ಕ್ ÷ ಆರ್‌ಪಿಎಂ', 'ಆರ್‌ಪಿಎಂ ÷ ಟಾರ್ಕ್'], correctAnswer: 'Torque × RPM' },

        { text: 'Why can’t engines simply spin faster to make more horsepower?', textKn: 'ಅಧಿಕ ಹಾರ್ಸ್‌ಪವರ್ ಪಡೆಯಲು ಎಂಜಿನ್‌ಗಳು ಸರಳವಾಗಿ ಹೆಚ್ಚು ವೇಗವಾಗಿ ತಿರುಗಲು ಸಾಧ್ಯವಿಲ್ಲ ಏಕೆ?', options: ['High speed reduces torque and efficiency', 'Air supply stops', 'Fuel leaks occur', 'Crankshaft breaks easily'], optionsKn: ['ಉচ্চ ವೇಗ ಟಾರ್ಕ್ ಮತ್ತು ದಕ್ಷತೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ', 'ಗಾಳಿ ಪೂರೈಕೆ ನಿಲ್ಲುತ್ತದೆ', 'ಇಂಧನ ಲೀಕ್ ಆಗಬಹುದು', 'ಕ್ರಾಂಕ್ಶಾಫ್ಟ್ ಸುಲಭವಾಗಿ ಮುರಿಯುತ್ತದೆ'], correctAnswer: 'High speed reduces torque and efficiency' },

        { text: 'Why are transmissions important for engine performance?', textKn: 'ಎಂಜಿನ್ ಪ್ರದರ್ಶನಕ್ಕೆ ಗಿಯರ್ಬಾಕ್ಸ್‌ಗಳು ಪ್ರಮುಖವಾದುದು ಏಕೆ?', options: ['They reduce fuel', 'They keep the engine in its torque-power sweet spot', 'They control spark timing', 'They clean the exhaust gases'], optionsKn: ['ಅವು ಇಂಧನ ಕಡಿಮೆ ಮಾಡುತ್ತವೆ', 'ಅವು ಎಂಜಿನ್ ಅನ್ನು ಅದರ ಟಾರ್ಕ್-ಶಕ್ತಿ ಸೂಟ್ ಸ್ಪಾಟ್‌ನಲ್ಲಿರಿಸುತ್ತವೆ', 'ಅವು ಸ್ಪಾರ್ಕ್ ಟೈಮಿಂಗ್ ಅನ್ನು ನಿಯಂತ್ರಿಸುತ್ತವೆ', 'ಅವು ಏಗಜಾಸ್ಟ್ ಅನಿಲಗಳನ್ನು ಶುದ್ಧಗೊಳಿಸುತ್ತವೆ'], correctAnswer: 'They keep the engine in its torque-power sweet spot' }
      ]
      ,
      [
        { text: 'When did Toyota introduce the hybrid electric powertrain?', options: ['1987', '1997', '2007', '2017'], correctAnswer: '1997' },
      
        { text: 'What did Toyota prove by introducing the hybrid electric powertrain?', options: ['That electric cars were faster', 'That hybrid systems were viable for passenger vehicles', 'That fuel cells were better', 'That diesel engines were outdated'], correctAnswer: 'That hybrid systems were viable for passenger vehicles' },
      
        { text: 'What is the full form of THS?', options: ['Toyota Hybrid Setup', 'Toyota Hybrid System', 'Total Hybrid Solution', 'Twin Hybrid System'], correctAnswer: 'Toyota Hybrid System' },
      
        { text: 'The Toyota Hybrid System is based on what type of design?', options: ['Parallel', 'Series', 'Series-parallel', 'Single motor'], correctAnswer: 'Series-parallel' },
      
        { text: 'In a Toyota hybrid, the wheels can be driven by:', options: ['Only the gas engine', 'Only the electric motor', 'Both gas engine and electric motor', 'Only the transmission'], correctAnswer: 'Both gas engine and electric motor' },
      
        { text: 'How does the Toyota Hybrid System charge its battery?', options: ['By plugging into an outlet', 'By solar panels', 'Via engine power or regenerative braking', 'By alternator only'], correctAnswer: 'Via engine power or regenerative braking' },
      
        { text: 'What are the key design priorities of Toyota’s hybrid EV battery?', options: ['Speed and noise', 'Longevity, durability, and reliability', 'Size and color', 'Heat and vibration'], correctAnswer: 'Longevity, durability, and reliability' },
      
        { text: 'What is the first thing that happens when a Toyota hybrid start button is pressed?', options: ['The fuel pump starts', 'The ECUs power up', 'The starter motor cranks', 'The inverter turns off'], correctAnswer: 'The ECUs power up' },
      
        { text: 'The Electronic Control Units (ECUs) operate using which battery?', options: ['High voltage battery', '12-volt battery', 'Solar battery', 'Nickel-cadmium battery'], correctAnswer: '12-volt battery' },
      
        { text: 'What common car functions also run on the 12-volt circuit?', options: ['Lighting, windows, and door locks', 'Steering wheel', 'Transmission gears', 'Fuel injectors'], correctAnswer: 'Lighting, windows, and door locks' },
      
        { text: 'What do ECUs check before the hybrid starts running?', options: ['GPS status', 'Battery and temperature parameters', 'Driver seatbelt', 'Tire pressure'], correctAnswer: 'Battery and temperature parameters' },
      
        { text: 'Which components do ECUs manage that handle high-voltage power delivery?', options: ['Fuel injectors', 'System main relays', 'Cooling fans', 'Spark plugs'], correctAnswer: 'System main relays' },
      
        { text: 'What is the purpose of system main relays?', options: ['Control engine valves', 'Safely send hybrid battery power to components', 'Open air intake', 'Reduce braking pressure'], correctAnswer: 'Safely send hybrid battery power to components' },
      
        { text: 'What happens if a fault or collision is detected in a Toyota hybrid?', options: ['Engine keeps running', 'Relays power down to isolate the battery', 'All motors speed up', 'The battery discharges'], correctAnswer: 'Relays power down to isolate the battery' },
      
        { text: 'High-voltage cables in Toyota hybrids are color-coded:', options: ['Red', 'Yellow', 'Blue', 'Orange'], correctAnswer: 'Orange' },
      
        { text: 'Where does the hybrid battery power go after ECUs are activated?', options: ['Inverter Converter', 'Crankshaft', 'Radiator', 'Fuel tank'], correctAnswer: 'Inverter Converter' },
      
        { text: 'What is the function of the Inverter Converter?', options: ['Control oil pressure', 'Control high-voltage flow and charge the 12V battery', 'Convert gasoline to electricity', 'Cool the engine'], correctAnswer: 'Control high-voltage flow and charge the 12V battery' },
      
        { text: 'Motor Generators in Toyota hybrids can act as:', options: ['Motors only', 'Generators only', 'Both motors and generators', 'Alternators'], correctAnswer: 'Both motors and generators' },
      
        { text: 'Where is Motor/Generator 1 (MG1) located?', options: ['At the rear wheels', 'Behind the engine', 'Under the battery', 'Near the exhaust'], correctAnswer: 'Behind the engine' },
      
        { text: 'What does MG1 do when used as a motor?', options: ['Opens valves', 'Starts the engine on demand', 'Drives the wheels', 'Powers the air conditioner'], correctAnswer: 'Starts the engine on demand' },
      
        { text: 'Why is the Toyota hybrid engine start silent?', options: ['Because MG1 has no gear drive', 'Because it uses a muffler', 'Because it’s an electric car', 'Because it’s soundproofed'], correctAnswer: 'Because MG1 has no gear drive' },
      
        { text: 'Once the engine is running, MG1 acts as a:', options: ['Motor', 'Starter', 'Generator', 'Compressor'], correctAnswer: 'Generator' },
      
        { text: 'What device manages power between the engine and MG2?', options: ['Alternator', 'Planetary gear set', 'Timing chain', 'Differential'], correctAnswer: 'Planetary gear set' },
      
        { text: 'MG2 provides power to:', options: ['Headlights', 'Rear seats', 'Wheels during acceleration and cruising', 'Fuel pump'], correctAnswer: 'Wheels during acceleration and cruising' },
      
        { text: 'What happens when the vehicle brakes or coasts?', options: ['Fuel is saved', 'MG2 regenerates energy to charge the battery', 'Battery is disconnected', 'Engine revs increase'], correctAnswer: 'MG2 regenerates energy to charge the battery' },
      
        { text: 'What engine timing system does the Toyota hybrid use for efficiency?', options: ['Otto cycle', 'Atkinson-cycle cam timing', 'Diesel cycle', 'Turbocharged cycle'], correctAnswer: 'Atkinson-cycle cam timing' },
      
        { text: 'What is the trade-off of the Atkinson-cycle design?', options: ['Lower emissions', 'Reduced power output', 'Increased vibration', 'Higher noise'], correctAnswer: 'Reduced power output' },
      
        { text: 'How does Toyota create an AWD hybrid from a FWD one?', options: ['By adding a driveshaft', 'By adding a third rear motor generator', 'By using stronger tires', 'By changing transmission'], correctAnswer: 'By adding a third rear motor generator' },
      
        { text: 'Where is the Motor Generator Rear located?', options: ['Under the hood', 'Between the rear wheels', 'On the crankshaft', 'Next to MG1'], correctAnswer: 'Between the rear wheels' },
      
        { text: 'What does the rear motor generator do besides powering the rear wheels?', options: ['Cools the engine', 'Generates power during braking or coasting', 'Charges headlights', 'Controls air pressure'], correctAnswer: 'Generates power during braking or coasting' }
      ]
      
      // Add Kannada placeholder fields for each question in this block
      .map(q => ( (q as any).textKn = (q as any).text, (q as any).optionsKn = Array.isArray((q as any).options) ? [...(q as any).options] : undefined, q ))
      ,
      [
        { text: 'What is the main purpose of Toyota’s Dynamic Force engines?', options: ['Increase vehicle weight', 'Improve performance, fuel economy, and durability', 'Replace hybrid systems', 'Simplify maintenance'], correctAnswer: 'Improve performance, fuel economy, and durability' },

          { textKn: 'ಟೊಯೋಟಾ ಡೈನಾಮಿಕ್ ಫೋರ್ಸ್ ಎಂಜಿನ್‌ಗಳ ಮುಖ್ಯ ಉದ್ದೇಶವೇನು?', text: 'What is the main purpose of Toyota’s Dynamic Force engines?', options: ['Increase vehicle weight', 'Improve performance, fuel economy, and durability', 'Replace hybrid systems', 'Simplify maintenance'], correctAnswer: 'Improve performance, fuel economy, and durability' },
      
        { text: 'The Dynamic Force engine was designed for which platform?', options: ['TNGA - Toyota New Global Architecture', 'THS - Toyota Hybrid System', 'TRD - Toyota Racing Division', 'TSS - Toyota Safety Sense'], correctAnswer: 'TNGA - Toyota New Global Architecture' },
      
        { text: 'What is the role of Dynamic Force engines in TNGA vehicles?', options: ['Provide all-wheel drive capability', 'Enhance fun-to-drive characteristics', 'Reduce weight only', 'Enable autonomous driving'], correctAnswer: 'Enhance fun-to-drive characteristics' },
          { textKn: 'TNGA ವಾಹನಗಳಲ್ಲಿ ಡೈನಾಮಿಕ್ ಫೋರ್ಸ್ ಎಂಜಿನ್‌ಗಳ ಪಾತ್ರವೇನು?', text: 'What is the role of Dynamic Force engines in TNGA vehicles?', options: ['Provide all-wheel drive capability', 'Enhance fun-to-drive characteristics', 'Reduce weight only', 'Enable autonomous driving'], correctAnswer: 'Enhance fun-to-drive characteristics' },
      
        { text: 'What material is used for the Dynamic Force engine block?', options: ['Cast iron', 'Cast aluminum', 'Magnesium alloy', 'Carbon fiber'], correctAnswer: 'Cast aluminum' },
          { textKn: 'ಡೈನಾಮಿಕ್ ಫೋರ್ಸ್ ಎಂಜಿನ್ ಬ್ಲಾಕ್‌ಗೆ ಯಾವ ವಸ್ತುವನ್ನು ಬಳಸಲಾಗುತ್ತದೆ?', text: 'What material is used for the Dynamic Force engine block?', options: ['Cast iron', 'Cast aluminum', 'Magnesium alloy', 'Carbon fiber'], correctAnswer: 'Cast aluminum' },
      
        { text: 'Why does Toyota use a cast aluminum block?', options: ['To increase sound insulation', 'For weight reduction and better fuel efficiency', 'To improve turbocharging', 'To enhance cooling'], correctAnswer: 'For weight reduction and better fuel efficiency' },
      
        { text: 'Dynamic Force engines achieve world-class thermal efficiency thanks to:', options: ['Turbocharging', 'Ultra-low friction internal components', 'Larger pistons', 'Thicker cylinder walls'], correctAnswer: 'Ultra-low friction internal components' },
      
        { text: 'Dynamic Force engines are designed to improve:', options: ['Combustion speed and minimize energy losses', 'Oil pressure and cooling', 'Ignition timing only', 'Air intake noise'], correctAnswer: 'Combustion speed and minimize energy losses' },
      
        { text: 'Compared to conventional engines, Dynamic Force engines have:', options: ['Shorter stroke and lower compression ratio', 'Longer stroke and higher compression ratio', 'Equal stroke and compression ratio', 'Variable cylinder deactivation'], correctAnswer: 'Longer stroke and higher compression ratio' },
      
        { text: 'What change was made to the intake and exhaust valves in Dynamic Force engines?', options: ['They are closer together', 'Their angle was widened', 'They were replaced by turbo valves', 'They were made smaller'], correctAnswer: 'Their angle was widened' },
      
        { text: 'The intake port shape was modified to:', options: ['Create tumble flow', 'Increase back pressure', 'Reduce airflow', 'Increase cylinder pressure'], correctAnswer: 'Create tumble flow' },
      
        { text: 'What is tumble flow?', options: ['Backflow of exhaust gases', 'Controlled swirl that improves air-fuel mixing', 'Turbulence that reduces fuel economy', 'Airflow that cools the piston'], correctAnswer: 'Controlled swirl that improves air-fuel mixing' },
      
        { text: 'What fuel injection system is used in Dynamic Force engines?', options: ['Port injection only', 'Direct injection only', 'D-4S combined system', 'Carburetion system'], correctAnswer: 'D-4S combined system' },
      
        { text: 'In the D-4S system, which injectors operate under light to medium loads?', options: ['Only direct injectors', 'Only port injectors', 'Both direct and port injectors', 'No injectors'], correctAnswer: 'Both direct and port injectors' },
      
        { text: 'Under heavy engine loads, which injectors are used?', options: ['Port injectors', 'Direct injectors only', 'Both injectors', 'None'], correctAnswer: 'Direct injectors only' },
      
        { text: 'Which system manages combustion and minimizes energy loss?', options: ['Turbo boost system', 'Variable Control System', 'Air intake regulator', 'Cooling fan system'], correctAnswer: 'Variable Control System' },
      
        { text: 'Which systems control valve timing in Dynamic Force engines?', options: ['Dual VVT-i and VVT-iE', 'VTEC and VVTL-i', 'EGR and MIVEC', 'ECVT and turbo timing'], correctAnswer: 'Dual VVT-i and VVT-iE' },
      
        { text: 'What is special about the VVT-iE system?', options: ['Uses oil pressure', 'Uses an electric motor instead of oil pressure', 'Uses air pressure', 'Runs on hybrid battery only'], correctAnswer: 'Uses an electric motor instead of oil pressure' },
      
        { text: 'What is the benefit of VVT-iE’s electric motor control?', options: ['Reduces cabin noise', 'Prevents engine knock at low speeds and low oil pressure', 'Improves spark timing', 'Reduces steering effort'], correctAnswer: 'Prevents engine knock at low speeds and low oil pressure' },
      
        { text: 'Dynamic Force engines can operate within which two thermodynamic cycles?', options: ['Diesel and Otto', 'Atkinson and Otto', 'Brayton and Rankine', 'Otto and Stirling'], correctAnswer: 'Atkinson and Otto' },
      
        { text: 'What system handles engine thermal management?', options: ['Air cooling system', 'Variable cooling system', 'Oil-based heating system', 'Exhaust gas control'], correctAnswer: 'Variable cooling system' },
      
        { text: 'Which components are part of the variable cooling system?', options: ['Turbocharger and intercooler', 'Electric water pump, electronic thermostat, and flow valves', 'Radiator fan only', 'Oil jets and turbo fins'], correctAnswer: 'Electric water pump, electronic thermostat, and flow valves' },
      
        { text: 'What does the variable oil pump do when the engine is cold?', options: ['Increases oil flow', 'Stops cylinder oil jets to warm up faster', 'Increases fuel injection', 'Reduces spark timing'], correctAnswer: 'Stops cylinder oil jets to warm up faster' },
      
        { text: 'What purpose does the water jacket spacer serve?', options: ['Reduces friction', 'Optimizes coolant flow and maintains uniform temperature', 'Improves fuel injection', 'Controls exhaust flow'], correctAnswer: 'Optimizes coolant flow and maintains uniform temperature' },
      
        { text: 'Why are oil drain paths placed near water jackets?', options: ['To reduce weight', 'To improve thermal exchange and warm-up', 'To increase oil pressure', 'To simplify design'], correctAnswer: 'To improve thermal exchange and warm-up' },
      
        { text: 'What is the overall goal of the Dynamic Force engine design?', options: ['Increase noise and vibration', 'Achieve rapid combustion, high efficiency, and low emissions', 'Reduce output power', 'Simplify maintenance'], correctAnswer: 'Achieve rapid combustion, high efficiency, and low emissions' }
      ]
      ,
      [
        { text: 'What component is primarily responsible for how an engine breathes?', options: ['Exhaust manifold', 'Valvetrain', 'Piston rings', 'Crankshaft'], correctAnswer: 'Valvetrain' },
          { textKn: ' ಎಂಜಿನ್ ಹೇಗೆ ಉಸಿರಾಡುತ್ತದೆ ಎಂಬುದಕ್ಕೆ ಮುಖ್ಯವಾದ ಜವಾಬ್ದಾರಿ ಯಾವ ಘಟಕಕ್ಕೆ ಇದೆ?', text: 'What component is primarily responsible for how an engine breathes?', options: ['Exhaust manifold', 'Valvetrain', 'Piston rings', 'Crankshaft'], optionsKn: ['ಎಗ್ಜಾಸ್ಟ್ ಮ್ಯಾನಿಫೋಲ್ಡ್', 'ವೆಲ್ವ್‌ಟ್ರೆೈನ್', 'ಪಿಸ್ಟನ್ ರಿಂಗ್ಸ್', 'ಕ್ರಾಂಕ್ಶಾಫ್ಟ್'], correctAnswer: 'Valvetrain' },
      
        { text: 'What is the main function of the valvetrain?', options: ['Control ignition timing', 'Regulate intake and exhaust valve movement', 'Lubricate engine parts', 'Control engine cooling'], correctAnswer: 'Regulate intake and exhaust valve movement' },
          { textKn: 'ವೆಲ್ವ್‌ಟ್ರೆೈನ್‌ನ ಮುಖ್ಯ ಕಾರ್ಯವೇನು?', text: 'What is the main function of the valvetrain?', options: ['Control ignition timing', 'Regulate intake and exhaust valve movement', 'Lubricate engine parts', 'Control engine cooling'], optionsKn: ['ಇಗ್ನಿಷನ್ ಟೈಮಿಂಗ್ ನಿಯಂತ್ರಿಸು', 'ಇಂಟೇಕ್ ಮತ್ತು ಏಗ್ಝಾಸ್ಟ್ ವೆಲ್ವ್ ಚಲನವಲನ ನಿಯಂತ್ರಣ', 'ಎಂಜಿನ್ ಭಾಗಗಳನ್ನು ಸೋತಿಯೇರಿಸುವುದು', 'ಎಂಜಿನ್ ತಂಪುಗೊಳಿಸುವುದನ್ನು ನಿಯಂತ್ರಿಸು'], correctAnswer: 'Regulate intake and exhaust valve movement' },
      
        { text: 'Which component opens and closes the engine valves?', options: ['Crankshaft', 'Camshaft', 'Timing belt', 'Throttle body'], correctAnswer: 'Camshaft' },
          { textKn: 'ಯಾವ ಘಟಕ ಎಂಜಿನ್ ವೆಲ್ವ್‌ಗಳನ್ನು ತೆರೆಯುತ್ತೆ ಮತ್ತು ಮುಚ್ಚುತ್ತೆ?', text: 'Which component opens and closes the engine valves?', options: ['Crankshaft', 'Camshaft', 'Timing belt', 'Throttle body'], optionsKn: ['ಕ್ರಾಂಕ್ಶಾಫ್ಟ್', 'ಕ್ಯಾಮ್‌ಶಾಫ್ಟ್', 'ಟೈಮಿಂಗ್ ಬೆಲ್ಟ್', 'ಥ್ರಾಟಲ್ ಬಾಡಿ'], correctAnswer: 'Camshaft' },
      
        { text: 'What connects the camshaft to the crankshaft to maintain timing?', options: ['Gear system', 'Timing belt or chain', 'Flywheel', 'Rocker arm'], correctAnswer: 'Timing belt or chain' },
      
        { text: 'How many valves per cylinder are commonly used in modern engines?', options: ['Two', 'Three', 'Four', 'Six'], correctAnswer: 'Four' },
      
        { text: 'A “sixteen-valve” label on a four-cylinder engine means:', options: ['Each cylinder has two valves', 'Each cylinder has four valves', 'It uses one camshaft', 'It has 8 intake valves only'], correctAnswer: 'Each cylinder has four valves' },
      
        { text: 'What does “DOHC” stand for?', options: ['Dual Overhead Cam', 'Double Oil Hydraulic Control', 'Dynamic Overhead Chamber', 'Dual Operation Cam'], correctAnswer: 'Dual Overhead Cam' },
      
        { text: 'How many camshafts are used in a DOHC engine?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Two' },
      
        { text: 'Where are the camshafts positioned in an overhead cam design?', options: ['Below the valves', 'Above the valves', 'Next to the crankshaft', 'Inside the intake manifold'], correctAnswer: 'Above the valves' },
      
        { text: 'In some engines, camshafts are located in the block and use what components to actuate valves?', options: ['Pushrods and rocker arms', 'Hydraulic pumps', 'Timing gears', 'Turbo valves'], correctAnswer: 'Pushrods and rocker arms' },
      
        { text: 'Why do camshafts have lopsided lobes?', options: ['To balance weight', 'To open and close valves at precise times', 'To reduce vibration', 'To store oil'], correctAnswer: 'To open and close valves at precise times' },
      
        { text: 'What ensures that valve movement stays synchronized with engine rotation?', options: ['Alternator', 'Crankshaft connection', 'Exhaust system', 'Cooling fan'], correctAnswer: 'Crankshaft connection' },
      
        { text: 'Valve timing affects what aspects of engine performance?', options: ['Steering response', 'Smoothness, efficiency, and power', 'Brake balance', 'Suspension feel'], correctAnswer: 'Smoothness, efficiency, and power' },
      
        { text: 'Why can valve timing not remain constant at all RPMs?', options: ['Fuel type changes', 'Ideal timing varies with engine speed', 'Temperature affects timing', 'Lubrication issues'], correctAnswer: 'Ideal timing varies with engine speed' },
      
        { text: 'What does VVT-i stand for?', options: ['Variable Valve Timing with Intelligence', 'Variable Velocity Transmission Interface', 'Valve Volume Tuning Indicator', 'Variable Valve Throttle Injection'], correctAnswer: 'Variable Valve Timing with Intelligence' },
      
        { text: 'What is the purpose of VVT-i?', options: ['To adjust valve timing for optimal performance and efficiency', 'To control air conditioning timing', 'To vary fuel pressure', 'To monitor battery power'], correctAnswer: 'To adjust valve timing for optimal performance and efficiency' },
      
        { text: 'Which component in VVT-i adjusts camshaft rotation?', options: ['Cam gear with internal shifting mechanism', 'Timing belt tensioner', 'Fuel injector', 'Throttle valve'], correctAnswer: 'Cam gear with internal shifting mechanism' },
      
        { text: 'What does advancing camshaft rotation do?', options: ['Delays valve opening', 'Opens valves earlier', 'Closes valves permanently', 'Reduces air intake'], correctAnswer: 'Opens valves earlier' },
      
        { text: 'What does delaying camshaft rotation do?', options: ['Opens valves earlier', 'Closes valves later', 'Delays valve opening', 'Reduces compression ratio'], correctAnswer: 'Delays valve opening' },
      
        { text: 'How does VVT-i benefit performance?', options: ['Increases engine weight', 'Optimizes valve timing across RPM ranges', 'Reduces spark plug firing', 'Improves braking distance'], correctAnswer: 'Optimizes valve timing across RPM ranges' },
      
        { text: 'The Atkinson cycle engine design primarily aims to maximize what?', options: ['Power output', 'Fuel efficiency', 'Turbo pressure', 'Noise levels'], correctAnswer: 'Fuel efficiency' },
      
        { text: 'In an Atkinson cycle engine, the intake valves remain open into which stroke?', options: ['Power stroke', 'Compression stroke', 'Exhaust stroke', 'Intake stroke'], correctAnswer: 'Compression stroke' },
      
        { text: 'What is the result of keeping intake valves open into the compression stroke?', options: ['Higher compression ratio', 'Shorter effective compression stroke', 'More torque', 'Increased exhaust backflow'], correctAnswer: 'Shorter effective compression stroke' },
      
        { text: 'Why does the Atkinson cycle reduce energy consumption?', options: ['Uses fewer valves', 'Reduces energy needed to compress air-fuel mixture', 'Runs at lower RPMs only', 'Uses smaller pistons'], correctAnswer: 'Reduces energy needed to compress air-fuel mixture' },
      
        { text: 'What is a tradeoff of the Atkinson cycle?', options: ['Higher emissions', 'Reduced power output', 'Increased vibration', 'Shorter engine life'], correctAnswer: 'Reduced power output' },
      
        { text: 'When does Toyota typically use the Atkinson cycle?', options: ['During hard acceleration', 'During highway cruising or low power demand', 'When braking', 'During cold starts'], correctAnswer: 'During highway cruising or low power demand' },
      
        { text: 'What does VVT-iW allow the engine to switch between?', options: ['Otto and Diesel cycles', 'Otto and Atkinson cycles', 'Electric and fuel modes', 'Single and twin-turbo'], correctAnswer: 'Otto and Atkinson cycles' },
      
        { text: 'Why is Atkinson cycle ideal for hybrids?', options: ['It increases noise levels', 'It relies on extra power from electric motors', 'It requires no cooling system', 'It uses fewer cylinders'], correctAnswer: 'It relies on extra power from electric motors' },
      
        { text: 'What does Toyota’s valvetrain design balance using VVT-i and Atkinson cycle?', options: ['Power and efficiency', 'Noise and vibration', 'Torque and cooling', 'Fuel and oil ratio'], correctAnswer: 'Power and efficiency' },
      
        { text: 'What is the main takeaway from the video about Toyota’s engine technologies?', options: ['They adjust valve timing to optimize power and efficiency', 'They use fixed valve timing', 'They eliminate the need for camshafts', 'They only focus on electric drive'], correctAnswer: 'They adjust valve timing to optimize power and efficiency' }
      ]
      ,
      [
        { text: "What two main components combine in the Toyota Hybrid System to achieve high energy efficiency?", options: ["Engine and motor", "Motor and alternator", "Battery and generator", "Turbo and motor"], correctAnswer: "Engine and motor" },
        { textKn: 'ಟೊಯೋಟಾ ಹೈಬ್ರಿಡ್ ಸಿಸ್ಟಮ್ನಲ್ಲಿ ಹೆಚ್ಚು ಶಕ್ತಿ ದಕ್ಷತೆ ಸಾಧಿಸಲು ಯಾವ ಎರಡು ಮುಖ್ಯ ಘಟಕಗಳು ಸೇರಿವೆ?', text: "What two main components combine in the Toyota Hybrid System to achieve high energy efficiency?", options: ["Engine and motor", "Motor and alternator", "Battery and generator", "Turbo and motor"], optionsKn: ['ಎಂಜಿನ್ ಮತ್ತು ಮೋಟಾರ್', 'ಮೋಟಾರ್ ಮತ್ತು અલ્ટರ್ನೇಟರ್', 'ಬ್ಯಾಟರಿ ಮತ್ತು ಜನರೇಟರ್', 'ಟರ್ಬೊ ಮತ್ತು ಮೋಟಾರ್'], correctAnswer: "Engine and motor" },
      
        { text: "What is the function of the power split device in the Toyota Hybrid System?", options: ["Divides energy between electrical generation and driving", "Controls air-fuel ratio", "Increases turbo pressure", "Manages braking power"], correctAnswer: "Divides energy between electrical generation and driving" },
        { textKn: 'ಟೊಯೋಟಾ ಹೈಬ್ರಿಡ್ ಸಿಸ್ಟಮ್ನಲ್ಲಿ ಪವರ್ ಸ್ಪ್ಲಿಟ್ ಸಾಧನದ ಕಾರ್ಯವೇನು?', text: "What is the function of the power split device in the Toyota Hybrid System?", options: ["Divides energy between electrical generation and driving", "Controls air-fuel ratio", "Increases turbo pressure", "Manages braking power"], optionsKn: ['ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆ ಮತ್ತು ಚಾಲನೆಯ ಮಧ್ಯೆ ಶಕ್ತಿಯನ್ನು વહಿಸಿ', 'ಗಾಳಿ-ಇಂಧನ ಅನುಪಾತವನ್ನು ನಿರ್ವಹಿಸು', 'ಟರ್ಬೊ ಒತ್ತಡವನ್ನು ಹೆಚ್ಚಿಸು', 'ಬ್ರೇಕಿಂಗ್ ಶಕ್ತಿಯನ್ನು ನಿರ್ವಹಿಸು'], correctAnswer: "Divides energy between electrical generation and driving" },
      
        { text: "Where is the power split device located in a Toyota hybrid?", options: ["Inside the transmission", "In the exhaust system", "Next to the cooling unit", "In the fuel tank"], correctAnswer: "Inside the transmission" },
        { textKn: 'ಟೊಯೋಟಾ ಹೈಬ್ರಿಡ್‌ನಲ್ಲಿ ಪವರ್ ಸ್ಪ್ಲಿಟ್ ಸಾಧನವು ಎಲ್ಲಿದ್ದಿದೆ?', text: "Where is the power split device located in a Toyota hybrid?", options: ["Inside the transmission", "In the exhaust system", "Next to the cooling unit", "In the fuel tank"], optionsKn: ['ಟ್ರಾನ್ಸ್ಮಿಷನ್ ಒಳಗೆ', 'ಏಗ್ಝಾಸ್ಟ್ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ', 'ಸೂಕ್ಷ್ಮ ಘಟಕದ ಪಕ್ಕದಲ್ಲಿ', 'ಇಂಧನ ಟ್ಯಾಂಕ್‌ನಲ್ಲಿ'], correctAnswer: "Inside the transmission" },
      
        { text: "What is the main role of the generator in the hybrid system?", options: ["Generate electricity using engine rotation", "Boost the intake air", "Lubricate engine parts", "Control fuel injection"], correctAnswer: "Generate electricity using engine rotation" },
        { textKn: 'ಹೈಬ್ರಿಡ್ ಸಿಸ್ಟಮ್ನಲ್ಲಿ ಜನರೇಟರ್‌ನ ಮುಖ್ಯ ಪಾತ್ರವೇನು?', text: "What is the main role of the generator in the hybrid system?", options: ["Generate electricity using engine rotation", "Boost the intake air", "Lubricate engine parts", "Control fuel injection"], optionsKn: ['ಎಂಜಿನ್ ತಿರುಗುವಿಕೆಯಿಂದ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆ', 'ಇಂಟೇಕ್ ಗಾಳಿಯನ್ನು ಹೆಚ್ಚಿಸಿ', 'ಎಂಜಿನ್ ಭಾಗಗಳನ್ನು ಓಯಿಲ್ ಮಾಡು', 'ಇಂಧನ ಇಂಜೆಕ್ಷನ್ ಅನ್ನು ನಿಯಂತ್ರಿಸು'], correctAnswer: "Generate electricity using engine rotation" },
      
        { text: "What additional function does the generator perform besides electricity generation?", options: ["Acts as the engine starter", "Charges external devices", "Regulates tire pressure", "Controls coolant flow"], correctAnswer: "Acts as the engine starter" },
      
        { text: "What is the main function of the power control unit in the hybrid system?", options: ["Control the electricity flow to each component", "Store electrical energy", "Regulate tire pressure", "Control air conditioning"], correctAnswer: "Control the electricity flow to each component" },
      
        { text: "What is the purpose of the drive batteries in a Toyota hybrid?", options: ["Store generated electricity and supply it to the motor", "Run the air conditioning system", "Start the fuel pump", "Power the headlights only"], correctAnswer: "Store generated electricity and supply it to the motor" },
      
        { text: "Do Toyota hybrid batteries require external charging?", options: ["Yes, daily", "No, they self-charge using the system", "Yes, every month", "Only when replacing"], correctAnswer: "No, they self-charge using the system" },
      
        { text: "What characteristic do Toyota hybrid batteries have?", options: ["Superior durability and heat resistance", "High water content", "Fragile and light", "Low voltage only"], correctAnswer: "Superior durability and heat resistance" },
      
        { text: "What happens to all units of a Toyota hybrid when the vehicle is not moving?", options: ["They stop to prevent energy waste", "They continue running at low power", "Only the engine runs", "Only the motor runs"], correctAnswer: "They stop to prevent energy waste" },
      
        { text: "Which unit drives the vehicle quietly during initial acceleration?", options: ["Motor", "Engine", "Generator", "Power split device"], correctAnswer: "Motor" },
      
        { text: "How is low fuel consumption achieved at low speeds in a Toyota hybrid?", options: ["Using only the motor", "Using only the engine", "Using both engine and motor at high power", "Shutting down the system"], correctAnswer: "Using only the motor" },
      
        { text: "During acceleration, how is power delivered efficiently?", options: ["Motor drive combined with engine drive in an efficient rotation range", "Engine alone at high RPM", "Motor alone at high RPM", "Generator only"], correctAnswer: "Motor drive combined with engine drive in an efficient rotation range" },
      
        { text: "What additional benefit occurs when the engine drives the vehicle while charging the batteries?", options: ["Increased energy efficiency", "Reduced braking power", "Higher emissions", "Lower vehicle speed"], correctAnswer: "Increased energy efficiency" },
      
  { text: "How is energy recovered during deceleration?", textKn: 'ಗತಿಸ್ಥಿತಿ ತಗ್ಗುವಾಗ ಶಕ್ತಿ ಹೇಗೆ ಮರಳಿ ಗಳಿಸಲಾಗುತ್ತದೆ?', options: ["Tire rotation drives the motor to generate electricity", "Engine generates excess power", "Excess fuel is stored", "Motor shuts off"], optionsKn: ['ಟೈರ್‌ನ ಸುತ್ತು ಮೋಟಾರ್ ಅನ್ನು ಚಾಲನೆ ಮಾಡಿ ವಿದ್ಯುತ್ ಉತ್ಪಾದಿಸುತ್ತದೆ', 'ಎಂಜಿನ್ ಅಧಿಕ ಶಕ್ತಿ ಉತ್ಪಾದಿಸುತ್ತದೆ', 'ಅತಿರಿಕ್ತ ಇಂಧನವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ', 'ಮೋಟಾರ್ ನ ತಡೆ'], correctAnswer: "Tire rotation drives the motor to generate electricity" },
      
        { text: "Where is recovered energy stored during regenerative braking?", options: ["Drive batteries", "Fuel tank", "Cooling system", "Exhaust"], correctAnswer: "Drive batteries" },
      
        { text: "How does the Toyota hybrid system improve overall fuel efficiency?", options: ["By running the engine in an efficient rotation range and reusing energy", "By using a smaller engine", "By turning off the motor during acceleration", "By using only the engine"], correctAnswer: "By running the engine in an efficient rotation range and reusing energy" },
      
        { text: "What is the main purpose of the Toyota hybrid system?", options: ["Achieve both driving fun and superior environmental performance", "Increase engine noise", "Reduce vehicle weight only", "Provide external charging"], correctAnswer: "Achieve both driving fun and superior environmental performance" },
      
        { text: "How does the motor contribute to smooth acceleration?", options: ["It is compact and high efficiency", "It increases fuel injection", "It runs at high voltage only", "It engages only at high speeds"], correctAnswer: "It is compact and high efficiency" },
      
        { text: "What is the significance of maximum thermal efficiency in the hybrid engine?", options: ["Achieves low fuel consumption and low emissions", "Increases engine vibration", "Reduces engine lifespan", "Boosts motor noise"], correctAnswer: "Achieves low fuel consumption and low emissions" },
      
        { text: "Does the Toyota hybrid system require battery replacement periodically?", options: ["No", "Yes, every year", "Yes, every 6 months", "Only for high-mileage cars"], correctAnswer: "No" },
      
        { text: "How does the generator support engine starting?", options: ["It provides smooth engine starting", "It ignites the fuel directly", "It cools the engine", "It spins the tires"], correctAnswer: "It provides smooth engine starting" },
      
        { text: "During low-speed driving, which unit primarily powers the vehicle?", options: ["Motor", "Engine", "Generator", "Power control unit"], correctAnswer: "Motor" },
      
        { text: "During moderate acceleration, what is the energy source?", options: ["Combination of engine and motor", "Motor only", "Engine only", "Generator only"], correctAnswer: "Combination of engine and motor" },
      
        { text: "What technology allows energy reuse that was previously wasted?", options: ["Regenerative braking", "Turbocharging", "Variable valve timing", "Atkinson cycle"], correctAnswer: "Regenerative braking" },
      
        { text: "How does the power control unit optimize the hybrid system?", options: ["By supplying electricity appropriately to each unit", "By charging external devices", "By controlling fuel type", "By managing tire rotation"], correctAnswer: "By supplying electricity appropriately to each unit" },
      
        { text: "What ensures that the hybrid system operates efficiently under various driving conditions?", options: ["Power split device and regenerative system", "Air conditioning", "Transmission only", "Brakes only"], correctAnswer: "Power split device and regenerative system" },
      
        { text: "What combination allows the hybrid to drive efficiently and reduce fuel consumption?", options: ["Engine running in efficient range + energy reuse", "Motor running at max speed", "Engine off at all times", "Battery only"], correctAnswer: "Engine running in efficient range + energy reuse" },
      
        { text: "What ensures durability and reliability in Toyota hybrid units?", options: ["Years of design development and continuous progress", "Random maintenance", "External battery charging", "Lightweight materials only"], correctAnswer: "Years of design development and continuous progress" },
      
        { text: "How does the Toyota hybrid system provide superior environmental performance?", options: ["By combining motor and engine efficiently and reusing energy", "By using diesel fuel", "By reducing tire size", "By shutting off the engine at high speeds"], correctAnswer: "By combining motor and engine efficiently and reusing energy" }
      ]
      ,
    ]
  },
  {
    id: 'M2',
    title: 'Basics of Quality tools and its functions',
    titleKn: 'ಗುಣಮಟ್ಟದ ಉಪಕರಣಗಳ ಮೂಲ ಮತ್ತು ಅದರ ಕಾರ್ಯಗಳು',
    videos: [
  { id: 'gKyecFOnFVI', title: 'Basics of QMS', titleKn: 'QMS ನ ಮೂಲಭೂತಗಳು' },
  { id: 'yuH35ottILU', title: 'Basics of 7QC tools', titleKn: '7QC ಉಪಕರಣಗಳ ಮೂಲಭೂತಗಳು' },
  { id: 'JQcagDtvkJw', title: 'Quality core tools', titleKn: 'ಗುಣಮಟ್ಟದ ಪ್ರಮುಖ ಉಪಕರಣಗಳು' },
  { id: 'rnAwVnbmm6A', title: '7QC tools - Kannada version', titleKn: '7QC ಉಪಕರಣಗಳು - ಕನ್ನಡ ಆವೃತ್ತಿ' },
    ],
    quizzes: [
      // Dummy quiz for M2 Video 1: 7 questions
      [
        { text: "What does QMS stand for?", options: ["Quality Management System", "Quality Maintenance Standard", "Quick Management Service", "Qualified Management System"], correctAnswer: "Quality Management System" },
      
        { text: "Who defined the term QMS in 1991?", options: ["Ken Crosher", "Edward Deming", "Joseph Juran", "Phillips Crosby"], correctAnswer: "Ken Crosher" },
      
        { text: "Which two pillars form the basis of a quality management system?", options: ["Quality control and quality assurance", "Quality inspection and auditing", "Process optimization and cost reduction", "Customer service and marketing"], correctAnswer: "Quality control and quality assurance" },
      
        { text: "What is the first element of a typical QMS hierarchy?", options: ["Quality policy", "Quality manual", "Work instructions", "Records and forms"], correctAnswer: "Quality policy" },
      
        { text: "What does a quality policy specify?", options: ["Overall direction and objectives of the organization", "Daily employee schedules", "Marketing strategies", "Equipment maintenance"], correctAnswer: "Overall direction and objectives of the organization" },
      
        { text: "What is the role of a quality manual?", options: ["Specifies how the company will operate", "Records employee attendance", "Lists raw materials", "Controls customer feedback"], correctAnswer: "Specifies how the company will operate" },
      
        { text: "What determines the structure and content of a quality manual?", options: ["Organization size, complexity, and employee competency", "Market share and competition", "Government regulations only", "Customer complaints"], correctAnswer: "Organization size, complexity, and employee competency" },
      
        { text: "What are quality procedures designed to do?", options: ["Specify activities to be performed at each step of the production process", "List employees' duties", "Track sales figures", "Maintain machinery"], correctAnswer: "Specify activities to be performed at each step of the production process" },
      
        { text: "What are work instructions in a QMS?", options: ["Step-by-step written guidelines for performing tasks", "Company policies on holidays", "Financial reporting templates", "Marketing brochures"], correctAnswer: "Step-by-step written guidelines for performing tasks" },
      
        { text: "Work instructions are also called what?", options: ["How-to instructions", "Task sheets", "SOP manuals", "Procedure guides"], correctAnswer: "How-to instructions" },
      
        { text: "How should work instructions be used?", options: ["In conjunction with manuals, procedures, and records", "Alone without referencing other documents", "Only for managers", "Only during audits"], correctAnswer: "In conjunction with manuals, procedures, and records" },
      
        { text: "What is the role of records and forms in a QMS?", options: ["Provide objective evidence that quality management is implemented and effective", "Track employee attendance", "Record marketing metrics", "Track inventory only"], correctAnswer: "Provide objective evidence that quality management is implemented and effective" },
      
        { text: "Records in QMS need to be:", options: ["Maintained for a specific period of time", "Disposed immediately", "Kept only digitally", "Reviewed yearly only"], correctAnswer: "Maintained for a specific period of time" },
      
        { text: "What are forms in QMS?", options: ["Blank templates to be filled with information for records", "Completed documents only", "Marketing materials", "Employee evaluations"], correctAnswer: "Blank templates to be filled with information for records" },
      
        { text: "Which standard is the most common international QMS standard?", options: ["ISO 9001", "ISO 13485", "ISO 14001", "ISO 27001"], correctAnswer: "ISO 9001" },
      
        { text: "ISO 13485 is a quality management standard for which industry?", options: ["Medical devices", "Automotive", "Information security", "Environmental management"], correctAnswer: "Medical devices" },
      
        { text: "ISO TS 16949 is a quality management standard for which industry?", options: ["Automotive industry", "Medical devices", "Information technology", "Environmental services"], correctAnswer: "Automotive industry" },
      
        { text: "ISO 27001 focuses on what aspect?", options: ["Information security management", "Medical devices quality", "Environmental management", "Automotive standards"], correctAnswer: "Information security management" },
      
        { text: "What are the typical elements of a QMS?", options: ["Quality policies, procedures/manuals, work instructions, records/forms", "Marketing plans, financial records, manuals, SOPs", "Employee evaluations, payroll, attendance, benefits", "Inventory, logistics, procurement, sales"], correctAnswer: "Quality policies, procedures/manuals, work instructions, records/forms" },
      
        { text: "What is the main purpose of a QMS?", options: ["Direct and control the organization in consistently meeting customer requirements and enhancing satisfaction", "Increase marketing reach", "Reduce taxes", "Streamline HR processes"], correctAnswer: "Direct and control the organization in consistently meeting customer requirements and enhancing satisfaction" },
      
        { text: "Why did quality become increasingly important during World War II?", options: ["Because products like bullets and rifles had to match standards across countries", "Because factories were larger", "Due to energy shortages", "Due to labor strikes"], correctAnswer: "Because products like bullets and rifles had to match standards across countries" },
      
        { text: "Which quality guru defined quality as 'fitness for use'?", options: ["Joseph M. Juran", "Edward Deming", "Phillips Crosby", "Ken Crosher"], correctAnswer: "Joseph M. Juran" },
      
        { text: "Which quality guru developed the 'zero defect' concept?", options: ["Phillips Crosby", "Edward Deming", "Joseph M. Juran", "Ken Crosher"], correctAnswer: "Phillips Crosby" },
      
        { text: "According to Edward Deming, what does quality mean?", options: ["Efficient production of quality that the market expects", "Achieving perfection", "Zero defects in production", "Maximum output"], correctAnswer: "Efficient production of quality that the market expects" },
      
        { text: "How does QMS simplify an organization?", options: ["By improving processes, documentation, and creating a culture of quality", "By reducing employees", "By outsourcing tasks", "By automating marketing"], correctAnswer: "By improving processes, documentation, and creating a culture of quality" },
      
        { text: "What benefits does QMS provide to employees?", options: ["Motivates employees and creates a quality culture", "Reduces working hours only", "Provides higher salaries", "Tracks attendance"], correctAnswer: "Motivates employees and creates a quality culture" },
      
        { text: "How does QMS improve customer satisfaction?", options: ["By consistently meeting customer requirements and ensuring product quality", "By offering discounts", "By improving website design", "By faster delivery only"], correctAnswer: "By consistently meeting customer requirements and ensuring product quality" },
      
        { text: "How does QMS reduce cost and waste?", options: ["By streamlining processes and improving efficiency", "By firing employees", "By using cheaper materials only", "By outsourcing production"], correctAnswer: "By streamlining processes and improving efficiency" },
      
        { text: "What is the impact of successfully implementing a QMS on a company?", options: ["It affects all aspects of the company's performance positively", "It only affects marketing", "It only affects HR", "It only affects IT systems"], correctAnswer: "It affects all aspects of the company's performance positively" },
      
        { text: "What type of evidence do records and forms provide in a QMS?", options: ["Objective evidence of implementation and effectiveness", "Financial proof", "Employee satisfaction scores", "Marketing statistics"], correctAnswer: "Objective evidence of implementation and effectiveness" }
      ]
      ,
      [
        { 
          text: "What are the Seven QC Tools primarily used for?", 
          options: ["Solving quality problems and process improvement", "Marketing strategy planning", "Financial auditing", "Employee performance tracking"], 
          correctAnswer: "Solving quality problems and process improvement" 
        },
        { 
          text: "Who said that 95% of quality problems can be solved with seven fundamental tools?", 
          options: ["Kaoru Ishikawa", "Edward Deming", "Joseph Juran", "Phillips Crosby"], 
          correctAnswer: "Kaoru Ishikawa" 
        },
        { 
          text: "Which QC tool visually represents the sequence of steps in a process?", 
          options: ["Flowchart", "Check Sheet", "Pareto Chart", "Histogram"], 
          correctAnswer: "Flowchart" 
        },
        { 
          text: "What is the main purpose of a flowchart?", 
          options: ["Simplifies complex processes and promotes common understanding", "Measures employee productivity", "Tracks sales data", "Calculates process costs"], 
          correctAnswer: "Simplifies complex processes and promotes common understanding" 
        },
        { 
          text: "Which QC tool helps collect and organize data for analysis?", 
          options: ["Check Sheet", "Flowchart", "Control Chart", "Cause and Effect Diagram"], 
          correctAnswer: "Check Sheet" 
        },
        { 
          text: "Why is it important to include metadata in a check sheet?", 
          options: ["To ensure data integrity and accuracy", "To make charts colorful", "To simplify calculations", "To reduce number of pages"], 
          correctAnswer: "To ensure data integrity and accuracy" 
        },
        { 
          text: "Which QC tool helps identify the vital few problems that contribute most to defects?", 
          options: ["Pareto Chart", "Scatter Diagram", "Histogram", "Flowchart"], 
          correctAnswer: "Pareto Chart" 
        },
        { 
          text: "What principle is the Pareto Chart based on?", 
          options: ["80-20 rule", "50-50 rule", "10-90 rule", "70-30 rule"], 
          correctAnswer: "80-20 rule" 
        },
        { 
          text: "Which QC tool is also called a Fishbone Diagram?", 
          options: ["Cause and Effect Diagram", "Histogram", "Control Chart", "Check Sheet"], 
          correctAnswer: "Cause and Effect Diagram" 
        },
        { 
          text: "What is the first step in creating a Cause and Effect Diagram?", 
          options: ["Define the problem statement", "Collect data", "Create flowchart", "Draw control limits"], 
          correctAnswer: "Define the problem statement" 
        },
        { 
          text: "Which QC tool plots pairs of data to examine relationships between variables?", 
          options: ["Scatter Diagram", "Pareto Chart", "Flowchart", "Histogram"], 
          correctAnswer: "Scatter Diagram" 
        },
        { 
          text: "Why is it important not to assume causation in a scatter diagram?", 
          options: ["Correlation does not imply causation", "Charts may be colorful", "Data may be incomplete", "Only managers analyze data"], 
          correctAnswer: "Correlation does not imply causation" 
        },
        { 
          text: "Which QC tool shows frequency of occurrence of data points?", 
          options: ["Histogram", "Scatter Diagram", "Flowchart", "Check Sheet"], 
          correctAnswer: "Histogram" 
        },
        { 
          text: "What does a histogram help analyze?", 
          options: ["Process variation and distribution", "Employee attendance", "Marketing reach", "Cost of materials"], 
          correctAnswer: "Process variation and distribution" 
        },
        { 
          text: "Which QC tool monitors a process over time to ensure it remains stable?", 
          options: ["Control Chart", "Histogram", "Check Sheet", "Pareto Chart"], 
          correctAnswer: "Control Chart" 
        },
        { 
          text: "After implementing a process change, which QC tool would you use to ensure defect rates remain low over time?", 
          options: ["Control Chart", "Check Sheet", "Flowchart", "Pareto Chart"], 
          correctAnswer: "Control Chart" 
        },
        { 
          text: "Which QC tool is useful in the planning phase to define a process?", 
          options: ["Flowchart", "Histogram", "Control Chart", "Pareto Chart"], 
          correctAnswer: "Flowchart" 
        },
        { 
          text: "What should be done after collecting data with a check sheet?", 
          options: ["Analyze and prioritize defects", "Delete the data", "Make flowcharts only", "Send reports to marketing"], 
          correctAnswer: "Analyze and prioritize defects" 
        },
        { 
          text: "Which QC tool helps identify potential root causes of problems?", 
          options: ["Cause and Effect Diagram", "Histogram", "Control Chart", "Pareto Chart"], 
          correctAnswer: "Cause and Effect Diagram" 
        },
        { 
          text: "What is the purpose of a Pareto analysis?", 
          options: ["Focus on the most impactful problems", "Measure employee satisfaction", "Track sales", "Evaluate marketing campaigns"], 
          correctAnswer: "Focus on the most impactful problems" 
        },
        { 
          text: "How does a scatter diagram help in quality improvement?", 
          options: ["Shows relationships between variables", "Organizes employee schedules", "Records inventory", "Tracks marketing performance"], 
          correctAnswer: "Shows relationships between variables" 
        },
        { 
          text: "What does the control chart indicate if all points are within control limits?", 
          options: ["Process is in control and only normal variation exists", "Process is failing", "Employees need training", "Defects are ignored"], 
          correctAnswer: "Process is in control and only normal variation exists" 
        },
        { 
          text: "Which QC tool would you use to track defects over a week and identify trends?", 
          options: ["Control Chart", "Check Sheet", "Pareto Chart", "Flowchart"], 
          correctAnswer: "Control Chart" 
        },
        { 
          text: "What does the cumulative line in a Pareto Chart show?", 
          options: ["Total percentage of defects accounted for", "Employee performance", "Process steps", "Cost savings"], 
          correctAnswer: "Total percentage of defects accounted for" 
        },
        { 
          text: "Why is teamwork important when creating a Cause and Effect Diagram?", 
          options: ["To gather expertise from multiple areas", "To reduce costs", "To speed up production", "To design marketing campaigns"], 
          correctAnswer: "To gather expertise from multiple areas" 
        },
        { 
          text: "Which QC tool is best for visually identifying patterns in process data?", 
          options: ["Histogram", "Check Sheet", "Flowchart", "Cause and Effect Diagram"], 
          correctAnswer: "Histogram" 
        },
        { 
          text: "What is the role of brainstorming in quality problem solving?", 
          options: ["Identify potential root causes", "Increase production speed", "Reduce employee costs", "Design new products"], 
          correctAnswer: "Identify potential root causes" 
        },
        { 
          text: "Which QC tool can help quantify the strength of the relationship between two variables?", 
          options: ["Scatter Diagram", "Control Chart", "Histogram", "Flowchart"], 
          correctAnswer: "Scatter Diagram" 
        },
        { 
          text: "How can process improvement impact defect rates?", 
          options: ["By reducing variability and controlling causes", "By firing employees", "By changing office layout", "By changing suppliers only"], 
          correctAnswer: "By reducing variability and controlling causes" 
        },
        { 
          text: "Why is it important to focus on the 'vital few' defects in Pareto analysis?", 
          options: ["They contribute most to overall defects", "They are easy to fix", "They are documented first", "They are cheapest to solve"], 
          correctAnswer: "They contribute most to overall defects" 
        }
      ]
      ,
      [
        {
          text: "What does APQP stand for in automotive quality management?",
          options: ["Advanced Product Quality Planning", "Automated Process Quality Procedure", "Applied Product Quality Process", "Automotive Production Quality Plan"],
          correctAnswer: "Advanced Product Quality Planning"
        },
        {
          text: "Which core tool ensures structured planning of product and process development?",
          options: ["APQP", "PPAP", "FMEA", "MSA"],
          correctAnswer: "APQP"
        },
        {
          text: "What is the main goal of APQP?",
          options: ["Deliver the right product the right way the first time", "Monitor process variation", "Approve supplier parts", "Analyze measurement systems"],
          correctAnswer: "Deliver the right product the right way the first time"
        },
        {
          text: "Which phase of APQP involves converting customer needs into product design?",
          options: ["Product Design and Development", "Plan and Define Program", "Process Design and Development", "Feedback Assessment"],
          correctAnswer: "Product Design and Development"
        },
        {
          text: "Which APQP phase plans the manufacturing process to ensure quality?",
          options: ["Process Design and Development", "Product Design and Development", "Plan and Define Program", "Validation"],
          correctAnswer: "Process Design and Development"
        },
        {
          text: "What is the purpose of PPAP?",
          options: ["To verify that the supplier can consistently manufacture parts meeting customer requirements", "To monitor process variation", "To evaluate measurement systems", "To identify potential product failures"],
          correctAnswer: "To verify that the supplier can consistently manufacture parts meeting customer requirements"
        },
        {
          text: "Which of these documents is NOT typically part of a PPAP submission?",
          options: ["Marketing strategy plan", "Design Records", "Process FMEA", "Control Plan"],
          correctAnswer: "Marketing strategy plan"
        },
        {
          text: "How does PPAP benefit the supplier and customer?",
          options: ["Reduces risk of defective parts reaching customer", "Speeds up internal meetings", "Increases marketing reach", "Reduces inventory cost only"],
          correctAnswer: "Reduces risk of defective parts reaching customer"
        },
        {
          text: "FMEA stands for:",
          options: ["Failure Mode and Effects Analysis", "Factory Measurement and Evaluation Analysis", "Failure Monitoring and Efficiency Assessment", "Functional Measurement and Error Analysis"],
          correctAnswer: "Failure Mode and Effects Analysis"
        },
        {
          text: "What is the main purpose of FMEA?",
          options: ["Identify potential failures early and prioritize preventive actions", "Approve supplier parts", "Monitor process performance", "Validate measurement systems"],
          correctAnswer: "Identify potential failures early and prioritize preventive actions"
        },
        {
          text: "Which type of FMEA focuses on potential failures in the product design stage?",
          options: ["Design FMEA (DFMEA)", "Process FMEA (PFMEA)", "Measurement FMEA", "Supplier FMEA"],
          correctAnswer: "Design FMEA (DFMEA)"
        },
        {
          text: "Which type of FMEA focuses on failures during manufacturing?",
          options: ["Process FMEA (PFMEA)", "Design FMEA (DFMEA)", "APQP FMEA", "PPAP FMEA"],
          correctAnswer: "Process FMEA (PFMEA)"
        },
        {
          text: "In FMEA, the risk priority number (RPN) is calculated using which formula?",
          options: ["Severity x Occurrence x Detection", "Plan x Design x Process", "Accuracy x Precision x Stability", "Upper Control Limit x Lower Control Limit x Average"],
          correctAnswer: "Severity x Occurrence x Detection"
        },
        {
          text: "What does the severity rating (S) in FMEA indicate?",
          options: ["Impact of a failure on the customer or process", "Frequency of failure occurrence", "Ease of detecting failure", "Cost of failure"],
          correctAnswer: "Impact of a failure on the customer or process"
        },
        {
          text: "What does the occurrence rating (O) in FMEA indicate?",
          options: ["How often a failure is likely to happen", "Impact of failure", "Ease of detecting failure", "Supplier compliance"],
          correctAnswer: "How often a failure is likely to happen"
        },
        {
          text: "What does the detection rating (D) in FMEA indicate?",
          options: ["How easily the failure can be detected before reaching the customer", "Severity of failure", "Process efficiency", "Measurement system bias"],
          correctAnswer: "How easily the failure can be detected before reaching the customer"
        },
        {
          text: "MSA stands for:",
          options: ["Measurement System Analysis", "Manufacturing Standards Assessment", "Monitoring Statistical Accuracy", "Machine System Automation"],
          correctAnswer: "Measurement System Analysis"
        },
        {
          text: "What is the main purpose of MSA?",
          options: ["Ensure accuracy, precision, and reliability of measurement systems", "Approve supplier parts", "Monitor process control limits", "Identify product failures"],
          correctAnswer: "Ensure accuracy, precision, and reliability of measurement systems"
        },
        {
          text: "What does repeatability in MSA measure?",
          options: ["Consistency of measurements by the same operator using the same tool", "Accuracy of measurement system", "Variation in manufacturing process", "Effect of special cause variation"],
          correctAnswer: "Consistency of measurements by the same operator using the same tool"
        },
        {
          text: "What does reproducibility in MSA measure?",
          options: ["Consistency of measurements across different operators using the same tool", "Stability of process", "Severity of failure", "Occurrence of defects"],
          correctAnswer: "Consistency of measurements across different operators using the same tool"
        },
        {
          text: "SPC stands for:",
          options: ["Statistical Process Control", "Supplier Process Compliance", "Standardized Product Check", "Structured Process Calibration"],
          correctAnswer: "Statistical Process Control"
        },
        {
          text: "What is the primary purpose of SPC?",
          options: ["Monitor and control production processes to maintain consistent quality", "Validate supplier design", "Document PPAP submissions", "Evaluate FMEA risk scores"],
          correctAnswer: "Monitor and control production processes to maintain consistent quality"
        },
        {
          text: "In SPC, what is common cause variation?",
          options: ["Natural random variation within a stable process", "Variation due to unusual events or problems", "Errors in measurement systems", "Variation in design specifications"],
          correctAnswer: "Natural random variation within a stable process"
        },
        {
          text: "In SPC, what is special cause variation?",
          options: ["Variation caused by unusual events that need investigation", "Normal process variation", "Measurement errors", "Standard deviation"],
          correctAnswer: "Variation caused by unusual events that need investigation"
        },
        {
          text: "Which charts are primarily used in SPC?",
          options: ["Control charts", "Pareto charts", "Scatter diagrams", "Histograms"],
          correctAnswer: "Control charts"
        },
        {
          text: "What does an X-bar chart monitor in SPC?",
          options: ["Average of a process sample over time", "Measurement system bias", "Supplier compliance", "Failure modes and effects"],
          correctAnswer: "Average of a process sample over time"
        },
        {
          text: "What does an R chart monitor in SPC?",
          options: ["Range of values in a sample to observe variation", "Average of process samples", "Severity of failures", "PPAP compliance"],
          correctAnswer: "Range of values in a sample to observe variation"
        },
        {
          text: "What action is required if a data point falls outside control limits in SPC?",
          options: ["Investigate and correct the special cause", "Ignore, it is common variation", "Submit a PPAP", "Conduct an MSA study"],
          correctAnswer: "Investigate and correct the special cause"
        },
        {
          text: "How do automotive core tools work together?",
          options: ["Ensure quality from design through production and support IATF16949 compliance", "Monitor marketing campaigns", "Reduce employee working hours", "Increase inventory turnover"],
          correctAnswer: "Ensure quality from design through production and support IATF16949 compliance"
        }
      ]
      ,
      [
        { text: "What does APQP stand for in automotive quality management?", options: ["Advanced Product Quality Planning", "Automated Process Quality Procedure", "Applied Product Quality Process", "Automotive Production Quality Plan"], correctAnswer: "Advanced Product Quality Planning" },
        { text: "Which core tool ensures structured planning of product and process development?", options: ["APQP", "PPAP", "FMEA", "MSA"], correctAnswer: "APQP" },
        { text: "What is the main goal of APQP?", options: ["Deliver the right product the right way the first time", "Monitor process variation", "Approve supplier parts", "Analyze measurement systems"], correctAnswer: "Deliver the right product the right way the first time" },
        { text: "Which phase of APQP involves converting customer needs into product design?", options: ["Product Design and Development", "Plan and Define Program", "Process Design and Development", "Feedback Assessment"], correctAnswer: "Product Design and Development" },
        { text: "Which APQP phase plans the manufacturing process to ensure quality?", options: ["Process Design and Development", "Product Design and Development", "Plan and Define Program", "Validation"], correctAnswer: "Process Design and Development" },
        { text: "What is the purpose of PPAP?", options: ["To verify that the supplier can consistently manufacture parts meeting customer requirements", "To monitor process variation", "To evaluate measurement systems", "To identify potential product failures"], correctAnswer: "To verify that the supplier can consistently manufacture parts meeting customer requirements" },
        { text: "Which of these documents is NOT typically part of a PPAP submission?", options: ["Marketing strategy plan", "Design Records", "Process FMEA", "Control Plan"], correctAnswer: "Marketing strategy plan" },
        { text: "How does PPAP benefit the supplier and customer?", options: ["Reduces risk of defective parts reaching customer", "Speeds up internal meetings", "Increases marketing reach", "Reduces inventory cost only"], correctAnswer: "Reduces risk of defective parts reaching customer" },
        { text: "FMEA stands for:", options: ["Failure Mode and Effects Analysis", "Factory Measurement and Evaluation Analysis", "Failure Monitoring and Efficiency Assessment", "Functional Measurement and Error Analysis"], correctAnswer: "Failure Mode and Effects Analysis" },
        { text: "What is the main purpose of FMEA?", options: ["Identify potential failures early and prioritize preventive actions", "Approve supplier parts", "Monitor process performance", "Validate measurement systems"], correctAnswer: "Identify potential failures early and prioritize preventive actions" },
        { text: "Which type of FMEA focuses on potential failures in the product design stage?", options: ["Design FMEA (DFMEA)", "Process FMEA (PFMEA)", "Measurement FMEA", "Supplier FMEA"], correctAnswer: "Design FMEA (DFMEA)" },
        { text: "Which type of FMEA focuses on failures during manufacturing?", options: ["Process FMEA (PFMEA)", "Design FMEA (DFMEA)", "APQP FMEA", "PPAP FMEA"], correctAnswer: "Process FMEA (PFMEA)" },
        { text: "In FMEA, the risk priority number (RPN) is calculated using which formula?", options: ["Severity x Occurrence x Detection", "Plan x Design x Process", "Accuracy x Precision x Stability", "Upper Control Limit x Lower Control Limit x Average"], correctAnswer: "Severity x Occurrence x Detection" },
        { text: "What does the severity rating (S) in FMEA indicate?", options: ["Impact of a failure on the customer or process", "Frequency of failure occurrence", "Ease of detecting failure", "Cost of failure"], correctAnswer: "Impact of a failure on the customer or process" },
        { text: "What does the occurrence rating (O) in FMEA indicate?", options: ["How often a failure is likely to happen", "Impact of failure", "Ease of detecting failure", "Supplier compliance"], correctAnswer: "How often a failure is likely to happen" },
        { text: "What does the detection rating (D) in FMEA indicate?", options: ["How easily the failure can be detected before reaching the customer", "Severity of failure", "Process efficiency", "Measurement system bias"], correctAnswer: "How easily the failure can be detected before reaching the customer" },
        { text: "MSA stands for:", options: ["Measurement System Analysis", "Manufacturing Standards Assessment", "Monitoring Statistical Accuracy", "Machine System Automation"], correctAnswer: "Measurement System Analysis" },
        { text: "What is the main purpose of MSA?", options: ["Ensure accuracy, precision, and reliability of measurement systems", "Approve supplier parts", "Monitor process control limits", "Identify product failures"], correctAnswer: "Ensure accuracy, precision, and reliability of measurement systems" },
        { text: "What does repeatability in MSA measure?", options: ["Consistency of measurements by the same operator using the same tool", "Accuracy of measurement system", "Variation in manufacturing process", "Effect of special cause variation"], correctAnswer: "Consistency of measurements by the same operator using the same tool" },
        { text: "What does reproducibility in MSA measure?", options: ["Consistency of measurements across different operators using the same tool", "Stability of process", "Severity of failure", "Occurrence of defects"], correctAnswer: "Consistency of measurements across different operators using the same tool" },
        { text: "SPC stands for:", options: ["Statistical Process Control", "Supplier Process Compliance", "Standardized Product Check", "Structured Process Calibration"], correctAnswer: "Statistical Process Control" },
        { text: "What is the primary purpose of SPC?", options: ["Monitor and control production processes to maintain consistent quality", "Validate supplier design", "Document PPAP submissions", "Evaluate FMEA risk scores"], correctAnswer: "Monitor and control production processes to maintain consistent quality" },
        { text: "In SPC, what is common cause variation?", options: ["Natural random variation within a stable process", "Variation due to unusual events or problems", "Errors in measurement systems", "Variation in design specifications"], correctAnswer: "Natural random variation within a stable process" },
        { text: "In SPC, what is special cause variation?", options: ["Variation caused by unusual events that need investigation", "Normal process variation", "Measurement errors", "Standard deviation"], correctAnswer: "Variation caused by unusual events that need investigation" },
        { text: "Which charts are primarily used in SPC?", options: ["Control charts", "Pareto charts", "Scatter diagrams", "Histograms"], correctAnswer: "Control charts" },
        { text: "What does an X-bar chart monitor in SPC?", options: ["Average of a process sample over time", "Measurement system bias", "Supplier compliance", "Failure modes and effects"], correctAnswer: "Average of a process sample over time" },
        { text: "What does an R chart monitor in SPC?", options: ["Range of values in a sample to observe variation", "Average of process samples", "Severity of failures", "PPAP compliance"], correctAnswer: "Range of values in a sample to observe variation" },
        { text: "What action is required if a data point falls outside control limits in SPC?", options: ["Investigate and correct the special cause", "Ignore, it is common variation", "Submit a PPAP", "Conduct an MSA study"], correctAnswer: "Investigate and correct the special cause" },
        { text: "How do automotive core tools work together?", options: ["Ensure quality from design through production and support IATF16949 compliance", "Monitor marketing campaigns", "Reduce employee working hours", "Increase inventory turnover"], correctAnswer: "Ensure quality from design through production and support IATF16949 compliance" }
        ],
    ]
  },
  {
    id: 'M3',
    title: 'Basics of measurement & metrology',
    titleKn: 'ಅಳತೆ ಮತ್ತು ಮಾಪನಶಾಸ್ತ್ರದ ಮೂಲಭೂತ ಅಂಶಗಳು', // Alate mattu mapanashastrada mulabhutha amshagalu (Basics of Measurement and Metrology)
    videos: [
      { id: 'mdRTq2_qI9Y', title: 'CNC Machines', titleKn: 'ಸಿಎನ್‌ಸಿ ಯಂತ್ರಗಳು' }, // CNC Yantragalu
      { id: 'u1jiod4c-eI', title: 'CNC Machining types and applications', titleKn: 'ಸಿಎನ್‌ಸಿ ಯಂತ್ರದ ವಿಧಗಳು ಮತ್ತು ಅನ್ವಯಗಳು' }, // CNC Yantrada Vidhagalu mattu Anvayagalu
      { id: 'BCy6OYj917o', title: 'Surface Finishing processes: Lapping, Honing, Buffing, Superfinishing', titleKn: 'ಮೇಲ್ಮೈ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆ ಪ್ರಕ್ರಿಯೆಗಳು: ಲ್ಯಾಪಿಂಗ್, ಹೋನಿಂಗ್, ಬಫಿಂಗ್, ಸೂಪರ್‌ಫಿನಿಶಿಂಗ್' }, // Melmay purnagolisuvike prakriyegalu: Lapping, Honing, Buffing, Superfinishing
      { id: 'FPTebi0gnuQ', title: 'Surface Roughness, Texture Topology, Finishing', titleKn: 'ಮೇಲ್ಮೈ ಒರಟುತನ, ಟೆಕಶ್ಚರ್ ಟೋಪೋಲಜಿ, ಫಿನಿಶಿಂಗ್' }, // Melmay oratutana, Texture Topology, Finishing
      { id: 'o2ZwjSRuGeg', title: 'GD&T SYMBOLS', titleKn: 'ಜಿಡಿ&ಟಿ ಚಿಹ್ನೆಗಳು' } // GD&T Chihnnegalu
    ],
    quizzes: [
      [   
  {
    text: "Why should engineers understand different CNC machine types?",
    options: [
      "To reduce tool wear",
      "To design effectively by knowing each type’s capabilities",
      "To avoid using cutting tools",
      "To simplify drawings"
    ],
    correctAnswer: "To design effectively by knowing each type’s capabilities"
  },
  {
    text: "Which CNC machines were discussed in the video?",
    options: [
      "Machines that remove material using cutting tools",
      "Only additive systems",
      "Only EDM machines",
      "Laser cutters only"
    ],
    correctAnswer: "Machines that remove material using cutting tools"
  },
  {
    text: "Which are the main CNC machine categories?",
    options: [
      "3-axis and multi-axis machines",
      "Lathe and plasma machines",
      "Milling and laser cutters",
      "Turning and grinding systems"
    ],
    correctAnswer: "3-axis and multi-axis machines"
  },
  {
    text: "Which are common 3-axis CNC machines?",
    options: [
      "CNC drilling and milling machines",
      "CNC milling and CNC turning machines",
      "CNC laser and EDM machines",
      "CNC plasma cutters"
    ],
    correctAnswer: "CNC milling and CNC turning machines"
  },
  {
    text: "Why are 3-axis milling machines popular?",
    options: [
      "They are easy to program and cost-effective",
      "They machine all shapes without limits",
      "They use automatic tool changers only",
      "They require no supervision"
    ],
    correctAnswer: "They are easy to program and cost-effective"
  },
  {
    text: "What is a limitation of 3-axis CNC milling machines?",
    options: [
      "Limited tool access to certain areas",
      "High power consumption",
      "Cannot handle soft materials",
      "Difficult spindle setup"
    ],
    correctAnswer: "Limited tool access to certain areas"
  },
  {
    text: "How does a CNC lathe differ from a milling machine?",
    options: [
      "The workpiece rotates while the tool is stationary",
      "The tool rotates while the workpiece is fixed",
      "Both remain stationary",
      "Both rotate together"
    ],
    correctAnswer: "The workpiece rotates while the tool is stationary"
  },
  {
    text: "CNC lathes are ideal for which parts?",
    options: [
      "Cylindrical parts",
      "Flat sheets",
      "Complex organic shapes",
      "Rectangular plates"
    ],
    correctAnswer: "Cylindrical parts"
  },
  {
    text: "How many axes do multi-axis CNC machines typically have?",
    options: ["Three", "Four", "Five or more", "Two"],
    correctAnswer: "Five or more"
  },
  {
    text: "What is a main benefit of 5-axis machining?",
    options: [
      "It enables complex geometries using two extra axes",
      "It reduces tool wear automatically",
      "It uses fewer G-codes",
      "It eliminates programming steps"
    ],
    correctAnswer: "It enables complex geometries using two extra axes"
  },
  {
    text: "What describes an indexed 5-axis CNC machine?",
    options: [
      "The bed or head rotates between operations",
      "All five axes move together",
      "It uses manual tool control",
      "It is limited to one tool"
    ],
    correctAnswer: "The bed or head rotates between operations"
  },
  {
    text: "How does a continuous 5-axis CNC differ from an indexed one?",
    options: [
      "All five axes move simultaneously during machining",
      "It needs manual repositioning",
      "It performs only rough cuts",
      "It can only cut flat surfaces"
    ],
    correctAnswer: "All five axes move simultaneously during machining"
  },
  {
    text: "What is a Mill-Turn CNC center?",
    options: [
      "A hybrid combining milling and turning",
      "A manual grinding setup",
      "A laser cutter",
      "A basic plasma machine"
    ],
    correctAnswer: "A hybrid combining milling and turning"
  },
  {
    text: "What is the advantage of a Mill-Turn CNC center?",
    options: [
      "Reduces setup time and cost",
      "Eliminates tool requirements",
      "Produces flat parts only",
      "Needs multiple setups"
    ],
    correctAnswer: "Reduces setup time and cost"
  },
  {
    text: "Which term defines CNC motion precision?",
    options: ["Accuracy", "Resolution", "Feed rate", "Tolerance"],
    correctAnswer: "Resolution"
  },
  {
    text: "What is G-code used for?",
    options: [
      "Controlling tool movements and paths",
      "Activating coolant systems",
      "Defining machine start delay",
      "Monitoring power usage"
    ],
    correctAnswer: "Controlling tool movements and paths"
  },
  {
    text: "What is the role of M-code?",
    options: [
      "Controls machine functions like spindle and coolant",
      "Defines work coordinate systems",
      "Adjusts feed rate",
      "Creates tool offsets"
    ],
    correctAnswer: "Controls machine functions like spindle and coolant"
  },
  {
    text: "Which CNC axis moves vertically?",
    options: ["X-axis", "Y-axis", "Z-axis", "A-axis"],
    correctAnswer: "Z-axis"
  },
  {
    text: "Which CNC component rotates the cutting tool?",
    options: ["Spindle", "Chuck", "Turret", "Tailstock"],
    correctAnswer: "Spindle"
  },
  {
    text: "What is backlash in CNC systems?",
    options: [
      "Mechanical play between drive components",
      "Excessive spindle heat",
      "Feed rate increase",
      "Tool vibration"
    ],
    correctAnswer: "Mechanical play between drive components"
  },
  {
    text: "What part interprets and executes CNC programs?",
    options: ["Controller", "Fixture", "Tool post", "Coolant pump"],
    correctAnswer: "Controller"
  },
  {
    text: "What does feed rate mean in CNC machining?",
    options: [
      "Speed of tool movement relative to workpiece",
      "Spindle rotation speed",
      "Power consumption rate",
      "Lubricant flow rate"
    ],
    correctAnswer: "Speed of tool movement relative to workpiece"
  },
  {
    text: "What does the tool turret on a CNC lathe do?",
    options: [
      "Holds multiple tools for automatic selection",
      "Rotates the workpiece",
      "Supports the tailstock",
      "Moves the spindle"
    ],
    correctAnswer: "Holds multiple tools for automatic selection"
  },
  {
    text: "Which CNC machine uses a thin wire for cutting?",
    options: ["EDM machine", "Lathe", "Router", "Grinder"],
    correctAnswer: "EDM machine"
  },
  {
    text: "In CNC machining, what is interpolation?",
    options: [
      "Movement of the tool along a programmed path",
      "Manual spindle control",
      "Tool alignment check",
      "Coolant flow adjustment"
    ],
    correctAnswer: "Movement of the tool along a programmed path"
  },
  {
    text: "What does tool offset compensate for?",
    options: [
      "Tool length or diameter differences",
      "Workpiece hardness",
      "Tool wear vibration",
      "Spindle misalignment"
    ],
    correctAnswer: "Tool length or diameter differences"
  },
  {
    text: "Which metal is most commonly machined using CNC?",
    options: ["Aluminum", "Copper", "Iron", "Zinc"],
    correctAnswer: "Aluminum"
  },
  {
    text: "What is the key advantage of CNC over manual machining?",
    options: [
      "Greater precision and repeatability",
      "No programming needed",
      "No cutting fluids required",
      "Always faster than manual machining"
    ],
    correctAnswer: "Greater precision and repeatability"
  },
  {
    text: "Which CNC machine is ideal for wood and plastic engraving?",
    options: ["CNC router", "CNC lathe", "EDM machine", "Grinder"],
    correctAnswer: "CNC router"
  },
  {
    text: "Which is a key safety practice in CNC operation?",
    options: [
      "Wearing protective eyewear and securing clothing",
      "Touching the tool to check sharpness",
      "Disabling interlocks during setup",
      "Leaning near the spindle while running"
    ],
    correctAnswer: "Wearing protective eyewear and securing clothing"
  },
  {
    text: "What summarizes the main takeaway of CNC machine types?",
    options: [
      "Each type has distinct strengths and applications",
      "All CNC machines perform the same function",
      "3-axis systems are outdated",
      "Only turning machines are widely used"
    ],
    correctAnswer: "Each type has distinct strengths and applications"
  }
      ],[
        
  {
    text: "What does CNC stand for?",
    options: [
      "Central Numeric Calculation",
      "Computer Numerical Control",
      "Calculated Numeric Coding",
      "Controlled Network Computing"
    ],
    correctAnswer: "Computer Numerical Control"
  },
  {
    text: "Which industries commonly rely on CNC machining?",
    options: [
      "Education and Tourism",
      "Agriculture and Forestry",
      "Aerospace, Automotive, and Medical",
      "Textile and Food"
    ],
    correctAnswer: "Aerospace, Automotive, and Medical"
  },
  {
    text: "What is CNC machining primarily used for?",
    options: [
      "Transforming raw materials into precise parts using computer-guided controls",
      "Painting or polishing metallic surfaces for appearance",
      "Smoothing metal components using abrasive wheels",
      "Joining materials using high-pressure welding techniques"
    ],
    correctAnswer: "Transforming raw materials into precise parts using computer-guided controls"
  },
  {
    text: "Which characteristic best describes CNC machining?",
    options: [
      "Manual operation with limited precision",
      "High precision, efficiency, and repeatability",
      "Low reliability in mass production environments",
      "Dependence on operator hand adjustments"
    ],
    correctAnswer: "High precision, efficiency, and repeatability"
  },
  {
    text: "What is the main function of CNC milling?",
    options: [
      "Uses electrical current to melt and shape materials",
      "Uses rotating cutting tools to remove material from a surface",
      "Uses pressurized air to cool and shape materials",
      "Rotates the workpiece instead of the tool to remove material"
    ],
    correctAnswer: "Uses rotating cutting tools to remove material from a surface"
  },
  {
    text: "CNC milling is ideal for creating which types of parts?",
    options: [
      "Flat wooden panels with uniform texture",
      "Complex 3D shapes with tight tolerances",
      "Cylindrical rods and round pipes",
      "Simple plastic housings only"
    ],
    correctAnswer: "Complex 3D shapes with tight tolerances"
  },
  {
    text: "Which of the following components are typically produced by CNC milling?",
    options: [
      "Electrical cables and wires",
      "Rubber seals and soft gaskets",
      "Molds, aerospace components, and automotive parts",
      "Printed labels and packaging molds"
    ],
    correctAnswer: "Molds, aerospace components, and automotive parts"
  },
  {
    text: "In CNC turning, what rotates during machining?",
    options: [
      "The cutting tool rotates while the workpiece stays fixed",
      "The spindle housing rotates to adjust feed rate",
      "The machine bed rotates to balance vibration",
      "The workpiece rotates while the cutting tool remains stationary"
    ],
    correctAnswer: "The workpiece rotates while the cutting tool remains stationary"
  },
  {
    text: "What is CNC turning best suited for?",
    options: [
      "Flat plates and mold cavities",
      "Cylindrical parts like shafts, bushings, and threaded components",
      "Curved sheet-metal surfaces",
      "Thin plastic panels and rods"
    ],
    correctAnswer: "Cylindrical parts like shafts, bushings, and threaded components"
  },
  {
    text: "What advantage does CNC turning provide?",
    options: [
      "Smooth finishes and high accuracy for rotational parts",
      "Limited material compatibility and slow machining rate",
      "Inconsistent cutting speeds and tool wear",
      "Manual adjustments between every cycle"
    ],
    correctAnswer: "Smooth finishes and high accuracy for rotational parts"
  },
  {
    text: "Which materials can CNC turning process effectively?",
    options: [
      "Ceramics only due to high hardness",
      "Both metals and plastics with proper tooling",
      "Only non-conductive materials",
      "Soft materials such as rubber or cloth"
    ],
    correctAnswer: "Both metals and plastics with proper tooling"
  },
  {
    text: "What is CNC drilling mainly used for?",
    options: [
      "Creating holes with extreme precision and repeatability",
      "Milling slots and external profiles",
      "Finishing the surface with abrasive compounds",
      "Forming threads using high heat"
    ],
    correctAnswer: "Creating holes with extreme precision and repeatability"
  },
  {
    text: "CNC drilling is suitable for which of the following applications?",
    options: [
      "Medical devices and industrial machinery parts",
      "Wood carving and decoration work",
      "Plastic toy manufacturing only",
      "Printing press cylinder making"
    ],
    correctAnswer: "Medical devices and industrial machinery parts"
  },
  {
    text: "What is the main focus of CNC drilling?",
    options: [
      "Manual positioning of cutting tools",
      "High accuracy and dimensional consistency",
      "Color coating after drilling",
      "Surface engraving for aesthetics"
    ],
    correctAnswer: "High accuracy and dimensional consistency"
  },
  {
    text: "What does Wire EDM stand for?",
    options: [
      "Electrical Discharge Machining",
      "Electronic Data Mechanism",
      "Energy Distribution Module",
      "Electro Dynamic Molding"
    ],
    correctAnswer: "Electrical Discharge Machining"
  },
  {
    text: "How does Wire EDM remove material?",
    options: [
      "Using a high-speed abrasive belt to cut metals",
      "Using an electrically charged wire to erode conductive material",
      "Using compressed air to grind the surface",
      "Using mechanical vibration to separate material"
    ],
    correctAnswer: "Using an electrically charged wire to erode conductive material"
  },
  {
    text: "Which materials are best suited for Wire EDM?",
    options: [
      "Non-conductive plastics and ceramics",
      "Conductive metals and hard alloys",
      "Soft polymers and rubbers",
      "Composites reinforced with fibers"
    ],
    correctAnswer: "Conductive metals and hard alloys"
  },
  {
    text: "Give an example of a component produced by Wire EDM.",
    options: [
      "High-precision dies and aerospace turbine blades",
      "Rubber gaskets and seals",
      "Plastic containers and bottles",
      "Printed circuit boards and resistors"
    ],
    correctAnswer: "High-precision dies and aerospace turbine blades"
  },
  {
    text: "What is a key advantage of Wire EDM?",
    options: [
      "Cuts very hard materials with exceptional precision",
      "Consumes no electricity during operation",
      "Cuts only wooden materials efficiently",
      "Removes material through heat conduction"
    ],
    correctAnswer: "Cuts very hard materials with exceptional precision"
  },
  {
    text: "What are examples of specialized CNC machining processes?",
    options: [
      "CNC laser cutting and CNC plasma cutting",
      "Manual engraving and hammer forging",
      "Casting and thermal spraying",
      "Cold rolling and polishing"
    ],
    correctAnswer: "CNC laser cutting and CNC plasma cutting"
  },
  {
    text: "What is the main purpose of CNC laser and plasma cutting?",
    options: [
      "Cutting materials quickly and efficiently with precision",
      "Heating surfaces to apply coatings",
      "Joining sheets through spot welding",
      "Forming wires into coils for machining"
    ],
    correctAnswer: "Cutting materials quickly and efficiently with precision"
  },
  {
    text: "Which CNC process is ideal for both thin and thick materials?",
    options: [
      "CNC laser and plasma cutting",
      "CNC drilling and tapping",
      "CNC turning and grinding",
      "CNC polishing and engraving"
    ],
    correctAnswer: "CNC laser and plasma cutting"
  },
  {
    text: "Which CNC process is best for creating molds and aerospace components?",
    options: [
      "CNC milling for 3D contour machining",
      "CNC turning for cylindrical features",
      "CNC drilling for deep holes",
      "Wire EDM for rough cuts"
    ],
    correctAnswer: "CNC milling for 3D contour machining"
  },
  {
    text: "Which CNC process is essential for cylindrical parts?",
    options: [
      "CNC turning for round geometries",
      "CNC milling for flat profiles",
      "CNC drilling for through holes",
      "CNC plasma cutting for metal sheets"
    ],
    correctAnswer: "CNC turning for round geometries"
  },
  {
    text: "Which industries commonly use CNC drilling?",
    options: [
      "Medical and industrial manufacturing sectors",
      "Textile and food processing sectors",
      "Forestry and agriculture operations",
      "Education and tourism sectors"
    ],
    correctAnswer: "Medical and industrial manufacturing sectors"
  },
  {
    text: "What makes CNC machining vital in modern manufacturing?",
    options: [
      "Precision and versatility across materials",
      "Manual control and guesswork",
      "High waste and slower output",
      "Random tolerance variation"
    ],
    correctAnswer: "Precision and versatility across materials"
  },
  {
    text: "Which property makes CNC machining essential across industries?",
    options: [
      "Unmatched precision, efficiency, and repeatability",
      "High energy use and low repeatability",
      "Complex manual setup with low tolerance",
      "Variable accuracy under supervision"
    ],
    correctAnswer: "Unmatched precision, efficiency, and repeatability"
  },
  {
    text: "What does YIJEN Hardware specialize in?",
    options: [
      "Delivering high-quality CNC solutions tailored to needs",
      "Producing manual lathe components only",
      "Importing sheet metals for retail use",
      "Building wooden furniture and molds"
    ],
    correctAnswer: "Delivering high-quality CNC solutions tailored to needs"
  },
  {
  text: "Which CNC process is commonly used for producing high-precision aerospace components?",
  options: [
    "CNC turning",
    "CNC milling",
    "Wire EDM",
    "CNC laser cutting"
  ],
  correctAnswer: "Wire EDM"
},
  {
    text: "What is the main takeaway from the CNC machining video?",
    options: [
      "CNC machining provides precision and versatility across industries",
      "Manual machining remains faster for all parts",
      "CNC tools cannot produce detailed geometries",
      "CNC processes are limited to wooden materials"
    ],
    correctAnswer: "CNC machining provides precision and versatility across industries"
  }


      ],[
  {
    text: "What is the primary objective of surface finishing in manufacturing?",
    options: [
      "To enhance surface characteristics and performance",
      "To increase the component weight during production",
      "To modify the core structure of the material",
      "To reduce the overall tool wear rate"
    ],
    correctAnswer: "To enhance surface characteristics and performance"
  },
  {
    text: "Which property is least affected by surface finishing?",
    options: [
      "Wear resistance of the surface",
      "Tensile modulus of the material",
      "Fatigue strength of the component",
      "Corrosion resistance of the part"
    ],
    correctAnswer: "Tensile modulus of the material"
  },
  {
    text: "Which parameters are controlled during surface finishing?",
    options: [
      "Internal grain size and composition",
      "Elasticity and density variation",
      "Thermal conductivity and color",
      "Surface texture, waviness, and roughness"
    ],
    correctAnswer: "Surface texture, waviness, and roughness"
  },
  {
    text: "Which among the following is a surface finishing process?",
    options: [
      "Rolling of sheet components",
      "Forging of metallic alloys",
      "Casting of molten metals",
      "Lapping of flat and curved parts"
    ],
    correctAnswer: "Lapping of flat and curved parts"
  },
  {
    text: "What is the main function of the lapping process?",
    options: [
      "To achieve fine finish with tight dimensional control",
      "To improve cutting speed of the tool",
      "To remove oxide layers from the surface",
      "To create decorative surface patterns"
    ],
    correctAnswer: "To achieve fine finish with tight dimensional control"
  },
  {
    text: "Which material is commonly used as a lapping abrasive?",
    options: [
      "Plastic or resin-based beads",
      "Diamond or aluminum oxide grains",
      "Copper or zinc metal dust",
      "Lead or tin metallic powder"
    ],
    correctAnswer: "Diamond or aluminum oxide grains"
  },
  {
    text: "What type of motion occurs in lapping?",
    options: [
      "Purely vibratory motion in one axis",
      "Combined rotary and reciprocating movement",
      "Continuous linear motion only",
      "Impact-based oscillating movement"
    ],
    correctAnswer: "Combined rotary and reciprocating movement"
  },
  {
    text: "Honing is mainly used to improve which property?",
    options: [
      "Dimensional accuracy and fine surface finish",
      "Brittleness and ductility ratio",
      "Thermal conductivity of the surface",
      "Magnetic response of metallic materials"
    ],
    correctAnswer: "Dimensional accuracy and fine surface finish"
  },
  {
    text: "Which tool is primarily used in honing?",
    options: [
      "Abrasive stone or honing stick",
      "Carbide cutting blade",
      "Multi-edge milling cutter",
      "Single-point turning tool"
    ],
    correctAnswer: "Abrasive stone or honing stick"
  },
  {
    text: "Honing is usually applied on which type of part?",
    options: [
      "Flat sheet metal components",
      "Cylindrical bores and engine liners",
      "External shafts and gears",
      "Rectangular steel plates"
    ],
    correctAnswer: "Cylindrical bores and engine liners"
  },
  {
    text: "What is the purpose of the buffing process?",
    options: [
      "To create a mirror-like reflective finish",
      "To modify the crystal lattice structure",
      "To improve tool cutting sharpness",
      "To increase hardness of metallic parts"
    ],
    correctAnswer: "To create a mirror-like reflective finish"
  },
  {
    text: "Which wheel material is used in buffing operations?",
    options: [
      "Soft cloth or leather-based wheel",
      "Hard bonded stone grinding wheel",
      "Steel brush or wire-type wheel",
      "Carbide-coated cutting wheel"
    ],
    correctAnswer: "Soft cloth or leather-based wheel"
  },
  {
    text: "What is the function of buffing compounds?",
    options: [
      "To strengthen internal molecular structure",
      "To clean residual coolant or oil",
      "To polish and reduce micro-scratches on surfaces",
      "To reduce metal melting temperature"
    ],
    correctAnswer: "To polish and reduce micro-scratches on surfaces"
  },
  {
    text: "Superfinishing is mainly performed to achieve:",
    options: [
      "A decorative texture on the component",
      "A rapid metal removal rate",
      "A thicker oxide layer for corrosion control",
      "An ultra-smooth and low-roughness surface"
    ],
    correctAnswer: "An ultra-smooth and low-roughness surface"
  },
  {
    text: "In which industries is superfinishing widely used?",
    options: [
      "Aerospace and automotive applications",
      "Plastic and packaging sectors",
      "Food processing and beverages",
      "Paper and textile production"
    ],
    correctAnswer: "Aerospace and automotive applications"
  },
  {
    text: "How does the abrasive stick move in superfinishing?",
    options: [
      "With a controlled short reciprocating motion",
      "With linear oscillation at constant feed",
      "With continuous rotary motion around one axis",
      "With random vibratory motion in all directions"
    ],
    correctAnswer: "With a controlled short reciprocating motion"
  },
  {
    text: "Which finishing process improves fatigue strength of parts?",
    options: [
      "Thermal welding process",
      "Metal casting operation",
      "Powder sintering method",
      "Superfinishing technique"
    ],
    correctAnswer: "Superfinishing technique"
  },
  {
    text: "Which finishing process provides highest accuracy?",
    options: [
      "Manual polishing process",
      "Fine buffing technique",
      "General honing procedure",
      "Precision lapping method"
    ],
    correctAnswer: "Precision lapping method"
  },
  {
    text: "What differentiates honing from lapping?",
    options: [
      "Honing uses bonded abrasives while lapping uses loose abrasives",
      "Lapping is always faster than honing operation",
      "Honing requires coolant but lapping does not",
      "Lapping is suitable only for cylindrical parts"
    ],
    correctAnswer: "Honing uses bonded abrasives while lapping uses loose abrasives"
  },
  {
    text: "Buffing mainly enhances which property of the product?",
    options: [
      "Internal hardness and grain size",
      "Heat transfer capability",
      "Surface aesthetics and brightness",
      "Dimensional precision and tolerance"
    ],
    correctAnswer: "Surface aesthetics and brightness"
  },
  {
    text: "Which process is ideal for mirror-like metallic surfaces?",
    options: [
      "Superfinishing cycle",
      "Fine lapping step",
      "Buffing operation",
      "Honing process"
    ],
    correctAnswer: "Buffing operation"
  },
  {
    text: "Which defect is reduced most effectively by superfinishing?",
    options: [
      "Thermal cracks in heat-treated parts",
      "Large casting cavities and pores",
      "Macro-level waviness and bending",
      "Microscopic surface peaks and valleys"
    ],
    correctAnswer: "Microscopic surface peaks and valleys"
  },
  {
    text: "Which finishing process uses both abrasives and lubricants?",
    options: [
      "Drilling operation",
      "Rolling method",
      "Turning process",
      "Lapping process"
    ],
    correctAnswer: "Lapping process"
  },
  {
    text: "Honing is generally performed after which machining step?",
    options: [
      "Casting or molding process",
      "Thread cutting operation",
      "Boring or reaming operation",
      "Turning or facing operation"
    ],
    correctAnswer: "Boring or reaming operation"
  },
  {
    text: "Which traditional process produces the smoothest finish?",
    options: [
      "Buffing procedure",
      "Honing process",
      "Fine lapping cycle",
      "Superfinishing operation"
    ],
    correctAnswer: "Superfinishing operation"
  },
  {
    text: "What surface roughness value is typically achieved by superfinishing?",
    options: [
      "Below 0.1 micrometer Ra",
      "Around 1.0 micrometer Ra",
      "Near 5.0 micrometer Ra",
      "Above 10.0 micrometer Ra"
    ],
    correctAnswer: "Below 0.1 micrometer Ra"
  },
  {
    text: "Which process combines pressure and abrasive action for finishing?",
    options: [
      "Forming operation",
      "Casting method",
      "Extrusion process",
      "Lapping technique"
    ],
    correctAnswer: "Lapping technique"
  },
  {
    text: "Which finishing method improves sealing properties in engines?",
    options: [
      "Buffing step",
      "Honing process",
      "Shot peening process",
      "Superfinishing run"
    ],
    correctAnswer: "Honing process"
  },
  {
    text: "Which finishing process reduces friction between moving parts?",
    options: [
      "Forming procedure",
      "Casting method",
      "Grinding operation",
      "Superfinishing process"
    ],
    correctAnswer: "Superfinishing process"
  },
  {
    text: "Why is surface finishing vital in precision manufacturing?",
    options: [
      "It minimizes color differences in products",
      "It increases raw material consumption",
      "It reduces total part weight and cost",
      "It enhances performance, durability, and efficiency"
    ],
    correctAnswer: "It enhances performance, durability, and efficiency"
  }
      ],[
        
  {
    text: "What does 'surface finish' refer to in manufacturing?",
    options: [
      "The condition of a part's surface at any stage of manufacturing",
      "The internal grain structure and material composition inside the part",
      "The application of coatings, paints, or protective layers on the surface",
      "The mechanical strength and hardness of the raw material used in parts"
    ],
    correctAnswer: "The condition of a part's surface at any stage of manufacturing"
  },
  {
    text: "Which processes create secondary surface finishes?",
    options: [
      "CNC milling, turning, grinding, sanding, lapping, and polishing operations",
      "Chemical passivation, anodizing, galvanizing, or decorative coating processes",
      "Casting, forging, and extrusion carried out during initial part creation",
      "Manual filing, sanding, or polishing done by operators on the part surfaces"
    ],
    correctAnswer: "CNC milling, turning, grinding, sanding, lapping, and polishing operations"
  },
  {
    text: "What are tertiary surface finishes?",
    options: [
      "Finishes produced by chemical or decorative treatments on the surface",
      "Primary surfaces obtained directly from rolling, extrusion, or casting",
      "Surface conditions generated unintentionally during rough machining processes",
      "Temporary coatings applied for testing or protective purposes during handling"
    ],
    correctAnswer: "Finishes produced by chemical or decorative treatments on the surface"
  },
  {
    text: "How can surface finishes be transferred between parts?",
    options: [
      "By using a machined mold core that leaves tool marks on molded components",
      "By sanding or rubbing two parts together to imprint patterns",
      "By painting or applying coatings from one part onto another surface",
      "By laser marking one part and stamping the mark onto the next piece"
    ],
    correctAnswer: "By using a machined mold core that leaves tool marks on molded components"
  },
  {
    text: "What is the relationship between surface finish, texture, and topology?",
    options: [
      "These terms are mostly interchangeable to describe the surface arrangement",
      "They measure the internal mechanical properties of the material differently",
      "Surface finish relates to appearance, while topology only concerns function",
      "Surface texture is for metals, while topology applies only to polymers"
    ],
    correctAnswer: "These terms are mostly interchangeable to describe the surface arrangement"
  },
  {
    text: "What does surface topology describe?",
    options: [
      "The specific arrangement of material features on a part's surface",
      "The chemical composition and hardness variation across the surface",
      "The thickness and durability of applied coatings on the part",
      "The alignment of internal microstructure in the raw material"
    ],
    correctAnswer: "The specific arrangement of material features on a part's surface"
  },
  {
    text: "How is 'surface texture' used in engineering?",
    options: [
      "To describe detailed patterns from bead blasting or spark erosion operations",
      "To calculate internal material density for engineering applications",
      "To measure hardness or wear properties of machined components",
      "To determine machining time or feed rates during processing"
    ],
    correctAnswer: "To describe detailed patterns from bead blasting or spark erosion operations"
  },
  {
    text: "How is surface roughness quantified?",
    options: [
      "By the Ra value, which is the average deviation between peaks and valleys",
      "By measuring the flatness of the part surface using a ruler or gauge",
      "By calculating the hardness and tensile strength of the part material",
      "By noting the color and shine of the surface after finishing"
    ],
    correctAnswer: "By the Ra value, which is the average deviation between peaks and valleys"
  },
  {
    text: "What instruments are used to measure surface roughness?",
    options: [
      "Contact probes or non-contact optical, laser, and X-ray systems",
      "Calipers and micrometers for measuring external dimensions",
      "Weighing scales and torque sensors for material evaluation",
      "Pressure sensors and thermocouples for surface energy readings"
    ],
    correctAnswer: "Contact probes or non-contact optical, laser, and X-ray systems"
  },
  {
    text: "What does a low Ra value indicate?",
    options: [
      "A very smooth surface with minimal deviations between peaks and valleys",
      "A highly rough surface with deep grooves and large deviations",
      "An uneven surface with frequent scratches and tool marks",
      "A surface coated with paint or other decorative layers"
    ],
    correctAnswer: "A very smooth surface with minimal deviations between peaks and valleys"
  },
  {
    text: "Why must product developers consider Ra values?",
    options: [
      "To specify the desired surface roughness for performance and manufacturability",
      "To determine the color and appearance of the final product surface",
      "To calculate the internal hardness distribution of materials used",
      "To estimate the cost of raw materials for manufacturing"
    ],
    correctAnswer: "To specify the desired surface roughness for performance and manufacturability"
  },
  {
    text: "What happens to cost and lead time with very low Ra values?",
    options: [
      "Both cost and machining time increase significantly with finer finishes",
      "Both cost and time decrease as the surface becomes smoother",
      "Only cost increases while time remains constant for finer surfaces",
      "Only time increases but cost is unaffected by surface finish"
    ],
    correctAnswer: "Both cost and machining time increase significantly with finer finishes"
  },
  {
    text: "What is the standard Ra for CNC machined parts at Star Rapid?",
    options: [
      "3.2 microns, with the ability to achieve as fine as 0.2 microns if required",
      "1.0 micron, with no possibility of going finer in production",
      "10 microns, for all machined parts regardless of material",
      "5.0 microns, which is the minimum acceptable roughness value"
    ],
    correctAnswer: "3.2 microns, with the ability to achieve as fine as 0.2 microns if required"
  },
  {
    text: "What practical tool helps engineers compare surface roughness?",
    options: [
      "A set of surface roughness samples made of different materials",
      "A microscope to view internal grain structure of parts",
      "A caliper to measure overall dimensions of components",
      "A hardness tester to evaluate material strength"
    ],
    correctAnswer: "A set of surface roughness samples made of different materials"
  },
  {
    text: "How can an engineer quickly verify part surface roughness?",
    options: [
      "By running a fingernail along the part and comparing with sample textures",
      "By weighing the part and comparing to reference weight charts",
      "By observing the part under ultraviolet light for coating defects",
      "By tapping the part and listening to the sound resonance"
    ],
    correctAnswer: "By running a fingernail along the part and comparing with sample textures"
  },
  {
    text: "What is the main function of primary surface finishes?",
    options: [
      "They are the initial finishes produced during processes like rolling or extrusion",
      "They are decorative finishes applied after machining or polishing",
      "They are temporary textures that are later removed in secondary finishing",
      "They are chemical coatings added to improve corrosion resistance"
    ],
    correctAnswer: "They are the initial finishes produced during processes like rolling or extrusion"
  },
  {
    text: "Which process is an example of creating secondary surface finishes?",
    options: [
      "CNC milling that leaves distinctive tool marks on the part",
      "Raw casting directly from molds without machining",
      "Applying paint or powder coating to the part surface",
      "Forging and rolling before any finishing operations"
    ],
    correctAnswer: "CNC milling that leaves distinctive tool marks on the part"
  },
  {
    text: "What is a common feature of tertiary finishes?",
    options: [
      "They often involve chemical treatments, plating, or decorative coatings",
      "They are naturally formed during raw material casting",
      "They involve the removal of large amounts of material mechanically",
      "They are temporary marks used for quality inspection purposes"
    ],
    correctAnswer: "They often involve chemical treatments, plating, or decorative coatings"
  },
  {
    text: "What does the term 'lay' describe in surface roughness measurement?",
    options: [
      "The dominant direction of grooves on a surface",
      "The maximum depth of surface peaks",
      "The overall hardness across a machined surface",
      "The chemical composition of the material on the surface"
    ],
    correctAnswer: "The dominant direction of grooves on a surface"
  },
  {
    text: "What does 'waviness' refer to in surface analysis?",
    options: [
      "Periodic distortions over longer lengths of the surface",
      "Random scratches and marks from rough machining",
      "The color variation across a coated surface",
      "The internal grain orientation of the material"
    ],
    correctAnswer: "Periodic distortions over longer lengths of the surface"
  },
  {
    text: "Why should extremely low Ra values be avoided when unnecessary?",
    options: [
      "Because achieving finer surfaces greatly increases cost and production time",
      "Because rough surfaces improve the aesthetic appeal of parts",
      "Because low Ra values make the part weaker structurally",
      "Because it is impossible to measure Ra accurately below 1 micron"
    ],
    correctAnswer: "Because achieving finer surfaces greatly increases cost and production time"
  },
  {
    text: "What is the importance of measuring multiple points for Ra?",
    options: [
      "To ensure accurate average measurement of surface roughness",
      "To calculate the part's weight accurately",
      "To determine the color uniformity of coatings",
      "To check hardness variations across the material"
    ],
    correctAnswer: "To ensure accurate average measurement of surface roughness"
  },
  {
    text: "Which of the following describes 'Ra'?",
    options: [
      "The arithmetic average of the surface profile deviations",
      "The maximum peak height measured across a surface",
      "The width of the widest groove on a surface",
      "The optical reflection coefficient of a polished surface"
    ],
    correctAnswer: "The arithmetic average of the surface profile deviations"
  },
  {
    text: "What can surface roughness samples help engineers determine?",
    options: [
      "If the manufacturer meets the required finish by feel and appearance",
      "If the internal grain structure matches design specifications",
      "If the raw material meets tensile strength requirements",
      "If the coating thickness is within tolerance limits"
    ],
    correctAnswer: "If the manufacturer meets the required finish by feel and appearance"
  },
  {
    text: "What is the primary purpose of surface roughness control?",
    options: [
      "To ensure proper part performance, durability, and functionality",
      "To reduce material costs and weight of manufactured components",
      "To improve color and shine on finished parts",
      "To simplify the machining process for easier handling"
    ],
    correctAnswer: "To ensure proper part performance, durability, and functionality"
  },
  {
    text: "Why is understanding surface terminology important for engineers?",
    options: [
      "To communicate requirements effectively and ensure design intent",
      "To make parts visually appealing regardless of function",
      "To reduce the cost of raw materials used in production",
      "To speed up machining by skipping finishing processes"
    ],
    correctAnswer: "To communicate requirements effectively and ensure design intent"
  },
  {
    text: "What is the purpose of a surface roughness standard set by a company?",
    options: [
      "To define a baseline for manufacturing and quality assurance processes",
      "To limit the types of materials that can be used in production",
      "To standardize colors and finishes across different parts",
      "To simplify training requirements for new operators"
    ],
    correctAnswer: "To define a baseline for manufacturing and quality assurance processes"
  },
  {
    text: "What is a quick, low-cost method to compare part surfaces to desired roughness?",
    options: [
      "Running a fingernail along the part and comparing to sample textures",
      "Using a microscope to inspect the grain orientation in the material",
      "Applying paint to the surface to check adhesion and uniformity",
      "Measuring the weight and dimensions of the part for consistency"
    ],
    correctAnswer: "Running a fingernail along the part and comparing to sample textures"
  },
  {
    text: "Why should engineers specify Ra values appropriately?",
    options: [
      "To avoid unnecessary cost and time while achieving functional requirements",
      "To improve the aesthetics of every component unnecessarily",
      "To ensure surfaces are rough enough for decorative coatings",
      "To eliminate the need for any secondary finishing processes"
    ],
    correctAnswer: "To avoid unnecessary cost and time while achieving functional requirements"
  }

      ],
      [
  {
    text: "What does the '⊥' symbol represent in GD&T?",
    options: [
      "Indicates the direction of a surface relative to another",
      "Specifies perpendicularity tolerance between two features",
      "Shows allowable circularity deviation",
      "Defines surface roughness limits"
    ],
    correctAnswer: "Specifies perpendicularity tolerance between two features"
  },
  {
    text: "Which symbol in GD&T is used to define flatness?",
    options: [
      "Indicates surface roughness",
      "Specifies allowable variation in a surface being perfectly flat",
      "Shows position tolerance",
      "Defines profile of a line"
    ],
    correctAnswer: "Specifies allowable variation in a surface being perfectly flat"
  },
  {
    text: "The '⧫' symbol in GD&T represents which tolerance?",
    options: [
      "Limits the profile of a curved surface",
      "Specifies the true position of a feature",
      "Defines parallelism between two surfaces",
      "Indicates circular runout tolerance"
    ],
    correctAnswer: "Specifies the true position of a feature"
  },
  {
    text: "Which symbol is used to indicate parallelism?",
    options: [
      "Defines perpendicularity",
      "Shows allowable distance between two surfaces remaining equidistant",
      "Indicates circularity deviation",
      "Specifies surface roughness limit"
    ],
    correctAnswer: "Shows allowable distance between two surfaces remaining equidistant"
  },
  {
    text: "What does the '⧠' symbol represent in GD&T?",
    options: [
      "Defines a profile tolerance for a surface or line",
      "Specifies perpendicularity tolerance",
      "Indicates circular runout",
      "Limits surface roughness deviations"
    ],
    correctAnswer: "Defines a profile tolerance for a surface or line"
  },
  {
    text: "Which GD&T symbol is used to control circularity?",
    options: [
      "Shows variation from a perfect circle",
      "Specifies surface flatness",
      "Defines feature position tolerance",
      "Indicates parallelism between surfaces"
    ],
    correctAnswer: "Shows variation from a perfect circle"
  },
  {
    text: "What is the purpose of specifying a true position tolerance?",
    options: [
      "Ensures the feature is exactly in its designed location within tolerance limits",
      "Limits surface roughness variations for aesthetics",
      "Controls perpendicularity of all surfaces",
      "Defines circularity deviations only"
    ],
    correctAnswer: "Ensures the feature is exactly in its designed location within tolerance limits"
  },
  {
    text: "In GD&T, what does circular runout control?",
    options: [
      "Variation of a surface around a datum axis during rotation",
      "Deviation in flatness of a surface",
      "Position tolerance of holes",
      "Parallelism between planes"
    ],
    correctAnswer: "Variation of a surface around a datum axis during rotation"
  },
  {
    text: "Which symbol controls surface profile in GD&T?",
    options: [
      "Limits the shape of a surface relative to its ideal form",
      "Specifies perpendicularity between features",
      "Indicates allowable runout of a cylinder",
      "Controls flatness only"
    ],
    correctAnswer: "Limits the shape of a surface relative to its ideal form"
  },
  {
    text: "What does the '∥' symbol indicate?",
    options: [
      "Parallelism between two features",
      "Perpendicularity of a surface",
      "Surface roughness tolerance",
      "Position of a hole"
    ],
    correctAnswer: "Parallelism between two features"
  },
  {
    text: "Which GD&T symbol represents profile of a line?",
    options: [
      "Controls the shape of a line along a surface",
      "Specifies flatness tolerance",
      "Indicates perpendicularity deviation",
      "Defines circular runout"
    ],
    correctAnswer: "Controls the shape of a line along a surface"
  },
  {
    text: "Why is perpendicularity specified in GD&T?",
    options: [
      "Ensures surfaces or features are at the required 90-degree angle",
      "Controls roughness of a surface",
      "Defines circularity",
      "Limits true position deviation"
    ],
    correctAnswer: "Ensures surfaces or features are at the required 90-degree angle"
  },
  {
    text: "What does flatness tolerance ensure?",
    options: [
      "A surface lies within two parallel planes",
      "A feature is positioned correctly relative to datum",
      "Circularity is within tolerance",
      "Surface runout is minimized"
    ],
    correctAnswer: "A surface lies within two parallel planes"
  },
  {
    text: "Which symbol is used to indicate cylindricity in GD&T?",
    options: [
      "Controls deviation of a cylindrical surface from perfect form",
      "Specifies parallelism between features",
      "Indicates true position tolerance",
      "Limits surface roughness"
    ],
    correctAnswer: "Controls deviation of a cylindrical surface from perfect form"
  },
  {
    text: "Why is profile of a surface used in GD&T?",
    options: [
      "To control the 3D shape of a surface relative to its design",
      "To define perpendicularity",
      "To control circular runout only",
      "To limit roughness deviation"
    ],
    correctAnswer: "To control the 3D shape of a surface relative to its design"
  },
  {
    text: "What does total runout measure?",
    options: [
      "Combined variation in circularity and straightness along a feature's surface",
      "Deviation from a flat plane",
      "Perpendicularity of a cylinder",
      "Profile of a line"
    ],
    correctAnswer: "Combined variation in circularity and straightness along a feature's surface"
  },
  {
    text: "Why are datum features used in GD&T?",
    options: [
      "To provide a reference frame for all measurements",
      "To define circularity only",
      "To limit surface roughness",
      "To ensure parallelism only"
    ],
    correctAnswer: "To provide a reference frame for all measurements"
  },
  {
    text: "Which symbol indicates a datum feature?",
    options: [
      "A letter inside a square or rectangle",
      "⊥",
      "∥",
      "⧞"
    ],
    correctAnswer: "A letter inside a square or rectangle"
  },
  {
    text: "What does 'runout' control in GD&T?",
    options: [
      "Deviation of a feature as it rotates around a datum axis",
      "Surface roughness limits",
      "Profile of a line",
      "Parallelism between planes"
    ],
    correctAnswer: "Deviation of a feature as it rotates around a datum axis"
  },
  {
    text: "Why is circularity tolerance important?",
    options: [
      "Ensures a feature remains round within allowable limits",
      "Defines perpendicularity of surfaces",
      "Limits flatness deviations",
      "Controls parallelism only"
    ],
    correctAnswer: "Ensures a feature remains round within allowable limits"
  },
  {
    text: "What is the purpose of specifying profile tolerances?",
    options: [
      "To limit the 3D form deviation of surfaces or lines",
      "To indicate flatness only",
      "To control circular runout only",
      "To define perpendicularity only"
    ],
    correctAnswer: "To limit the 3D form deviation of surfaces or lines"
  },
  {
    text: "Which GD&T symbol controls angularity?",
    options: [
      "Ensures a surface or feature is at a specified angle relative to a datum",
      "Defines true position tolerance",
      "Controls flatness",
      "Limits roughness"
    ],
    correctAnswer: "Ensures a surface or feature is at a specified angle relative to a datum"
  },
  {
    text: "How does GD&T help engineers communicate designs?",
    options: [
      "Provides clear, standardized definitions of geometry and tolerances",
      "Specifies only roughness",
      "Controls surface finish randomly",
      "Limits measurement methods arbitrarily"
    ],
    correctAnswer: "Provides clear, standardized definitions of geometry and tolerances"
  },
  {
    text: "Why should engineers specify Ra values appropriately?",
    options: [
      "To avoid unnecessary cost and time while achieving functional requirements",
      "To improve aesthetics of every component unnecessarily",
      "To ensure surfaces are rough enough for decorative coatings",
      "To eliminate the need for secondary finishing processes"
    ],
    correctAnswer: "To avoid unnecessary cost and time while achieving functional requirements"
  },
  {
    text: "Which GD&T symbol is used to indicate maximum material condition (MMC)?",
    options: [
      "Indicates the feature is at its largest allowable size",
      "Defines flatness tolerance",
      "Specifies perpendicularity",
      "Controls surface roughness"
    ],
    correctAnswer: "Indicates the feature is at its largest allowable size"
  },
  {
    text: "Why is using datum references critical in GD&T?",
    options: [
      "They provide consistent reference points for measuring and inspecting features",
      "They define roughness only",
      "They limit circularity deviations randomly",
      "They ensure angularity only"
    ],
    correctAnswer: "They provide consistent reference points for measuring and inspecting features"
  },
  {
    text: "What is the role of tolerances in GD&T?",
    options: [
      "To specify allowable variation while ensuring function and assembly",
      "To decorate surfaces for aesthetics",
      "To define the type of material",
      "To control color and finish"
    ],
    correctAnswer: "To specify allowable variation while ensuring function and assembly"
  },
  {
    text: "Which symbol represents least material condition (LMC) in GD&T?",
    options: [
      "Specifies the smallest allowable size of a feature",
      "Controls circularity deviation",
      "Limits surface flatness",
      "Indicates perpendicularity"
    ],
    correctAnswer: "Specifies the smallest allowable size of a feature"
  }
]

    ]
  }
];
