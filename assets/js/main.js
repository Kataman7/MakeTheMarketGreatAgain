import { loadTotal, loadLast, save } from './storage.js';
import { formatUSD } from './format.js';
import { parseAmount, isValidInput } from './parse.js';
import { animate } from './counter.js';

const $total = document.getElementById('total');
const $derniere = document.getElementById('derniere');
const $input = document.getElementById('montant');

let total = loadTotal();
let derniere = loadLast();

function render() {
  $total.textContent = 'TOTAL: ' + formatUSD(total);
  $derniere.textContent = formatUSD(derniere);
}

function bid() {
  const val = parseAmount($input.value);
  if (isNaN(val)) return;
  const prevTotal = total;
  const prevDerniere = derniere;
  total += val;
  derniere = val;
  save(total, derniere);
  animate($total, prevTotal, total, 'TOTAL: ');
  animate($derniere, prevDerniere, derniere);
  $input.value = '';
  $input.classList.remove('invalid');
}

function reset() {
  const prevTotal = total;
  const prevDerniere = derniere;
  total = 0;
  derniere = 0;
  save(total, derniere);
  animate($total, prevTotal, total, 'TOTAL: ');
  animate($derniere, prevDerniere, derniere);
}

$input.addEventListener('input', () => {
  $input.classList.toggle('invalid', !isValidInput($input.value));
});

document.getElementById('btnEnchere').addEventListener('click', bid);
document.getElementById('btnReset').addEventListener('click', reset);

render();