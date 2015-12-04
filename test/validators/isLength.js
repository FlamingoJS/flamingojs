import 'babel-core/register';

import test from 'ava';
import isLength from '../../lib/validators/isLength';

test('should return true', t => {
  t.is(isLength('Hello', { 'max': 10 }), true);
  t.is(isLength('Hello', { 'max': 5 }), true);

  t.is(isLength('Hello', { 'min': 5 }), true);
  t.is(isLength('Hello', { 'min': 4 }), true);

  t.is(isLength('Hello', { 'min': 4, 'max': 10 }), true);
  t.is(isLength('Hello', { 'min': 4, 'max': 5 }), true);
});

test('should return false', t => {
  t.is(isLength('Hello', { 'max': 4 }), false);

  t.is(isLength('Hello', { 'min': 10 }), false);

  t.is(isLength('Hello', { 'min': 1, 'max': 4 }), false);
  t.is(isLength('Hello world!', { 'min': 2, 'max': 9 }), false);
});
