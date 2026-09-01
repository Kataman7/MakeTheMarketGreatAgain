import { loadTotal, loadHistory, loadTurns, saveGame } from './storage.js';
import { formatCompact } from './format.js';
import { parseAmount, canAppend } from './parse.js';
import { animate } from './counter.js';
import { playCashout } from './sound.js';

const $total = document.getElementById('total');
const $bid = document.getElementById('bid-number');
const $preview = document.getElementById('preview-value');
const $pending = document.getElementById('pending');
const $controls = document.getElementById('controls');
const $turns = document.getElementById('turns');
const $keypad = document.getElementById('keypad');

let total = loadTotal();
let history = loadHistory();
let turns = loadTurns();
let pending = null;
let typed = '';

function renderTotal() {
  $total.textContent = formatCompact(total);
}

function renderTurns() {
  $turns.textContent = 'Turn ' + turns;
}

function render() {
  renderTotal();
  renderTurns();
  updatePreview();
}

function updatePreview() {
  const val = parseAmount(typed);
  $preview.textContent = val === null ? '' : formatCompact(val);
}

function showPending() {
  $pending.classList.remove('hidden');
  $controls.classList.add('hidden');
}

function hidePending() {
  $pending.classList.add('hidden');
  $controls.classList.remove('hidden');
}

function clearTyped() {
  typed = '';
  updatePreview();
}

function appendKey(key) {
  if (!canAppend(typed, key)) return;
  typed += key;
  updatePreview();
}

function backspace() {
  typed = typed.slice(0, -1);
  updatePreview();
}

function bid() {
  const val = parseAmount(typed);
  if (val === null) return;
  pending = val;
  clearTyped();
  animate($bid, 0n, pending, formatCompact);
  showPending();
}

function finishPending() {
  pending = null;
  hidePending();
  turns += 1n;
  saveGame(total, history, turns);
  renderTurns();
}

function validate() {
  if (pending === null) return;
  const prevTotal = total;
  const prevPending = pending;
  total += pending;
  history.push(pending);
  playCashout();
  finishPending();
  animate($bid, prevPending, 0n, formatCompact);
  animate($total, prevTotal, total, formatCompact);
}

function cancel() {
  if (pending === null) return;
  const prevPending = pending;
  finishPending();
  animate($bid, prevPending, 0n, formatCompact);
}

$keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const key = btn.dataset.key;
  if (key === 'backspace') backspace();
  else if (key === 'clear') clearTyped();
  else if (key === 'bid') bid();
  else appendKey(key);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') bid();
});

document.getElementById('btn-validate').addEventListener('click', validate);
document.getElementById('btn-cancel').addEventListener('click', cancel);

render();