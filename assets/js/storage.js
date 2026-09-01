const KEY_TOTAL = 'mmga_total';
const KEY_HISTORY = 'mmga_history';

function readBig(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? BigInt(v) : 0n;
  } catch {
    return 0n;
  }
}

export function loadTotal() {
  return readBig(KEY_TOTAL);
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY_HISTORY);
    const arr = raw ? JSON.parse(raw) : [];
    return arr.map((v) => BigInt(v));
  } catch {
    return [];
  }
}

export function saveGame(total, history) {
  localStorage.setItem(KEY_TOTAL, total.toString());
  localStorage.setItem(KEY_HISTORY, JSON.stringify(history.map((v) => v.toString())));
}

export function reset() {
  localStorage.removeItem(KEY_TOTAL);
  localStorage.removeItem(KEY_HISTORY);
}