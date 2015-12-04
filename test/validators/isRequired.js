import 'babel-core/register';

import test from 'ava';
import isRequired from '../../lib/validators/isRequired';

test('should return false', t => {
  t.is(isRequired('Hello'), true);
  t.is(isRequired(1), true);
  t.is(isRequired(2.50), true);
});

test('should return true', t => {
  t.is(isRequired(''), false);
  t.is(isRequired(), false);
  t.is(isRequired(null), false);
  t.is(isRequired(undefined), false);
});
