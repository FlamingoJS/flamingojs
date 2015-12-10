import { expect } from 'chai';
import isInteger from '../../lib/validators/isInteger';

describe('isInteger', () => {
  it('should return true', () => {
    expect(isInteger(1)).to.be.true;
    expect(isInteger(654)).to.be.true;
    expect(isInteger(-500)).to.be.true;
    expect(isInteger('-12332165465')).to.be.true;
    expect(isInteger(312113)).to.be.true;
    expect(isInteger('41474486827')).to.be.true;
  });

  it('should return false', () => {
    expect(isInteger('123.456.789-01')).to.be.false;
    expect(isInteger(456.54)).to.be.false;
    expect(isInteger('456,12')).to.be.false;
    expect(isInteger('-14a')).to.be.false;
  });
});
