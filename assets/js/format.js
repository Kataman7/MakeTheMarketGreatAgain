const compact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 2
});

const full = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

export function formatUSD(n) {
  return Math.abs(n) >= 1e12 ? compact.format(n) : full.format(n);
}