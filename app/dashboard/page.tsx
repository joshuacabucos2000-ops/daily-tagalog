import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProgressClient from '@/components/ProgressClient';
import { vocabulary } from '@/lib/content/vocabulary';
import { lessons } from '@/lib/content/lessons';
import MonthlyProgressCalendar from '@/components/MonthlyProgressCalendar';
import AppMenu from '@/components/AppMenu';

type Activity = {
  activity_date: string;
  vocabulary_reviews: number;
  listening_correct: number;
  listening_total: number;
  reading_correct: number;
  reading_total: number;
};

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function calculateStreak(activities: Activity[]) {
  const activeDates = new Set(activities.map(activity => activity.activity_date));
  const cursor = new Date();
  if (!activeDates.has(dateKey(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let streak = 0;
  while (activeDates.has(dateKey(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [progressResult, reviewsResult, activitiesResult] = await Promise.all([
    supabase.from('progress').select('lesson_id,percent_complete,updated_at'),
    supabase.from('vocabulary_reviews').select('vocabulary_id,due_at'),
    supabase.from('daily_activity').select('activity_date,vocabulary_reviews,listening_correct,listening_total,reading_correct,reading_total').order('activity_date', { ascending: false }).limit(35),
  ]);
  const progressByLesson = new Map(
    (progressResult.data ?? []).map(progress => [progress.lesson_id, progress.percent_complete]),
  );
  const reviews = reviewsResult.data ?? [];
  const activities = (activitiesResult.data ?? []) as Activity[];
  const reviewedIds = new Set(reviews.map(review => review.vocabulary_id));
  const unlockedLessonIds = new Set([
    'lesson-1',
    ...(progressResult.data ?? [])
      .filter(progress => progress.percent_complete > 0)
      .map(progress => progress.lesson_id),
  ]);
  const overdue = reviews.filter(review => new Date(review.due_at) <= new Date()).length;
  const newWords = vocabulary.filter(word =>
    unlockedLessonIds.has(word.lessonId) && !reviewedIds.has(word.id),
  ).length;
  const dueCount = Math.min(8, overdue + newWords);
  const today = activities.find(activity => activity.activity_date === dateKey(new Date()));
  const streak = calculateStreak(activities);
  const calendarDates = Array.from(new Set([
    ...activities.map(activity => activity.activity_date),
    ...(progressResult.data ?? []).map(progress => dateKey(new Date(progress.updated_at))),
  ]));
  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'Learner';

  async function signOut() {
    'use server';
    const client = await createClient();
    await client.auth.signOut();
    redirect('/');
  }

  return (
    <main className="shell">
      <nav className="nav"><div className="nav-start"><AppMenu /><Link className="brand" href="/dashboard">Daily Tagalog</Link></div><form action={signOut}><button className="button secondary">Sign out</button></form></nav>
      <div className="dash-head">
        <div><p className="tiny eyebrow">MAGANDANG ARAW</p><h1>Welcome, {username}!</h1><p>A little practice today keeps yesterday’s Tagalog within reach.</p></div>
        <div className="card streak-card"><strong>🔥 {streak} {streak === 1 ? 'day' : 'days'}</strong><div className="tiny">Current streak</div></div>
      </div>

      <section className="daily-practice-card card">
        <div>
          <p className="tiny eyebrow">YOUR DAILY PRACTICE</p>
          <h2>{today ? 'Today’s practice is complete' : `${dueCount} words ready to review`}</h2>
          <p>{today ? 'Come back tomorrow for the next review, or practise again now.' : 'A focused session of vocabulary, listening, and reading. About 10–15 minutes.'}</p>
        </div>
        <div className="daily-skill-list">
          <span><strong>{dueCount}</strong> due words</span>
          <span><strong>3</strong> listening checks</span>
          <span><strong>1</strong> short reading</span>
        </div>
        <Link className="button daily-start" href="/practice">{today ? 'Practise again' : 'Start daily practice'}</Link>
      </section>

      <div className="dashboard-grid">
        <section id="lessons">
          <div className="course-heading">
            <div><p className="tiny eyebrow">BEGINNER COURSE</p><h2>Your lessons</h2></div>
            <span className="tiny">{lessons.filter(lesson => progressByLesson.get(lesson.id) === 100).length} of {lessons.length} complete</span>
          </div>
          <div className="course-list">
            {lessons.map(lesson => (
              <ProgressClient
                compact
                initial={progressByLesson.get(lesson.id) ?? 0}
                lesson={lesson}
                key={lesson.id}
              />
            ))}
          </div>
        </section>
        <aside className="card">
          <h3>Today</h3>
          {today ? (
            <>
              <p><strong>{today.vocabulary_reviews}</strong> words reviewed</p>
              <p><strong>{today.listening_correct}/{today.listening_total}</strong> listening</p>
              <p><strong>{today.reading_correct}/{today.reading_total}</strong> reading</p>
            </>
          ) : <p className="tiny">No practice recorded yet. Your daily session is ready when you are.</p>}
          <hr/>
          <MonthlyProgressCalendar activityDates={calendarDates} now={new Date().toISOString()} />
          <hr/>
          <h3>Phrase of the day</h3>
          <p><strong>Kumusta ang araw mo?</strong></p>
          <p className="tiny">How is your day?</p>
          <div className="phrase-answer">Pagod na ako, pero okay lang.</div>
        </aside>
      </div>
    </main>
  );
}
