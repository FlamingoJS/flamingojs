import 'babel-core/register';

import test from 'ava';
import isBoolean from '../../lib/validators/isBoolean';

test('should return false', t => {
  t.is(isBoolean(true), true);
  t.is(isBoolean(false), true);
});

test('should return true', t => {
  t.is(isBoolean(1), false);
  t.is(isBoolean('false'), false);
  t.is(isBoolean('true'), false);
});
