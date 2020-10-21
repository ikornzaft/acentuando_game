import { elements, words } from "./base.js";
import { expandsStage, cheers, syllCheers, wrongWord, wrongSyll, updateSyllNumber, renderSyll, accRight } from "./views.js"

/************
 * FUNCTIONS
 */

function init() {
  elements.word = selectWord();
  elements.wordString = elements.word[0].join('');
  expandsStage(elements.stage0);
}

// Choose word
function selectWord() {
  return words[Math.floor(Math.random() * (words.length - 0) + 0)];
}

// Play word .mp3
function playSound(palabra) {
  new Audio(`./audio/${palabra}.mp3`).play();
}

// Check if the word is correctly spelled
function checkWord(w) {
  if (elements.wordString === w) {
    cheers(20);
    expandsStage(elements.stage2);
  } else {
    wrongWord(elements.wordString);
    setTimeout(() => {
      init();
    }, 2000);
  }
}

// Check the syllabes, one by one
function checkSyll(s) {
  console.log(elements.syllNumber);
  if (s !== elements.word[0][elements.syllNumber - 1]) {
    wrongSyll();
    elements.syllNumber = 1;
    setTimeout(() => {
      init();
    }, 2000);
  } else {
    updateSyllNumber(elements.syllNumber);
    renderSyll(s, elements.syllNumber);
    syllCheers(5);
    elements.syllNumber++;
  }
  elements.inputSyll.value = "";
  if (elements.syllNumber - 1 === elements.word[0].length) {
    elements.endStage2 = true;
    elements.inputSyll.style.visibility = 'hidden';
    elements.syllText.style.visibility = 'hidden';
    cheers(10);
    setTimeout(() => {
      expandsStage(elements.stage3);
      elements.container3.appendChild(elements.containerSyll);
      document.querySelectorAll('.syllable').forEach(e => e.classList.add('reactive'));
      elements.containerSyll.classList.add('reactive');
    }, 1000);
  }
}

function checkAccentuation(el) {
  if (elements.stage === 3) {
    if (el.target.id === elements.word[2] || el.target.closest('.syllable').id === elements.word[2]) {
      cheers(20);
      accRight(elements.word[1]);
      setTimeout(() => {
        init();
      }, 2000);
    }; 
  }
}

/*****************
 * EVENT LISTENERS
 */

elements.audioBtn.addEventListener('click', () => playSound(elements.wordString));

 // If "continue" is pressed, expands Stage 1
elements.continue.addEventListener('click', () => {
  expandsStage(elements.stage1);
})

document.addEventListener('keydown', function keyEnter(e) {
  if (e.code === 'Enter' && elements.stage === 0) {
    expandsStage(elements.stage1); // if stage = 0, expands Stage 1
  } else if (e.code === 'Enter' && elements.stage === 1) { 
    checkWord(elements.inputWord.value); // calls checkWord function passing inputWord value
  } else if (e.code === 'Enter' && elements.stage === 2 && !elements.endStage2) {
    checkSyll(elements.inputSyll.value.toLowerCase());
  }
});

elements.machine.addEventListener('click', () => {
  checkWord(elements.inputWord.value);
});

elements.containerSyll.addEventListener('click', el => checkAccentuation(el));


/************
 * Start game
 */

init();