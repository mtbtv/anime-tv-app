export function cleanDescription(text) {
  if (!text) return 'No description available.';
  return text.replace(/<[^>]+>/g, '').substring(0, 180) + '...';
}

export function formatRating(score) {
  if (!score) return 'N/A';
  return (score / 10).toFixed(1);
}
