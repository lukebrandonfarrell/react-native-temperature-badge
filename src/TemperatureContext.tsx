import React, { createContext, useContext, useMemo } from 'react';

import { convertToKelvin } from './convertToKelvin';
import { Temperature } from './Temperature';

export type TemperatureUnit = 'fahrenheit' | 'kelvin' | 'celsius';

function assertNever(x: never): never {
  throw new Error(`Unexpected unit: ${x}`);
}

/** Band names for the default 6-step scale. Use with `colors` to override specific bands. */
export type DefaultScaleBand =
  | 'veryCold'
  | 'cold'
  | 'cool'
  | 'mild'
  | 'warm'
  | 'hot';

const K = (c: number) => c + 273.15;

type ResolvedColorScaleEntry = { kelvin: number; color: string };

/**
 * Default 6-band scale: very cold → cold → cool → mild → warm → hot.
 * Stored in Kelvin. Use as-is, override with `colors`, or replace with `colorScale`.
 */
export const DEFAULT_TEMPERATURE_COLOR_SCALE: ResolvedColorScaleEntry[] = [
  { kelvin: K(-10), color: '#94A3B8' },
  { kelvin: K(-10), color: '#7DD3FC' },
  { kelvin: K(5), color: '#A5F3FC' },
  { kelvin: K(15), color: '#A7F3D0' },
  { kelvin: K(25), color: '#FCD34D' },
  { kelvin: K(32), color: '#F87171' },
];

const DEFAULT_BAND_ORDER: DefaultScaleBand[] = [
  'veryCold',
  'cold',
  'cool',
  'mild',
  'warm',
  'hot',
];

/**
 * One step in a custom color scale. Use exactly one of celsius, fahrenheit, or kelvin.
 */
export type ColorScaleEntryInput =
  | { celsius: number; color: string }
  | { fahrenheit: number; color: string }
  | { kelvin: number; color: string };

export type TemperatureContextValue = {
  displayValue: number;
  displayUnit: TemperatureUnit;
  valueInKelvin: number;
  unitSymbol: string;
  colorScale: ResolvedColorScaleEntry[];
};

const TemperatureContext = createContext<TemperatureContextValue | null>(null);

export function useTemperature() {
  const ctx = useContext(TemperatureContext);
  if (!ctx) {
    throw new Error('TemperatureLabel and TemperatureFrame must be used within TemperatureProvider');
  }
  return ctx;
}

export type TemperatureProviderProps = {
  /** Value in the unit given by `display`. Use Temperature.convert() if your source is in another unit. */
  value: number;
  /** Unit of `value` and the unit to show in TemperatureLabel. No conversion is done; `value` must already be in this unit. */
  display: TemperatureUnit;
  /**
   * Override colours for specific bands on the default scale. Only listed bands are changed.
   * Ignored when `colorScale` is set.
   */
  colors?: Partial<Record<DefaultScaleBand, string>>;
  /**
   * Full scale override. Each entry uses celsius, fahrenheit, or kelvin (exactly one).
   * When set, `colors` is ignored.
   */
  colorScale?: ColorScaleEntryInput[];
  children: React.ReactNode;
};

function getUnitSymbol(unit: TemperatureUnit): string {
  switch (unit) {
    case 'fahrenheit':
      return '°F';
    case 'celsius':
      return '°C';
    case 'kelvin':
      return ' K';
    default:
      return assertNever(unit);
  }
}

function resolveColorScale(props: {
  colors?: Partial<Record<DefaultScaleBand, string>>;
  colorScale?: ColorScaleEntryInput[];
}): ResolvedColorScaleEntry[] {
  const { colors, colorScale } = props;
  if (colorScale != null && colorScale.length > 0) {
    return colorScale
      .map((e) => {
        let kelvin: number;
        if ('kelvin' in e) {
          kelvin = convertToKelvin(e.kelvin, 'kelvin');
        } else if ('celsius' in e) {
          kelvin = convertToKelvin(e.celsius, 'celsius');
        } else if ('fahrenheit' in e) {
          kelvin = convertToKelvin(e.fahrenheit, 'fahrenheit');
        } else {
          throw new Error('ColorScaleEntry must have celsius, fahrenheit, or kelvin');
        }
        return { kelvin, color: e.color };
      })
      .sort((a, b) => a.kelvin - b.kelvin);
  }
  if (colors != null && Object.keys(colors).length > 0) {
    return DEFAULT_TEMPERATURE_COLOR_SCALE.map((s, i) => {
      const band = DEFAULT_BAND_ORDER[i];
      return {
        ...s,
        color: band != null ? colors[band] ?? s.color : s.color,
      };
    });
  }
  return DEFAULT_TEMPERATURE_COLOR_SCALE;
}

export function TemperatureProvider({
  value,
  display,
  colors,
  colorScale,
  children,
}: TemperatureProviderProps) {
  const ctx = useMemo<TemperatureContextValue>(
    () => ({
      displayValue: value,
      displayUnit: display,
      valueInKelvin: Temperature.convert(value, { from: display, to: 'kelvin' }),
      unitSymbol: getUnitSymbol(display),
      colorScale: resolveColorScale({ colors, colorScale }),
    }),
    [value, display, colors, colorScale]
  );

  return (
    <TemperatureContext.Provider value={ctx}>{children}</TemperatureContext.Provider>
  );
}
