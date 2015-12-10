import { expect } from 'chai';
import isEmail from '../../lib/validators/isEmail';

describe('isEmail', () => {
  it('should return true', () => {
    expect(isEmail('brunoofq@gmail.com')).to.be.true;
    expect(isEmail('myname@myprovider.com.br')).to.be.true;
    expect(isEmail('name@prv.net')).to.be.true;
  });

  it('should return false', () => {
    expect(isEmail('name@provider,com')).to.be.false;
    expect(isEmail('nameprovider.com')).to.be.false;
    expect(isEmail('name@provider')).to.be.false;
    expect(isEmail('name@provider.com.br.test')).to.be.false;
  });
});
