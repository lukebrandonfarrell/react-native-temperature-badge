import type { TemperatureUnit } from './Temperature';

function assertNever(x: never): never {
  throw new Error(`Unexpected unit: ${x}`);
}

/**
 * Converts a temperature value from Kelvin to any unit.
 */
export function convertFromKelvin(kelvin: number, to: TemperatureUnit): number {
  switch (to) {
    case 'kelvin':
      return kelvin;
    case 'celsius':
      return kelvin - 273.15;
    case 'fahrenheit':
      return (kelvin - 273.15) * (9 / 5) + 32;
    default:
      return assertNever(to);
  }
}
