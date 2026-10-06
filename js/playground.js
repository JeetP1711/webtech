function renderPlayground() {
  setCrumbs("Interactive Playground");
  app.innerHTML = `<section class="playground">
    <div class="playbar">
      <h1>HTML + CSS Playground</h1>
      <select id="exampleSelect" onchange="loadPlaygroundExample(this.value)">${Object.keys(playgroundExamples).map((k) => `<option value="${k}">${k}</option>`).join("")}</select>
      <button class="primary-btn" onclick="runCode()">Run</button>
      <button class="secondary-btn" onclick="resetPlayground()">Reset</button>
      <button class="secondary-btn" onclick="clearPlayground()">Clear</button>
    </div>
    <div class="editors">
      <label>HTML editor<textarea id="htmlEditor" spellcheck="false"></textarea></label>
      <label>CSS editor<textarea id="cssEditor" spellcheck="false"></textarea></label>
      <label>Preview<iframe id="preview" title="Code preview"></iframe></label>
    </div>
  </section>`;
  loadPlaygroundExample("headings");
}

function loadPlaygroundExample(key) {
  const ex = playgroundExamples[key] || playgroundExamples.headings;
  const html = document.getElementById("htmlEditor");
  const css = document.getElementById("cssEditor");
  if (html && css) {
    html.value = ex.html;
    css.value = ex.css;
    runCode();
  }
}

function runCode() {
  const html = document.getElementById("htmlEditor")?.value || "";
  const css = document.getElementById("cssEditor")?.value || "";
  const preview = document.getElementById("preview");
  if (!preview) return;
  preview.srcdoc = `<!DOCTYPE html><html><head><style>body{font-family:Arial;padding:16px;color:#111}${css}</style></head><body>${html}</body></html>`;
}

function resetPlayground() {
  const select = document.getElementById("exampleSelect");
  loadPlaygroundExample(select ? select.value : "headings");
}

function clearPlayground() {
  document.getElementById("htmlEditor").value = "";
  document.getElementById("cssEditor").value = "";
  runCode();
}

function runSnippet(id) {
  const lesson = lessonById(id);
  showModal("Live Result", `<div class="output"><strong>OUTPUT</strong><div>${lesson.code.includes("<") ? lesson.code : "This CSS is ready to paste into the playground CSS editor."}</div></div><p><strong>WHY THIS WORKS:</strong> ${lesson.definition}</p>`);
}


