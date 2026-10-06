const topicSeeds = [
  ["html-intro", 1, "Introduction to HTML", "Beginner", "HTML is the markup language used to describe the structure and meaning of web pages.", "<p>Hello Web Technology</p>", "Use tags to wrap content so browsers and assistive tools understand the page."],
  ["html-structure", 1, "Structure of an HTML Document", "Beginner", "A valid HTML document has a doctype, root html element, metadata in head, and visible content in body.", "<!DOCTYPE html>\n<html>\n<head><title>My Page</title></head>\n<body><h1>Hello</h1></body>\n</html>", "The browser uses this skeleton to parse the page consistently."],
  ["html-headings", 1, "Headings", "Beginner", "Headings h1 to h6 create a meaningful outline for content.", "<h1>Main Heading</h1>\n<h2>Sub Heading</h2>", "Use one clear h1 and nested headings for sections."],
  ["html-paragraphs", 1, "Paragraphs", "Beginner", "Paragraphs group related sentences into readable text blocks.", "<p>HTML paragraphs separate text into meaningful blocks.</p>", "Whitespace in source is collapsed, so use tags for structure."],
  ["html-lists", 1, "Lists", "Beginner", "Lists organize related items as ordered, unordered, or description content.", "<ul><li>HTML</li><li>CSS</li></ul>\n<ol><li>Learn</li><li>Practice</li></ol>\n<dl><dt>CSS</dt><dd>Styles pages</dd></dl>", "Lists improve scanning and semantic meaning."],
  ["html-links", 1, "Links", "Beginner", "Links connect pages, files, email addresses, telephone numbers, and page sections.", "<a href=\"https://example.com\" target=\"_blank\">Visit</a>\n<a href=\"mailto:student@example.com\">Email</a>", "The href attribute defines the destination."],
  ["html-tables", 1, "Tables", "Intermediate", "Tables present row-and-column data using table, tr, th, td, caption, thead, tbody, and tfoot.", "<table><caption>Marks</caption><tr><th>Subject</th><th>Score</th></tr><tr><td>Web Tech</td><td>92</td></tr></table>", "Use tables for data, not page layout."],
  ["html-forms", 1, "Forms", "Intermediate", "Forms collect user input with labels, controls, grouping, and submit/reset actions.", "<form><label for=\"email\">Email</label><input id=\"email\" type=\"email\"><button>Submit</button></form>", "Labels make inputs accessible and easier to use."],
  ["html-multimedia", 1, "Multimedia Tags", "Intermediate", "HTML embeds audio, video, sources, and iframes for rich content.", "<video controls width=\"260\"><source src=\"movie.mp4\" type=\"video/mp4\"></video>\n<iframe title=\"Demo\" srcdoc=\"<p>Embedded page</p>\"></iframe>", "Use controls and fallback text for better access."],
  ["html-semantic", 1, "Semantic HTML", "Intermediate", "Semantic elements describe page regions and content purpose.", "<header>Header</header><nav>Menu</nav><main><article>Post</article></main><footer>Footer</footer>", "Semantic markup improves SEO, accessibility, and maintainability."],
  ["html-accessibility", 1, "Accessibility Concepts", "Intermediate", "Accessibility makes websites usable by people with different abilities and technologies.", "<img src=\"chart.png\" alt=\"Bar chart of quiz scores\">\n<label for=\"name\">Name</label><input id=\"name\">", "Use semantic HTML first, then ARIA only when needed."],
  ["html5-features", 1, "HTML5 Features", "Intermediate", "HTML5 introduced semantic elements, native media, form input types, canvas, storage, and better APIs.", "<input type=\"date\">\n<main><section>Modern page</section></main>", "HTML5 reduces plugin dependence and improves native browser features."],
  ["css-intro", 1, "Introduction to CSS", "Beginner", "CSS controls presentation: colors, spacing, typography, layout, and motion.", "p {\n  color: teal;\n  font-size: 18px;\n}", "HTML gives structure; CSS gives visual design."],
  ["css-selectors", 1, "CSS Selectors", "Intermediate", "Selectors target elements using universal, element, class, id, attribute, combinator, pseudo-class, and pseudo-element patterns.", ".card > h2:hover::after {\n  content: \" *\";\n}", "Specificity decides which rule wins when multiple rules match."],
  ["css-properties", 1, "CSS Properties and Values", "Beginner", "A CSS declaration pairs a property with a value.", ".box {\n  width: 200px;\n  padding: 20px;\n  border-radius: 8px;\n  box-shadow: 0 8px 20px #0002;\n}", "Properties describe what changes; values describe how."],
  ["css-inline", 1, "Inline CSS", "Beginner", "Inline CSS is written in the style attribute on one element.", "<p style=\"color: blue;\">Inline styled text</p>", "It is quick for demos but hard to maintain."],
  ["css-internal", 1, "Internal CSS", "Beginner", "Internal CSS is placed inside a style tag in the document head.", "<style>\n  h1 { color: navy; }\n</style>", "It is useful for single pages and examples."],
  ["css-external", 1, "External CSS", "Beginner", "External CSS lives in a separate .css file linked with link.", "<link rel=\"stylesheet\" href=\"style.css\">", "It is best for maintainable multi-page projects."],
  ["css-box-model", 1, "CSS Box Model", "Intermediate", "Every element box has content, padding, border, and margin.", ".box {\n  width: 180px;\n  padding: 24px;\n  border: 4px solid teal;\n  margin: 20px;\n  box-sizing: border-box;\n}", "Understanding the box model prevents layout surprises."],
  ["css-positioning", 1, "CSS Positioning Techniques", "Intermediate", "Positioning controls how elements are placed using static, relative, absolute, fixed, and sticky.", ".badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}", "Absolute elements use the nearest positioned ancestor."],
  ["css-display", 1, "CSS Display Properties", "Intermediate", "Display controls how elements participate in layout: block, inline, inline-block, none, flex, and grid.", ".toolbar { display: flex; gap: 12px; }", "Changing display can change sizing, wrapping, and child layout."],
  ["css-layout", 1, "CSS Layout Techniques", "Intermediate", "Modern layout combines normal flow, Flexbox, Grid, and positioning.", ".layout { display: grid; grid-template-columns: 240px 1fr; }", "Choose layout tools based on one-dimensional or two-dimensional needs."],
  ["css-transitions", 1, "CSS Transitions", "Intermediate", "Transitions animate property changes between states.", ".card { transition: transform .25s ease, box-shadow .25s ease; }\n.card:hover { transform: translateY(-4px); }", "Transitions need a start state, end state, and duration."],
  ["css-animations", 1, "CSS Animations", "Intermediate", "Animations use @keyframes and animation properties for repeated or staged movement.", "@keyframes pulse { from { opacity: .4; } to { opacity: 1; } }\n.dot { animation: pulse 1s infinite alternate; }", "Animations can run without user interaction."],
  ["sass-intro", 2, "Introduction to SASS", "Beginner", "SASS is a CSS preprocessor that adds variables, nesting, mixins, functions, and partials before compiling to CSS.", "$primary: teal;\n.button { color: $primary; }", "Browsers execute CSS, not SCSS; compilation happens before deployment."],
  ["sass-variables", 2, "SASS Variables", "Beginner", "SASS variables store reusable values such as colors, spacing, and font sizes.", "$gap: 16px;\n.card { padding: $gap; }", "Variables keep design values consistent."],
  ["sass-nesting", 2, "SASS Nesting", "Intermediate", "Nesting writes selectors inside related selectors to mirror HTML structure.", ".nav {\n  ul { margin: 0; }\n  li { list-style: none; }\n}", "Avoid nesting too deeply because output CSS can become overly specific."],
  ["sass-mixins", 2, "SASS Mixins", "Intermediate", "Mixins package reusable groups of declarations and can accept parameters.", "@mixin button-style($bg) { background: $bg; border-radius: 8px; }\n.btn { @include button-style(teal); }", "Mixins reduce repeated CSS patterns."],
  ["sass-functions", 2, "SASS Functions", "Intermediate", "SASS functions return computed values for use in declarations.", "@function double($n) { @return $n * 2; }\n.box { padding: double(8px); }", "Functions are useful for calculations and design systems."],
  ["sass-partials", 2, "SASS Partials", "Intermediate", "Partials split SCSS into files such as _variables.scss and are imported or used in a main file.", "@use 'variables';\n.card { color: variables.$primary; }", "Partials make large stylesheets modular."],
  ["bootstrap-basics", 2, "Bootstrap Basics", "Beginner", "Bootstrap is a CSS framework offering prebuilt layout, components, and responsive utilities.", "<div class=\"container\"><div class=\"row\"><div class=\"col\">Column</div></div></div>", "Frameworks speed development, but this app demonstrates concepts without loading Bootstrap."],
  ["media-queries", 2, "Media Queries", "Intermediate", "Media queries apply CSS when device or viewport conditions are true.", "@media (max-width: 768px) {\n  .container { flex-direction: column; }\n}", "They are central to responsive design."],
  ["responsive-principles", 2, "Responsive Design Principles", "Intermediate", "Responsive design uses flexible layouts, fluid media, relative units, and breakpoints.", "img { max-width: 100%; height: auto; }\n.wrapper { width: min(100% - 2rem, 1100px); }", "Good responsive interfaces adapt without horizontal overflow."],
  ["mobile-first", 2, "Mobile-First Design", "Intermediate", "Mobile-first starts with small screens, then enhances layouts with min-width media queries.", ".card { width: 100%; }\n@media (min-width: 768px) { .card { width: 50%; } }", "It prioritizes essential content and simpler base CSS."],
  ["flexbox", 2, "Flexbox", "Intermediate", "Flexbox lays out items along a main axis with powerful alignment and wrapping controls.", ".row { display: flex; justify-content: center; align-items: center; gap: 1rem; }", "Use Flexbox for one-dimensional rows or columns."],
  ["css-grid", 2, "CSS Grid", "Intermediate", "CSS Grid creates two-dimensional rows and columns for page and component layout.", ".grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }", "Use Grid when rows and columns both matter."],
  ["responsive-interface", 2, "Responsive Web Interface Development", "Advanced", "A responsive interface combines semantic HTML, modular CSS, Flexbox, Grid, media queries, transitions, and accessible controls.", "<main class=\"student-dashboard\"><section class=\"cards\">...</section></main>", "This topic integrates the full syllabus into a practical project."]
];

const comparisons = [
  ["HTML vs HTML5", "HTML is the markup family; HTML5 is the modern version with semantic tags, media, form inputs, and APIs."],
  ["Inline vs Internal vs External CSS", "Inline is per element, internal is per document, external is reusable across files."],
  ["Margin vs Padding", "Margin is outside the border; padding is inside the border around content."],
  ["Relative vs Absolute", "Relative offsets from its normal position; absolute positions against a positioned ancestor."],
  ["Block vs Inline vs Inline-block", "Block starts a new line, inline flows with text, inline-block flows inline but accepts width and height."],
  ["Flexbox vs Grid", "Flexbox is one-dimensional; Grid is two-dimensional."],
  ["CSS vs SASS", "CSS runs in browsers; SASS compiles into CSS before browsers read it."],
  ["CSS vs Bootstrap", "CSS is the language; Bootstrap is a framework built with CSS classes."],
  ["Desktop-first vs Mobile-first", "Desktop-first scales down; mobile-first starts small and enhances upward."],
  ["Semantic vs Non-semantic HTML", "Semantic tags reveal meaning; non-semantic div/span tags need context or ARIA."]
];

function makeLesson(seed) {
  const [id, unit, title, difficulty, definition, code, visual] = seed;
  const isHtml = id.startsWith("html");
  const isCss = id.startsWith("css") || ["media-queries", "responsive-principles", "mobile-first", "flexbox", "css-grid", "responsive-interface", "bootstrap-basics"].includes(id);
  const isSass = id.startsWith("sass");
  return {
    id, unit, title, difficulty, definition, code,
    category: isHtml ? "HTML" : isSass ? "SASS" : isCss ? "CSS" : "Responsive Design",
    why: `${title} matters because exam questions often test both vocabulary and practical usage. In real projects, this concept helps you write pages that are understandable, maintainable, accessible, and responsive.`,
    concepts: [
      `Core purpose: ${definition}`,
      "Syntax must be correct because browsers recover from some errors but exams expect precise answers.",
      "Readable structure is as important as visual output.",
      "Accessibility and responsive behavior should be considered from the beginning."
    ],
    syntax: code,
    lineByLine: code.split("\n").slice(0, 6).map((line, i) => `Line ${i + 1}: ${line.replace(/</g, "&lt;").replace(/>/g, "&gt;")} - demonstrates part of ${title}.`),
    visual,
    realWorld: `${title} appears in student dashboards, college portals, forms, article pages, documentation, and responsive course pages like this one.`,
    mistakes: [
      "Memorizing syntax without understanding when to use it.",
      "Ignoring semantic meaning and accessibility.",
      "Writing styles or markup that only works on one screen size."
    ],
    examPoints: [
      `Define ${title} in one or two clear lines.`,
      "Write a valid syntax example.",
      "Mention one real use case and one common mistake.",
      "Compare it with a related concept when possible."
    ],
    revision: `${title}: ${definition} Remember syntax, purpose, mistakes, and one exam-ready example.`,
    task: `Try it yourself: create a small example that uses ${title}, then explain each line in your own words.`,
    questions: []
  };
}

const lessons = topicSeeds.map(makeLesson);

const questionBank = [];
lessons.forEach((lesson) => {
  const base = [
    [`What is the main purpose of ${lesson.title}?`, [lesson.definition, "To store server data", "To compile JavaScript", "To replace the browser"], 0],
    [`Which category best matches ${lesson.title}?`, [lesson.category, "Database", "Operating System", "Networking only"], 0],
    [`Why is ${lesson.title} important for exams?`, ["It combines definition, syntax, and use cases.", "It is never asked.", "It only works with a backend.", "It requires React."], 0],
    [`Which practice is best for ${lesson.title}?`, ["Use valid, readable, accessible code.", "Avoid labels and semantics.", "Hard-code only for desktop.", "Skip examples."], 0],
    [`A common mistake in ${lesson.title} is:`, [lesson.mistakes[0], "Writing clear syntax", "Testing output", "Using semantic structure"], 0],
    [`True or False: ${lesson.title} should be learned with code examples.`, ["True", "False"], 0],
    [`Which item belongs in an exam answer about ${lesson.title}?`, ["Definition, syntax, example, and mistake", "Only decoration", "Only a screenshot", "Only a file name"], 0],
    [`In a project, ${lesson.title} helps mainly with:`, [lesson.realWorld, "Deleting files", "Installing databases", "Changing hardware"], 0],
    [`Which explanation is technically safest?`, [lesson.revision, "It has no syntax.", "It is unrelated to websites.", "It needs a backend."], 0],
    [`Find the better mini task for ${lesson.title}.`, [lesson.task, "Close the browser.", "Install a server.", "Ignore output."], 0]
  ];
  base.forEach((q, idx) => questionBank.push({
    id: `${lesson.id}-q${idx + 1}`,
    question: q[0],
    options: q[1],
    answer: q[2],
    explanation: `${lesson.title}: ${lesson.definition}`,
    topic: lesson.id,
    unit: lesson.unit,
    type: idx % 5 === 0 ? "MCQ" : idx % 5 === 1 ? "True/False" : idx % 5 === 2 ? "Scenario" : idx % 5 === 3 ? "Which is correct?" : "Find the error"
  }));
});

const flashcards = lessons.flatMap((lesson) => [
  { id: `${lesson.id}-f1`, topic: lesson.id, front: `What is ${lesson.title}?`, back: lesson.definition },
  { id: `${lesson.id}-f2`, topic: lesson.id, front: `Why is ${lesson.title} important?`, back: lesson.why },
  { id: `${lesson.id}-f3`, topic: lesson.id, front: `Syntax for ${lesson.title}`, back: lesson.syntax },
  { id: `${lesson.id}-f4`, topic: lesson.id, front: `Common mistake in ${lesson.title}`, back: lesson.mistakes[0] },
  { id: `${lesson.id}-f5`, topic: lesson.id, front: `Exam point for ${lesson.title}`, back: lesson.examPoints[0] }
]);

const cheatSheets = [
  { title: "HTML Cheat Sheet", items: ["Document: <!DOCTYPE html>, html, head, title, body", "Text: h1-h6, p, strong, em", "Lists: ul, ol, li, dl, dt, dd", "Links: a href, target, mailto, tel", "Tables: table, caption, thead, tbody, tr, th, td, rowspan, colspan"] },
  { title: "CSS Cheat Sheet", items: ["Syntax: selector { property: value; }", "Box: width, height, margin, padding, border", "Text: color, font-size, line-height, text-align", "Visual: background, border-radius, box-shadow, opacity", "Motion: transition, transform, animation"] },
  { title: "SASS Cheat Sheet", items: ["Variables: $primary: teal;", "Nesting: .nav { li { ... } }", "Mixin: @mixin name($arg) { ... }", "Function: @function name($x) { @return $x; }", "Partials: _file.scss with @use"] },
  { title: "Flexbox Cheat Sheet", items: ["display: flex", "flex-direction controls main axis", "justify-content aligns on main axis", "align-items aligns on cross axis", "gap adds spacing"] },
  { title: "Grid Cheat Sheet", items: ["display: grid", "grid-template-columns defines columns", "grid-template-rows defines rows", "grid-column and grid-row place items", "fr distributes free space"] },
  { title: "Responsive Design Cheat Sheet", items: ["Use viewport meta tag", "Use relative units", "Use max-width: 100% for images", "Use media queries for breakpoints", "Prefer mobile-first min-width queries"] },
  { title: "Selectors Cheat Sheet", items: ["* universal", "p element", ".card class", "#main id", "[type=email] attribute", "a:hover pseudo-class", "p::first-line pseudo-element"] },
  { title: "Forms Cheat Sheet", items: ["label for matches input id", "input types: text, password, email, number, radio, checkbox, date, file, submit, reset", "textarea for multi-line", "select and option for dropdown", "fieldset and legend group controls"] }
];

const importantQuestions = [
  "Explain the structure of an HTML document with code.",
  "Explain semantic HTML and compare semantic and non-semantic elements.",
  "Describe accessibility concepts: alt text, labels, ARIA basics, keyboard access, and form accessibility.",
  "Explain the CSS box model with content, padding, border, margin, and box-sizing.",
  "Differentiate inline, internal, and external CSS.",
  "Explain CSS positioning: static, relative, absolute, fixed, and sticky.",
  "Differentiate Flexbox and Grid with examples.",
  "Explain media queries and responsive design principles.",
  "Explain mobile-first design with code.",
  "Explain SASS variables, nesting, mixins, functions, partials, and compilation.",
  "Explain Bootstrap grid, containers, rows, columns, cards, buttons, navbar, and responsive utilities.",
  "Create a responsive student dashboard using semantic HTML, CSS Grid, Flexbox, transitions, and media queries."
];

const playgroundExamples = {
  headings: { html: "<h1>Main Heading</h1>\n<h2>Sub Heading</h2>\n<p>A clear page outline helps readers.</p>", css: "body { font-family: Arial; }\nh1 { color: #0f766e; }" },
  forms: { html: "<form>\n  <label>Name <input type=\"text\"></label>\n  <label>Email <input type=\"email\"></label>\n  <button>Submit</button>\n</form>", css: "form { display: grid; gap: 12px; max-width: 320px; }\ninput { padding: 10px; }" },
  tables: { html: "<table><caption>Scores</caption><tr><th>Topic</th><th>Marks</th></tr><tr><td>HTML</td><td>18</td></tr></table>", css: "table { border-collapse: collapse; }\nth, td { border: 1px solid #888; padding: 8px; }" },
  box: { html: "<div class=\"box\">Box Model</div>", css: ".box { width: 180px; padding: 24px; border: 4px solid #0f766e; margin: 20px; background: #ccfbf1; }" },
  flex: { html: "<div class=\"row\"><span>1</span><span>2</span><span>3</span></div>", css: ".row { display: flex; justify-content: center; gap: 12px; }\nspan { padding: 16px; background: #38bdf8; }" },
  grid: { html: "<div class=\"grid\"><span>1</span><span>2</span><span>3</span><span>4</span></div>", css: ".grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }\nspan { padding: 20px; background: #99f6e4; }" },
  responsive: { html: "<section class=\"cards\"><article>HTML</article><article>CSS</article><article>SASS</article></section>", css: ".cards { display: grid; gap: 12px; }\narticle { padding: 20px; background: #e0f2fe; }\n@media (min-width: 700px) { .cards { grid-template-columns: repeat(3, 1fr); } }" },
  animation: { html: "<div class=\"ball\"></div>", css: ".ball { width: 60px; height: 60px; border-radius: 50%; background: #0ea5e9; animation: bounce .8s infinite alternate; }\n@keyframes bounce { to { transform: translateY(90px); } }" }
};
