import { elements, cheersMap, colorMap } from "./base.js";

// Expands the selected stage
export function expandsStage(stg) {
  
  // Reduce all stages
  elements.stages.forEach(e => {
  e.style.height = "50px";
  e.style.zIndex = "7";
  });
  elements.contents.forEach(e => {
    e.classList.add('hidden');
  })
  
  // Updates the scores
  elements.score.textContent = elements.actualScore;
  elements.hiscore.textContent = elements.record;

  // Expands and makes visible the content of the selected stage
  stg.style.height = '100%';
  stg.lastElementChild.classList.remove('hidden');
  
  if (stg.id === 'stage-1') {
    elements.inputWord.focus();
    elements.inputWord.value = "";
    elements.stage = 1;
  } else if (stg.id === 'stage-2') {
    updateSyllNumber(elements.syllNumber);
    elements.wordSpan.textContent = elements.wordString;
    elements.inputSyll.value = "";
    elements.inputSyll.focus();
    elements.stage = 2;
  } else if (stg.id === 'stage-3') {
    elements.stage = 3;
  }
}

// Render cheer
export function cheers(num) {

  // updates the score
  elements.actualScore += num;
  elements.score.textContent = elements.actualScore;

  // Choose random message
  let cheerMessage = cheersMap.get(Math.floor(Math.random() * (cheersMap.size) + 0));
  // Choose random color
  let cheerColor = colorMap.get(Math.floor(Math.random() * (colorMap.size) + 0));
  const markup = `
    <h2 class="cheer" style="color:${cheerColor}">${cheerMessage}</h2>
  `;

  new Audio(`./audio/001.mp3`).play();
  document.querySelector('.board').insertAdjacentHTML('afterbegin', markup);

  setTimeout(() => {
    const markup2 = `
    <h2 class="cheer" style="color:${cheerColor}">+${num}</h2>
  `;
  document.querySelector('.board').insertAdjacentHTML('afterbegin', markup2);
  }, 200);
}

// Render small cheer
export function syllCheers(num) {

  // updates the score
  elements.actualScore += num;
  elements.score.textContent = elements.actualScore;

  // Choose random color
  let cheerColor = colorMap.get(Math.floor(Math.random() * (colorMap.size) + 0));
  const markup = `
    <h2 class="small__cheer" style="color:${cheerColor}">+${num}</h2>
  `;
  
  new Audio(`./audio/002.mp3`).play();
  document.getElementById(`syll-${elements.syllNumber}`).insertAdjacentHTML('afterbegin', markup);
}


// If the user inputs a wrong word
export function wrongWord(w) {
  elements.stage = 0;
  new Audio(`./audio/003.mp3`).play();
  elements.stage1Text.textContent = `¡Ups! La palabra se escribe ${w}`;
  document.querySelectorAll('.instruction').forEach((e) => e.style.visibility = 'hidden');
  setTimeout(() => {
    elements.stage1Text.textContent = `¡Recordá cuidar la ortografía y agregar las tildes!`;
    document.querySelectorAll('.instruction').forEach((e) => e.style.visibility = 'visible');
  }, 2000);
}

// If the user inputs a wrong syllable
export function wrongSyll() {
  elements.stage = 0;
  elements.syllText.style.visibility = 'hidden';
  elements.stage2Text1.style.visibility = 'hidden';
  elements.inputSyll.style.visibility = 'hidden';
  new Audio(`./audio/003.mp3`).play();

  elements.stage2Text2.textContent = '¡Ouch! ¡Eso no parece estar bien!';
  setTimeout(() => {
    elements.syllText.style.visibility = 'visible';
    elements.stage2Text1.style.visibility = 'visible';
    elements.inputSyll.style.visibility = 'visible';
    elements.stage2Text2.textContent = 'Ahora tendrás que separarla en sílabas.';
    document.querySelectorAll('.syllable').forEach((e) => elements.containerSyll.removeChild(e));
  }, 2000);
}


export function updateSyllNumber(num) {
  if (num === 1) {
    elements.syllNumText.textContent = 'primera';
  } else if (num === 2) {
    elements.syllNumText.textContent = 'segunda';
  } else if (num === 3) {
    elements.syllNumText.textContent = 'tercera';
  } else if (num === 4) {
    elements.syllNumText.textContent = 'cuarta';
  } else if (num === 5) {
    elements.syllNumText.textContent = 'quinta';
  } else if (num === 6) {
    elements.syllNumText.textContent = 'sexta';
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
  
  export function accRight(type) {
    elements.stage3Text1.textContent = '¡Felicitaciones!';
    elements.stage3Text2.textContent = `La palabra ${elements.wordString} es ${type}.`;
    setTimeout(() => {
      new Audio(`./audio/final.mp3`).play();
      elements.stage3Text1.textContent = '¡Muy bien! Ya tenemos a la palabra dividida en sílabas.';
      elements.stage3Text2.textContent = 'Ahora tenemos que descubrir cuál es la sílaba tónica.';
      elements.inputSyll.style.visibility = 'visible';
      elements.syllText.style.visibility = 'visible';
      elements.stage = 0;
      elements.endStage2 = false;
      elements.syllNumber = 1;
      document.querySelectorAll('.syllable').forEach((e) => elements.containerSyll.removeChild(e));
      elements.container2.appendChild(elements.containerSyll);
    }, 2000);
  }
  
  // If the user inputs a wrong syllable
  export function accWrong(type) {
    elements.stage = 0;
    elements.stage3Text1.style.visibility = 'hidden';
    new Audio(`./audio/003.mp3`).play();
  
    elements.stage3Text2.textContent = `¡Oh, no! ¡La palabra ${elements.wordString} es ${type}!`;
    setTimeout(() => {
      elements.stage3Text1.style.visibility = 'visible';
      elements.stage3Text2.textContent = 'Ahora tenemos que descubrir cuál es la sílaba tónica.';
      elements.inputSyll.style.visibility = 'visible';
      elements.syllText.style.visibility = 'visible';
      elements.endStage2 = false;
      elements.syllNumber = 1;
      document.querySelectorAll('.syllable').forEach((e) => elements.containerSyll.removeChild(e));
      elements.container2.appendChild(elements.containerSyll);
    }, 2000);
  }

export function finish() {
  elements.stage = -1;
  // erase used word list
  elements.wordsArr.length = 0;
  const markup = `
    <div id="finish">
      <div id="text__finish">
        ¡Felicitaciones! ¡Lograste un nuevo record!
      </div>
      <p>Presioná "enter" para volver a jugar</p>
    </div>
  `;

  elements.board.insertAdjacentHTML('afterbegin', markup);
  if (elements.actualScore > elements.record) {
    elements.record = elements.actualScore;
  } else {
    document.getElementById('text__finish').textContent = '¡Volvé a intentarlo!';
  }
}