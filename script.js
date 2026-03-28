/* =========================================
   COZY BIRTHDAY APP
   ========================================= */

/* =========================
   ASSET FILES
   ========================= */
const ASSETS = {
  girl: "assets/images/girl.gif",
  cat: "assets/images/catgif.gif",

  strawberry: "assets/images/strawberry.gif",
  blue: "assets/images/ball.gif",      
  pooshy: "assets/images/poop.gif",

  strawberrycake: "assets/images/strawberrycake.gif",
  poop: "assets/images/pooshy.gif",     
  diamond: "assets/images/diamond.gif"
};

/* =========================
   GRAB HTML ELEMENTS
   ========================= */
const startScreen = document.getElementById("start-screen");
const catScreen = document.getElementById("cat-screen");
const pickScreen = document.getElementById("pick-screen");
const endingScreen = document.getElementById("ending-screen");

const startBtn = document.getElementById("start-btn");
const catNextBtn = document.getElementById("cat-next-btn");
const replayBtn = document.getElementById("replay-btn");

const girlGif = document.getElementById("girl-gif");
const catGif = document.getElementById("cat-gif");

const speechBubble = document.getElementById("speech-bubble");

const choiceStrawberry = document.getElementById("choice-strawberry");
const choiceBlue = document.getElementById("choice-blue");
const choicePooshy = document.getElementById("choice-pooshy");

const endingGif = document.getElementById("ending-gif");
const endingTitle = document.getElementById("ending-title");
const endingText = document.getElementById("ending-text");
const floatingContainer = document.getElementById("floating-container");

const choiceButtons = document.querySelectorAll(".choice");
const chooseAgainBtn = document.getElementById("choose-again-btn");

let floatInterval = null;

/* =========================
   LOAD IMAGE FILES
   -------------------------
   This is why gif/png both work:
   we are not hardcoding one extension.
   ========================= */
function loadAssets() {
  girlGif.src = ASSETS.girl;
  catGif.src = ASSETS.cat;

  choiceStrawberry.src = ASSETS.strawberry;
  choiceBlue.src = ASSETS.blue;
  choicePooshy.src = ASSETS.pooshy;
}

loadAssets();

/* =========================
   SHOW ONE SCREEN
   ========================= */
function showScreen(screenToShow) {
  const allScreens = [startScreen, catScreen, pickScreen, endingScreen];

  allScreens.forEach((screen) => {
    screen.classList.add("hidden");
    screen.classList.remove("fade-in");
  });

  screenToShow.classList.remove("hidden");
  screenToShow.classList.add("fade-in");
}

/* =========================
   START BUTTON
   ========================= */
startBtn.addEventListener("click", () => {
  showScreen(catScreen);
  playMeowSound();

  setTimeout(() => {
    catNextBtn.classList.remove("hidden");
  }, 1500);
});

/* =========================
   CAT NEXT BUTTON
   ========================= */
catNextBtn.addEventListener("click", () => {
  showScreen(pickScreen);
});

/* =========================
   CHOICE BUTTONS
   ========================= */
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedChoice = button.dataset.choice;
    showEnding(selectedChoice);
  });
});

chooseAgainBtn.addEventListener("click", () => {
  showScreen(pickScreen);

  // stop floating effect
  if (floatInterval) {
    clearInterval(floatInterval);
  }

  floatingContainer.innerHTML = "";
});

/* =========================
   SHOW ENDING
   ========================= */
function showEnding(choice) {
  showScreen(endingScreen);
  endingGif.classList.remove("strawberry-big");
  floatingContainer.innerHTML = "";

  if (floatInterval) {
    clearInterval(floatInterval);
  }

  if (choice === "strawberry") {
    endingGif.src = ASSETS.strawberrycake;
    endingGif.classList.add("strawberry-big");
    endingTitle.textContent = "Sweet Strawberry";
    endingText.textContent =
      "Soft, Sweet, Adorable choice. Birthday energy embued with sparkles and warmth. Happy 24th Birthday😊";

    startFloating([
      ASSETS.strawberry
    ]);

    playVictoryTune("strawberry");
  }

  else if (choice === "blue") {
    endingGif.src = ASSETS.diamond;
    endingTitle.textContent = "Dangerous Dia";
    endingText.textContent =
      "Shiny, Cool, Addicitive drop. You've unlocked infinite rock solid wealth.";

    startFloating([
      ASSETS.blue
    ]);

    playVictoryTune("blue");
  }

  else if (choice === "pooshy") {
    endingGif.src = ASSETS.poop;
    endingTitle.textContent = "Awwn ur poke made poo shy UwU";
    endingText.textContent =
      "Tho....Not judging at all. But yes, Iconic choice. Slightly Cursed. Enormous deeply powerful being homing in on you, and honestly unforgettable.";

    startFloating([
      ASSETS.pooshy
    ]);

    playVictoryTune("pooshy");
  }
}

/* =========================
   FLOATING STICKER EFFECT
   ========================= */
function startFloating(imagePool) {
  floatInterval = setInterval(() => {
    spawnFloatItem(imagePool);
  }, 350);
}

function spawnFloatItem(imagePool) {
  const img = document.createElement("img");
  img.className = "float-item";

  const randomImage = imagePool[Math.floor(Math.random() * imagePool.length)];
  img.src = randomImage;

  img.style.left = `${Math.random() * 88}%`;
  img.style.top = `${72 + Math.random() * 16}%`;

  const randomSize = 24 + Math.random() * 22;
  img.style.width = `${randomSize}px`;

  floatingContainer.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, 3400);
}

/* =========================
   REPLAY
   ========================= */
replayBtn.addEventListener("click", () => {
  window.location.reload();
});

/* =========================
   SOUND: MEOW
   ========================= */
function playMeowSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContextClass();

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc1.type = "square";
  osc2.type = "triangle";

  osc1.frequency.setValueAtTime(540, audioCtx.currentTime);
  osc1.frequency.exponentialRampToValueAtTime(360, audioCtx.currentTime + 0.22);

  osc2.frequency.setValueAtTime(700, audioCtx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(470, audioCtx.currentTime + 0.22);

  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.24);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(audioCtx.destination);

  osc1.start();
  osc2.start();

  osc1.stop(audioCtx.currentTime + 0.25);
  osc2.stop(audioCtx.currentTime + 0.25);
}

/* =========================
   SOUND: VICTORY TUNE
   ========================= */
function playVictoryTune(type) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContextClass();

  let notes = [];

  if (type === "strawberry") {
    notes = [523.25, 659.25, 783.99, 1046.5];
  } else if (type === "blue") {
    notes = [392.0, 523.25, 659.25, 783.99];
  } else {
    notes = [330.0, 294.0, 392.0, 261.63];
  }

  notes.forEach((freq, i) => {
    const startTime = audioCtx.currentTime + i * 0.16;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.05, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.14);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.15);
  });
}