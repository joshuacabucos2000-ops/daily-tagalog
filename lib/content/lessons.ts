import { vocabulary, type VocabularyItem } from './vocabulary';

export type LessonQuestion = {
  prompt: string;
  answers: string[];
  explanation: string;
};

export type LessonDefinition = {
  id: string;
  number: number;
  category: string;
  title: string;
  description: string;
  vocabularyHeading: string;
  vocabulary: VocabularyItem[];
  grammar: {
    title: string;
    concepts: Array<{
      label: string;
      title: string;
      description: string;
      examples: Array<{ tagalog: string; english: string }>;
    }>;
    tip: string;
  };
  questions: [LessonQuestion, LessonQuestion, LessonQuestion];
  story: {
    title: string;
    tagalog: string;
    english: string;
  };
  speaking: {
    prompt: string;
    instruction: string;
    example: string;
    exampleEnglish: string;
  };
};

export const lessons: LessonDefinition[] = [
  {
    id: 'lesson-1',
    number: 1,
    category: 'Everyday conversation',
    title: 'Talking about your day',
    description: 'Learn useful daily verbs, understand na and pa, then practise a short conversation.',
    vocabularyHeading: 'Six words for describing your day',
    vocabulary: vocabulary.filter(word => word.lessonId === 'lesson-1'),
    grammar: {
      title: 'Na versus pa',
      concepts: [
        {
          label: 'NA',
          title: 'Already / now',
          description: 'Use na when something has happened, changed, or is now true.',
          examples: [
            { tagalog: 'Kumain na ako.', english: 'I already ate.' },
            { tagalog: 'Pagod na ako.', english: 'I am tired now.' },
          ],
        },
        {
          label: 'PA',
          title: 'Still / yet',
          description: 'Use pa when something is continuing or has not happened yet.',
          examples: [
            { tagalog: 'Nagtatrabaho pa ako.', english: 'I am still working.' },
            { tagalog: 'Hindi pa ako umuuwi.', english: 'I have not gone home yet.' },
          ],
        },
      ],
      tip: 'Hindi pa = not yet. Wala pa = there is none yet / not yet available.',
    },
    questions: [
      {
        prompt: 'I already ate.',
        answers: ['kumain na ako', 'kumain na po ako'],
        explanation: 'Use “na” for something that has already happened.',
      },
      {
        prompt: 'I am still working.',
        answers: ['nagtatrabaho pa ako', 'nagtratrabaho pa ako'],
        explanation: 'Use “pa” when an action or state is still continuing.',
      },
      {
        prompt: "I haven't gone home yet.",
        answers: ['hindi pa ako umuuwi', 'di pa ako umuuwi'],
        explanation: '“Hindi pa” means “not yet.”',
      },
    ],
    story: {
      title: 'Ang Umaga ni Ana',
      tagalog: 'Maagang gumising si Ana. Kumain na siya ng pandesal at uminom ng kape. Nagtatrabaho pa ang kapatid niya, kaya tahimik ang bahay. Mamaya, aalis si Ana at pupunta sa palengke. Medyo pagod siya, pero masaya siya.',
      english: 'Ana woke up early. She has already eaten pandesal and drunk coffee. Her sibling is still working, so the house is quiet. Later, Ana will leave and go to the market. She is a little tired, but she is happy.',
    },
    speaking: {
      prompt: 'Kumusta ang araw mo?',
      instruction: 'Answer aloud using at least one lesson word and either na or pa.',
      example: 'Pagod na ako, pero nagtatrabaho pa ako.',
      exampleEnglish: 'I am tired now, but I am still working.',
    },
  },
  {
    id: 'lesson-2',
    number: 2,
    category: 'Meeting people',
    title: 'Introducing yourself',
    description: 'Share your name, where you are from, where you live, and a little about your life.',
    vocabularyHeading: 'Six essentials for meeting someone',
    vocabulary: vocabulary.filter(word => word.lessonId === 'lesson-2'),
    grammar: {
      title: 'Ako versus ko',
      concepts: [
        {
          label: 'AKO',
          title: 'I / me',
          description: 'Use ako when you are the person being described or doing the action.',
          examples: [
            { tagalog: 'Ako si Mia.', english: 'I am Mia.' },
            { tagalog: 'Taga-Australia ako.', english: 'I am from Australia.' },
          ],
        },
        {
          label: 'KO',
          title: 'My / by me',
          description: 'Use ko to show that something belongs or relates to you.',
          examples: [
            { tagalog: 'Ang pangalan ko ay Mia.', english: 'My name is Mia.' },
            { tagalog: 'Kaibigan ko si Ana.', english: 'Ana is my friend.' },
          ],
        },
      ],
      tip: 'Ako identifies you. Ko connects something to you: pangalan ko, kaibigan ko, trabaho ko.',
    },
    questions: [
      {
        prompt: 'My name is Mia.',
        answers: ['ang pangalan ko ay mia', 'pangalan ko ay mia', 'ako si mia'],
        explanation: 'Both “Ang pangalan ko ay…” and “Ako si…” are natural introductions.',
      },
      {
        prompt: 'I live in Brisbane.',
        answers: ['nakatira ako sa brisbane'],
        explanation: 'Use “nakatira ako sa” before the place where you live.',
      },
      {
        prompt: 'Ana is my friend.',
        answers: ['kaibigan ko si ana', 'si ana ay kaibigan ko'],
        explanation: '“Kaibigan ko” means “my friend.”',
      },
    ],
    story: {
      title: 'Bagong Kakilala',
      tagalog: 'Ako si Maya. Taga-Cebu ako, pero nakatira ako ngayon sa Maynila. Guro ako. Kaibigan ko si Lito. Madalas kaming magkape pagkatapos ng trabaho.',
      english: 'I am Maya. I am from Cebu, but I now live in Manila. I am a teacher. Lito is my friend. We often have coffee after work.',
    },
    speaking: {
      prompt: 'Kumusta? Ano ang pangalan mo?',
      instruction: 'Introduce yourself with your name, where you are from, and where you live.',
      example: 'Ako si Mia. Taga-Australia ako at nakatira ako sa Brisbane.',
      exampleEnglish: 'I am Mia. I am from Australia and I live in Brisbane.',
    },
  },
  {
    id: 'lesson-3',
    number: 3,
    category: 'At a restaurant',
    title: 'Ordering food politely',
    description: 'Order a meal and drink, respond to a server, and ask for the bill politely.',
    vocabularyHeading: 'Six useful words at a restaurant',
    vocabulary: vocabulary.filter(word => word.lessonId === 'lesson-3'),
    grammar: {
      title: 'Polite restaurant requests',
      concepts: [
        {
          label: 'PO',
          title: 'Show respect',
          description: 'Add po to make a request or response respectful and polite.',
          examples: [
            { tagalog: 'Tubig po.', english: 'Water, please.' },
            { tagalog: 'Oorder po ako ng adobo.', english: 'I will order adobo.' },
          ],
        },
        {
          label: 'PAHINGI',
          title: 'Ask to receive something',
          description: 'Use pahingi po ng… for a polite, everyday request.',
          examples: [
            { tagalog: 'Pahingi po ng tubig.', english: 'May I have some water, please?' },
            { tagalog: 'Pahingi po ng bill.', english: 'May I have the bill, please?' },
          ],
        },
      ],
      tip: 'Use po with staff and people you do not know. “Pahingi po ng…” is a useful request pattern.',
    },
    questions: [
      {
        prompt: 'May I have some water, please?',
        answers: ['pahingi po ng tubig', 'tubig po'],
        explanation: '“Pahingi po ng…” is a polite way to request something.',
      },
      {
        prompt: 'I will order adobo and rice.',
        answers: ['oorder po ako ng adobo at kanin', 'oorder ako ng adobo at kanin'],
        explanation: 'Use “oorder ako ng…” to state what you will order.',
      },
      {
        prompt: 'The food is delicious.',
        answers: ['masarap ang pagkain', 'masarap po ang pagkain'],
        explanation: '“Masarap” describes food as delicious.',
      },
    ],
    story: {
      title: 'Sa Restawran',
      tagalog: 'Server: Magandang gabi po. Ano po ang order ninyo? Mia: Oorder po ako ng adobo at kanin. Pahingi rin po ng tubig. Server: Sige po. May iba pa po ba? Mia: Wala na po, salamat. Pagkatapos kumain, sinabi ni Mia, “Masarap ang pagkain. Pahingi po ng bill.”',
      english: 'Server: Good evening. What would you like to order? Mia: I will order adobo and rice. May I also have some water? Server: Certainly. Anything else? Mia: Nothing else, thank you. After eating, Mia said, “The food is delicious. May I have the bill?”',
    },
    speaking: {
      prompt: 'Ano po ang order ninyo?',
      instruction: 'Order one dish and one drink, then ask for the bill.',
      example: 'Oorder po ako ng adobo at kanin. Pahingi rin po ng tubig.',
      exampleEnglish: 'I will order adobo and rice. May I also have some water?',
    },
  },
];

export function getLesson(lessonId: string) {
  return lessons.find(lesson => lesson.id === lessonId);
}
