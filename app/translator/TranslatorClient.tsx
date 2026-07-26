'use client';

import { useMemo, useState } from 'react';
import { vocabulary } from '@/lib/content/vocabulary';

type Direction = 'english-filipino' | 'filipino-english';
type Translation = {
  source: string;
  target: string;
  example?: string;
};

function normalise(value: string) {
  return value.toLocaleLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ');
}

export default function TranslatorClient() {
  const [direction, setDirection] = useState<Direction>('english-filipino');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<Translation | null>(null);
  const [suggestions, setSuggestions] = useState<Translation[]>([]);
  const [attempted, setAttempted] = useState(false);

  const entries = useMemo(() => {
    const wordEntries = vocabulary.flatMap(word => {
      const englishMeanings = word.english.split('/').map(item => item.trim());
      return englishMeanings.map(english => direction === 'english-filipino'
        ? { source: english, target: word.tagalog, example: `${word.example} — ${word.exampleEnglish}` }
        : { source: word.tagalog, target: english, example: `${word.example} — ${word.exampleEnglish}` });
    });
    const sentenceEntries = vocabulary.map(word => direction === 'english-filipino'
      ? { source: word.exampleEnglish, target: word.example }
      : { source: word.example, target: word.exampleEnglish });
    return [...wordEntries, ...sentenceEntries];
  }, [direction]);

  function translate() {
    const query = normalise(input);
    setAttempted(true);
    if (!query) {
      setResult(null);
      setSuggestions([]);
      return;
    }
    const exact = entries.find(entry => normalise(entry.source) === query);
    setResult(exact ?? null);
    setSuggestions(exact ? [] : entries.filter(entry => {
      const source = normalise(entry.source);
      return source.includes(query) || query.includes(source);
    }).slice(0, 5));
  }

  function swapDirection() {
    setDirection(current => current === 'english-filipino' ? 'filipino-english' : 'english-filipino');
    setInput(result?.target ?? '');
    setResult(null);
    setSuggestions([]);
    setAttempted(false);
  }

  const from = direction === 'english-filipino' ? 'English' : 'Filipino';
  const to = direction === 'english-filipino' ? 'Filipino' : 'English';

  return (
    <section className="translator-card card">
      <div className="translator-direction">
        <strong>{from}</strong>
        <button onClick={swapDirection} aria-label={`Switch to ${to} to ${from}`}>⇄</button>
        <strong>{to}</strong>
      </div>
      <label htmlFor="translation-input">Enter a course word or example sentence</label>
      <textarea
        id="translation-input"
        className="translation-input"
        value={input}
        onChange={event => {
          setInput(event.target.value);
          setAttempted(false);
          setResult(null);
          setSuggestions([]);
        }}
        onKeyDown={event => {
          if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') translate();
        }}
        placeholder={direction === 'english-filipino' ? 'Try “water” or “I am tired now.”' : 'Subukan ang “tubig” o “Pagod ako ngayon.”'}
      />
      <button className="button translate-button" onClick={translate}>Translate</button>

      {result && (
        <div className="translation-result" aria-live="polite">
          <span className="tiny eyebrow">{to.toUpperCase()}</span>
          <strong>{result.target}</strong>
          {result.example && <p>{result.example}</p>}
        </div>
      )}
      {!result && suggestions.length > 0 && (
        <div className="translation-suggestions" aria-live="polite">
          <p>Closest course matches:</p>
          {suggestions.map(item => (
            <button key={`${item.source}-${item.target}`} onClick={() => {
              setInput(item.source);
              setResult(item);
              setSuggestions([]);
            }}>
              <span>{item.source}</span><strong>{item.target}</strong>
            </button>
          ))}
        </div>
      )}
      {attempted && !result && suggestions.length === 0 && (
        <div className="translation-missing" role="status">
          <strong>That is not in the course bank yet.</strong>
          <p>This focused translator currently covers {vocabulary.length} curriculum words and their example sentences. It will grow as lessons are added.</p>
        </div>
      )}
      <p className="translator-note tiny">Course translations are stored locally in Daily Tagalog and are not sent to an outside translation service.</p>
    </section>
  );
}
