import { expect } from 'chai';
import isEqual from '../../lib/validators/isEqual';

describe('isEqual', () => {
  it('should return true', () => {
    expect(isEqual('1', '1')).to.be.true;
    expect(isEqual('1', 1)).to.be.true;
    expect(isEqual(20, 20)).to.be.true;
    expect(isEqual('Hello', 'Hello')).to.be.true;
  });

  it('should return false', () => {
    expect(isEqual('Hello', 'World')).to.be.false;
    expect(isEqual('Hello', '')).to.be.false;
    expect(isEqual('1', '2')).to.be.false;
    expect(isEqual('3', 2)).to.be.false;
  });
});
