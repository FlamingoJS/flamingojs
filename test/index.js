require('mocha-jsdom')({
  'skipWindowCheck': true
});

import { expect } from 'chai';
import dom from '../lib/utils/dom';
import isRequired from '../lib/validators/isRequired';
import FlamingoJS from '../lib/index';

describe('FlamingoJS', () => {
  let flamingo;

  beforeEach(() => {
    flamingo = new FlamingoJS();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should add the class .error-field', (done) => {
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

    const label = dom.create('label', {
      'innerHTML': 'Email',
      'attributes': {
        'for': 'email'
      }
    });
    dom.appendChild(document.body, label);

    const input = dom.create('input', {
      'value': '',
      'attributes': {
        'id': 'email',
        'type': 'email'
      }
    });
    dom.appendChild(document.body, input);

    flamingo.validate(fields)
      .then(() => {}, (errors) => {
        const expectedError = { element: '#email', rule: 'isRequired' };

        expect(Object.keys(errors).length).to.equal(1);
        expect(JSON.stringify(errors['#email'])).to.equal(JSON.stringify(expectedError));
        expect(dom.hasClass('#email', 'error-field')).to.be.true;
        expect(dom.hasClass('[for="email"]', 'error-label')).to.be.true;
        expect(dom.getElement('.error-message').innerHTML).to.equal('This field is required.');

        done();
      });
  });

  it('should not add the .error-field class', (done) => {
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

    const label = dom.create('label', {
      'innerHTML': 'Email',
      'attributes': {
        'for': 'email'
      }
    });
    dom.appendChild(document.body, label);

    const input = dom.create('input', {
      'attributes': {
        'id': 'email',
        'type': 'email',
        'value': 'brunoofq@gmail.com'
      }
    });
    dom.appendChild(document.body, input);

    flamingo.validate(fields)
      .then(() => {
        done();
      });
  });
});
