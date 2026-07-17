'use client';

import Link from 'next/link';

const activities = [
  'Vocabulary: daily activities',
  'Grammar: na vs pa',
  'Sentence building',
  'Short story and speaking prompt',
  'Lesson complete',
];

export default function ProgressClient({ initial }: { initial: number }) {
  const action = initial === 0 ? 'Start Lesson 1' : initial === 100 ? 'Review Lesson 1' : 'Continue Lesson 1';

  return (
    <div className="card">
      <div className="card-heading-row">
        <div><p className="tiny eyebrow">TODAY&apos;S LESSON</p><h2>Talking about your day</h2></div>
        <span className="lesson-number">01</span>
      </div>
      <p>Build a natural answer to <strong>“Kumusta ang araw mo?”</strong> using everyday verbs and <em>na</em> versus <em>pa</em>.</p>
      <div className="progress"><span style={{ width: `${initial}%` }} /></div>
      <p className="tiny">{initial}% complete</p>
      {activities.map((activity, index) => (
        <div className="lesson-row" key={activity}>
          <span>{index * 20 < initial || initial === 100 ? '✓' : '○'} {activity}</span>
          <span className="tiny">{index === 0 ? '4 min' : index === 4 ? 'Done' : '5 min'}</span>
        </div>
      ))}
      <Link className="button dashboard-lesson-button" href="/lesson/lesson-1">{action}</Link>
    </div>
  );
}
