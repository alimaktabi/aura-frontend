export function compactFormat(
  value: Parameters<Intl.NumberFormat['format']>[0],
) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}
