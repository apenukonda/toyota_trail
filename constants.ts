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
    title: 'Advanced Quality Principles',
    titleKn: 'ಅಧುನಿಕ ಗುಣಮಟ್ಟದ ತತ್ವಗಳು',
    description: 'Explore key concepts like TPS, A3, and Poka Yoke through video modules and quizzes.',
    descriptionKn: 'TPS, A3 ಮತ್ತು Poka Yoke ಮುಂತಾದ ಮುಖ್ಯ ತತ್ವಗಳನ್ನು ವೀಡಿಯೊ ಮಾಯೂಡ್ಯೂಲ್‌ಗಳು ಮತ್ತು ಕ್ವಿಜ್‌ಗಳ ಮೂಲಕ ಅನ್ವೇಷಿಸಿ.',
    page: Page.VIDEO_TASK,
    totalSteps: 70, // 70 questions total
    completedSteps: 0,
    maxScore: 70,
  },
  {
    id: 'task3',
    title: 'Image Submission',
    titleKn: 'ಚಿತ್ರ ಸಲ್ಲಿಕೆ',
    description: 'Submit your cartoon image for the quality month contest.',
    descriptionKn: 'ಗುಣಮಟ್ಟದ ತಿಂಗಳ ಸ್ಪರ್ಧೆಗಾಗಿ ನಿಮ್ಮ ಕಾರ್ಟೂನ್ ಚಿತ್ರವನ್ನು ಸಲ್ಲಿಸಿ.',
    page: Page.IMAGE_SUBMISSION,
    totalSteps: 1,
    completedSteps: 0,
    maxScore: 5,
  },
  {
    id: 'task4',
    title: 'Slogan Writer',
    titleKn: 'ಸ್ಲೋಗನ್ ರಚನೆ',
    description: 'Contribute a slogan for this year\'s quality theme.',
    descriptionKn: 'ಈ ವರ್ಷದ ಗುಣಮಟ್ಟದ ಥೀಮಿಗೆ ಸ್ಲೋಗನ್ ರಚನೆ ಮಾಡಿ.',
    page: Page.SLOGAN_WRITER,
    totalSteps: 1,
    completedSteps: 0,
    maxScore: 3,
  },
  {
    id: 'task5',
    title: 'Suggestion Box',
    titleKn: 'ಸಲಹೆ ಪೆಟ್ಟಿಗೆ',
    description: 'Share your ideas for continuous improvement (Kaizen).',
    descriptionKn: 'ನಿರಂತರ ಸುಧಾರಣೆಗೆ (Kaizen) ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.',
    page: Page.SUGGESTION_BOX,
    totalSteps: 1,
    completedSteps: 0,
    maxScore: 3,
  },
];

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
      { id: 'WKKILW3Zj_Y', title: 'Video 1' },
      { id: 'gqK3dCpwzxE', title: 'Video 2' },
      { id: 'hRYWqdiUlbA', title: 'Video 3' },
      { id: 'Ad_WHkBIvlo', title: 'Video 4' },
      { id: 'JqA5Keel6Js', title: 'Video 5' },
      { id: 'XFVd_fCiO88', title: 'Video 6' },
    ],
    quizzes: [
      // Dummy quiz for video 1: 7 questions
      [
        { text: 'Who first proposed the Atkinson cycle?', options: ['Nikolaus Otto', 'James Atkinson', 'Rudolf Diesel', 'Karl Benz'], correctAnswer: 'James Atkinson' },
        
        { text: 'In which year was the Atkinson cycle first proposed?', options: ['1876', '1882', '1890', '1901'], correctAnswer: '1882' },
        
        { text: 'The Atkinson cycle uses a different thermodynamic process than which common engine cycle?', options: ['Diesel cycle', 'Otto cycle', 'Rankine cycle', 'Brayton cycle'], correctAnswer: 'Otto cycle' },
        
        { text: 'Which automobile company commonly uses the Atkinson cycle in its hybrid vehicles?', options: ['Honda', 'Ford', 'Toyota', 'Hyundai'], correctAnswer: 'Toyota' },
        
        { text: 'What is the main advantage of the Atkinson cycle over the Otto cycle?', options: ['Higher power output', 'Lower fuel consumption', 'Better fuel efficiency', 'Simpler design'], correctAnswer: 'Better fuel efficiency' },
        
        { text: 'What is the main trade-off of using the Atkinson cycle?', options: ['Reduced power output', 'Higher emissions', 'Lower fuel efficiency', 'Complex cooling system'], correctAnswer: 'Reduced power output' },
        
        { text: 'How has Toyota compensated for the power loss in non-hybrid vehicles using the Atkinson cycle?', options: ['By using a turbocharger', 'By switching between Atkinson and Otto cycles', 'By adding more cylinders', 'By increasing compression ratio'], correctAnswer: 'By switching between Atkinson and Otto cycles' },
        
        { text: 'In hybrid vehicles, what component helps overcome the reduced power of the Atkinson cycle?', options: ['Electric motor', 'Supercharger', 'Turbocharger', 'Extra piston'], correctAnswer: 'Electric motor' },
        
        { text: 'What stores the additional power used by the electric motor in hybrid vehicles?', options: ['Battery', 'Capacitor', 'Flywheel', 'Fuel cell'], correctAnswer: 'Battery' },
        
        { text: 'In the Otto cycle, how do the compression and expansion strokes compare?', options: ['Expansion is smaller', 'Compression is larger', 'They are equal', 'Expansion doesn’t occur'], correctAnswer: 'They are equal' },
        
        { text: 'What does the Atkinson cycle do with the intake valves during the compression stroke?', options: ['Closes them earlier', 'Keeps them open longer', 'Does not open them', 'Opens them partially'], correctAnswer: 'Keeps them open longer' },
        
        { text: 'Keeping the intake valves open longer causes some of the air-fuel mixture to be:', options: ['Forced into the cylinder', 'Pushed back into the intake manifold', 'Vaporized completely', 'Leaked into the crankcase'], correctAnswer: 'Pushed back into the intake manifold' },
        
        { text: 'Delaying the compression stroke in the Atkinson cycle results in:', options: ['More air entering the cylinder', 'Less air-fuel mixture in the cylinder', 'Higher compression pressure', 'Shorter expansion stroke'], correctAnswer: 'Less air-fuel mixture in the cylinder' },
        
        { text: 'Compared to compression, the expansion stroke in the Atkinson cycle is:', options: ['Smaller', 'Equal', 'Larger', 'Eliminated'], correctAnswer: 'Larger' },
        
        { text: 'A larger expansion stroke allows what benefit?', options: ['More energy extracted from fuel', 'Faster ignition', 'Less heat loss', 'More fuel burned'], correctAnswer: 'More energy extracted from fuel' },
        
        { text: 'With intake valves open during compression, the piston faces:', options: ['Higher resistance', 'Less resistance', 'Equal resistance', 'No resistance'], correctAnswer: 'Less resistance' },
        
        { text: 'Reduced pumping losses mean that the engine:', options: ['Consumes less power for self-operation', 'Burns more fuel', 'Requires higher octane fuel', 'Has higher emissions'], correctAnswer: 'Consumes less power for self-operation' },
        
        { text: 'In both hybrid and non-hybrid Toyota vehicles, the Atkinson cycle helps optimize:', options: ['Speed', 'Torque', 'Fuel efficiency', 'Engine sound'], correctAnswer: 'Fuel efficiency' },
        
        { text: 'What does Toyota use to eliminate any compromise in performance from the Atkinson cycle?', options: ['Turbochargers', 'Advanced engine management and hybrid powertrains', 'Increased fuel injection', 'Cylinder deactivation'], correctAnswer: 'Advanced engine management and hybrid powertrains' },
        
        { text: 'According to the video, where should drivers look for detailed feature applicability?', options: ['Toyota website', 'Service manual', 'Owner’s manual', 'Mechanic’s guide'], correctAnswer: 'Owner’s manual' }
      ]
      ,
      // Repeat for other videos in M1
      [
        { text: 'What is the main source of power for a typical automobile?', options: ['Battery', 'Engine', 'Motor', 'Transmission'], correctAnswer: 'Engine' },
      
        { text: 'What is the main purpose of an automobile engine?', options: ['Pump air', 'Rotate the crankshaft to drive the wheels', 'Burn fuel for heat', 'Store electricity'], correctAnswer: 'Rotate the crankshaft to drive the wheels' },
      
        { text: 'The crankshaft in an engine is responsible for:', options: ['Opening valves', 'Rotating the wheels', 'Cooling the engine', 'Controlling the exhaust'], correctAnswer: 'Rotating the wheels' },
      
        { text: 'Pistons move due to:', options: ['Oil pressure', 'Combustion of air and gasoline', 'Electric current', 'Cooling system'], correctAnswer: 'Combustion of air and gasoline' },
      
        { text: 'What are the two main parts of an engine?', options: ['Head and block', 'Cylinder and carburetor', 'Crankshaft and piston', 'Gearbox and clutch'], correctAnswer: 'Head and block' },
      
        { text: 'Which part of the engine houses pistons, cylinders, and the crankshaft?', options: ['Cylinder head', 'Engine block', 'Fuel chamber', 'Crankcase cover'], correctAnswer: 'Engine block' },
      
        { text: 'The cylinder head manages combustion through which systems?', options: ['Fuel, oil, cooling', 'Valvetrain, fuel injection, ignition', 'Lubrication, exhaust, intake', 'Turbo, valve, pressure'], correctAnswer: 'Valvetrain, fuel injection, ignition' },
      
        { text: 'How many stages of operation does a four-stroke engine have?', options: ['Two', 'Three', 'Four', 'Five'], correctAnswer: 'Four' },
      
        { text: 'During the intake stroke, the piston moves:', options: ['Upward', 'Downward', 'Sideways', 'Remains still'], correctAnswer: 'Downward' },
      
        { text: 'What happens when the piston moves down in the first stroke?', options: ['Air is compressed', 'Air-fuel mixture is ejected', 'Air is drawn into the cylinder', 'Fuel is ignited'], correctAnswer: 'Air is drawn into the cylinder' },
      
        { text: 'Which valves control the air entering the cylinder?', options: ['Exhaust valves', 'Intake valves', 'Relief valves', 'Spark valves'], correctAnswer: 'Intake valves' },
      
        { text: 'What occurs during the compression stroke?', options: ['Air-fuel mixture ignites', 'Air-fuel mixture is compressed', 'Exhaust gases exit', 'Valves open'], correctAnswer: 'Air-fuel mixture is compressed' },
      
        { text: 'The spark plug creates a spark during which stroke?', options: ['Compression', 'Power', 'Exhaust', 'Intake'], correctAnswer: 'Power' },
      
        { text: 'What happens as a result of the spark plug ignition?', options: ['Fuel evaporates', 'Controlled explosion pushes piston down', 'Crankshaft stops rotating', 'Valves open'], correctAnswer: 'Controlled explosion pushes piston down' },
      
        { text: 'During the exhaust stroke, the piston moves:', options: ['Down', 'Up', 'Sideways', 'Stationary'], correctAnswer: 'Up' },
      
        { text: 'Exhaust gases exit through:', options: ['Intake valves', 'Exhaust valves', 'Crankshaft ports', 'Fuel injectors'], correctAnswer: 'Exhaust valves' },
      
        { text: 'Multiple cylinders working together help:', options: ['Reduce power', 'Balance the four-stroke process', 'Increase fuel usage', 'Cool the engine'], correctAnswer: 'Balance the four-stroke process' },
      
        { text: 'What is the most common engine configuration today?', options: ['V8', 'Inline-four', 'V6', 'Boxer'], correctAnswer: 'Inline-four' },
      
        { text: 'In a V6 engine, how are the cylinders arranged?', options: ['All in one line', 'In two banks of three cylinders', 'In three rows', 'Horizontally opposite'], correctAnswer: 'In two banks of three cylinders' },
      
        { text: 'What is a boxer or flat engine?', options: ['V-shaped engine', 'Inline engine', '180-degree flat engine', 'Hybrid electric engine'], correctAnswer: '180-degree flat engine' },
      
        { text: 'What does the number 2.0 or 3.5 refer to in engines?', options: ['Fuel capacity', 'Cylinder diameter', 'Engine displacement', 'Compression ratio'], correctAnswer: 'Engine displacement' },
      
        { text: 'Engine displacement is measured in:', options: ['Gallons', 'Liters', 'Kilograms', 'Horsepower'], correctAnswer: 'Liters' },
      
        { text: 'A 2.0-liter engine with four cylinders displaces how much per cylinder?', options: ['1 liter', '0.5 liter', '0.25 liter', '2 liters'], correctAnswer: '0.5 liter' },
      
        { text: 'Torque refers to:', options: ['Speed of the engine', 'Strength with which crankshaft turns', 'Fuel efficiency', 'Compression ratio'], correctAnswer: 'Strength with which crankshaft turns' },
      
        { text: 'Torque is measured in:', options: ['Horsepower', 'Newton meters', 'Pound-feet', 'RPM'], correctAnswer: 'Pound-feet' },
      
        { text: 'Horsepower is defined as:', options: ['Torque over time', 'Torque per cycle', 'RPM per stroke', 'Cylinder pressure'], correctAnswer: 'Torque over time' },
      
        { text: 'Horsepower increases when:', options: ['Torque decreases', 'Engine speed increases', 'Fuel injection stops', 'Pistons move slower'], correctAnswer: 'Engine speed increases' },
      
        { text: 'The formula for horsepower in simple terms is:', options: ['Torque + RPM', 'Torque × RPM', 'Torque ÷ RPM', 'RPM ÷ Torque'], correctAnswer: 'Torque × RPM' },
      
        { text: 'Why can’t engines simply spin faster to make more horsepower?', options: ['High speed reduces torque and efficiency', 'Air supply stops', 'Fuel leaks occur', 'Crankshaft breaks easily'], correctAnswer: 'High speed reduces torque and efficiency' },
      
        { text: 'Why are transmissions important for engine performance?', options: ['They reduce fuel', 'They keep the engine in its torque-power sweet spot', 'They control spark timing', 'They clean the exhaust gases'], correctAnswer: 'They keep the engine in its torque-power sweet spot' }
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
      ,
      [
        { text: 'What is the main purpose of Toyota’s Dynamic Force engines?', options: ['Increase vehicle weight', 'Improve performance, fuel economy, and durability', 'Replace hybrid systems', 'Simplify maintenance'], correctAnswer: 'Improve performance, fuel economy, and durability' },
      
        { text: 'The Dynamic Force engine was designed for which platform?', options: ['TNGA - Toyota New Global Architecture', 'THS - Toyota Hybrid System', 'TRD - Toyota Racing Division', 'TSS - Toyota Safety Sense'], correctAnswer: 'TNGA - Toyota New Global Architecture' },
      
        { text: 'What is the role of Dynamic Force engines in TNGA vehicles?', options: ['Provide all-wheel drive capability', 'Enhance fun-to-drive characteristics', 'Reduce weight only', 'Enable autonomous driving'], correctAnswer: 'Enhance fun-to-drive characteristics' },
      
        { text: 'What material is used for the Dynamic Force engine block?', options: ['Cast iron', 'Cast aluminum', 'Magnesium alloy', 'Carbon fiber'], correctAnswer: 'Cast aluminum' },
      
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
      
        { text: 'What is the main function of the valvetrain?', options: ['Control ignition timing', 'Regulate intake and exhaust valve movement', 'Lubricate engine parts', 'Control engine cooling'], correctAnswer: 'Regulate intake and exhaust valve movement' },
      
        { text: 'Which component opens and closes the engine valves?', options: ['Crankshaft', 'Camshaft', 'Timing belt', 'Throttle body'], correctAnswer: 'Camshaft' },
      
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
      
        { text: "What is the function of the power split device in the Toyota Hybrid System?", options: ["Divides energy between electrical generation and driving", "Controls air-fuel ratio", "Increases turbo pressure", "Manages braking power"], correctAnswer: "Divides energy between electrical generation and driving" },
      
        { text: "Where is the power split device located in a Toyota hybrid?", options: ["Inside the transmission", "In the exhaust system", "Next to the cooling unit", "In the fuel tank"], correctAnswer: "Inside the transmission" },
      
        { text: "What is the main role of the generator in the hybrid system?", options: ["Generate electricity using engine rotation", "Boost the intake air", "Lubricate engine parts", "Control fuel injection"], correctAnswer: "Generate electricity using engine rotation" },
      
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
      
        { text: "How is energy recovered during deceleration?", options: ["Tire rotation drives the motor to generate electricity", "Engine generates excess power", "Excess fuel is stored", "Motor shuts off"], correctAnswer: "Tire rotation drives the motor to generate electricity" },
      
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
      { id: 'gKyecFOnFVI', title: 'Video 1' },
      { id: 'yuH35ottILU', title: 'Video 2' },
      { id: 'JQcagDtvkJw', title: 'Video 3' },
      { id: 'rnAwVnbmm6A', title: 'Video 4' },
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
    videos: [], // No videos yet
    quizzes: []
  }
];
