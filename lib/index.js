import merge from 'merge';
import Validator from './validator';
import Runner from './runner';
import dom from './utils/dom';
import defaultMessages from './i18n/en';

const CLASSES = {
  'errorField': 'error-field',
  'errorMessage': 'error-message',
  'errorLabel': 'error-label'
};

let prevErrors = [];
let errors = [];
let messages = defaultMessages;

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

  dom.removeClass(labelSelector, CLASSES.errorLabel);
  dom.removeClass(element, CLASSES.errorField);
}

function removeMessage(element) {
  const message = dom.getSiblingElement(element, `.${CLASSES.errorMessage}`);

  dom.remove(message);
}

function setElementError(element, error) {
  const message = messages[error] || messages['defaultMessage'] || error;
  const span = dom.create('span', {
    'innerHTML': message,
    'attributes': {
      'class': CLASSES.errorMessage
    }
  });

  if (!elementHasError(element)) {
    const id = element.split('#')[1];
    const labelSelector = `[for="${id}"]`;

    dom.addClass(labelSelector, CLASSES.errorLabel);
    dom.addClass(element, CLASSES.errorField);
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

export default class FlamingoJS {
  constructor() {}

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
          const ruleOptions = rule.options || {};
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
              this.showError(error.field, error.validator);
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
