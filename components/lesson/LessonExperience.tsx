'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { LessonDefinition } from '@/lib/content/lessons';

type Stage = 0 | 1 | 2 | 3 | 4;

function normalise(value: string) {
  return value.toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ');
}

function speak(text: string, rate = 0.82) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fil-PH';
  utterance.rate = rate;
  const voice = window.speechSynthesis.getVoices().find(item =>
    /^(fil|tl)(-|_)/i.test(item.lang),
  );
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export default function LessonExperience({
  lesson,
  initialProgress,
  initialStage,
  initialQuizScore,
}: {
  lesson: LessonDefinition;
  initialProgress: number;
  initialStage: number;
  initialQuizScore: number | null;
}) {
  const startingStage = Math.min(4, initialStage) as Stage;
  const [stage, setStage] = useState<Stage>(startingStage);
  const [maxUnlocked, setMaxUnlocked] = useState<Stage>(startingStage);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [answers, setAnswers] = useState(['', '', '']);
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const progress = stage * 25;
  const score = useMemo(
    () => answers.reduce(
      (total, answer, index) =>
        total + (lesson.questions[index].answers.includes(normalise(answer)) ? 1 : 0),
      0,
    ),
    [answers, lesson.questions],
  );

  async function saveProgress(nextStage: Stage) {
    setSaving(true);
    setMessage('');
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('Your session has expired. Please sign in again.');
      setSaving(false);
      return false;
    }
    const { error } = await supabase.from('progress').upsert({
      user_id: user.id,
      lesson_id: lesson.id,
      percent_complete: nextStage * 25,
      current_stage: nextStage,
      quiz_score: nextStage === 4 ? score : initialQuizScore,
      completed_at: nextStage === 4 ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      setMessage('Your progress could not be saved. Make sure the latest database setup has been applied.');
      setSaving(false);
      return false;
    }
    setSaving(false);
    return true;
  }

  async function next() {
    const nextStage = Math.min(4, stage + 1) as Stage;
    if (await saveProgress(nextStage)) {
      setStage(nextStage);
      setMaxUnlocked(current => Math.max(current, nextStage) as Stage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <main className="shell lesson-shell">
      <nav className="nav">
        <Link className="brand" href="/dashboard">Daily Tagalog</Link>
        <Link className="button secondary" href="/dashboard">Back to dashboard</Link>
      </nav>

      <section className="lesson-header card">
        <div>
          <p className="tiny eyebrow">LESSON {lesson.number} · {lesson.category.toUpperCase()}</p>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
        </div>
        <div className="lesson-progress-wrap">
          <strong>{progress}%</strong>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
          <span className="tiny">Saved to your account</span>
        </div>
      </section>

      <div className="step-tabs" aria-label="Lesson sections">
        {['Vocabulary', 'Grammar', 'Practice', 'Story', 'Complete'].map((label, index) => (
          <button
            key={label}
            className={index === stage ? 'step-tab active' : 'step-tab'}
            disabled={index > maxUnlocked}
            onClick={() => index <= maxUnlocked && setStage(index as Stage)}
          >
            <span>{index < maxUnlocked || initialProgress === 100 ? '✓' : index + 1}</span>
            {label}
          </button>
        ))}
      </div>

      {stage === 0 && (
        <section className="card lesson-panel">
          <p className="tiny eyebrow">VOCABULARY</p>
          <h2>{lesson.vocabularyHeading}</h2>
          <p>Tap each card to reveal its meaning and example.</p>
          <div className="vocab-grid">
            {lesson.vocabulary.map((word, index) => {
              const isFlipped = flipped.includes(index);
              return (
                <button
                  className={`vocab-card ${isFlipped ? 'flipped' : ''}`}
                  key={word.id}
                  onClick={() => setFlipped(current =>
                    current.includes(index)
                      ? current.filter(item => item !== index)
                      : [...current, index],
                  )}
                >
                  {!isFlipped ? (
                    <><span className="tiny">TAGALOG</span><strong>{word.tagalog}</strong><small>Tap to reveal</small></>
                  ) : (
                    <><span className="tiny">ENGLISH</span><strong>{word.english}</strong><small>{word.example}<br />{word.exampleEnglish}</small></>
                  )}
                </button>
              );
            })}
          </div>
          <div className="vocab-audio-list">
            {lesson.vocabulary.map(word => (
              <button className="audio-button" key={word.id} onClick={() => speak(word.example)}>
                ▶ {word.example}
              </button>
            ))}
          </div>
          <div className="lesson-actions">
            <span className="tiny">Listen and repeat each example aloud.</span>
            <button className="button" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Continue to grammar'}</button>
          </div>
        </section>
      )}

      {stage === 1 && (
        <section className="card lesson-panel">
          <p className="tiny eyebrow">GRAMMAR</p>
          <h2>{lesson.grammar.title}</h2>
          <div className="grammar-grid">
            {lesson.grammar.concepts.map(concept => (
              <article key={concept.label}>
                <div className="grammar-badge">{concept.label}</div>
                <h3>{concept.title}</h3>
                <p>{concept.description}</p>
                {concept.examples.map(example => (
                  <div className="example" key={example.tagalog}>
                    <strong>{example.tagalog}</strong><span>{example.english}</span>
                  </div>
                ))}
              </article>
            ))}
          </div>
          <div className="tip"><strong>Pattern:</strong> {lesson.grammar.tip}</div>
          <div className="lesson-actions">
            <button className="button secondary" onClick={() => setStage(0)}>Back</button>
            <button className="button" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Try the exercises'}</button>
          </div>
        </section>
      )}

      {stage === 2 && (
        <section className="card lesson-panel">
          <p className="tiny eyebrow">PRACTICE</p>
          <h2>Translate into natural Tagalog</h2>
          <div className="question-list">
            {lesson.questions.map((question, index) => {
              const correct = question.answers.includes(normalise(answers[index]));
              return (
                <label className="question" key={question.prompt}>
                  <span><strong>{index + 1}.</strong> {question.prompt}</span>
                  <input className="field" value={answers[index]} onChange={event => {
                    const nextAnswers = [...answers];
                    nextAnswers[index] = event.target.value;
                    setAnswers(nextAnswers);
                    setChecked(false);
                  }} placeholder="Type your answer…" />
                  {checked && <small className={correct ? 'success' : 'error'}>{correct ? 'Correct! ' : `Suggested answer: ${question.answers[0]}. `}{question.explanation}</small>}
                </label>
              );
            })}
          </div>
          {checked && <div className="score-box"><strong>{score}/3 correct</strong><span>{score === 3 ? 'Excellent — these patterns are ready for conversation.' : 'Review the feedback, then continue. You can revisit this lesson anytime.'}</span></div>}
          <div className="lesson-actions">
            <button className="button secondary" onClick={() => setStage(1)}>Back</button>
            {!checked
              ? <button className="button" onClick={() => setChecked(true)}>Check answers</button>
              : <button className="button" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Continue to story'}</button>}
          </div>
        </section>
      )}

      {stage === 3 && (
        <section className="card lesson-panel">
          <p className="tiny eyebrow">SHORT STORY</p>
          <h2>{lesson.story.title}</h2>
          <div className="story"><p>{lesson.story.tagalog}</p></div>
          <button className="audio-button story-audio" onClick={() => speak(lesson.story.tagalog)}>▶ Listen to the story</button>
          <details><summary>Show English translation</summary><p>{lesson.story.english}</p></details>
          <div className="conversation-box">
            <p className="tiny eyebrow">SPEAKING PROMPT</p>
            <h3>{lesson.speaking.prompt}</h3>
            <p>{lesson.speaking.instruction}</p>
            <div className="example"><strong>{lesson.speaking.example}</strong><span>{lesson.speaking.exampleEnglish}</span></div>
          </div>
          <div className="lesson-actions">
            <button className="button secondary" onClick={() => setStage(2)}>Back</button>
            <button className="button" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Finish lesson'}</button>
          </div>
        </section>
      )}

      {stage === 4 && (
        <section className="card completion-card">
          <div className="completion-icon">🎉</div>
          <p className="tiny eyebrow">LESSON COMPLETE</p>
          <h2>Magaling!</h2>
          <p>You finished “{lesson.title}” and your progress has been saved.</p>
          <div className="completion-stats">
            <div><strong>{lesson.vocabulary.length}</strong><span>words</span></div>
            <div><strong>{lesson.grammar.concepts.length}</strong><span>grammar patterns</span></div>
            <div><strong>{checked ? score : (initialQuizScore ?? '—')}</strong><span>quiz score</span></div>
          </div>
          <div className="lesson-actions centered">
            <button className="button secondary" onClick={() => setStage(0)}>Review lesson</button>
            <Link className="button" href="/dashboard">Return to dashboard</Link>
          </div>
        </section>
      )}

      {message && <p className="error save-message" role="alert">{message}</p>}
    </main>
  );
}
