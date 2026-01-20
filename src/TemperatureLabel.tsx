import React from 'react';
import { Text } from 'react-native';

import { useTemperature } from './TemperatureContext';

export type TemperatureLabelProps = Omit<
  React.ComponentPropsWithoutRef<typeof Text>,
  'children'
>;

export function TemperatureLabel({
  style,
  accessibilityLabel,
  ...rest
}: TemperatureLabelProps) {
  const { displayValue, unitSymbol } = useTemperature();
  const formatted = `${displayValue.toFixed(2)}${unitSymbol}`;

  return (
    <Text
      style={[
        {
          fontSize: 15,
          fontWeight: '600',
        },
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      {...rest}
    >
      {formatted}
    </Text>
  );
}
