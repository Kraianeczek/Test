import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('0')).toBeNaN();
    expect(convertPLNToUSD('gsfg')).toBeNaN();
    expect(convertPLNToUSD('e12f1')).toBeNaN();
    expect(convertPLNToUSD('Ala ma kota, a kot ma Alę')).toBeNaN();
  });
  it('should return NaN when input is ""', () => {
    expect(convertPLNToUSD('')).toBeNaN();
  });
  it('should return "Error" when input is not a string nor number', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
  });
  it('should return 0 when input is less than 0', () => {
    expect(convertPLNToUSD(-5)).toBe('Wrong value...');
    expect(convertPLNToUSD(-2425)).toBe('Wrong value...');
    expect(convertPLNToUSD(-5.18)).toBe('Wrong value...');
  });
});