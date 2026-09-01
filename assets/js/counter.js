import { formatUSD } from './format.js';

const STEPS = 1000n;

export function animate(el, from, to, prefix = '') {
  new window.countUp.CountUp(el, Number(STEPS), {
    startVal: 0,
    duration: 0.4,
    formattingFn: (value) => {
      const step = BigInt(Math.round(value));
      const current = from + ((to - from) * step) / STEPS;
      return prefix + formatUSD(current);
    }
  }).start();
}