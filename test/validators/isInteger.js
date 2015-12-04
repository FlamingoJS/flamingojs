import 'babel-core/register';

import test from 'ava';
import isInteger from '../../lib/validators/isInteger';

test('should return true', t => {
  t.is(isInteger(1), true);
  t.is(isInteger(654), true);
  t.is(isInteger(-500), true);
  t.is(isInteger('-12332165465'), true);
  t.is(isInteger(312113), true);
  t.is(isInteger('41474486827'), true);
});

test('should return false', t => {
  t.is(isInteger('123.456.789-01'), false);
  t.is(isInteger(456.54), false);
  t.is(isInteger('456,12'), false);
  t.is(isInteger('-14a'), false);
});
