import { expect } from 'chai';
import isNull from '../../lib/validators/isNull';

describe('isNull', () => {
  it('should return true', () => {
    expect(isNull(null)).to.be.true;
  });

  it('should return false', () => {
    expect(isNull('Hello')).to.be.false;
  });
});
