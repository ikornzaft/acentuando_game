import { elements, words } from "./base.js";
import { expandsStage } from "./views.js"



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
  let word = selectWord();
  console.log(word[0].join(''));
  elements.audioBtn.addEventListener('click', () => playSound(word[0].join('')));
  expandsStage(elements.stage0);
}

init();