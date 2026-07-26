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
    vocabulary: vocabulary.slice(0, 6),
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
];

export function getLesson(lessonId: string) {
  return lessons.find(lesson => lesson.id === lessonId);
}
