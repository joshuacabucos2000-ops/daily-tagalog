const vocabulary = [
  { tagalog: "magising", english: "to wake up", example: "Maaga akong nagising.", exampleEnglish: "I woke up early." },
  { tagalog: "maghanda", english: "to prepare", example: "Naghanda ako ng almusal.", exampleEnglish: "I prepared breakfast." },
  { tagalog: "pumasok", english: "to go in / go to work", example: "Pumasok ako sa trabaho.", exampleEnglish: "I went to work." },
  { tagalog: "magpahinga", english: "to rest", example: "Nagpahinga ako pagkatapos.", exampleEnglish: "I rested afterwards." },
  { tagalog: "abalang-abala", english: "very busy", example: "Abalang-abala ako ngayon.", exampleEnglish: "I am very busy today." },
  { tagalog: "kaninang umaga", english: "earlier this morning", example: "Tumakbo ako kaninang umaga.", exampleEnglish: "I ran earlier this morning." }
];

const exercises = [
  { prompt: "I woke up early this morning.", answer: "Maaga akong nagising kaninang umaga.", explanation: "Use nagising for a completed action and akong to link ako to the description." },
  { prompt: "I am still working.", answer: "Nagtatrabaho pa ako.", explanation: "Pa expresses that the action is still continuing." },
  { prompt: "I have already eaten.", answer: "Kumain na ako.", explanation: "Na indicates that the action has already happened." },
  { prompt: "How was your day?", answer: "Kumusta ang araw mo?", explanation: "This is a natural everyday conversation starter." },
  { prompt: "I rested when I got home.", answer: "Nagpahinga ako pag-uwi ko.", explanation: "Pag-uwi ko means when I got home." }
];

const verbs = {
  kain: { root: "kain", completed: "kumain", ongoing: "kumakain", contemplated: "kakain", objectCompleted: "kinain", objectOngoing: "kinakain", objectContemplated: "kakainin" },
  punta: { root: "punta", completed: "pumunta", ongoing: "pumupunta", contemplated: "pupunta", objectCompleted: "pinuntahan", objectOngoing: "pinupuntahan", objectContemplated: "pupuntahan" },
  luto: { root: "luto", completed: "nagluto", ongoing: "nagluluto", contemplated: "magluluto", objectCompleted: "niluto", objectOngoing: "niluluto", objectContemplated: "lulutuin" }
};

const defaultState = {
  completed: { vocabulary: false, sentences: false, grammar: false, story: false },
  cardsSeen: 0,
  correctAnswers: 0,
  streak: 1,
  lastVisit: new Date().toDateString()
};

let state = JSON.parse(localStorage.getItem("dailyTagalogState")) || defaultState;
let cardIndex = 0;
let exerciseIndex = 0;
let reviewIndex = 0;

function saveState() {
  localStorage.setItem("dailyTagalogState", JSON.stringify(state));
  renderProgress();
}

function normalize(text) {
  return text.toLowerCase().replace(/[.,!?]/g, "").replace(/\s+/g, " ").trim();
}

function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active-view"));
  document.getElementById(id).classList.add("active-view");
  document.querySelectorAll(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === id));
  document.getElementById("pageTitle").textContent = id === "dashboard" ? "Magandang umaga, Josh!" : ({lesson:"Today’s lesson", review:"Review", verbs:"Verb trainer", progress:"Your progress"}[id]);
  document.querySelector(".sidebar").classList.remove("open");
}

document.querySelectorAll("[data-view], [data-go]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view || btn.dataset.go)));
document.getElementById("menuButton").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));

document.querySelectorAll(".lesson-tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".lesson-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".lesson-section").forEach(s => s.classList.remove("active-lesson-section"));
  tab.classList.add("active");
  document.getElementById(tab.dataset.lessonTab).classList.add("active-lesson-section");
}));

function renderCard() {
  const card = vocabulary[cardIndex];
  document.getElementById("cardTagalog").textContent = card.tagalog;
  document.getElementById("cardEnglish").textContent = card.english;
  document.getElementById("cardExample").textContent = card.example;
  document.getElementById("cardExampleEnglish").textContent = card.exampleEnglish;
  document.getElementById("cardPosition").textContent = `${cardIndex + 1} of ${vocabulary.length}`;
  document.getElementById("flashcard").classList.remove("flipped");
}

document.getElementById("flashcard").addEventListener("click", () => document.getElementById("flashcard").classList.toggle("flipped"));
document.getElementById("flashcard").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") document.getElementById("flashcard").click(); });
document.getElementById("nextCard").addEventListener("click", () => { cardIndex = (cardIndex + 1) % vocabulary.length; state.cardsSeen = Math.max(state.cardsSeen, cardIndex + 1); saveState(); renderCard(); });
document.getElementById("prevCard").addEventListener("click", () => { cardIndex = (cardIndex - 1 + vocabulary.length) % vocabulary.length; renderCard(); });
document.getElementById("speakCard").addEventListener("click", e => { e.stopPropagation(); speak(vocabulary[cardIndex].tagalog); });
document.querySelectorAll("[data-speak]").forEach(btn => btn.addEventListener("click", () => speak(btn.dataset.speak)));
function speak(text) { if ("speechSynthesis" in window) { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(text)); } }

function renderExercise() {
  const item = exercises[exerciseIndex];
  document.getElementById("exercisePrompt").textContent = item.prompt;
  document.getElementById("exerciseInput").value = "";
  document.getElementById("exerciseFeedback").className = "feedback";
  document.getElementById("exerciseFeedback").textContent = "";
  document.getElementById("exercisePosition").textContent = `${exerciseIndex + 1} of ${exercises.length}`;
}

document.getElementById("checkAnswer").addEventListener("click", () => {
  const item = exercises[exerciseIndex];
  const userAnswer = normalize(document.getElementById("exerciseInput").value);
  const correct = userAnswer === normalize(item.answer);
  const feedback = document.getElementById("exerciseFeedback");
  feedback.className = `feedback ${correct ? "good" : "bad"}`;
  feedback.innerHTML = correct ? `Correct! ✅<br><small>${item.explanation}</small>` : `A natural answer is: <strong>${item.answer}</strong><br><small>${item.explanation}</small>`;
  if (correct) { state.correctAnswers += 1; saveState(); }
});
document.getElementById("showAnswer").addEventListener("click", () => { const item = exercises[exerciseIndex]; const f = document.getElementById("exerciseFeedback"); f.className = "feedback good"; f.innerHTML = `<strong>${item.answer}</strong><br><small>${item.explanation}</small>`; });
document.getElementById("nextExercise").addEventListener("click", () => { exerciseIndex = (exerciseIndex + 1) % exercises.length; renderExercise(); });

document.getElementById("checkGrammar").addEventListener("click", () => {
  const val = document.getElementById("grammarSelect").value;
  const f = document.getElementById("grammarFeedback");
  const good = val === "pa";
  f.className = `feedback ${good ? "good" : "bad"}`;
  f.textContent = good ? "Correct — pa means the action is still continuing." : "Choose pa: Nagtatrabaho pa ako.";
  if (good) { state.correctAnswers += 1; saveState(); }
});

document.querySelectorAll(".translation-toggle").forEach(btn => btn.addEventListener("click", () => {
  const translation = btn.nextElementSibling;
  const open = translation.style.display === "block";
  translation.style.display = open ? "none" : "block";
  btn.textContent = open ? "Show English" : "Hide English";
}));

document.querySelectorAll("[data-complete]").forEach(btn => btn.addEventListener("click", () => {
  const key = btn.dataset.complete;
  state.completed[key] = !state.completed[key];
  saveState();
}));

function renderReview() {
  const item = vocabulary[reviewIndex];
  document.getElementById("reviewPrompt").textContent = item.english;
  document.getElementById("reviewInput").value = "";
  document.getElementById("reviewFeedback").className = "feedback";
  document.getElementById("reviewFeedback").textContent = "";
  document.getElementById("reviewActions").style.display = "none";
}
document.getElementById("checkReview").addEventListener("click", () => {
  const item = vocabulary[reviewIndex];
  const correct = normalize(document.getElementById("reviewInput").value) === normalize(item.tagalog);
  const f = document.getElementById("reviewFeedback");
  f.className = `feedback ${correct ? "good" : "bad"}`;
  f.innerHTML = correct ? "Correct! ✅" : `Answer: <strong>${item.tagalog}</strong>`;
  document.getElementById("reviewActions").style.display = "grid";
  if (correct) { state.correctAnswers += 1; saveState(); }
});
document.querySelectorAll("[data-rating]").forEach(btn => btn.addEventListener("click", () => { reviewIndex = (reviewIndex + 1) % vocabulary.length; renderReview(); }));

function renderVerbs() {
  const select = document.getElementById("verbSelect");
  select.innerHTML = Object.keys(verbs).map(v => `<option value="${v}">${v}</option>`).join("");
  function update() {
    const v = verbs[select.value];
    const forms = [
      ["Root", v.root], ["Actor completed", v.completed], ["Actor ongoing", v.ongoing], ["Actor contemplated", v.contemplated],
      ["Object completed", v.objectCompleted], ["Object ongoing", v.objectOngoing], ["Object contemplated", v.objectContemplated]
    ];
    document.getElementById("verbTable").innerHTML = forms.map(([label, form]) => `<div class="verb-item"><span>${label}</span><strong>${form}</strong></div>`).join("");
  }
  select.addEventListener("change", update); update();
}

function renderProgress() {
  const keys = Object.keys(state.completed);
  const count = keys.filter(k => state.completed[k]).length;
  const percent = Math.round((count / keys.length) * 100);
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressRing").style.background = `conic-gradient(var(--gold) ${percent * 3.6}deg, rgba(255,255,255,.18) 0deg)`;
  document.getElementById("progressStat").textContent = `${percent}%`;
  document.getElementById("wordsStat").textContent = state.cardsSeen;
  document.getElementById("correctStat").textContent = state.correctAnswers;
  document.getElementById("streakCount").textContent = state.streak;
  document.getElementById("streakStat").textContent = state.streak;
  const labels = { vocabulary: "Vocabulary", sentences: "Sentence practice", grammar: "Grammar", story: "Short story" };
  document.getElementById("activityGrid").innerHTML = keys.map((k,i) => `<article class="activity-card ${state.completed[k] ? "done" : ""}"><div class="activity-icon">${["🗣️","✍️","📚","📖"][i]}</div><h3>${labels[k]}</h3><span>${state.completed[k] ? "Completed ✓" : "Ready to begin"}</span></article>`).join("");
  document.getElementById("progressChecklist").innerHTML = keys.map(k => `<div class="progress-row"><span>${labels[k]}</span><strong>${state.completed[k] ? "Complete ✓" : "Not complete"}</strong></div>`).join("");
  document.querySelectorAll("[data-complete]").forEach(btn => { const done = state.completed[btn.dataset.complete]; btn.classList.toggle("completed", done); btn.textContent = done ? "Completed ✓" : `Mark ${labels[btn.dataset.complete].toLowerCase()} complete`; });
}

document.getElementById("resetProgress").addEventListener("click", () => { state = JSON.parse(JSON.stringify(defaultState)); saveState(); });

document.getElementById("todayLabel").textContent = new Intl.DateTimeFormat("en-AU", { weekday:"long", day:"numeric", month:"long" }).format(new Date());
renderCard(); renderExercise(); renderReview(); renderVerbs(); renderProgress();
