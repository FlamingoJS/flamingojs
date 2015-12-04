import 'babel-core/register';

import test from 'ava';
import isCPF from '../../lib/validators/isCPF';

test('should return true', t => {
  t.is(isCPF('265.827.252-97'), true);
  t.is(isCPF('242.193.353-66'), true);
  t.is(isCPF('776.857.639-07'), true);
  t.is(isCPF('22017437620'), true);
  t.is(isCPF('77685763907'), true);
  t.is(isCPF('41474486827'), true);
});

test('should return false', t => {
  t.is(isCPF('123.456.789-01'), false);
  t.is(isCPF('978.324.555-99'), false);
  t.is(isCPF('45678968901'), false);
  t.is(isCPF('11112222333'), false);
  t.is(isCPF('00000000000'), false);
});
