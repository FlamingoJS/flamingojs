import isPromise from 'is-promise';

export default class Validator {
  constructor(fn, field, value, options) {
    this.fn = fn;
    this.value = value;
    this.options = options;
    this.field = field;
  }

  run() {
    const self = this;

    return new Promise((resolve, reject) => {
      const fn = self.fn(self.value, self.options);

      if (typeof fn === 'object') {
        if (isPromise(fn)) {
          fn.then(() => {
            resolve(true);
          })
          .catch((error) => {
            error['field'] = self.field;
            reject(error);
          });
        } else {
          fn['field'] = self.field;
          reject(fn);
        }
      } else {
        resolve(true);
      }
    });
  }
}
