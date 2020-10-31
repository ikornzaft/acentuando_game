import { elements, wordsBase } from "./base.js";
import { expandsStage, cheers, syllCheers, wrongWord, wrongSyll, updateSyllNumber, renderSyll, accRight, accWrong, finish, champion } from "./views.js"

/************
 * FUNCTIONS
 */

function init() {
  elements.word = selectRandomWord();
  elements.wordString = elements.word[0].join('');
  elements.syllNumber = 1;
  expandsStage(elements.stage0);
}

// Choose word
function selectRandomWord() {
  if (elements.prevScore + 320 <= elements.actualScore) newLevel();
  do {
    elements.wordNum = Math.floor(Math.random() * (elements.actualLevelWords.length) + 0); // Le saqué el -0 después de length
  } while (elements.wordsArr.includes(elements.wordNum));
  elements.wordsArr.push(elements.wordNum);
  return elements.actualLevelWords[elements.wordNum];
}

// Level Up
function newLevel() {
  if (elements.level === 4) champion();
  
  // Change wallpaper
  elements.prevScore = elements.actualScore;
  elements.level++;
  document.body.style.backgroundImage = `url("./img/wallpaper-${elements.level}.jpg")`;
  elements.wordsArr.length = 0;
  elements.actualLevelWords = wordsBase[elements.level];
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
      finish();
    }, 2000);
  }
}

// Check the syllabes, one by one
function checkSyll(s) {
  if (s !== elements.word[0][elements.syllNumber - 1]) {
    wrongSyll();
    elements.syllNumber = 1;
    setTimeout(() => {
      finish();
    }, 2000);
  } else {
    updateSyllNumber(elements.syllNumber + 1);
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
    } else {
      accWrong(elements.word[1]);
      setTimeout(() => {
        finish();
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
    checkWord(elements.inputWord.value.toLowerCase()); // calls checkWord function passing inputWord value
  } else if (e.code === 'Enter' && elements.stage === 2 && !elements.endStage2) {
    checkSyll(elements.inputSyll.value.toLowerCase());
  } else if (e.code === 'Enter' && elements.stage < 0) {
    elements.stage = 0;
    elements.actualScore = 0;
    elements.board.removeChild(document.getElementById('finish'));
    document.body.style.backgroundImage = `url("./img/wallpaper-0.jpg")`;
    init();
  } else if (e.code === 'Space' && elements.stage === 0) {
    playSound(elements.wordString);
  }
});

elements.board.addEventListener('click', () => {
  if (elements.stage < 0) {
    elements.stage = 0;
    elements.actualScore = 0;
    elements.board.removeChild(document.getElementById('finish'));
    init();
  }
});

elements.machine.addEventListener('click', () => {
  checkWord(elements.inputWord.value);
});

elements.containerSyll.addEventListener('click', el => checkAccentuation(el));


/************
 * Start game
 */
window.addEventListener('load', () => {
  if (localStorage.getItem('hiScore')) {
    elements.record = localStorage.getItem('hiScore');
  } else {
    elements.record = 0;
  }
  elements.hiscore.textContent = elements.record;
});
init();