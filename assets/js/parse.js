const AMOUNT_RE = /^-?\d+$/;

export function canAppend(current, key) {
  if (key === '-') return current === '';
  return /^\d$/.test(key);
}

export function parseAmount(str) {
  const v = str.trim();
  if (!AMOUNT_RE.test(v)) return null;
  return BigInt(v);
}