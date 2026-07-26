'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  listeningPrompts,
  readingPractice,
  vocabulary,
  type VocabularyItem,
} from '@/lib/content/vocabulary';
import { scheduleReview, type ReviewRating } from '@/lib/spaced-repetition';

export type StoredReview = {
  vocabulary_id: string;
  interval_days: number;
  ease_factor: number;
  review_count: number;
  lapse_count: number;
  due_at: string;
  last_reviewed_at: string | null;
};

type SessionStage = 'review' | 'listening' | 'reading' | 'complete';

const reviewLabels: Record<ReviewRating, { label: string; hint: string }> = {
  again: { label: 'Again', hint: 'Tomorrow' },
  hard: { label: 'Hard', hint: 'Soon' },
  good: { label: 'Good', hint: 'Later' },
  easy: { label: 'Easy', hint: 'Much later' },
};

function speak(text: string, rate = 0.82) {
  if (!('speechSynthesis' in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fil-PH';
  utterance.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const filipinoVoice = voices.find(voice =>
    /^(fil|tl)(-|_)/i.test(voice.lang),
  );
  if (filipinoVoice) utterance.voice = filipinoVoice;
  window.speechSynthesis.speak(utterance);
  return true;
}

function localDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export default function PracticeClient({
  initialReviews,
  unlockedLessonIds,
  sessionStartedAt,
}: {
  initialReviews: StoredReview[];
  unlockedLessonIds: string[];
  sessionStartedAt: string;
}) {
  const reviewMap = useMemo(
    () => new Map(initialReviews.map(review => [review.vocabulary_id, review])),
    [initialReviews],
  );
  const queue = useMemo(() => {
    const now = new Date(sessionStartedAt).getTime();
    const availableVocabulary = vocabulary.filter(item =>
      unlockedLessonIds.includes(item.lessonId),
    );
    const due = availableVocabulary.filter(item => {
      const review = reviewMap.get(item.id);
      return review && new Date(review.due_at).getTime() <= now;
    });
    const fresh = availableVocabulary.filter(item => !reviewMap.has(item.id));
    return [...due, ...fresh].slice(0, 8);
  }, [reviewMap, sessionStartedAt, unlockedLessonIds]);

  const [stage, setStage] = useState<SessionStage>(queue.length ? 'review' : 'listening');
  const [reviewIndex, setReviewIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [listeningAnswers, setListeningAnswers] = useState<number[]>([]);
  const [readingAnswers, setReadingAnswers] = useState<number[]>([]);
  const [listeningIndex, setListeningIndex] = useState(0);

  const currentWord: VocabularyItem | undefined = queue[reviewIndex];
  const listeningCorrect = listeningAnswers.reduce(
    (total, answer, index) => total + (answer === listeningPrompts[index].answer ? 1 : 0),
    0,
  );
  const readingCorrect = readingAnswers.reduce(
    (total, answer, index) => total + (answer === readingPractice.questions[index].answer ? 1 : 0),
    0,
  );

  async function rateWord(rating: ReviewRating) {
    if (!currentWord) return;
    setSaving(true);
    setMessage('');
    const existing = reviewMap.get(currentWord.id);
    const next = scheduleReview({
      intervalDays: existing?.interval_days ?? 0,
      easeFactor: existing?.ease_factor ?? 2.5,
      reviewCount: existing?.review_count ?? 0,
      lapseCount: existing?.lapse_count ?? 0,
    }, rating);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('Your session expired. Please sign in again.');
      setSaving(false);
      return;
    }
    const { error } = await supabase.from('vocabulary_reviews').upsert({
      user_id: user.id,
      vocabulary_id: currentWord.id,
      interval_days: next.intervalDays,
      ease_factor: next.easeFactor,
      review_count: next.reviewCount,
      lapse_count: next.lapseCount,
      due_at: next.dueAt,
      last_reviewed_at: new Date().toISOString(),
    });
    if (error) {
      setMessage('Your review could not be saved. Make sure the latest database setup has been applied.');
      setSaving(false);
      return;
    }
    const isLast = reviewIndex >= queue.length - 1;
    setReviewIndex(index => index + 1);
    setRevealed(false);
    setSaving(false);
    if (isLast) setStage('listening');
  }

  function answerListening(answer: number) {
    const next = [...listeningAnswers];
    next[listeningIndex] = answer;
    setListeningAnswers(next);
  }

  async function finishSession() {
    setSaving(true);
    setMessage('');
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('Your session expired. Please sign in again.');
      setSaving(false);
      return;
    }
    const { error } = await supabase.from('daily_activity').upsert({
      user_id: user.id,
      activity_date: localDate(),
      vocabulary_reviews: queue.length,
      listening_correct: listeningCorrect,
      listening_total: listeningPrompts.length,
      reading_correct: readingCorrect,
      reading_total: readingPractice.questions.length,
      completed_at: new Date().toISOString(),
    });
    if (error) {
      setMessage('Today’s session could not be saved. Make sure the latest database setup has been applied.');
      setSaving(false);
      return;
    }
    setSaving(false);
    setStage('complete');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="shell practice-shell">
      <nav className="nav">
        <Link className="brand" href="/dashboard">Daily Tagalog</Link>
        <Link className="button secondary" href="/dashboard">Exit practice</Link>
      </nav>

      <header className="practice-heading">
        <div>
          <p className="tiny eyebrow">DAILY PRACTICE · 10–15 MIN</p>
          <h1>Build what you remember.</h1>
          <p>Review due words, listen without reading, then understand a short story.</p>
        </div>
        <div className="practice-steps" aria-label="Session progress">
          {(['review', 'listening', 'reading'] as const).map((item, index) => (
            <span key={item} className={stage === item ? 'active' : ''}>
              {index + 1} · {item}
            </span>
          ))}
        </div>
      </header>

      {stage === 'review' && currentWord && (
        <section className="practice-card card">
          <div className="practice-meta">
            <span className="pill soft">Vocabulary review</span>
            <span className="tiny">{reviewIndex + 1} of {queue.length}</span>
          </div>
          <div className="review-word">
            <p className="tiny eyebrow">WHAT DOES THIS MEAN?</p>
            <h2>{currentWord.tagalog}</h2>
            <button className="audio-button" onClick={() => speak(currentWord.tagalog)} aria-label={`Listen to ${currentWord.tagalog}`}>▶ Listen</button>
          </div>
          {!revealed ? (
            <button className="button reveal-button" onClick={() => setRevealed(true)}>Reveal answer</button>
          ) : (
            <>
              <div className="review-answer">
                <strong>{currentWord.english}</strong>
                <p>{currentWord.example}</p>
                <span>{currentWord.exampleEnglish}</span>
              </div>
              <p className="rating-prompt">How well did you remember it?</p>
              <div className="rating-grid">
                {(Object.keys(reviewLabels) as ReviewRating[]).map(rating => (
                  <button key={rating} className={`rating-button ${rating}`} disabled={saving} onClick={() => rateWord(rating)}>
                    <strong>{reviewLabels[rating].label}</strong>
                    <span>{reviewLabels[rating].hint}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      {stage === 'listening' && (
        <section className="practice-card card">
          <div className="practice-meta">
            <span className="pill soft">Listening</span>
            <span className="tiny">{listeningIndex + 1} of {listeningPrompts.length}</span>
          </div>
          <div className="listening-prompt">
            <div className="headphones">🎧</div>
            <h2>Listen before you read.</h2>
            <p>Play the sentence as many times as you need.</p>
            <button className="button audio-primary" onClick={() => speak(listeningPrompts[listeningIndex].spoken)}>▶ Play Tagalog</button>
            <button className="audio-button" onClick={() => speak(listeningPrompts[listeningIndex].spoken, 0.65)}>Play slowly</button>
          </div>
          <fieldset className="choice-list">
            <legend>{listeningPrompts[listeningIndex].question}</legend>
            {listeningPrompts[listeningIndex].options.map((option, index) => (
              <label key={option} className={listeningAnswers[listeningIndex] === index ? 'choice selected' : 'choice'}>
                <input type="radio" name={`listening-${listeningIndex}`} checked={listeningAnswers[listeningIndex] === index} onChange={() => answerListening(index)} />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
          <div className="lesson-actions">
            <span className="tiny">Audio uses the Filipino voice available on your device.</span>
            <button className="button" disabled={listeningAnswers[listeningIndex] === undefined} onClick={() => {
              if (listeningIndex === listeningPrompts.length - 1) setStage('reading');
              else setListeningIndex(index => index + 1);
            }}>{listeningIndex === listeningPrompts.length - 1 ? 'Continue to reading' : 'Next sentence'}</button>
          </div>
        </section>
      )}

      {stage === 'reading' && (
        <section className="practice-card card">
          <div className="practice-meta">
            <span className="pill soft">Reading</span>
            <span className="tiny">Final activity</span>
          </div>
          <h2>{readingPractice.title}</h2>
          <div className="story"><p>{readingPractice.text}</p></div>
          <details><summary>Need help? Show English</summary><p>{readingPractice.translation}</p></details>
          <div className="reading-questions">
            {readingPractice.questions.map((question, questionIndex) => (
              <fieldset className="choice-list" key={question.prompt}>
                <legend>{question.prompt}<small>{question.hint}</small></legend>
                {question.options.map((option, optionIndex) => (
                  <label key={option} className={readingAnswers[questionIndex] === optionIndex ? 'choice selected' : 'choice'}>
                    <input type="radio" name={`reading-${questionIndex}`} checked={readingAnswers[questionIndex] === optionIndex} onChange={() => {
                      const next = [...readingAnswers];
                      next[questionIndex] = optionIndex;
                      setReadingAnswers(next);
                    }} />
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
            ))}
          </div>
          <div className="lesson-actions">
            <span className="tiny">Your results will be saved to today’s activity.</span>
            <button className="button" disabled={readingPractice.questions.some((_, index) => readingAnswers[index] === undefined) || saving} onClick={finishSession}>{saving ? 'Saving…' : 'Finish daily practice'}</button>
          </div>
        </section>
      )}

      {stage === 'complete' && (
        <section className="card completion-card">
          <div className="completion-icon">🌱</div>
          <p className="tiny eyebrow">TODAY&apos;S PRACTICE COMPLETE</p>
          <h2>Magaling!</h2>
          <p>You strengthened your memory, listening, and reading today.</p>
          <div className="completion-stats">
            <div><strong>{queue.length}</strong><span>words reviewed</span></div>
            <div><strong>{listeningCorrect}/{listeningPrompts.length}</strong><span>listening</span></div>
            <div><strong>{readingCorrect}/{readingPractice.questions.length}</strong><span>reading</span></div>
          </div>
          <div className="lesson-actions centered">
            <Link className="button" href="/dashboard">Return to dashboard</Link>
          </div>
        </section>
      )}

      {message && <p className="error save-message" role="alert">{message}</p>}
    </main>
  );
}
