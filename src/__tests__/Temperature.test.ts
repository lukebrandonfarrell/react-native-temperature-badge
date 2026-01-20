import { Temperature } from '../Temperature';

describe('Temperature.convert', () => {
  describe('same unit conversions (no-op)', () => {
    it('should return same value for celsius to celsius', () => {
      expect(Temperature.convert(25, { from: 'celsius', to: 'celsius' })).toBe(
        25
      );
    });

    it('should return same value for fahrenheit to fahrenheit', () => {
      expect(
        Temperature.convert(75, { from: 'fahrenheit', to: 'fahrenheit' })
      ).toBe(75);
    });

    it('should return same value for kelvin to kelvin', () => {
      expect(Temperature.convert(300, { from: 'kelvin', to: 'kelvin' })).toBe(
        300
      );
    });
  });

  describe('celsius conversions', () => {
    it('should convert celsius to fahrenheit', () => {
      expect(
        Temperature.convert(0, { from: 'celsius', to: 'fahrenheit' })
      ).toBeCloseTo(32, 2);
      expect(
        Temperature.convert(100, { from: 'celsius', to: 'fahrenheit' })
      ).toBeCloseTo(212, 2);
    });

    it('should convert celsius to kelvin', () => {
      expect(Temperature.convert(0, { from: 'celsius', to: 'kelvin' })).toBe(
        273.15
      );
      expect(
        Temperature.convert(-273.15, { from: 'celsius', to: 'kelvin' })
      ).toBe(0);
    });

    it('should convert fahrenheit to celsius', () => {
      expect(
        Temperature.convert(32, { from: 'fahrenheit', to: 'celsius' })
      ).toBeCloseTo(0, 2);
      expect(
        Temperature.convert(212, { from: 'fahrenheit', to: 'celsius' })
      ).toBeCloseTo(100, 2);
    });

    it('should convert kelvin to celsius', () => {
      expect(
        Temperature.convert(273.15, { from: 'kelvin', to: 'celsius' })
      ).toBe(0);
      expect(Temperature.convert(0, { from: 'kelvin', to: 'celsius' })).toBe(
        -273.15
      );
    });
  });

  describe('fahrenheit conversions', () => {
    it('should convert fahrenheit to kelvin', () => {
      // 32°F = 0°C = 273.15K
      expect(
        Temperature.convert(32, { from: 'fahrenheit', to: 'kelvin' })
      ).toBeCloseTo(273.15, 2);
      // 212°F = 100°C = 373.15K
      expect(
        Temperature.convert(212, { from: 'fahrenheit', to: 'kelvin' })
      ).toBeCloseTo(373.15, 2);
    });

    it('should convert kelvin to fahrenheit', () => {
      // 273.15K = 0°C = 32°F
      expect(
        Temperature.convert(273.15, { from: 'kelvin', to: 'fahrenheit' })
      ).toBeCloseTo(32, 2);
      // 373.15K = 100°C = 212°F
      expect(
        Temperature.convert(373.15, { from: 'kelvin', to: 'fahrenheit' })
      ).toBeCloseTo(212, 2);
    });
  });

  describe('edge cases', () => {
    it('should handle negative celsius values', () => {
      expect(
        Temperature.convert(-40, { from: 'celsius', to: 'fahrenheit' })
      ).toBeCloseTo(-40, 2);
      expect(Temperature.convert(-10, { from: 'celsius', to: 'kelvin' })).toBe(
        263.15
      );
    });

    it('should handle negative fahrenheit values', () => {
      expect(
        Temperature.convert(-40, { from: 'fahrenheit', to: 'celsius' })
      ).toBeCloseTo(-40, 2);
    });

    it('should throw RangeError for conversions that result in negative kelvin', () => {
      expect(() =>
        Temperature.convert(-300, { from: 'celsius', to: 'fahrenheit' })
      ).toThrow(RangeError);
      expect(() =>
        Temperature.convert(-500, { from: 'fahrenheit', to: 'celsius' })
      ).toThrow(RangeError);
    });
  });

  describe('round-trip conversions', () => {
    it('should convert celsius -> fahrenheit -> celsius', () => {
      const original = 25;
      const fahrenheit = Temperature.convert(original, {
        from: 'celsius',
        to: 'fahrenheit',
      });
      const back = Temperature.convert(fahrenheit, {
        from: 'fahrenheit',
        to: 'celsius',
      });
      expect(back).toBeCloseTo(original, 2);
    });

    it('should convert fahrenheit -> celsius -> fahrenheit', () => {
      const original = 75;
      const celsius = Temperature.convert(original, {
        from: 'fahrenheit',
        to: 'celsius',
      });
      const back = Temperature.convert(celsius, {
        from: 'celsius',
        to: 'fahrenheit',
      });
      expect(back).toBeCloseTo(original, 2);
    });

    it('should convert celsius -> kelvin -> celsius', () => {
      const original = 25;
      const kelvin = Temperature.convert(original, {
        from: 'celsius',
        to: 'kelvin',
      });
      const back = Temperature.convert(kelvin, {
        from: 'kelvin',
        to: 'celsius',
      });
      expect(back).toBeCloseTo(original, 2);
    });
  });
});
