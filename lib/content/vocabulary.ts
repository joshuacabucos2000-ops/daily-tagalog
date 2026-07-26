import { monthOneVocabulary } from './month-one';

export type VocabularyItem = {
  id: string;
  lessonId: string;
  tagalog: string;
  english: string;
  example: string;
  exampleEnglish: string;
};

export const vocabulary: VocabularyItem[] = [
  { id: 'gumising', lessonId: 'lesson-1', tagalog: 'gumising', english: 'to wake up', example: 'Maaga akong gumising.', exampleEnglish: 'I woke up early.' },
  { id: 'kumain', lessonId: 'lesson-1', tagalog: 'kumain', english: 'to eat / ate', example: 'Kumain na ako.', exampleEnglish: 'I already ate.' },
  { id: 'nagtrabaho', lessonId: 'lesson-1', tagalog: 'nagtrabaho', english: 'worked', example: 'Nagtrabaho ako buong araw.', exampleEnglish: 'I worked all day.' },
  { id: 'umuwi', lessonId: 'lesson-1', tagalog: 'umuwi', english: 'to go home / went home', example: 'Umuwi ako nang alas-sais.', exampleEnglish: 'I went home at six.' },
  { id: 'pagod', lessonId: 'lesson-1', tagalog: 'pagod', english: 'tired', example: 'Pagod ako ngayon.', exampleEnglish: 'I am tired now.' },
  { id: 'mamaya', lessonId: 'lesson-1', tagalog: 'mamaya', english: 'later', example: 'Magluluto ako mamaya.', exampleEnglish: 'I will cook later.' },
  { id: 'pangalan', lessonId: 'lesson-2', tagalog: 'pangalan', english: 'name', example: 'Ang pangalan ko ay Mia.', exampleEnglish: 'My name is Mia.' },
  { id: 'kumusta', lessonId: 'lesson-2', tagalog: 'kumusta', english: 'how are you?', example: 'Kumusta ka?', exampleEnglish: 'How are you?' },
  { id: 'taga-saan', lessonId: 'lesson-2', tagalog: 'taga-saan', english: 'from where?', example: 'Taga-saan ka?', exampleEnglish: 'Where are you from?' },
  { id: 'nakatira', lessonId: 'lesson-2', tagalog: 'nakatira', english: 'living / residing', example: 'Nakatira ako sa Brisbane.', exampleEnglish: 'I live in Brisbane.' },
  { id: 'trabaho', lessonId: 'lesson-2', tagalog: 'trabaho', english: 'work / job', example: 'Ano ang trabaho mo?', exampleEnglish: 'What is your job?' },
  { id: 'kaibigan', lessonId: 'lesson-2', tagalog: 'kaibigan', english: 'friend', example: 'Kaibigan ko si Ana.', exampleEnglish: 'Ana is my friend.' },
  { id: 'pagkain', lessonId: 'lesson-3', tagalog: 'pagkain', english: 'food', example: 'Masarap ang pagkain.', exampleEnglish: 'The food is delicious.' },
  { id: 'inumin', lessonId: 'lesson-3', tagalog: 'inumin', english: 'drink / beverage', example: 'Ano ang gusto mong inumin?', exampleEnglish: 'What would you like to drink?' },
  { id: 'kanin', lessonId: 'lesson-3', tagalog: 'kanin', english: 'cooked rice', example: 'Oorder po ako ng kanin.', exampleEnglish: 'I will order rice.' },
  { id: 'tubig', lessonId: 'lesson-3', tagalog: 'tubig', english: 'water', example: 'Pahingi po ng tubig.', exampleEnglish: 'May I have some water, please?' },
  { id: 'masarap', lessonId: 'lesson-3', tagalog: 'masarap', english: 'delicious', example: 'Masarap ang adobo.', exampleEnglish: 'The adobo is delicious.' },
  { id: 'bayad', lessonId: 'lesson-3', tagalog: 'bayad', english: 'payment / bill', example: 'Pahingi po ng bill.', exampleEnglish: 'May I have the bill, please?' },
  ...monthOneVocabulary,
];

export const listeningPrompts = [
  {
    id: 'listening-1',
    spoken: 'Kumain na ako.',
    question: 'What did you hear?',
    options: ['I already ate.', 'I am still eating.', 'I will eat tomorrow.'],
    answer: 0,
  },
  {
    id: 'listening-2',
    spoken: 'Pagod ako ngayon.',
    question: 'How does the speaker feel?',
    options: ['Happy', 'Tired', 'Hungry'],
    answer: 1,
  },
  {
    id: 'listening-3',
    spoken: 'Pupunta ako sa palengke mamaya.',
    question: 'Where will the speaker go later?',
    options: ['Home', 'Work', 'The market'],
    answer: 2,
  },
];

export const readingPractice = {
  title: 'Isang Abalang Araw',
  text: 'Maagang gumising si Leo ngayon. Kumain na siya ng pandesal, pero hindi pa siya umiinom ng kape. Nagtatrabaho siya sa bahay hanggang alas-singko. Mamaya, pupunta siya sa palengke at bibili ng gulay. Pagod siya, pero masaya.',
  translation: 'Leo woke up early today. He has already eaten pandesal, but he has not had coffee yet. He is working at home until five. Later, he will go to the market and buy vegetables. He is tired, but happy.',
  questions: [
    {
      prompt: 'Ano ang hindi pa ginagawa ni Leo?',
      hint: 'What has Leo not done yet?',
      options: ['Uminom ng kape', 'Kumain ng pandesal', 'Gumising'],
      answer: 0,
    },
    {
      prompt: 'Saan pupunta si Leo mamaya?',
      hint: 'Where will Leo go later?',
      options: ['Sa trabaho', 'Sa palengke', 'Sa paaralan'],
      answer: 1,
    },
  ],
};
