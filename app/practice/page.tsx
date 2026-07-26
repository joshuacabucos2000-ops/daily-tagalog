import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PracticeClient, { type StoredReview } from './PracticeClient';

export default async function PracticePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data } = await supabase
    .from('vocabulary_reviews')
    .select('vocabulary_id,interval_days,ease_factor,review_count,lapse_count,due_at,last_reviewed_at');

  return (
    <PracticeClient
      initialReviews={(data ?? []) as StoredReview[]}
      sessionStartedAt={new Date().toISOString()}
    />
  );
}
