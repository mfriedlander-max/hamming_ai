export function formatScore(score: number): string {
  return `${Math.round(score * 10) / 10}/10`;
}

export function formatPercentage(score: number): string {
  return `${Math.round(score * 10)}%`;
}
