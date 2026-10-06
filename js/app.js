const app = document.getElementById("app");
const navItems = [
  ["dashboard", "Dashboard"], ["syllabus", "Syllabus"], ["unit1", "Unit 1"], ["unit2", "Unit 2"], ["topics", "Topic Explorer"], ["examples", "Code Examples"], ["playground", "Code Playground"], ["flashcards", "Flashcards"], ["quiz", "Quiz"], ["exam", "Exam Mode"], ["important", "Important Questions"], ["cheats", "Cheat Sheets"], ["revision", "Revision"], ["progress", "Progress"], ["settings", "Settings"]
];
let currentView = "dashboard";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mainNav").innerHTML = navItems.map(([id, label]) => `<button data-view="${id}" onclick="navigateTo('${id}')">${label}</button>`).join("");
  document.getElementById("themeToggle").onclick = toggleTheme;
  document.getElementById("menuBtn").onclick = () => document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("collapseBtn").onclick = () => document.body.classList.toggle("collapsed");
  document.getElementById("globalSearch").addEventListener("input", (e) => renderSearch(e.target.value));
  document.getElementById("modalClose").onclick = closeModal;
  applyTheme();
  navigateTo("dashboard");
});

function navigateTo(view, arg, push = true) {
  currentView = view;
  document.getElementById("sidebar").classList.remove("open");
  document.querySelectorAll("#mainNav button").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  if (view === "dashboard") renderDashboard();
  if (view === "syllabus") renderSyllabus();
  if (view === "unit1") renderUnit(1);
  if (view === "unit2") renderUnit(2);
  if (view === "topics") renderTopicExplorer();
  if (view === "examples") renderExamples();
  if (view === "playground") renderPlayground();
  if (view === "flashcards") renderFlashcards(arg);
  if (view === "quiz") { if (activeQuiz) renderQuiz(); else renderQuizCenter(); }
  if (view === "exam") renderExamMode();
  if (view === "important") renderImportant();
  if (view === "cheats") renderCheats();
  if (view === "revision") renderRevision();
  if (view === "progress") renderProgress();
  if (view === "settings") renderSettings();
  app.focus();
}

function renderCurrentView() { navigateTo(currentView); }
function setCrumbs(text) { document.getElementById("breadcrumbs").textContent = text; }

function renderDashboard() {
  const state = loadProgress();
  const last = lessonById(state.lastTopic);
  const weak = weakTopics();
  setCrumbs("Dashboard");
  app.innerHTML = `
    <section class="hero">
      <div>
        <span class="badge">Web Technology</span>
        <h1>Master Web Technology.</h1>
        <p>Learn HTML, CSS, SASS & Responsive Design through interactive lessons, code playgrounds, quizzes and exam-focused revision.</p>
        <div class="inline-actions"><button class="primary-btn" onclick="renderLesson('${last.id}')">Start Learning</button><button class="secondary-btn" onclick="renderQuizCenter()">Take a Quiz</button></div>
      </div>
      <div class="hero-art" aria-hidden="true"><span>&lt;html&gt;</span><span>{ css }</span><span>@media</span></div>
    </section>
    <section class="stats">
      ${stat("Unit 1 Progress", `${completionPercent(1)}%`)}
      ${stat("Unit 2 Progress", `${completionPercent(2)}%`)}
      ${stat("Topics Completed", `${state.completed.length}/${lessons.length}`)}
      ${stat("Quiz Score", `${quizAverage()}%`)}
      ${stat("Flashcards Reviewed", state.flashKnown.length + state.flashDifficult.length)}
      ${stat("Exam Readiness", `${examReadiness()}%`)}
    </section>
    <section class="dashboard-grid">
      ${panel("Continue Learning", `<p>${last.title}</p><button class="primary-btn" onclick="renderLesson('${last.id}')">Continue</button>`)}
      ${panel("Today's Revision", list(shuffle(lessons).slice(0,5).map((l) => l.title)))}
      ${panel("Weak Areas", weak.length ? list(weak) : "<p>No weak areas yet. Take a quiz to discover them.</p>")}
      ${panel("Quick Actions", `<div class="quick-actions">${["Continue Learning","Start Quiz","Flashcards","Exam Mode","Revision Mode","View Cheat Sheet"].map((x, i) => `<button onclick="${["renderLesson(loadProgress().lastTopic)","renderQuizCenter()","navigateTo('flashcards')","navigateTo('exam')","navigateTo('revision')","navigateTo('cheats')"][i]}">${x}</button>`).join("")}</div>`)}
    </section>`;
}

function stat(label, value) { return `<article class="stat"><strong>${value}</strong><span>${label}</span><progress value="${parseInt(value) || 0}" max="100"></progress></article>`; }

function renderSyllabus() {
  setCrumbs("Syllabus Roadmap");
  app.innerHTML = `<section class="hero compact"><h1>Syllabus Roadmap</h1><p>All 37 topics from Unit 1 and Unit 2 are covered.</p></section>${[1,2].map((unit) => `<section class="panel"><h2>UNIT ${unit} - ${unit === 1 ? "HTML & CSS Fundamentals" : "SASS & Responsive Web Design"}</h2><div class="topic-list">${lessons.filter((l) => l.unit === unit).map(topicRow).join("")}</div></section>`).join("")}`;
}

function topicRow(lesson, index) {
  const done = loadProgress().completed.includes(lesson.id);
  return `<article class="topic-row"><strong>${String(lessons.indexOf(lesson) + 1).padStart(2, "0")}</strong><div><h3>${lesson.title}</h3><span>${lesson.difficulty}</span></div><progress value="${done ? 100 : 0}" max="100"></progress><button onclick="renderLesson('${lesson.id}')">${done ? "Review" : "Start"}</button></article>`;
}

function renderUnit(unit) {
  setCrumbs(`Unit ${unit}`);
  app.innerHTML = `<section class="hero compact"><h1>Unit ${unit}</h1><p>${unit === 1 ? "HTML and CSS fundamentals for structure, style, layout, and motion." : "SASS, Bootstrap concepts, and responsive interface development."}</p></section><section class="card-grid">${lessons.filter((l) => l.unit === unit).map((l) => `<button class="action-card" onclick="renderLesson('${l.id}')"><span class="badge">${l.difficulty}</span><strong>${l.title}</strong><small>${l.definition}</small></button>`).join("")}</section>`;
}

function renderTopicExplorer() {
  setCrumbs("Topic Explorer");
  app.innerHTML = `<section class="panel"><h1>Topic Explorer</h1><input class="wide-input" placeholder="Filter topics" oninput="filterTopics(this.value)"><div id="topicResults" class="topic-list">${lessons.map(topicRow).join("")}</div></section>`;
}

function filterTopics(value) {
  document.getElementById("topicResults").innerHTML = lessons.filter((l) => `${l.title} ${l.definition} ${l.category}`.toLowerCase().includes(value.toLowerCase())).map(topicRow).join("");
}

function renderExamples() {
  setCrumbs("Code Examples");
  app.innerHTML = `<section class="panel"><h1>Code Examples</h1><div class="examples">${lessons.map((l) => `<article><h2>${l.title}</h2>${codeBlock(l.code, `ex-${l.id}`)}</article>`).join("")}</div></section>`;
  bindCodeButtons();
}

function renderImportant() {
  setCrumbs("Important Questions");
  const groups = ["Very Important", "Important", "Conceptual", "Code-based", "Short-answer", "Long-answer"];
  app.innerHTML = `<section class="panel"><h1>Important Questions</h1>${groups.map((g, i) => `<h2>${g}</h2>${list(importantQuestions.slice(i, i + 7))}`).join("")}</section>`;
}

function renderCheats() {
  setCrumbs("Cheat Sheets");
  app.innerHTML = `<section class="card-grid">${cheatSheets.map((sheet) => `<article class="panel"><h2>${sheet.title}</h2>${list(sheet.items)}</article>`).join("")}</section><section class="panel"><h2>Difference Tables</h2><table>${comparisons.map(([a,b]) => `<tr><th>${a}</th><td>${b}</td></tr>`).join("")}</table></section>`;
}

function renderRevision() {
  setCrumbs("Revision Mode");
  const modes = [["5-minute", 5], ["15-minute", 12], ["30-minute", 24], ["Full revision", lessons.length]];
  app.innerHTML = `<section class="hero compact"><h1>Last Minute Revision</h1><p>Definitions, syntax, differences, exam tips, and mistakes only.</p></section><section class="inline-actions">${modes.map(([m,n]) => `<button class="secondary-btn" onclick="showRevision(${n})">${m}</button>`).join("")}</section><section id="revisionList" class="card-grid"></section>`;
  showRevision(5);
}

function showRevision(count) {
  document.getElementById("revisionList").innerHTML = lessons.slice(0, count).map((l) => `<article class="panel"><h2>${l.title}</h2><p>${l.revision}</p><pre>${escapeHtml(l.syntax)}</pre><p><strong>Tip:</strong> ${l.examPoints[0]}</p><p><strong>Mistake:</strong> ${l.mistakes[0]}</p></article>`).join("");
}

function renderProgress() {
  const state = loadProgress();
  setCrumbs("Progress Tracker");
  app.innerHTML = `<section class="stats">${stat("Overall", `${completionPercent()}%`)}${stat("Unit 1", `${completionPercent(1)}%`)}${stat("Unit 2", `${completionPercent(2)}%`)}${stat("Quiz Average", `${quizAverage()}%`)}${stat("Readiness", `${examReadiness()}%`)}</section><section class="panel"><h2>Achievements</h2>${list(state.achievements.length ? state.achievements : ["No achievements yet. Complete a lesson or take a quiz."])}</section>`;
}

function renderSettings() {
  setCrumbs("Settings");
  app.innerHTML = `<section class="panel"><h1>Settings</h1><button class="primary-btn" onclick="toggleTheme()">Toggle Light/Dark Mode</button><button class="danger-btn" onclick="resetAllProgress()">Reset All Progress</button></section>`;
}

function resetAllProgress() {
  if (confirm("Reset all saved progress?")) {
    localStorage.removeItem(STORAGE_KEY);
    applyTheme();
    renderDashboard();
  }
}

function renderSearch(query) {
  if (!query.trim()) return;
  setCrumbs("Search");
  const q = query.toLowerCase();
  const lessonMatches = lessons.filter((l) => JSON.stringify(l).toLowerCase().includes(q));
  const questionMatches = questionBank.filter((x) => JSON.stringify(x).toLowerCase().includes(q)).slice(0, 10);
  const cardMatches = flashcards.filter((x) => JSON.stringify(x).toLowerCase().includes(q)).slice(0, 10);
  app.innerHTML = `<section class="panel"><h1>Search Results</h1><h2>Topics</h2><div class="topic-list">${lessonMatches.map(topicRow).join("") || "<p>No topic matches.</p>"}</div><h2>Questions</h2>${list(questionMatches.map((x) => x.question))}<h2>Flashcards</h2>${list(cardMatches.map((x) => x.front))}</section>`;
}

function bindCodeButtons() {
  document.querySelectorAll(".copy-btn").forEach((btn) => btn.onclick = () => {
    const text = decodeURIComponent(btn.dataset.code);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => showToast("Code copied."));
      return;
    }
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    showToast("Code copied.");
  });
}

function toggleTheme() {
  const state = loadProgress();
  state.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  saveProgress(state);
  applyTheme();
}

function applyTheme() {
  document.documentElement.dataset.theme = loadProgress().theme;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function showModal(title, body) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = body;
  document.getElementById("modal").setAttribute("aria-hidden", "false");
  bindCodeButtons();
}

function closeModal() { document.getElementById("modal").setAttribute("aria-hidden", "true"); }

function updateBoxModel() {
  const box = document.getElementById("boxModelBox");
  if (!box) return;
  ["margin","border","padding","width","height"].forEach((k) => box.style[k === "border" ? "borderWidth" : k] = `${document.getElementById(`${k}Ctrl`).value}px`);
  box.style.boxSizing = document.getElementById("boxSizing").value;
}
function updatePositionDemo() {
  const box = document.getElementById("positionBox");
  if (!box) return;
  box.style.position = document.getElementById("posType").value;
  ["top","right","bottom","left"].forEach((k) => box.style[k] = `${document.getElementById(`${k}Pos`).value}px`);
}
function updateFlexDemo() {
  const s = document.getElementById("flexStage");
  if (!s) return;
  const direction = document.getElementById("flexDirection").value;
  const justify = document.getElementById("justifyContent").value;
  const align = document.getElementById("alignItems").value;
  const wrap = document.getElementById("flexWrap").value;
  const gap = document.getElementById("flexGap").value;
  s.style.flexDirection = direction; s.style.justifyContent = justify; s.style.alignItems = align; s.style.flexWrap = wrap; s.style.gap = `${gap}px`;
  document.getElementById("flexCss").textContent = `display: flex;\nflex-direction: ${direction};\njustify-content: ${justify};\nalign-items: ${align};\nflex-wrap: ${wrap};\ngap: ${gap}px;`;
}
function updateGridDemo() {
  const s = document.getElementById("gridStage");
  if (!s) return;
  const cols = document.getElementById("gridCols").value;
  const rows = document.getElementById("gridRows").value;
  const gap = document.getElementById("gridGap").value;
  s.style.gridTemplateColumns = cols; s.style.gridTemplateRows = rows; s.style.gap = `${gap}px`;
  document.getElementById("gridCss").textContent = `display: grid;\ngrid-template-columns: ${cols};\ngrid-template-rows: ${rows};\ngap: ${gap}px;`;
}
function setDevice(width) { document.getElementById("deviceFrame").style.maxWidth = `${width}px`; }


