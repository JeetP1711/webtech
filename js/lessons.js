function lessonById(id) {
  return lessons.find((lesson) => lesson.id === id) || lessons[0];
}

function renderLesson(id) {
  const lesson = lessonById(id);
  const state = loadProgress();
  state.lastTopic = lesson.id;
  saveProgress(state);
  setCrumbs(`Learn / ${lesson.title}`);
  const completed = state.completed.includes(lesson.id);
  app.innerHTML = `
    <section class="lesson-head">
      <div>
        <span class="badge">UNIT ${lesson.unit}</span>
        <h1>${lesson.title}</h1>
        <p>${lesson.definition}</p>
      </div>
      <button class="primary-btn" onclick="markCompleted('${lesson.id}')">${completed ? "Completed ✓" : "Mark as Completed"}</button>
    </section>
    <section class="lesson-grid">
      ${panel("What is it?", `<p>${lesson.definition}</p><p class="technical">${lesson.why}</p>`)}
      ${panel("Key Concepts", list(lesson.concepts))}
      ${panel("Syntax", codeBlock(lesson.syntax, lesson.id))}
      ${panel("Line-by-line Explanation", list(lesson.lineByLine))}
      ${panel("Visual Explanation", visualDemo(lesson))}
      ${panel("Real-world Example", `<p>${lesson.realWorld}</p>`)}
      ${panel("Common Mistakes", list(lesson.mistakes, "COMMON MISTAKE"))}
      ${panel("Exam Points", list(lesson.examPoints, "EXAM TIP"))}
      ${panel("Quick Revision", `<p>${lesson.revision}</p>`)}
      ${panel("Try It Yourself", `<p>${lesson.task}</p><button class="secondary-btn" onclick="navigateTo('playground'); loadPlaygroundExample('${exampleKey(lesson)}')">Open in Playground</button>`)}
    </section>
    <section class="panel">
      <h2>MCQs</h2>
      <div class="inline-actions">
        <button class="primary-btn" onclick="startQuiz({mode:'topic', topic:'${lesson.id}'})">Start ${lesson.title} Quiz</button>
        <button class="secondary-btn" onclick="navigateTo('flashcards', '${lesson.id}')">Review Flashcards</button>
      </div>
    </section>
  `;
  bindCodeButtons();
}

function panel(title, body) {
  return `<article class="panel"><h2>${title}</h2>${body}</article>`;
}

function list(items, label = "") {
  return `<ul class="clean-list">${items.map((item) => `<li>${label ? `<span class="mini-badge">${label}</span>` : ""}${item}</li>`).join("")}</ul>`;
}

function codeBlock(code, id) {
  return `<div class="code-shell"><div class="code-actions"><span>CODE</span><button class="copy-btn" data-code="${encodeURIComponent(code)}">Copy</button><button onclick="runSnippet('${id}')">Run</button></div><pre><code>${escapeHtml(code)}</code></pre><div class="output" id="out-${id}"><strong>OUTPUT</strong><div>${code.includes("<") ? code : "CSS rule ready to apply in a page."}</div></div><p><strong>WHY THIS WORKS:</strong> The browser parses the syntax and applies the structural or visual meaning described by the tags and declarations.</p><p><strong>EXAM TIP:</strong> Always pair syntax with purpose and one mistake.</p></div>`;
}

function escapeHtml(value) {
  return value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function visualDemo(lesson) {
  if (lesson.id === "css-box-model") return boxModelDemo();
  if (lesson.id === "css-positioning") return positioningDemo();
  if (lesson.id === "flexbox") return flexDemo();
  if (lesson.id === "css-grid") return gridDemo();
  if (lesson.id === "media-queries" || lesson.id === "responsive-principles" || lesson.id === "mobile-first") return responsiveDemo();
  if (lesson.id === "html-structure") return `<div class="dom-tree"><span>html</span><span>head → title/meta</span><span>body → header/main/footer</span><span>section → h1 + p</span></div>`;
  if (lesson.id.includes("sass")) return `<div class="flow"><span>SCSS</span><b>↓</b><span>SASS Compiler</span><b>↓</b><span>CSS</span><b>↓</b><span>Browser</span></div>`;
  return `<div class="visual-card">${lesson.visual}</div>`;
}

function boxModelDemo() {
  return `<div class="box-demo-controls">
    ${slider("margin", 20, 0, 60)}${slider("border", 6, 0, 24)}${slider("padding", 24, 0, 60)}${slider("width", 160, 80, 280)}${slider("height", 90, 40, 180)}
    <select id="boxSizing" onchange="updateBoxModel()"><option>content-box</option><option>border-box</option></select>
  </div><div class="box-model-stage"><div id="boxModelBox">Content</div></div>`;
}

function slider(id, value, min, max) {
  return `<label>${id}<input type="range" id="${id}Ctrl" min="${min}" max="${max}" value="${value}" oninput="updateBoxModel()"></label>`;
}

function positioningDemo() {
  return `<div class="position-controls"><select id="posType" onchange="updatePositionDemo()">${["static","relative","absolute","fixed","sticky"].map((v) => `<option>${v}</option>`).join("")}</select>${["top","right","bottom","left"].map((x) => `<label>${x}<input id="${x}Pos" type="number" value="${x === "top" || x === "left" ? 20 : 0}" oninput="updatePositionDemo()"></label>`).join("")}</div><div class="position-stage"><div id="positionBox">Move me</div></div>`;
}

function flexDemo() {
  return `<div class="control-row">${select("flexDirection", ["row","column","row-reverse"], "updateFlexDemo()")}${select("justifyContent", ["flex-start","center","space-between","space-around"], "updateFlexDemo()")}${select("alignItems", ["stretch","center","flex-start","flex-end"], "updateFlexDemo()")}${select("flexWrap", ["nowrap","wrap"], "updateFlexDemo()")}<label>gap<input id="flexGap" type="range" min="0" max="40" value="12" oninput="updateFlexDemo()"></label></div><div id="flexStage" class="flex-stage">${[1,2,3,4,5].map((n) => `<span>${n}</span>`).join("")}</div><pre id="flexCss"></pre>`;
}

function gridDemo() {
  return `<div class="control-row">${select("gridCols", ["repeat(2, 1fr)","repeat(3, 1fr)","1fr 2fr","160px 1fr"], "updateGridDemo()")}${select("gridRows", ["auto","repeat(2, 90px)"], "updateGridDemo()")}<label>gap<input id="gridGap" type="range" min="0" max="36" value="12" oninput="updateGridDemo()"></label></div><div id="gridStage" class="grid-stage">${[1,2,3,4,5,6].map((n) => `<span>${n}</span>`).join("")}</div><pre id="gridCss"></pre>`;
}

function responsiveDemo() {
  return `<div class="device-buttons"><button onclick="setDevice(960)">Desktop</button><button onclick="setDevice(680)">Tablet</button><button onclick="setDevice(360)">Mobile</button></div><div class="device-frame" id="deviceFrame"><div class="responsive-cards"><article>Learn</article><article>Practice</article><article>Revise</article></div></div>`;
}

function select(id, values, handler) {
  return `<label>${id}<select id="${id}" onchange="${handler}">${values.map((v) => `<option>${v}</option>`).join("")}</select></label>`;
}

function exampleKey(lesson) {
  if (lesson.id.includes("form")) return "forms";
  if (lesson.id.includes("table")) return "tables";
  if (lesson.id.includes("box")) return "box";
  if (lesson.id.includes("flex")) return "flex";
  if (lesson.id.includes("grid")) return "grid";
  if (lesson.id.includes("animation")) return "animation";
  if (lesson.id.includes("responsive") || lesson.id.includes("media")) return "responsive";
  return "headings";
}
