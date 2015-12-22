'use strict';

const isPromise = require('is-promise');

module.exports = class Validator {
  constructor(fn, field, value, options) {
    this.fn = fn;
    this.value = value;
    this.options = options;
    this.field = field;
  }

  run() {
    const self = this;

    return new Promise((resolve, reject) => {
      let options = [];
      options = options.concat(self.value, self.options);

      const fn = self.fn.apply(null, options);

      if (isPromise(fn)) {
        fn.then(() => {
          resolve(true);
        })
        .catch(() => {
          reject({
            'field': self.field,
            'validator': self.fn.name,
            'options': self.options
          });
        });
      } else {
        if (fn === false) {
          reject({
            'field': self.field,
            'validator': self.fn.name,
            'options': self.options
          });
        } else {
          resolve(true);
        }
      }
    });
  }
}
