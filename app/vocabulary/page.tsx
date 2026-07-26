import Link from 'next/link';
import { redirect } from 'next/navigation';
import AppMenu from '@/components/AppMenu';
import { lessons } from '@/lib/content/lessons';
import { vocabulary } from '@/lib/content/vocabulary';
import { createClient } from '@/lib/supabase/server';

export default async function VocabularyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [progressResult, reviewsResult] = await Promise.all([
    supabase.from('progress').select('lesson_id,percent_complete').gt('percent_complete', 0),
    supabase.from('vocabulary_reviews').select('vocabulary_id'),
  ]);
  const startedLessons = new Set((progressResult.data ?? []).map(item => item.lesson_id));
  const reviewedWords = new Set((reviewsResult.data ?? []).map(item => item.vocabulary_id));
  const learnedWords = vocabulary.filter(word =>
    startedLessons.has(word.lessonId) || reviewedWords.has(word.id),
  );
  const lessonNames = new Map(lessons.map(lesson => [lesson.id, `Lesson ${lesson.number}: ${lesson.title}`]));

  return (
    <main className="shell library-shell">
      <nav className="nav">
        <div className="nav-start"><AppMenu /><Link className="brand" href="/dashboard">Daily Tagalog</Link></div>
        <Link className="button secondary" href="/dashboard">Back to dashboard</Link>
      </nav>
      <header className="library-heading">
        <p className="tiny eyebrow">YOUR TAGALOG</p>
        <h1>Vocabulary bank</h1>
        <p>Every word from a lesson you have started, with its translation and an example in context.</p>
        <div className="pill soft">{learnedWords.length} {learnedWords.length === 1 ? 'word' : 'words'} learned</div>
      </header>

      {learnedWords.length ? (
        <div className="vocabulary-list">
          {learnedWords.map(word => (
            <article className="vocabulary-row card" key={word.id}>
              <div>
                <span className="tiny">{lessonNames.get(word.lessonId)}</span>
                <h2>{word.tagalog}</h2>
                <strong>{word.english}</strong>
              </div>
              <div className="bank-example">
                <p>{word.example}</p>
                <span>{word.exampleEnglish}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="card empty-library">
          <div>🌱</div>
          <h2>Your vocabulary bank is ready to grow.</h2>
          <p>Start Lesson 1 to add your first six words.</p>
          <Link className="button" href="/lesson/lesson-1">Start Lesson 1</Link>
        </section>
      )}
    </main>
  );
}
