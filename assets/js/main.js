import { loadTotal, loadLast, save } from './storage.js';
import { formatUSD } from './format.js';
import { parseAmount, isValidInput } from './parse.js';
import { animate } from './counter.js';
import { playCashout } from './sound.js';

const $total = document.getElementById('total');
const $last = document.getElementById('last-bid');
const $input = document.getElementById('amount');

let total = loadTotal();
let last = loadLast();

function render() {
  $total.textContent = 'TOTAL: ' + formatUSD(total);
  $last.textContent = formatUSD(last);
}

function bid() {
  const val = parseAmount($input.value);
  if (val === null) return;
  const prevTotal = total;
  const prevLast = last;
  total += val;
  last = val;
  save(total, last);
  playCashout();
  animate($total, prevTotal, total, 'TOTAL: ');
  animate($last, prevLast, last);
  $input.value = '';
  $input.classList.remove('invalid');
  $input.blur();
}

function reset() {
  const prevTotal = total;
  const prevLast = last;
  total = 0n;
  last = 0n;
  save(total, last);
  animate($total, prevTotal, total, 'TOTAL: ');
  animate($last, prevLast, last);
}

$input.addEventListener('input', () => {
  $input.classList.toggle('invalid', !isValidInput($input.value));
});

$input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') bid();
});

document.getElementById('btn-bid').addEventListener('click', bid);
document.getElementById('btn-reset').addEventListener('click', reset);

render();