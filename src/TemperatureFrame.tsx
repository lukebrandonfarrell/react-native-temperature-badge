import React from 'react';
import { Pressable } from 'react-native';

import { getColorForKelvin } from './getColorForKelvin';
import type { TemperatureUnit } from './TemperatureContext';
import { useTemperature } from './TemperatureContext';

const unitName: Record<TemperatureUnit, string> = {
  celsius: 'Celsius',
  fahrenheit: 'Fahrenheit',
  kelvin: 'Kelvin',
};

export type TemperatureFrameProps = {
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Pressable>, 'children'>;

export function TemperatureFrame({
  children,
  style,
  accessible = true,
  accessibilityLabel,
  ...rest
}: TemperatureFrameProps) {
  const { valueInKelvin, displayValue, displayUnit, colorScale } =
    useTemperature();
  const backgroundColor = getColorForKelvin(valueInKelvin, colorScale);
  const defaultAccessibilityLabel = `${displayValue.toFixed(2)} degrees ${
    unitName[displayUnit]
  }`;

  const baseStyle = {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start' as const,
    backgroundColor,
  };

  return (
    <Pressable
      accessible={accessible}
      accessibilityLabel={accessibilityLabel ?? defaultAccessibilityLabel}
      style={
        typeof style === 'function'
          ? (state) => [baseStyle, style(state)]
          : [baseStyle, style]
      }
      {...rest}
    >
      {children}
    </Pressable>
  );
}
