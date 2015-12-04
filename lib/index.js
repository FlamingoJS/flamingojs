let errors = [];

function resetErrors() {
  errors = [];
}

function setError(element, rule) {
  errors.push({
    'element': element,
    'rule': rule
  });
}

export default new class FormJS {
  constructor() {}

  showError(element, error, errorElement) {
    const elementSelector = errorElement ? errorElement : element;

    document.querySelector(elementSelector).classList.add('error');
  }

  validate(fields) {
    resetErrors();

    fields.forEach((field) => {
      field.rules.forEach((rule) => {
        const options = rule.options || {};

        if (!rule.module(field.string, options)) {
          setError(field.element, rule.module.toString());
          this.showError(field.element, 'dsad');
        }
      });
    });
  }
}
