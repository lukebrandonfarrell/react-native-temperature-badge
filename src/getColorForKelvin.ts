/**
 * Gets the color for a given Kelvin temperature based on a color scale.
 * Returns the color of the highest scale entry that is less than or equal to the temperature.
 * If the temperature is below the lowest scale entry, returns the first color.
 * If the scale is empty, returns a default gray color.
 */
export function getColorForKelvin(
  kelvin: number,
  scale: ReadonlyArray<{ kelvin: number; color: string }>
): string {
  if (scale.length === 0) return '#94A3B8';
  const firstEntry = scale[0];
  if (!firstEntry) return '#94A3B8';
  if (kelvin < firstEntry.kelvin) return firstEntry.color;
  let i = 0;
  for (let j = 0; j < scale.length; j++) {
    const entry = scale[j];
    if (entry && entry.kelvin <= kelvin) i = j;
  }
  const selectedEntry = scale[i];
  if (!selectedEntry) return '#94A3B8';
  return selectedEntry.color;
}
