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

    let label = dom.create('label', {
      'innerHTML': 'Email',
      'attributes': {
        'for': 'email'
      }
    });
    dom.appendChild(document.body, label);

    let input = dom.create('input', {
      'value': '',
      'attributes': {
        'id': 'email',
        'type': 'email'
      }
    });
    dom.appendChild(document.body, input);

    flamingo.validate(fields)
      .then((response) => {
        expect(dom.getElement('.error-message').innerHTML).to.equal('This field is required.');

        dom.remove(input);
        done();
      }, done);
  });
});
