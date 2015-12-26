'use strict';

const merge = require('merge');
const Validator = require('./validator');
const Runner = require('./runner');
const dom = require('./utils/dom');
const defaultMessages = require('./i18n/en');

let defaultOptions = {
  'errorField': 'error-field',
  'errorMessage': 'error-message',
  'errorLabel': 'error-label'
};

let prevErrors = [];
let errors = [];
let messages = defaultMessages;
let instance;

function resetErrors() {
  errors = [];
}

function setError(element, rule) {
  const error = {
    'element': element,
    'rule': rule
  };

  errors[element] = error;

  return error;
}

function elementHasError(element) {
  return prevErrors[element];
}

function clearElement(element, willVerify) {
  const verifyIfHasError = willVerify || false;

  if (!elementHasError(element) || verifyIfHasError) {
    removeErrorClasses(element);
  }

  removeMessage(element);
}

function removeErrorClasses(element) {
  const id = element.split('#')[1];
  const labelSelector = `[for="${id}"]`;

  dom.removeClass(labelSelector, defaultOptions.errorLabel);
  dom.removeClass(element, defaultOptions.errorField);
}

function removeMessage(element) {
  const message = dom.getSiblingElement(element, `.${defaultOptions.errorMessage}`);

  dom.remove(message);
}

function setErrorMessage(error) {
  let message = messages[error.validator] || messages['defaultMessage'] || error.validator;

  if (typeof error.options !== 'object') {
    message = message.replace('%s', error.options);
  } else {
    error.options.forEach((string) => {
      message = message.replace('%s', string);
    });
  }

  return message;
}

function setElementError(element, error) {
  const message = setErrorMessage(error);
  const span = dom.create('span', {
    'innerHTML': message,
    'attributes': {
      'class': defaultOptions.errorMessage
    }
  });

  if (!elementHasError(element)) {
    const id = element.split('#')[1];
    const labelSelector = `[for="${id}"]`;

    dom.addClass(labelSelector, defaultOptions.errorLabel);
    dom.addClass(element, defaultOptions.errorField);
  }

  dom.insertAfter(element, span);
}

function prepareErrors(returnedErrors) {
  let errors = [];

  returnedErrors.forEach((error) => {
    if (error !== true) {
      errors[error.field] = error;
    }
  });

  return errors;
}

function shouldShowError(prevError, error) {
  return prevError.validator !== error.validator || prevError === undefined;
}

module.exports = class FlamingoJS {
  constructor(options) {
    if (instance) {
      return instance;
    }

    instance = this;

    defaultOptions = merge(defaultOptions, options);
  }

  setMessages(msg) {
    messages = merge(true, msg);
  }

  showError(element, error, errorElement) {
    const elementSelector = errorElement ? errorElement : element;

    clearElement(element);
    setElementError(elementSelector, error);
  }

  validate(fields) {
    let queue = [];

    return new Promise((resolve, reject) => {
      resetErrors();

      fields.forEach((field) => {
        let validators = [];

        field.rules.forEach((rule) => {
          const ruleOptions = rule.options || [];
          const value = dom.getElement(field.element).value;
          const validator = new Validator(rule.validator, field.element, value, ruleOptions);

          validators.push(validator);
        });

        queue.push(validators);
      });

      Promise.all(queue.map((validators) => {
        return new Runner(validators);
      }))
      .then((returnedErrors) => {
        const errors = prepareErrors(returnedErrors);

        fields.forEach((field) => {
          const error = errors[field.element];

          if (error !== undefined) {
            const prevError = prevErrors[error.field] || {};

            if (shouldShowError(prevError, error)) {
              this.showError(error.field, error);
            }
          } else {
            clearElement(field.element, true);
          }
        });

        prevErrors = errors;

        if (Object.keys(errors).length === 0) {
          resolve(true);
        } else {
          reject(errors);
        }
      });
    });
  }
}
