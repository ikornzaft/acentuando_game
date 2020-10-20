import { elements } from "./base.js";

export function expandsStage(stg) {
  
  
  elements.stages.forEach(e => {
  e.style.height = "50px";
  e.style.zIndex = "7";
  });
  elements.contents.forEach(e => {
    e.classList.add('hidden');
  })
  
  // stg.style.transition = 'height 0.4s ease-in';
  stg.style.height = '100%';
  stg.lastElementChild.classList.remove('hidden');
  
  if (stg.id === 'stage-1') {
    elements.inputWord.focus();
    elements.stage = 1;
  } else if (stg.id === 'stage-2') {
    elements.wordSpan.textContent = elements.wordString;
    elements.inputSyll.focus();
    elements.stage = 2;
  };
}

export function cheers(num) {
  console.log('Genial! ' + num);
}

export function wrongWord(w) {
  console.log('Mal. Era ' + w);
}

export function updateSyllNumber(num) {
  if (num === 2) {
    elements.syllNumText.textContent = 'segunda';
  } else if (num === 3) {
    elements.syllNumText.textContent = 'tercera';
  } else if (num === 4) {
    elements.syllNumText.textContent = 'cuarta';
  } else if (num === 5) {
    elements.syllNumText.textContent = 'segunda';
  };
}

export function renderSyll(syll, num) {
  const markup = `
  <div class="syllable" id="syll-${num}">
    <div class="skin" id="skin-${num}">
      <div>${syll.toLowerCase()}</div>
    </div>
  </div>
  `;

  elements.containerSyll.insertAdjacentHTML('afterbegin', markup);
}