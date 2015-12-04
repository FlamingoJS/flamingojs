import 'babel-core/register';

import test from 'ava';
import jsdom from 'jsdom';
import isLength from '../lib/validators/isLength';
import isEmail from '../lib/validators/isEmail';
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
      'error-element': '.remember',
      'rules': [
        {
          'module': isLength,
          'options': { 'min': 2, 'max': 9 }
        }
      ]
    }
  ];

  let input = document.createElement('input');
  input.setAttribute('id', 'email');
  input.setAttribute('type', 'email');
  input.setAttribute('value', 'Hello world!');
  document.body.appendChild(input);

  flamingo.validate(fields);

  t.true(document.querySelector('#email').classList.contains('error-field'));
  document.body.removeChild(input);
});

test('should add the class .error-field', t => {
  const fields = [
    {
      'element': '#email',
      'error-element': '.remember',
      'rules': [
        {
          'module': isRequired
        },
        {
          'module': isLength,
          'options': { 'min': 2, 'max': 30 }
        },
        {
          'module': isEmail
        }
      ]
    }
  ];

  let input = document.createElement('input');
  input.setAttribute('id', 'email');
  input.setAttribute('type', 'email');
  input.setAttribute('value', 'myemail@providercom');
  document.body.appendChild(input);

  flamingo.validate(fields);

  t.true(document.querySelector('#email').classList.contains('error-field'));
  document.body.removeChild(input);
});

test('should not add the class .error-field', t => {
  const fields = [
    {
      'element': '#email',
      'error-element': '.remember',
      'rules': [
        {
          'module': isLength,
          'options': { 'min': 2, 'max': 20 }
        }
      ]
    }
  ];

  let input = document.createElement('input');
  input.setAttribute('id', 'email');
  input.setAttribute('type', 'email');
  input.setAttribute('value', 'Hello world');
  document.body.appendChild(input);

  flamingo.validate(fields);

  t.false(document.querySelector('#email').classList.contains('error-field'));
});
