import { loadHistory } from './storage.js';
import { formatUSD } from './format.js';

const $list = document.getElementById('history-list');
const history = loadHistory();

if (history.length === 0) {
  $list.innerHTML = '<li class="text-xl text-center">No bids yet</li>';
} else {
  history.forEach((bid, i) => {
    const li = document.createElement('li');
    li.className = 'py-2 border-b border-black/10 text-center';
    li.textContent = `${i + 1}. ${formatUSD(bid)}`;
    $list.appendChild(li);
  });
}