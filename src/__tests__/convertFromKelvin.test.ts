import { convertFromKelvin } from '../convertFromKelvin';

describe('convertFromKelvin', () => {
  it('should convert kelvin to kelvin (no change)', () => {
    expect(convertFromKelvin(273.15, 'kelvin')).toBe(273.15);
  });

  it('should convert kelvin to celsius', () => {
    expect(convertFromKelvin(273.15, 'celsius')).toBe(0);
  });

  it('should convert kelvin to celsius (negative result)', () => {
    expect(convertFromKelvin(263.15, 'celsius')).toBe(-10);
  });

  it('should convert kelvin to fahrenheit', () => {
    // 273.15K = 0°C = 32°F
    expect(convertFromKelvin(273.15, 'fahrenheit')).toBeCloseTo(32, 2);
  });

  it('should convert kelvin to fahrenheit (373.15K = 100°C = 212°F)', () => {
    expect(convertFromKelvin(373.15, 'fahrenheit')).toBeCloseTo(212, 2);
  });

  it('should convert kelvin to fahrenheit (negative result)', () => {
    // 233.15K = -40°C = -40°F
    expect(convertFromKelvin(233.15, 'fahrenheit')).toBeCloseTo(-40, 2);
  });

  it('should handle zero kelvin', () => {
    expect(convertFromKelvin(0, 'kelvin')).toBe(0);
    expect(convertFromKelvin(0, 'celsius')).toBe(-273.15);
    expect(convertFromKelvin(0, 'fahrenheit')).toBeCloseTo(-459.67, 2);
  });
});
