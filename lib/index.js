import isLength from 'validators/isLength';
import isEmail from 'validators/isEmail';
import isRequired from 'validators/isRequired';

let errors = [];
let doc;

function resetErrors() {
  errors = [];
}

function setError(element, rule) {
  errors.push({
    'element': element,
    'rule': rule
  });
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

  showError(element, error, errorElement) {
    const elementSelector = errorElement ? errorElement : element;

    doc.querySelector(elementSelector).classList.add('error-field');
  }

  validate(fields) {
    resetErrors();

    fields.forEach((field) => {
      field.rules.forEach((rule) => {
        const ruleOptions = rule.options || {};
        const value = getElementText(field.element);

        if (!rule.module(value, ruleOptions)) {
          setError(field.element, rule.module.toString());
          this.showError(field.element, 'dsad sadsad');
        }
      });
    });
  }
}
