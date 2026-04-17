import { describe, it, expect } from 'vitest'
import { convertUnit } from '@/lib/calculators/units'

describe('Length conversions', () => {
  it('1 kilometer = 1000 meters', () => {
    expect(convertUnit(1, 'Length', 'Kilometers', 'Meters')).toBeCloseTo(1000, 3)
  })

  it('1 mile ≈ 1609.344 meters', () => {
    expect(convertUnit(1, 'Length', 'Miles', 'Meters')).toBeCloseTo(1609.344, 2)
  })

  it('1 mile ≈ 1.60934 km', () => {
    expect(convertUnit(1, 'Length', 'Miles', 'Kilometers')).toBeCloseTo(1.60934, 4)
  })

  it('10 km ≈ 6.21371 miles', () => {
    expect(convertUnit(10, 'Length', 'Kilometers', 'Miles')).toBeCloseTo(6.21371, 3)
  })

  it('1 foot = 12 inches', () => {
    expect(convertUnit(1, 'Length', 'Feet', 'Inches')).toBeCloseTo(12, 3)
  })

  it('same unit returns same value', () => {
    expect(convertUnit(42, 'Length', 'Meters', 'Meters')).toBeCloseTo(42, 5)
  })
})

describe('Weight conversions', () => {
  it('1 kilogram ≈ 2.20462 pounds', () => {
    expect(convertUnit(1, 'Weight', 'Kilograms', 'Pounds')).toBeCloseTo(2.20462, 3)
  })

  it('1 pound ≈ 453.592 grams', () => {
    expect(convertUnit(1, 'Weight', 'Pounds', 'Grams')).toBeCloseTo(453.592, 1)
  })

  it('1 metric ton = 1000 kg', () => {
    expect(convertUnit(1, 'Weight', 'Metric Tons', 'Kilograms')).toBeCloseTo(1000, 3)
  })

  it('1 kg = 1000 grams', () => {
    expect(convertUnit(1, 'Weight', 'Kilograms', 'Grams')).toBeCloseTo(1000, 3)
  })
})

describe('Temperature conversions', () => {
  it('0°C = 32°F (freezing)', () => {
    expect(convertUnit(0, 'Temperature', 'Celsius', 'Fahrenheit')).toBeCloseTo(32, 4)
  })

  it('100°C = 212°F (boiling)', () => {
    expect(convertUnit(100, 'Temperature', 'Celsius', 'Fahrenheit')).toBeCloseTo(212, 4)
  })

  it('37°C ≈ 98.6°F (body temperature)', () => {
    expect(convertUnit(37, 'Temperature', 'Celsius', 'Fahrenheit')).toBeCloseTo(98.6, 1)
  })

  it('0°C = 273.15 K', () => {
    expect(convertUnit(0, 'Temperature', 'Celsius', 'Kelvin')).toBeCloseTo(273.15, 2)
  })

  it('32°F = 0°C', () => {
    expect(convertUnit(32, 'Temperature', 'Fahrenheit', 'Celsius')).toBeCloseTo(0, 4)
  })

  it('-40°C = -40°F', () => {
    expect(convertUnit(-40, 'Temperature', 'Celsius', 'Fahrenheit')).toBeCloseTo(-40, 4)
  })
})

describe('Data storage conversions', () => {
  it('1 KB = 1024 bytes', () => {
    expect(convertUnit(1, 'Data', 'Kilobytes', 'Bytes')).toBeCloseTo(1024, 3)
  })

  it('1 MB = 1024 KB', () => {
    expect(convertUnit(1, 'Data', 'Megabytes', 'Kilobytes')).toBeCloseTo(1024, 3)
  })

  it('1 GB = 1024 MB', () => {
    expect(convertUnit(1, 'Data', 'Gigabytes', 'Megabytes')).toBeCloseTo(1024, 3)
  })

  it('1 TB = 1024 GB', () => {
    expect(convertUnit(1, 'Data', 'Terabytes', 'Gigabytes')).toBeCloseTo(1024, 3)
  })
})

describe('invalid inputs', () => {
  it('returns null for unknown unit label', () => {
    expect(convertUnit(1, 'Length', 'Furlongs', 'Meters')).toBeNull()
  })
})
