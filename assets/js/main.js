import { loadTotal, loadLast, save, loadHistory, saveHistory } from './storage.js';
import { formatUSD, formatCompact } from './format.js';
import { parseAmount, isValidInput } from './parse.js';
import { animate } from './counter.js';
import { playCashout } from './sound.js';

const $total = document.getElementById('total');
const $last = document.getElementById('last-bid');
const $input = document.getElementById('amount');
const $pending = document.getElementById('pending');
const $pendingValue = document.getElementById('pending-value');
const $controls = document.getElementById('controls');

let total = loadTotal();
let last = loadLast();
let history = loadHistory();
let pending = null;

function render() {
  $total.textContent = 'TOTAL: ' + formatUSD(total);
  $last.textContent = formatUSD(pending !== null ? pending : last);
}

function showPending(value) {
  pending = value;
  $pendingValue.textContent = formatUSD(value);
  $pending.classList.remove('hidden');
  $controls.classList.add('hidden');
}

function hidePending() {
  pending = null;
  $pending.classList.add('hidden');
  $controls.classList.remove('hidden');
}

function bid() {
  const val = parseAmount($input.value);
  if (val === null) return;
  showPending(val);
  $input.value = '';
  $input.classList.remove('invalid');
  render();
}

function validate() {
  if (pending === null) return;
  const prevTotal = total;
  const prevLast = last;
  total += pending;
  last = pending;
  history.push(pending);
  save(total, last);
  saveHistory(history);
  playCashout();
  hidePending();
  animate($total, prevTotal, total, 'TOTAL: ');
  animate($last, prevLast, last);
  render();
  $input.blur();
}

function cancel() {
  hidePending();
  render();
}

function reset() {
  const prevTotal = total;
  const prevLast = last;
  total = 0n;
  last = 0n;
  history = [];
  pending = null;
  save(total, last);
  saveHistory(history);
  hidePending();
  animate($total, prevTotal, total, 'TOTAL: ');
  animate($last, prevLast, last);
  render();
  $input.value = '';
  $input.classList.remove('invalid');
}

let formatTimer;

$input.addEventListener('input', () => {
  $input.classList.toggle('invalid', !isValidInput($input.value));
  clearTimeout(formatTimer);
  formatTimer = setTimeout(() => {
    const raw = $input.value.trim().toLowerCase();
    if (/^-?\d+$/.test(raw)) {
      const n = BigInt(raw);
      const formatted = formatCompact(n);
      if (formatted !== raw) {
        $input.value = formatted;
        $input.setSelectionRange(formatted.length, formatted.length);
      }
    }
  }, 200);
});

$input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') bid();
});

document.getElementById('btn-bid').addEventListener('click', bid);
document.getElementById('btn-validate').addEventListener('click', validate);
document.getElementById('btn-cancel').addEventListener('click', cancel);
document.getElementById('btn-reset').addEventListener('click', reset);

render();