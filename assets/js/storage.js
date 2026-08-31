const KEY_TOTAL = 'mmga_total';
const KEY_LAST = 'mmga_last';

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

export function loadLast() {
  return readBig(KEY_LAST);
}

export function save(total, last) {
  localStorage.setItem(KEY_TOTAL, total.toString());
  localStorage.setItem(KEY_LAST, last.toString());
}