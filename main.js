import { elements, words } from "./base.js";
import { expandsStage, cheers, wrongWord, updateSyllNumber, renderSyll } from "./views.js"



/************
 * FUNCTIONS
 */

function playSound(palabra) {
  new Audio(`./audio/${palabra}.mp3`).play();
}

function selectWord() {
  return words[Math.floor(Math.random() * (words.length - 0) + 0)];
}

function init() {
  elements.word = selectWord();
  elements.wordString = elements.word[0].join('');
  elements.audioBtn.addEventListener('click', () => playSound(elements.wordString));
  expandsStage(elements.stage0);
}

function checkWord(w) {
  if (elements.wordString === w) {
    /*********
     * Animación CORRECTO
     */
    cheers(20);
    expandsStage(elements.stage2);
  } else {
    wrongWord(elements.wordString);
  }
}

function checkSyll(s) {
  if (s !== elements.word[0][elements.syllNumber - 1]) {
    console.log('Mal!!!!')
  }
  elements.inputSyll.value = "";
  elements.syllNumber++;
  updateSyllNumber(elements.syllNumber);
  renderSyll(s, elements.syllNumber);
  cheers(5);
  if (elements.syllNumber - 1 === elements.word[0].length) {
    elements.syllText.style.visibility = 'hidden';
    cheers(10);
    setTimeout(() => {
      expandsStage(elements.stage3);
    }, 1000);
  }
}

init();

elements.continue.addEventListener('click', () => {
  expandsStage(elements.stage1);
})

document.addEventListener('keydown', function keyEnter(e) {
  if (e.code === 'Enter' && elements.stage === 0) {
    expandsStage(elements.stage1);
  } else if (e.code === 'Enter' && elements.stage === 1) { 
    checkWord(elements.inputWord.value);
  } else if (e.code === 'Enter' && elements.stage === 2) {
    checkSyll(elements.inputSyll.value.toLowerCase());
  }
});

elements.machine.addEventListener('click', () => {
  checkWord(elements.inputWord.value);
});

