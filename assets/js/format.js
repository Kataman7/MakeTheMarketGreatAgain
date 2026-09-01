const compact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 2
});

const compactPlain = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 2
});

export function formatUSD(n) {
  return compact.format(n);
}

export function formatCompact(n) {
  return compactPlain.format(n);
}