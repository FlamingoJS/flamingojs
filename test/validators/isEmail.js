import 'babel-core/register';

import test from 'ava';
import isEmail from '../../lib/validators/isEmail';

test('should return true', t => {
  t.is(isEmail('brunoofq@gmail.com'), true);
  t.is(isEmail('myname@myprovider.com.br'), true);
  t.is(isEmail('name@prv.net'), true);
});

test('should return false', t => {
  t.is(isEmail('name@provider,com'), false);
  t.is(isEmail('nameprovider.com'), false);
  t.is(isEmail('name@provider'), false);
  t.is(isEmail('name@provider.com.br.test'), false);
});
