import { expect } from 'chai';
import isDate from '../../lib/validators/isDate';

describe('isDate', () => {
  it('should return true', () => {
    expect(isDate('2015-12-24')).to.be.true;
    expect(isDate('1990-02-05')).to.be.true;
    expect(isDate('2025-07-30')).to.be.true;
  });

  it('should return false', () => {
    expect(isDate('2025-017-30')).to.be.false;
    expect(isDate('2015-05-80')).to.be.false;
    expect(isDate('2025')).to.be.false;
    expect(isDate('abcd-ef-gh')).to.be.false;
  });
});
