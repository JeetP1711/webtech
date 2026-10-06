let flashDeck = [];
let flashIndex = 0;
let flipped = false;

function renderFlashcards(topicId) {
  setCrumbs("Flashcards");
  flashDeck = flashcards.filter((c) => !topicId || c.topic === topicId);
  if (!flashDeck.length) flashDeck = flashcards;
  flashIndex = 0;
  flipped = false;
  drawFlashcard();
}

function drawFlashcard() {
  const state = loadProgress();
  const card = flashDeck[flashIndex];
  app.innerHTML = `<section class="flash-wrap">
    <div class="flash-meta"><span>${flashIndex + 1}/${flashDeck.length}</span><span>Known ${state.flashKnown.length}</span><span>Difficult ${state.flashDifficult.length}</span></div>
    <button class="flashcard ${flipped ? "flipped" : ""}" onclick="flipCard()" aria-label="Flip flashcard">
      <span>${flipped ? card.back : card.front}</span>
    </button>
    <div class="inline-actions">
      <button class="secondary-btn" onclick="prevFlash()">Previous</button>
      <button class="secondary-btn" onclick="shuffleFlash()">Shuffle</button>
      <button class="secondary-btn" onclick="markFlash('difficult')">Mark Difficult</button>
      <button class="primary-btn" onclick="markFlash('known')">Mark Known</button>
      <button class="secondary-btn" onclick="resetFlash()">Reset</button>
      <button class="secondary-btn" onclick="nextFlash()">Next</button>
    </div>
  </section>`;
}

function flipCard() { flipped = !flipped; drawFlashcard(); }
function nextFlash() { flashIndex = (flashIndex + 1) % flashDeck.length; flipped = false; drawFlashcard(); }
function prevFlash() { flashIndex = (flashIndex - 1 + flashDeck.length) % flashDeck.length; flipped = false; drawFlashcard(); }
function shuffleFlash() { flashDeck = shuffle(flashDeck); flashIndex = 0; flipped = false; drawFlashcard(); }
function markFlash(kind) {
  const state = loadProgress();
  const id = flashDeck[flashIndex].id;
  const key = kind === "known" ? "flashKnown" : "flashDifficult";
  if (!state[key].includes(id)) state[key].push(id);
  saveProgress(state);
  showToast(kind === "known" ? "Marked known." : "Marked difficult.");
  nextFlash();
}
function resetFlash() {
  const state = loadProgress();
  state.flashKnown = [];
  state.flashDifficult = [];
  saveProgress(state);
  drawFlashcard();
}
