import Link from 'next/link';
import type { LessonDefinition } from '@/lib/content/lessons';

export default function ProgressClient({
  initial,
  lesson,
}: {
  initial: number;
  lesson: LessonDefinition;
}) {
  const activities = [
    `Vocabulary: ${lesson.vocabulary.length} useful words`,
    `Grammar: ${lesson.grammar.title}`,
    'Translation practice',
    `Reading: ${lesson.story.title}`,
    'Lesson complete',
  ];
  const action = initial === 0
    ? `Start Lesson ${lesson.number}`
    : initial === 100
      ? `Review Lesson ${lesson.number}`
      : `Continue Lesson ${lesson.number}`;

  return (
    <div className="card">
      <div className="card-heading-row">
        <div><p className="tiny eyebrow">TODAY&apos;S LESSON</p><h2>{lesson.title}</h2></div>
        <span className="lesson-number">{String(lesson.number).padStart(2, '0')}</span>
      </div>
      <p>{lesson.description}</p>
      <div className="progress"><span style={{ width: `${initial}%` }} /></div>
      <p className="tiny">{initial}% complete</p>
      {activities.map((activity, index) => (
        <div className="lesson-row" key={activity}>
          <span>{index * 20 < initial || initial === 100 ? '✓' : '○'} {activity}</span>
          <span className="tiny">{index === 0 ? '4 min' : index === 4 ? 'Done' : '5 min'}</span>
        </div>
      ))}
      <Link className="button dashboard-lesson-button" href={`/lesson/${lesson.id}`}>{action}</Link>
    </div>
  );
}
