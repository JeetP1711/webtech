let activeQuiz = null;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function startQuiz(config = { mode: "random" }) {
  let pool = questionBank;
  if (config.mode === "topic") pool = pool.filter((q) => q.topic === config.topic);
  if (config.mode === "unit") pool = pool.filter((q) => q.unit === config.unit);
  if (config.mode === "weak") {
    const weak = weakTopics().map((title) => lessons.find((l) => l.title === title)?.id).filter(Boolean);
    pool = pool.filter((q) => weak.includes(q.topic));
  }
  const size = config.mode === "full" ? 50 : config.mode === "unit" ? 24 : config.mode === "exam" ? 40 : 10;
  activeQuiz = { config, questions: shuffle(pool).slice(0, Math.min(size, pool.length)), index: 0, answers: {}, marked: [], start: Date.now(), submitted: false };
  renderQuiz();
}

function renderQuiz() {
  currentView = "quiz";
  document.querySelectorAll("#mainNav button").forEach((b) => b.classList.toggle("active", b.dataset.view === "quiz"));
  const q = activeQuiz.questions[activeQuiz.index];
  const chosen = activeQuiz.answers[q.id];
  const feedback = chosen === undefined ? "" : `<div class="${chosen === q.answer ? "correct" : "wrong"}">${chosen === q.answer ? "Correct" : "Incorrect"}: ${q.explanation}</div>`;
  setCrumbs(`Quiz / ${activeQuiz.config.mode}`);
  app.innerHTML = `
    <section class="quiz-layout">
      <div class="panel">
        <div class="quiz-meta"><span>${q.type}</span><span>Question ${activeQuiz.index + 1}/${activeQuiz.questions.length}</span><span id="quizTimer"></span></div>
        <h1>${q.question}</h1>
        <div class="answers">${q.options.map((opt, i) => `<button class="${activeQuiz.answers[q.id] === i ? "selected" : ""}" onclick="answerQuestion(${i})">${escapeHtml(opt)}</button>`).join("")}</div>
        <div id="answerFeedback">${feedback}</div>
        <div class="inline-actions">
          <button class="secondary-btn" onclick="prevQuestion()">Previous</button>
          <button class="secondary-btn" onclick="markReview()">Mark for Review</button>
          <button class="secondary-btn" onclick="nextQuestion()">Next</button>
          <button class="primary-btn" onclick="submitQuiz()">Submit</button>
        </div>
      </div>
      <aside class="panel question-palette">${activeQuiz.questions.map((item, i) => `<button class="${activeQuiz.marked.includes(item.id) ? "marked" : ""} ${activeQuiz.answers[item.id] !== undefined ? "answered" : ""}" onclick="activeQuiz.index=${i}; renderQuiz()">${i + 1}</button>`).join("")}</aside>
    </section>`;
  tickTimer();
}

function answerQuestion(index) {
  const q = activeQuiz.questions[activeQuiz.index];
  activeQuiz.answers[q.id] = index;
  renderQuiz();
}

function nextQuestion() { activeQuiz.index = Math.min(activeQuiz.index + 1, activeQuiz.questions.length - 1); renderQuiz(); }
function prevQuestion() { activeQuiz.index = Math.max(activeQuiz.index - 1, 0); renderQuiz(); }
function markReview() {
  const id = activeQuiz.questions[activeQuiz.index].id;
  activeQuiz.marked = activeQuiz.marked.includes(id) ? activeQuiz.marked.filter((x) => x !== id) : [...activeQuiz.marked, id];
  renderQuiz();
}

function submitQuiz() {
  const correct = activeQuiz.questions.filter((q) => activeQuiz.answers[q.id] === q.answer).length;
  const skipped = activeQuiz.questions.filter((q) => activeQuiz.answers[q.id] === undefined).length;
  const percent = Math.round((correct / activeQuiz.questions.length) * 100);
  const topicMap = {};
  activeQuiz.questions.forEach((q) => {
    topicMap[q.topic] = topicMap[q.topic] || { topic: q.topic, correct: 0, total: 0 };
    topicMap[q.topic].total++;
    if (activeQuiz.answers[q.id] === q.answer) topicMap[q.topic].correct++;
  });
  const result = { mode: activeQuiz.config.mode, correct, total: activeQuiz.questions.length, skipped, incorrect: activeQuiz.questions.length - correct - skipped, percent, seconds: Math.round((Date.now() - activeQuiz.start) / 1000), topicBreakdown: Object.values(topicMap), date: new Date().toISOString() };
  const state = loadProgress();
  state.quizResults.push(result);
  if (activeQuiz.config.mode === "exam") state.examResults.push(result);
  updateAchievements(state);
  saveProgress(state);
  activeQuiz = null;
  app.innerHTML = `<section class="panel result"><h1>Score: ${percent}%</h1><p>${correct} correct, ${result.incorrect} incorrect, ${skipped} skipped. Time: ${result.seconds}s.</p><h2>Topics you should revise</h2>${list(result.topicBreakdown.filter((t) => t.correct / t.total < .7).map((t) => lessonById(t.topic).title))}<div class="inline-actions"><button class="primary-btn" onclick="renderQuizCenter()">Take Another Quiz</button><button class="secondary-btn" onclick="navigateTo('revision')">Revision Mode</button></div></section>`;
}

function tickTimer() {
  const el = document.getElementById("quizTimer");
  if (!el || !activeQuiz) return;
  el.textContent = `${Math.round((Date.now() - activeQuiz.start) / 1000)}s`;
  setTimeout(tickTimer, 1000);
}

function renderQuizCenter() {
  setCrumbs("Quiz Center");
  app.innerHTML = `<section class="hero compact"><h1>Quiz Center</h1><p>Practice by topic, unit, weak areas, random questions, or full syllabus.</p></section><section class="card-grid">
    <button class="action-card" onclick="startQuiz({mode:'topic', topic: loadProgress().lastTopic})">Topic Quiz</button>
    <button class="action-card" onclick="startQuiz({mode:'unit', unit:1})">Unit 1 Quiz</button>
    <button class="action-card" onclick="startQuiz({mode:'unit', unit:2})">Unit 2 Quiz</button>
    <button class="action-card" onclick="startQuiz({mode:'full'})">Full Syllabus Quiz</button>
    <button class="action-card" onclick="startQuiz({mode:'weak'})">Weak Topic Quiz</button>
    <button class="action-card" onclick="startQuiz({mode:'random'})">Random Quiz</button>
  </section>`;
}

function renderExamMode() {
  setCrumbs("Exam Mode");
  app.innerHTML = `<section class="hero compact"><h1>Mock Mid-Sem Exam</h1><p>Timed full-syllabus practice with question navigation and review marking.</p><button class="primary-btn" onclick="startQuiz({mode:'exam'})">Start Exam</button></section>`;
}




