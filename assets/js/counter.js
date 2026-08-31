import { formatUSD } from './format.js';

export function animate(el, from, to, prefix = '') {
  new window.countUp.CountUp(el, to, {
    startVal: from,
    duration: 0.4,
    formattingFn: (value) => prefix + formatUSD(Math.round(value))
  }).start();
}