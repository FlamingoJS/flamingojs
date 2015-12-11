import { expect } from 'chai';
import isStrictEqual from '../../lib/validators/isStrictEqual';

describe('isStrictEqual', () => {
  it('should return true', () => {
    expect(isStrictEqual('1', '1')).to.be.true;
    expect(isStrictEqual(1, 1)).to.be.true;
    expect(isStrictEqual('Hello', 'Hello')).to.be.true;
  });

  it('should return false', () => {
    expect(isStrictEqual('Hello', 'World')).to.be.false;
    expect(isStrictEqual('1', 1)).to.be.false;
    expect(isStrictEqual('2.51', 2.51)).to.be.false;
  });
});
