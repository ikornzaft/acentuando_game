export const words = [
  [['fá', 'bri', 'ca'], 0],
  [['ca', 'pa', 'ci', 'dad'], 2],
  [['co', 'ci', 'na'], 1],
  [['he', 'la', 'de', 'ra'], 1],
  [['pi', 'za', 'rrón'], 2], 
  [['pro', 'vin','cia'],1]
];

export const elements = {
  stage0: document.getElementById('stage-0'),
  stage1: document.getElementById('stage-1'),
  stage2: document.getElementById('stage-2'),
  stage3: document.getElementById('stage-3'),
  stages: document.querySelectorAll('.stage'),
  contents: document.querySelectorAll('.content'),
  audioBtn: document.getElementById('icon__sound'),
  continue: document.getElementById('continue'),
  inputWord: document.getElementById('input__word'),
  inputSyll: document.getElementById('input__syll'),
  machine: document.getElementById('img__machine'),
  wordSpan: document.getElementById('word'),
  syllText: document.getElementById('syll__text'),
  syllNumText: document.getElementById('syll__number'),
  containerSyll: document.querySelector('.container__syll'),
  stage: 0,
  word: '',
  wordString: '',
  syllNumber: 1
}
