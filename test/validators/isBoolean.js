import { expect } from 'chai';
import isBoolean from '../../lib/validators/isBoolean';

describe('isBoolean', () => {
  it('should return true', () => {
    expect(isBoolean(true)).to.be.true;
    expect(isBoolean(false)).to.be.true;
  });

  it('should return false', () => {
    expect(isBoolean(1)).to.be.false;
    expect(isBoolean('false')).to.be.false;
    expect(isBoolean('false')).to.be.false;
  });
});
