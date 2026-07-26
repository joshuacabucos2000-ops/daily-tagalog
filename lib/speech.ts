const FILIPINO_VOICE_NAME = /filipino|tagalog|blessica|angelo/i;
const NATURAL_VOICE_NAME = /natural|neural|premium|enhanced|google|microsoft|siri/i;

function voiceScore(voice: SpeechSynthesisVoice) {
  const language = voice.lang.replace('_', '-').toLowerCase();
  let score = 0;

  if (language === 'fil-ph') score += 100;
  else if (language.startsWith('fil-')) score += 90;
  else if (language === 'tl-ph') score += 85;
  else if (language.startsWith('tl-')) score += 80;
  else if (language === 'en-ph') score += 25;

  if (FILIPINO_VOICE_NAME.test(voice.name)) score += 45;
  if (NATURAL_VOICE_NAME.test(voice.name)) score += 20;
  if (!voice.localService) score += 5;

  return score;
}

function chooseFilipinoVoice(voices: SpeechSynthesisVoice[]) {
  return voices
    .map(voice => ({ voice, score: voiceScore(voice) }))
    .filter(candidate => candidate.score >= 45)
    .sort((a, b) => b.score - a.score)[0]?.voice;
}

function speechSegments(text: string) {
  const cleaned = text
    .replace(/\b(Server|Waiter|Mia|Ana|Ben|Leo|Mara|Carlo|Nica|Pia|Tom|Bea|Liza|Nico|Rosa|Dan|Aya|Luis|Kim|Max|Lea|Ian|Sam|Pat|Lina|Joy|Alma):\s*/gi, '$1. ')
    .replace(/\s+/g, ' ')
    .trim();

  const segments = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(segment => segment.trim()) ?? [];
  return segments.length ? segments : [cleaned];
}

export function prepareFilipinoVoices() {
  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
}

export function speakTagalog(text: string, rate = 0.88) {
  if (!('speechSynthesis' in window)) return false;
  const synthesis = window.speechSynthesis;
  synthesis.cancel();
  let spoken = false;

  const speak = () => {
    if (spoken) return;
    spoken = true;
    const voice = chooseFilipinoVoice(synthesis.getVoices());

    for (const segment of speechSegments(text)) {
      const utterance = new SpeechSynthesisUtterance(segment);
      utterance.lang = 'fil-PH';
      if (voice) utterance.voice = voice;
      utterance.rate = rate;
      utterance.pitch = 0.98;
      synthesis.speak(utterance);
    }
  };

  if (synthesis.getVoices().length) {
    speak();
  } else {
    const handleVoicesChanged = () => {
      synthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      speak();
    };
    synthesis.addEventListener('voiceschanged', handleVoicesChanged);
    window.setTimeout(() => {
      synthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      speak();
    }, 250);
  }

  return true;
}
