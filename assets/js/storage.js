const KEY_TOTAL = 'mmga_total';
const KEY_LAST = 'mmga_derniere';

export function loadTotal() {
  return parseInt(localStorage.getItem(KEY_TOTAL)) || 0;
}

export function loadLast() {
  return parseInt(localStorage.getItem(KEY_LAST)) || 0;
}

export function save(total, derniere) {
  localStorage.setItem(KEY_TOTAL, total);
  localStorage.setItem(KEY_LAST, derniere);
}