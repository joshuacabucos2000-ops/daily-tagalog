'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Stage = 0 | 1 | 2 | 3 | 4;

const vocabulary = [
  { tagalog: 'gumising', english: 'to wake up', example: 'Maaga akong gumising.' },
  { tagalog: 'kumain', english: 'ate / to eat', example: 'Kumain na ako.' },
  { tagalog: 'nagtrabaho', english: 'worked', example: 'Nagtrabaho ako buong araw.' },
  { tagalog: 'umuwi', english: 'went home', example: 'Umuwi ako nang alas-sais.' },
  { tagalog: 'pagod', english: 'tired', example: 'Pagod ako ngayon.' },
  { tagalog: 'mamaya', english: 'later', example: 'Magluluto ako mamaya.' },
];

const questions = [
  {
    prompt: 'I already ate.',
    answers: ['kumain na ako', 'kumain na po ako'],
    explanation: 'Use “na” for something that has already happened.',
  },
  {
    prompt: 'I am still working.',
    answers: ['nagtatrabaho pa ako', 'nagtratrabaho pa ako'],
    explanation: 'Use “pa” when an action or state is still continuing.',
  },
  {
    prompt: "I haven't gone home yet.",
    answers: ['hindi pa ako umuuwi', 'di pa ako umuuwi'],
    explanation: '“Hindi pa” means “not yet.”',
  },
];

function normalise(value: string) {
  return value.toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ');
}

export default function LessonClient({ initialProgress }: { initialProgress: number }) {
  const inferredStage = Math.min(4, Math.floor(initialProgress / 20)) as Stage;
  const [stage, setStage] = useState<Stage>(inferredStage);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [answers, setAnswers] = useState(['', '', '']);
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const progress = stage === 4 ? 100 : stage * 20;
  const score = useMemo(
    () => answers.reduce((total, answer, index) => total + (questions[index].answers.includes(normalise(answer)) ? 1 : 0), 0),
    [answers],
  );

  async function saveProgress(nextPercent: number) {
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
      lesson_id: 'lesson-1',
      percent_complete: nextPercent,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      setMessage(error.message);
      setSaving(false);
      return false;
    }
    setSaving(false);
    return true;
  }

  async function next() {
    const nextStage = Math.min(4, stage + 1) as Stage;
    const nextPercent = nextStage === 4 ? 100 : nextStage * 20;
    const saved = await saveProgress(nextPercent);
    if (saved) {
      setStage(nextStage);
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
          <p className="tiny eyebrow">LESSON 1 · EVERYDAY CONVERSATION</p>
          <h1>Talking about your day</h1>
          <p>Learn useful daily verbs, understand <strong>na</strong> and <strong>pa</strong>, then practise a short conversation.</p>
        </div>
        <div className="lesson-progress-wrap">
          <strong>{progress}%</strong>
          <div className="progress"><span style={{ width: `${progress}%` }} /></div>
          <span className="tiny">Saved to your account</span>
        </div>
      </section>

      <div className="step-tabs" aria-label="Lesson sections">
        {['Vocabulary', 'Grammar', 'Practice', 'Story', 'Complete'].map((label, index) => (
          <button key={label} className={index === stage ? 'step-tab active' : 'step-tab'} onClick={() => index <= inferredStage && setStage(index as Stage)}>
            <span>{index < stage || progress === 100 ? '✓' : index + 1}</span>{label}
          </button>
        ))}
      </div>

      {stage === 0 && (
        <section className="card lesson-panel">
          <p className="tiny eyebrow">VOCABULARY</p>
          <h2>Six words for describing your day</h2>
          <p>Tap each card to reveal the meaning and example.</p>
          <div className="vocab-grid">
            {vocabulary.map((word, index) => {
              const isFlipped = flipped.includes(index);
              return (
                <button className={`vocab-card ${isFlipped ? 'flipped' : ''}`} key={word.tagalog} onClick={() => setFlipped(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index])}>
                  {!isFlipped ? <><span className="tiny">TAGALOG</span><strong>{word.tagalog}</strong><small>Tap to reveal</small></> : <><span className="tiny">ENGLISH</span><strong>{word.english}</strong><small>{word.example}</small></>}
                </button>
              );
            })}
          </div>
          <div className="lesson-actions"><span className="tiny">Flip the cards as many times as you like.</span><button className="button" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Continue to grammar'}</button></div>
        </section>
      )}

      {stage === 1 && (
        <section className="card lesson-panel">
          <p className="tiny eyebrow">GRAMMAR</p>
          <h2><em>Na</em> versus <em>pa</em></h2>
          <div className="grammar-grid">
            <article><div className="grammar-badge">NA</div><h3>Already / now</h3><p>Use <strong>na</strong> when something has happened, changed, or is now true.</p><div className="example"><strong>Kumain na ako.</strong><span>I already ate.</span></div><div className="example"><strong>Pagod na ako.</strong><span>I am tired now.</span></div></article>
            <article><div className="grammar-badge">PA</div><h3>Still / yet</h3><p>Use <strong>pa</strong> when something is continuing or has not happened yet.</p><div className="example"><strong>Nagtatrabaho pa ako.</strong><span>I am still working.</span></div><div className="example"><strong>Hindi pa ako umuuwi.</strong><span>I have not gone home yet.</span></div></article>
          </div>
          <div className="tip"><strong>Pattern:</strong> <em>Hindi pa</em> = not yet. <em>Wala pa</em> = there is none yet / not yet available.</div>
          <div className="lesson-actions"><button className="button secondary" onClick={() => setStage(0)}>Back</button><button className="button" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Try the exercises'}</button></div>
        </section>
      )}

      {stage === 2 && (
        <section className="card lesson-panel">
          <p className="tiny eyebrow">PRACTICE</p>
          <h2>Translate into natural Tagalog</h2>
          <div className="question-list">
            {questions.map((question, index) => {
              const correct = question.answers.includes(normalise(answers[index]));
              return <label className="question" key={question.prompt}><span><strong>{index + 1}.</strong> {question.prompt}</span><input className="field" value={answers[index]} onChange={event => { const nextAnswers = [...answers]; nextAnswers[index] = event.target.value; setAnswers(nextAnswers); setChecked(false); }} placeholder="Type your answer…" />{checked && <small className={correct ? 'success' : 'error'}>{correct ? 'Correct! ' : `Suggested answer: ${question.answers[0]}. `}{question.explanation}</small>}</label>;
            })}
          </div>
          {checked && <div className="score-box"><strong>{score}/3 correct</strong><span>{score === 3 ? 'Excellent — these patterns are ready for conversation.' : 'Review the feedback, then continue. You can revisit this lesson anytime.'}</span></div>}
          <div className="lesson-actions"><button className="button secondary" onClick={() => setStage(1)}>Back</button>{!checked ? <button className="button" onClick={() => setChecked(true)}>Check answers</button> : <button className="button" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Continue to story'}</button>}</div>
        </section>
      )}

      {stage === 3 && (
        <section className="card lesson-panel">
          <p className="tiny eyebrow">SHORT STORY</p>
          <h2>Ang Umaga ni Ana</h2>
          <div className="story">
            <p>Maagang gumising si Ana. Kumain na siya ng pandesal at uminom ng kape. Nagtatrabaho pa ang kapatid niya, kaya tahimik ang bahay. Mamaya, aalis si Ana at pupunta sa palengke. Medyo pagod siya, pero masaya siya.</p>
          </div>
          <details><summary>Show English translation</summary><p>Ana woke up early. She has already eaten pandesal and drunk coffee. Her sibling is still working, so the house is quiet. Later, Ana will leave and go to the market. She is a little tired, but she is happy.</p></details>
          <div className="conversation-box"><p className="tiny eyebrow">SPEAKING PROMPT</p><h3>Kumusta ang araw mo?</h3><p>Answer aloud using at least one lesson word and either <strong>na</strong> or <strong>pa</strong>.</p><div className="example"><strong>Pagod na ako, pero nagtatrabaho pa ako.</strong><span>I am tired now, but I am still working.</span></div></div>
          <div className="lesson-actions"><button className="button secondary" onClick={() => setStage(2)}>Back</button><button className="button" onClick={next} disabled={saving}>{saving ? 'Saving…' : 'Finish lesson'}</button></div>
        </section>
      )}

      {stage === 4 && (
        <section className="card completion-card">
          <div className="completion-icon">🎉</div>
          <p className="tiny eyebrow">LESSON COMPLETE</p>
          <h2>Magaling!</h2>
          <p>You finished “Talking about your day” and your progress has been saved.</p>
          <div className="completion-stats"><div><strong>6</strong><span>words</span></div><div><strong>1</strong><span>grammar skill</span></div><div><strong>{score || '—'}</strong><span>quiz score</span></div></div>
          <div className="lesson-actions centered"><button className="button secondary" onClick={() => setStage(0)}>Review lesson</button><Link className="button" href="/dashboard">Return to dashboard</Link></div>
        </section>
      )}

      {message && <p className="error save-message">{message}</p>}
    </main>
  );
}
