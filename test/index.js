import 'babel-core/register';

import test from 'ava';
import jsdom from 'jsdom';
import isRequired from '../lib/validators/isRequired';
import FlamingoJS from '../lib/index';

let document;
let flamingo;

test.before(t => {
  jsdom.env({
    globalize: true,
    console: true,
    useEach: false,
    skipWindowCheck: false,
    html: "<!doctype html><html><head><meta charset='utf-8'></head>" +
      '<body></body></html>',
    done: (err, window) => {
      document = window.document;

      flamingo = new FlamingoJS({
        'document': document
      });
    }
  });
});

test('should add the class .error-field', t => {
  const fields = [
    {
      'element': '#email',
      'rules': [
        {
          'validator': isRequired
        }
      ]
    }
  ];

  let input = document.createElement('input');
  input.setAttribute('id', 'email');
  input.setAttribute('type', 'email');
  input.setAttribute('value', '');
  document.body.appendChild(input);

  flamingo.validate(fields)
    .then((response) => {
      t.true(document.querySelector('#email').classList.contains('error-field'));
      t.same(document.querySelector('.error-message').innerHTML, 'This field is required.');
      document.body.removeChild(input);
    });
});
