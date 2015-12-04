import 'babel-core/register';

import test from 'ava';
import isLength from '../lib/validators/isLength';
import FlamingoJS from '../lib/index';

test('test', t => {
  t.pass();
  const fields = [
    {
      'element': '#password',
      'string': 'Hello',
      'error-element': '.remember',
      'rules': [
        {
          'module': isLength,
          'options': { 'min': 2, 'max': 9 }
        }
      ]
    }
  ];
  FlamingoJS.validate(fields);
});
