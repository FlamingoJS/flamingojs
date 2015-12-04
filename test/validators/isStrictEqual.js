import 'babel-core/register';

import test from 'ava';
import isStrictEqual from '../../lib/validators/isStrictEqual';

test('should return true', t => {
  t.is(isStrictEqual('1', '1'), true);
  t.is(isStrictEqual(1, 1), true);
  t.is(isStrictEqual('Hello', 'Hello'), true);
});

test('should return false', t => {
  t.is(isStrictEqual('Hello', 'World'), false);
  t.is(isStrictEqual('1', 1), false);
  t.is(isStrictEqual('2.51', 2.51), false);
});
