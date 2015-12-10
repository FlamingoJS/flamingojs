require('mocha-jsdom')()

import { expect } from 'chai';
import isRequired from '../lib/validators/isRequired';
import FlamingoJS from '../lib/index';

describe('FlamingoJS', () => {
  let flamingo;

  beforeEach(() => {
    flamingo = new FlamingoJS({
      'document': document
    });
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

    let input = document.createElement('input');
    input.setAttribute('id', 'email');
    input.setAttribute('type', 'email');
    input.setAttribute('value', '');
    document.body.appendChild(input);

    flamingo.validate(fields)
      .then((response) => {
        expect(document.querySelector('#email').classList.contains('err1or-field')).to.be.true;
        expect(document.querySelector('.error-message').innerHTML).to.equal('This field is required.');

        document.body.removeChild(input);
        done();
      }, done);
  });
});
