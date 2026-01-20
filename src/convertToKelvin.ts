import type { TemperatureUnit } from './Temperature';

function assertNever(x: never): never {
  throw new Error(`Unexpected unit: ${x}`);
}

/**
 * Converts a temperature value from any unit to Kelvin.
 * Throws a RangeError if the result would be negative.
 */
export function convertToKelvin(value: number, from: TemperatureUnit): number {
  let k: number;
  switch (from) {
    case 'kelvin':
      k = value;
      break;
    case 'celsius':
      k = value + 273.15;
      break;
    case 'fahrenheit':
      k = (value - 32) * (5 / 9) + 273.15;
      break;
    default:
      return assertNever(from);
  }
  if (k < 0) {
    throw new RangeError('Kelvin cannot be negative');
  }
  return k;
}
