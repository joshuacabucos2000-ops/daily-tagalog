import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import LessonClient from './LessonClient';

export default async function LessonOnePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data } = await supabase
    .from('progress')
    .select('percent_complete')
    .eq('lesson_id', 'lesson-1')
    .maybeSingle();

  return <LessonClient initialProgress={data?.percent_complete ?? 0} />;
}
