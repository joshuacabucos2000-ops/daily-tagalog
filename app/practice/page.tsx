import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PracticeClient, { type StoredReview } from './PracticeClient';

export default async function PracticePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [reviewsResult, progressResult] = await Promise.all([
    supabase
      .from('vocabulary_reviews')
      .select('vocabulary_id,interval_days,ease_factor,review_count,lapse_count,due_at,last_reviewed_at'),
    supabase
      .from('progress')
      .select('lesson_id,percent_complete')
      .gt('percent_complete', 0),
  ]);
  const unlockedLessonIds = new Set([
    'lesson-1',
    ...(progressResult.data ?? []).map(progress => progress.lesson_id),
  ]);

  return (
    <PracticeClient
      initialReviews={(reviewsResult.data ?? []) as StoredReview[]}
      unlockedLessonIds={[...unlockedLessonIds]}
      sessionStartedAt={new Date().toISOString()}
    />
  );
}
