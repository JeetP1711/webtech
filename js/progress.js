const STORAGE_KEY = "webtechMasteryState";

function defaultState() {
  return {
    completed: [],
    quizResults: [],
    flashKnown: [],
    flashDifficult: [],
    examResults: [],
    lastTopic: "html-intro",
    theme: "light",
    achievements: []
  };
}

function loadProgress() {
  try {
    return { ...defaultState(), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return defaultState();
  }
}

function saveProgress(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function markCompleted(topicId) {
  const state = loadProgress();
  if (!state.completed.includes(topicId)) state.completed.push(topicId);
  state.lastTopic = topicId;
  updateAchievements(state);
  saveProgress(state);
  showToast("Topic marked complete. Progress updated.");
  renderCurrentView();
}

function completionPercent(unit) {
  const state = loadProgress();
  const scoped = unit ? lessons.filter((l) => l.unit === unit) : lessons;
  return Math.round((scoped.filter((l) => state.completed.includes(l.id)).length / scoped.length) * 100);
}

function quizAverage() {
  const results = loadProgress().quizResults;
  if (!results.length) return 0;
  return Math.round(results.reduce((sum, r) => sum + r.percent, 0) / results.length);
}

function weakTopics() {
  const results = loadProgress().quizResults;
  const totals = {};
  results.forEach((r) => (r.topicBreakdown || []).forEach((t) => {
    totals[t.topic] = totals[t.topic] || { correct: 0, total: 0 };
    totals[t.topic].correct += t.correct;
    totals[t.topic].total += t.total;
  }));
  return Object.entries(totals)
    .filter(([, v]) => v.total && v.correct / v.total < 0.7)
    .map(([id]) => lessons.find((l) => l.id === id)?.title || id)
    .slice(0, 5);
}

function examReadiness() {
  return Math.round((completionPercent() * 0.45) + (quizAverage() * 0.35) + (Math.min(loadProgress().flashKnown.length / flashcards.length, 1) * 100 * 0.2));
}

function updateAchievements(state) {
  const add = (id) => { if (!state.achievements.includes(id)) state.achievements.push(id); };
  if (state.completed.length >= 1) add("First Topic Completed");
  if (state.completed.length >= 5) add("5 Topics Completed");
  if (state.quizResults.reduce((s, r) => s + r.correct, 0) >= 10) add("10 Quiz Questions Correct");
  if (state.quizResults.some((r) => r.percent >= 80)) add("80% Quiz Score");
  if (completionPercent(1) === 100) add("Unit 1 Completed");
  if (completionPercent(2) === 100) add("Unit 2 Completed");
  if (completionPercent() === 100) add("Full Syllabus Completed");
}
