export type VocabularyItem = {
  id: string;
  tagalog: string;
  english: string;
  example: string;
  exampleEnglish: string;
};

export const vocabulary: VocabularyItem[] = [
  { id: 'gumising', tagalog: 'gumising', english: 'to wake up', example: 'Maaga akong gumising.', exampleEnglish: 'I woke up early.' },
  { id: 'kumain', tagalog: 'kumain', english: 'to eat / ate', example: 'Kumain na ako.', exampleEnglish: 'I already ate.' },
  { id: 'nagtrabaho', tagalog: 'nagtrabaho', english: 'worked', example: 'Nagtrabaho ako buong araw.', exampleEnglish: 'I worked all day.' },
  { id: 'umuwi', tagalog: 'umuwi', english: 'to go home / went home', example: 'Umuwi ako nang alas-sais.', exampleEnglish: 'I went home at six.' },
  { id: 'pagod', tagalog: 'pagod', english: 'tired', example: 'Pagod ako ngayon.', exampleEnglish: 'I am tired now.' },
  { id: 'mamaya', tagalog: 'mamaya', english: 'later', example: 'Magluluto ako mamaya.', exampleEnglish: 'I will cook later.' },
  { id: 'ngayon', tagalog: 'ngayon', english: 'now / today', example: 'Abala ako ngayon.', exampleEnglish: 'I am busy now.' },
  { id: 'kahapon', tagalog: 'kahapon', english: 'yesterday', example: 'Naglakad kami kahapon.', exampleEnglish: 'We walked yesterday.' },
  { id: 'bukas', tagalog: 'bukas', english: 'tomorrow', example: 'Magkikita tayo bukas.', exampleEnglish: 'We will see each other tomorrow.' },
  { id: 'masaya', tagalog: 'masaya', english: 'happy', example: 'Masaya ako para sa iyo.', exampleEnglish: 'I am happy for you.' },
  { id: 'bahay', tagalog: 'bahay', english: 'house / home', example: 'Tahimik ang bahay.', exampleEnglish: 'The house is quiet.' },
  { id: 'palengke', tagalog: 'palengke', english: 'public market', example: 'Pupunta ako sa palengke.', exampleEnglish: 'I am going to the market.' },
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
