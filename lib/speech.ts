function chooseFilipinoVoice(voices: SpeechSynthesisVoice[]) {
  return voices.find(voice => /^(fil|tl)(-|_)/i.test(voice.lang))
    ?? voices.find(voice => /filipino|tagalog|blessica|angelo/i.test(voice.name))
    ?? voices.find(voice => /^en-PH/i.test(voice.lang));
}

export function prepareFilipinoVoices() {
  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
}

export function speakTagalog(text: string, rate = 0.95) {
  if (!('speechSynthesis' in window)) return false;
  const synthesis = window.speechSynthesis;
  synthesis.cancel();
  let spoken = false;

  const speak = () => {
    if (spoken) return;
    spoken = true;
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = chooseFilipinoVoice(synthesis.getVoices());
    utterance.lang = voice?.lang ?? 'fil-PH';
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = 1;
    synthesis.speak(utterance);
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
