const SUFFIX = { k: 3n, m: 6n, b: 9n, t: 12n };
const SUFFIX_KEYS = ['k', 'm', 'b', 't'];
const AMOUNT_RE = /^(-?\d+(?:\.\d+)?)\s*([kmbt])?$/;

export function canAppend(current, key) {
  if (SUFFIX_KEYS.some((s) => current.endsWith(s))) return false;
  if (key === '-') return current === '';
  if (SUFFIX_KEYS.includes(key)) return /\d/.test(current);
  return /^\d$/.test(key);
}

export function parseAmount(str) {
  const v = str.trim().toLowerCase();
  const match = v.match(AMOUNT_RE);
  if (!match) return null;
  const [, num, suffix] = match;
  const [intPart, fracPart = ''] = num.split('.');
  const frac = fracPart.replace(/0+$/, '');
  const exp = suffix ? SUFFIX[suffix] : 0n;
  const decimals = BigInt(frac.length);
  if (exp < decimals) return null;
  return BigInt(intPart + frac) * 10n ** (exp - decimals);
}