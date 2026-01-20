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
  if (kelvin < scale[0].kelvin) return scale[0].color;
  let i = 0;
  for (let j = 0; j < scale.length; j++) {
    if (scale[j].kelvin <= kelvin) i = j;
  }
  return scale[i].color;
}
