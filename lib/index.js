import merge from 'merge';
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
    return new Promise((resolve) => {
      resetErrors();

      fields.forEach((field) => {
        let error = null;

        field.rules.forEach((rule) => {
          if (error === null) {
            const ruleOptions = rule.options || {};
            const value = dom.getElement(field.element).value;

            if (!rule.validator(value, ruleOptions)) {
              error = setError(field.element, rule.validator.name);
            }
          }
        });

        if (error !== null) {
          const prevError = prevErrors[error.element] || {};

          if ((prevError.element === field.element && prevError.rule !== error.rule) ||
              !prevError.hasOwnProperty('element')) {
            this.showError(field.element, error.rule);
          }
        } else {
          clearElement(field.element, true);
        }
      });

      prevErrors = errors;
      resolve(errors);
    });
  }
}
