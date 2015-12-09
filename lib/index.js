import merge from 'merge';
import iterate from './utils/iterate';
import defaultMessages from './i18n/en';

const CLASSES = {
  'errorField': 'error-field',
  'errorMessage': 'error-message',
  'errorLabel': 'error-label'
};

let errors = [];
let doc;
let messages = defaultMessages;

function resetErrors() {
  errors = [];
}

function setError(element, rule) {
  errors.push({
    'element': element,
    'rule': rule
  });
}

function clearElements() {
  let selector = '.' + CLASSES.errorLabel;

  iterate(doc.querySelectorAll(selector), (element) => {
    element.classList.remove(CLASSES.errorLabel);
  });

  selector = '.' + CLASSES.errorField;
  iterate(doc.querySelectorAll(selector), (element) => {
    element.classList.remove(CLASSES.errorField);
  });

  selector = '.' + CLASSES.errorMessage;
  iterate(doc.querySelectorAll(selector), (element) => {
    element.remove();
  });
}

function setElementError(element, error) {
  let span = doc.createElement('span');
  span.innerHTML = messages[error] || messages['defaultMessage'] || error;
  span.setAttribute('class', CLASSES.errorMessage);

  let id = element.split('#')[1];
  let labelSelector = `[for="${id}"]`;

  if (doc.querySelector(labelSelector) !== null) {
    doc.querySelector(labelSelector).classList.add(CLASSES.errorLabel);
  }

  doc.querySelector(element).classList.add(CLASSES.errorField);
  doc.querySelector(element).parentNode.appendChild(span);
}

function getElementText(element) {
  return doc.querySelector(element).value;
}

export default class FlamingoJS {
  constructor(options) {
    if (typeof document !== 'object') {
      doc = options.document;
    } else {
      doc = document;
    }
  }

  setMessages(msg) {
    messages = merge(true, msg);
  }

  showError(element, error, errorElement) {
    const elementSelector = errorElement ? errorElement : element;

    setElementError(elementSelector, error);
  }

  validate(fields) {
    return new Promise((resolve, reject) => {
      clearElements();
      resetErrors();

      fields.forEach((field) => {
        let hasError = false;

        field.rules.forEach((rule) => {
          if (!hasError) {
            const ruleOptions = rule.options || {};
            const value = getElementText(field.element);

            if (!rule.validator(value, ruleOptions)) {
              hasError = true;
              setError(field.element, rule.validator.name);
              this.showError(field.element, rule.validator.name);
            }
          }
        });
      });

      resolve(errors);
    });
  }
}
