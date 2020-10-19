import { elements } from "./base.js";

export function expandsStage(stg) {
  elements.stages.forEach(e => {
    e.style.height = "50px";
  });
  elements.contents.forEach(e => {
    e.classList.add('hidden');
  })
  
  stg.style.transition = 'height 0.5s ease-in';
  stg.style.height = '100%';
  stg.lastElementChild.classList.remove('hidden');
}