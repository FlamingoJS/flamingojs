import { expect } from 'chai';
import isRequired from '../../lib/validators/isRequired';

describe('isRequired', () => {
  it('should return true', () => {
    expect(isRequired('Hello')).to.be.true;
    expect(isRequired(1)).to.be.true;
    expect(isRequired(2.50)).to.be.true;
  });

  it('should return false', () => {
    expect(isRequired('')).to.be.false;
    expect(isRequired()).to.be.false;
    expect(isRequired(null)).to.be.false;
    expect(isRequired(undefined)).to.be.false;
  });
});
