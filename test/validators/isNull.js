import 'babel-core/register';

import test from 'ava';
import isNull from '../../lib/validators/isNull';

test('should return true', t => {
  t.is(isNull(null), true);
});

test('should return false', t => {
  t.is(isNull('Hello'), false);
});
