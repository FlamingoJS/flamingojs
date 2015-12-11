import isLength from '../lib/validators/isLength';
import isEmail from '../lib/validators/isEmail';
import isRequired from '../lib/validators/isRequired';

import messages from '../lib/i18n/pt-br';
import FlamingoJS from '../lib/index';

console.log(messages);
let flamingo = new FlamingoJS();
flamingo.setMessages(messages);

const fields = [
  {
    'element': '#username',
    'rules': [
      { 'validator': isRequired },
      {
        'validator': isLength,
        'options': { 'min': 2, 'max': 9 }
      }
    ]
  },
  {
    'element': '#password',
    'rules': [
      { 'validator': isRequired },
      {
        'validator': isLength,
        'options': { 'min': 2, 'max': 9 }
      }
    ]
  },
  {
    'element': '#email',
    'rules': [
      { 'validator': isRequired },
      {
        'validator': isLength,
        'options': { 'min': 2, 'max': 60 }
      },
      { 'validator': isEmail }
    ]
  }
];

document.querySelector('#btn').addEventListener('click', (e) => {
  flamingo.validate(fields)
    .then((response) => {
      console.log(response);
    }, (errors) => {
      console.log(errors);
    });
});

console.log('Hello')
