export type NormalizedProgress = {
  readonly clampedValue: number;
  readonly percentage: number;
};

export function normalizeProgress(
  value: number,
  min: number,
  max: number,
): NormalizedProgress {
  const rangeMin = Math.min(min, max);
  const rangeMax = Math.max(min, max);
  const clampedValue = Math.min(rangeMax, Math.max(rangeMin, value));
  const span = rangeMax - rangeMin;
  const percentage = span === 0 ? 100 : ((clampedValue - rangeMin) / span) * 100;

  return { clampedValue, percentage };
}
