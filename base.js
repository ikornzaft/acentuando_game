export const words = [
  [['fá', 'bri', 'ca'], 'esdrújula', 'syll-1'],
  [['ca', 'pa', 'ci', 'dad'], 'aguda', 'syll-4'],
  [['co', 'ci', 'na'], 'grave', 'syll-2'],
  [['he', 'la', 'de', 'ra'], 'grave', 'syll-3'],
  [['pi', 'za', 'rrón'], 'aguda', 'syll-3'], 
  [['pro', 'vin','cia'],'grave', 'syll-2'],
  [['bo', 'tín'], 'aguda', 'syll-2'],
  [['ha', 'cien', 'do'], 'grave', 'syll-2'],
  [['mar', 'cia', 'no'], 'grave', 'syll-2'],
  [['a', 'gu', 'ja'], 'grave', 'syll-2'],
  [['ca', 'mi', 'sa'], 'grave', 'syll-2'],
  [['te', 'lé', 'fo', 'no'], 'esdrújula', 'syll-2'],
  [['ja', 'bón'], 'aguda', 'syll-2'],
  [['fe', 'liz'], 'aguda', 'syll-2'],
  [['es', 'pan', 'ta', 'pá', 'ja', 'ros'], 'esdrújula', 'syll-4']
];

export const elements = {
  board: document.querySelector('.board'),
  stage0: document.getElementById('stage-0'),
  stage1: document.getElementById('stage-1'),
  stage2: document.getElementById('stage-2'),
  stage3: document.getElementById('stage-3'),
  stages: document.querySelectorAll('.stage'),
  score: document.getElementById('score'),
  hiscore: document.getElementById('hiscore'),
  contents: document.querySelectorAll('.content'),
  audioBtn: document.getElementById('icon__sound'),
  continue: document.getElementById('continue'),
  inputWord: document.getElementById('input__word'),
  inputSyll: document.getElementById('input__syll'),
  machine: document.querySelector('.machine'),
  stage1Text: document.getElementById('stage1__text'),
  stage2Text1: document.getElementById('stage2__text1'),
  stage2Text2: document.getElementById('stage2__text2'),
  stage3Text1: document.getElementById('stage3__text1'),
  stage3Text2: document.getElementById('stage3__text2'),
  wordSpan: document.getElementById('word'),
  syllText: document.getElementById('syll__text'),
  syllNumText: document.getElementById('syll__number'),
  containerSyll: document.querySelector('.container__syll'),
  syllables: document.querySelectorAll('.syllable'),
  container2: document.getElementById('content__stage2'),
  container3: document.getElementById('content__stage3'),
  stage: 0,
  word: '',
  wordString: '',
  wordsArr: [],
  endStage2: false,
  actualScore: 0,
  record: 0,
  syllNumber: 1,
}

export const cheersMap = new Map();
cheersMap.set(0, '¡Genial!');
cheersMap.set(1, '¡Excelente!');
cheersMap.set(2, '¡Muy bien!');
cheersMap.set(3, '¡Bien!');

export const colorMap = new Map();
colorMap.set(0, '#eb7a34');
colorMap.set(1, '#ebe834');
colorMap.set(2, '#4ced40');
colorMap.set(3, '#2b3cfc');
colorMap.set(4, '#fc2bf9');
colorMap.set(5, '#f5142a');