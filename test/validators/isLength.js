import { expect } from 'chai';
import isLength from '../../lib/validators/isLength';

describe('isLength', () => {
  it('should return true', () => {
    expect(isLength('Hello', { 'max': 10 })).to.be.true;
    expect(isLength('Hello', { 'max': 5 })).to.be.true;

    expect(isLength('Hello', { 'min': 5 })).to.be.true;
    expect(isLength('Hello', { 'min': 4 })).to.be.true;

    expect(isLength('Hello', { 'min': 4, 'max': 10 })).to.be.true;
    expect(isLength('Hello', { 'min': 4, 'max': 5 })).to.be.true;
  });

  it('should return false', () => {
    expect(isLength('Hello', { 'max': 4 })).to.be.false;

    expect(isLength('Hello', { 'min': 10 })).to.be.false;

    expect(isLength('Hello', { 'min': 1, 'max': 4 })).to.be.false;
    expect(isLength('Hello world!', { 'min': 2, 'max': 9 })).to.be.false;
  });
});
