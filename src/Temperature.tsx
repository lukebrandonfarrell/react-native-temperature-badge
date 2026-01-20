import React from 'react';

import { convertFromKelvin } from './convertFromKelvin';
import { convertToKelvin } from './convertToKelvin';

export type TemperatureUnit = 'fahrenheit' | 'kelvin' | 'celsius';

export type ConvertOptions = {
  from: TemperatureUnit;
  to: TemperatureUnit;
};

/**
 * Imperative API: convert a temperature value between units.
 *
 * @example
 * Temperature.convert(32, { from: 'fahrenheit', to: 'celsius' }); // 0
 * Temperature.convert(273.15, { from: 'kelvin', to: 'celsius' }); // 0
 */
function convert(value: number, options: ConvertOptions): number {
  const { from, to } = options;
  if (from === to) return value;
  const k = convertToKelvin(value, from);
  return convertFromKelvin(k, to);
}

const Temperature: React.FC & { convert: typeof convert } = Object.assign(
  function Temperature() {
    return null;
  },
  { convert }
);

export { Temperature };
