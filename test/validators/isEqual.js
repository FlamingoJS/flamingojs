import 'babel-core/register';

import test from 'ava';
import isEqual from '../../lib/validators/isEqual';

test('should return true', t => {
  t.is(isEqual('1', '1'), true);
  t.is(isEqual('1', 1), true);
  t.is(isEqual(20, 20), true);
  t.is(isEqual('Hello', 'Hello'), true);
});

test('should return false', t => {
  t.is(isEqual('Hello', 'World'), false);
  t.is(isEqual('Hello', ''), false);
  t.is(isEqual('1', '2'), false);
  t.is(isEqual('3', 2), false);
});
