import { convertToKelvin } from '../convertToKelvin';

describe('convertToKelvin', () => {
  it('should convert kelvin to kelvin (no change)', () => {
    expect(convertToKelvin(273.15, 'kelvin')).toBe(273.15);
  });

  it('should convert celsius to kelvin', () => {
    expect(convertToKelvin(0, 'celsius')).toBe(273.15);
  });

  it('should convert celsius to kelvin (negative value)', () => {
    expect(convertToKelvin(-10, 'celsius')).toBe(263.15);
  });

  it('should convert fahrenheit to kelvin', () => {
    // 32°F = 0°C = 273.15K
    expect(convertToKelvin(32, 'fahrenheit')).toBeCloseTo(273.15, 2);
  });

  it('should convert fahrenheit to kelvin (212°F = 100°C = 373.15K)', () => {
    expect(convertToKelvin(212, 'fahrenheit')).toBeCloseTo(373.15, 2);
  });

  it('should convert fahrenheit to kelvin (negative value)', () => {
    // -40°F = -40°C = 233.15K
    expect(convertToKelvin(-40, 'fahrenheit')).toBeCloseTo(233.15, 2);
  });

  it('should throw RangeError for negative kelvin result', () => {
    expect(() => convertToKelvin(-300, 'celsius')).toThrow(RangeError);
    expect(() => convertToKelvin(-300, 'celsius')).toThrow(
      'Kelvin cannot be negative'
    );
  });

  it('should throw RangeError for fahrenheit that results in negative kelvin', () => {
    // -500°F would result in negative kelvin
    expect(() => convertToKelvin(-500, 'fahrenheit')).toThrow(RangeError);
    expect(() => convertToKelvin(-500, 'fahrenheit')).toThrow(
      'Kelvin cannot be negative'
    );
  });

  it('should allow zero kelvin', () => {
    expect(convertToKelvin(0, 'kelvin')).toBe(0);
  });
});
