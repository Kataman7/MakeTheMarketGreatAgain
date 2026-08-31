const SUFFIX = { k: 1e3, m: 1e6, b: 1e9, t: 1e12 };
const AMOUNT_RE = /^(\d+(?:\.\d+)?)\s*([kmbt])?$/;

export function isValidInput(str) {
  const v = str.trim().toLowerCase();
  return v === '' || AMOUNT_RE.test(v);
}

export function parseAmount(str) {
  const v = str.trim().toLowerCase();
  const match = v.match(AMOUNT_RE);
  if (!match) return NaN;
  const n = parseFloat(match[1]);
  const suffix = match[2];
  return suffix ? n * SUFFIX[suffix] : n;
}