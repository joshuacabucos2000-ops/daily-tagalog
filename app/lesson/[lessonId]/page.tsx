import { notFound, redirect } from 'next/navigation';
import LessonExperience from '@/components/lesson/LessonExperience';
import { getLesson } from '@/lib/content/lessons';
import { createClient } from '@/lib/supabase/server';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLesson(lessonId);
  if (!lesson) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data } = await supabase
    .from('progress')
    .select('*')
    .eq('lesson_id', lesson.id)
    .maybeSingle();

  const initialProgress = data?.percent_complete ?? 0;
  const inferredStage = initialProgress === 100 ? 4 : Math.floor(initialProgress / 25);

  return (
    <LessonExperience
      lesson={lesson}
      initialProgress={initialProgress}
      initialStage={data?.current_stage ?? inferredStage}
      initialQuizScore={data?.quiz_score ?? null}
    />
  );
}
