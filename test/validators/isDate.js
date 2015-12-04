import 'babel-core/register';

import test from 'ava';
import isDate from '../../lib/validators/isDate';

test('should return true', t => {
  t.is(isDate('2015-12-24'), true);
  t.is(isDate('1990-02-05'), true);
  t.is(isDate('2025-07-30'), true);
});

test('should return false', t => {
  t.is(isDate('2025-017-30'), false);
  t.is(isDate('2015-05-80'), false);
  t.is(isDate('2025'), false);
  t.is(isDate('abcd-ef-gh'), false);
});
