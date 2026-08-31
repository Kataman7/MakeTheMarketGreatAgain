const SUFFIX = { k: 3n, m: 6n, b: 9n, t: 12n };
const AMOUNT_RE = /^(\d+(?:\.\d+)?)\s*([kmbt])?$/;

export function isValidInput(str) {
  const v = str.trim().toLowerCase();
  return v === '' || AMOUNT_RE.test(v);
}

export function parseAmount(str) {
  const v = str.trim().toLowerCase();
  const match = v.match(AMOUNT_RE);
  if (!match) return NaN;
  const [, num, suffix] = match;
  const [intPart, fracPart = ''] = num.split('.');
  const frac = fracPart.replace(/0+$/, '');
  const exp = suffix ? SUFFIX[suffix] : 0n;
  const decimals = BigInt(frac.length);
  if (exp < decimals) return NaN;
  return BigInt(intPart + frac) * 10n ** (exp - decimals);
}