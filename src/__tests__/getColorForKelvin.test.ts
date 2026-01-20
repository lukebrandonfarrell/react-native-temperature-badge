import { getColorForKelvin } from '../getColorForKelvin';

describe('getColorForKelvin', () => {
  it('should return default color for empty scale', () => {
    const scale: Array<{ kelvin: number; color: string }> = [];
    expect(getColorForKelvin(273.15, scale)).toBe('#94A3B8');
  });

  it('should return first color when temperature is below lowest scale entry', () => {
    const scale = [
      { kelvin: 273.15, color: '#0000FF' },
      { kelvin: 300, color: '#00FF00' },
      { kelvin: 350, color: '#FF0000' },
    ];
    expect(getColorForKelvin(200, scale)).toBe('#0000FF');
  });

  it('should return first color when temperature equals first scale entry', () => {
    const scale = [
      { kelvin: 273.15, color: '#0000FF' },
      { kelvin: 300, color: '#00FF00' },
      { kelvin: 350, color: '#FF0000' },
    ];
    expect(getColorForKelvin(273.15, scale)).toBe('#0000FF');
  });

  it('should return color for matching scale entry', () => {
    const scale = [
      { kelvin: 273.15, color: '#0000FF' },
      { kelvin: 300, color: '#00FF00' },
      { kelvin: 350, color: '#FF0000' },
    ];
    expect(getColorForKelvin(300, scale)).toBe('#00FF00');
  });

  it('should return color for highest scale entry less than or equal to temperature', () => {
    const scale = [
      { kelvin: 273.15, color: '#0000FF' },
      { kelvin: 300, color: '#00FF00' },
      { kelvin: 350, color: '#FF0000' },
    ];
    // 310 is between 300 and 350, so should return color for 300
    expect(getColorForKelvin(310, scale)).toBe('#00FF00');
  });

  it('should return last color when temperature exceeds all scale entries', () => {
    const scale = [
      { kelvin: 273.15, color: '#0000FF' },
      { kelvin: 300, color: '#00FF00' },
      { kelvin: 350, color: '#FF0000' },
    ];
    expect(getColorForKelvin(400, scale)).toBe('#FF0000');
  });

  it('should handle single entry scale', () => {
    const scale = [{ kelvin: 273.15, color: '#ABCDEF' }];
    expect(getColorForKelvin(273.15, scale)).toBe('#ABCDEF');
    expect(getColorForKelvin(500, scale)).toBe('#ABCDEF');
    expect(getColorForKelvin(100, scale)).toBe('#ABCDEF');
  });

  it('should handle unsorted scale entries (returns first color if temp < first entry)', () => {
    const scale = [
      { kelvin: 350, color: '#FF0000' },
      { kelvin: 273.15, color: '#0000FF' },
      { kelvin: 300, color: '#00FF00' },
    ];
    // The function has an early return: if kelvin < scale[0].kelvin, return scale[0].color
    // With unsorted [350, 273.15, 300] and temp 310:
    // - 310 < 350? Yes, so it returns scale[0].color = '#FF0000' immediately
    // Note: The function requires sorted scales for correct behavior
    expect(getColorForKelvin(310, scale)).toBe('#FF0000');
  });
});
