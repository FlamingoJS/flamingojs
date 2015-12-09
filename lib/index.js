import merge from 'merge';
import iterate from './utils/iterate';
import defaultMessages from './i18n/en';

const CLASSES = {
  'errorField': 'error-field',
  'errorMessage': 'error-message',
  'errorLabel': 'error-label'
};

let prevErrors = [];
let errors = [];
let doc;
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
  let id = element.split('#')[1];
  let labelSelector = `[for="${id}"]`;

  if (doc.querySelector(labelSelector) !== null) {
    doc.querySelector(labelSelector).classList.remove(CLASSES.errorLabel);
  }
  doc.querySelector(element).classList.remove(CLASSES.errorField);
}

function removeMessage(element) {
  if (doc.querySelector(element).parentNode.querySelector(`.${CLASSES.errorMessage}`) !== null) {
    doc.querySelector(element).parentNode.querySelector(`.${CLASSES.errorMessage}`).remove();
  }
}

function setElementError(element, error) {
  let span = doc.createElement('span');
  span.innerHTML = messages[error] || messages['defaultMessage'] || error;
  span.setAttribute('class', CLASSES.errorMessage);

  if (!elementHasError(element)) {
    let id = element.split('#')[1];
    let labelSelector = `[for="${id}"]`;

    if (doc.querySelector(labelSelector) !== null) {
      doc.querySelector(labelSelector).classList.add(CLASSES.errorLabel);
    }

    doc.querySelector(element).classList.add(CLASSES.errorField);
  }

  doc.querySelector(element).parentNode.appendChild(span);
}

function getElementText(element) {
  return doc.querySelector(element).value;
}

export default class FlamingoJS {
  constructor(options) {
    try {
      if (options.hasOwnProperty('document')) {
        doc = options.document;
      }
    } catch (e) {
      doc = document;
    }
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
    return new Promise((resolve, reject) => {
      resetErrors();

      fields.forEach((field) => {
        let error = null;

        field.rules.forEach((rule) => {
          if (error === null) {
            const ruleOptions = rule.options || {};
            const value = getElementText(field.element);

            if (!rule.validator(value, ruleOptions)) {
              error = setError(field.element, rule.validator.name);
            }
          }
        });

        if (error !== null) {
          let prevError = prevErrors[error.element] || {};

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
