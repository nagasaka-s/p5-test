import { forEach } from 'lodash';

const Ease = {
  easeInOut: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
}
const DEFAULT_DURATION = 600;

export default class AnchorScroll {
  static init() {
    forEach(document.querySelectorAll('a[href^="#"]'), $target => {
      $target.addEventListener('click', event => AnchorScroll._onClick(event, $target));
    });
  }

  static scrollTo($goal, duration = DEFAULT_DURATION, offset = 0) {
    return new Promise(resolve => {
      const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
      const goalPosition = window.pageYOffset + $goal.getBoundingClientRect().top - offset;
      const startTime = performance.now();
      const loop = nowTime => {
        const advancedTime = nowTime - startTime;
        const progress = advancedTime / duration;
        const isComplete = progress >= 1;
        window.scrollTo(0, isComplete ? goalPosition : currentPosition + ((goalPosition - currentPosition) * Ease.easeInOut(progress)));
        if (!isComplete) window.requestAnimationFrame(loop);
        if (isComplete) resolve();
      }
      window.requestAnimationFrame(loop);
    });
  }

  static _onClick(event, $target) {
    const id = $target.getAttribute('href').replace('#', '');
    const $goal = document.getElementById(id);
    if (!$goal) return;
    event.preventDefault();
    event.stopPropagation();
    AnchorScroll.scrollTo($goal);
  }
}
