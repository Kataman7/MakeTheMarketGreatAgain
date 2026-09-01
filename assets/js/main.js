import { loadTotal, loadLast, loadHistory, saveGame } from './storage.js';
import { formatUSD } from './format.js';
import { parseAmount, canAppend } from './parse.js';
import { animate } from './counter.js';
import { playCashout } from './sound.js';

const $total = document.getElementById('total');
const $last = document.getElementById('last-bid');
const $typed = document.getElementById('typed');
const $preview = document.getElementById('preview');
const $pending = document.getElementById('pending');
const $controls = document.getElementById('controls');
const $turns = document.getElementById('turns');
const $keypad = document.getElementById('keypad');

let total = loadTotal();
let last = loadLast();
let history = loadHistory();
let pending = null;
let typed = '';

function render() {
  $total.textContent = 'TOTAL: ' + formatUSD(total);
  $last.textContent = formatUSD(pending !== null ? pending : last);
  $turns.textContent = 'Turn ' + history.length;
  updateTyped();
}

function updateTyped() {
  $typed.textContent = typed === '' ? '0' : typed;
  updatePreview();
}

function updatePreview() {
  const val = parseAmount(typed);
  $preview.textContent = val === null ? '' : formatUSD(val);
}

function showPending() {
  $pending.classList.remove('hidden');
  $controls.classList.add('hidden');
}

function hidePending() {
  pending = null;
  $pending.classList.add('hidden');
  $controls.classList.remove('hidden');
}

function animateState(prevTotal, prevLast) {
  animate($total, prevTotal, total, 'TOTAL: ');
  animate($last, prevLast, last);
}

function clearTyped() {
  typed = '';
  updateTyped();
}

function appendKey(key) {
  if (!canAppend(typed, key)) return;
  typed += key;
  updateTyped();
}

function backspace() {
  typed = typed.slice(0, -1);
  updateTyped();
}

function bid() {
  const val = parseAmount(typed);
  if (val === null) return;
  pending = val;
  clearTyped();
  render();
  showPending();
}

function validate() {
  if (pending === null) return;
  const prevTotal = total;
  const prevLast = last;
  total += pending;
  last = pending;
  history.push(pending);
  saveGame(total, last, history);
  playCashout();
  hidePending();
  animateState(prevTotal, prevLast);
  render();
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
  saveGame(total, last, history);
  hidePending();
  animateState(prevTotal, prevLast);
  render();
  clearTyped();
}

$keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const key = btn.dataset.key;
  if (key === 'backspace') backspace();
  else appendKey(key);
});

document.getElementById('btn-bid').addEventListener('click', bid);
document.getElementById('btn-validate').addEventListener('click', validate);
document.getElementById('btn-cancel').addEventListener('click', cancel);
document.getElementById('btn-reset').addEventListener('click', reset);

render();