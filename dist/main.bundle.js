(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _isLength = require('../lib/validators/isLength');

var _isLength2 = _interopRequireDefault(_isLength);

var _isEmail = require('../lib/validators/isEmail');

var _isEmail2 = _interopRequireDefault(_isEmail);

var _isRequired = require('../lib/validators/isRequired');

var _isRequired2 = _interopRequireDefault(_isRequired);

var _ptBr = require('../lib/i18n/pt-br');

var _ptBr2 = _interopRequireDefault(_ptBr);

var _index = require('../lib/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_ptBr2.default);
var flamingo = new _index2.default();
flamingo.setMessages(_ptBr2.default);

var fields = [{
  'element': '#username',
  'rules': [{ 'validator': _isRequired2.default }, {
    'validator': _isLength2.default,
    'options': { 'min': 2, 'max': 9 }
  }]
}, {
  'element': '#password',
  'rules': [{ 'validator': _isRequired2.default }, {
    'validator': _isLength2.default,
    'options': { 'min': 2, 'max': 9 }
  }]
}, {
  'element': '#email',
  'rules': [{ 'validator': _isRequired2.default }, {
    'validator': _isLength2.default,
    'options': { 'min': 2, 'max': 60 }
  }, { 'validator': _isEmail2.default }]
}];

document.querySelector('#btn').addEventListener('click', function (e) {
  flamingo.validate(fields).then(function (response) {
    console.log(response);
  });
});

console.log('Hello');

},{"../lib/i18n/pt-br":3,"../lib/index":4,"../lib/validators/isEmail":6,"../lib/validators/isLength":7,"../lib/validators/isRequired":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MESSAGES = {
  defaultMessage: 'This value is invalid.',
  isBoolean: 'This field should be boolean.',
  isCPF: 'This field should be a valid CPF.',
  isDate: 'This field should be a valid date.',
  isEmail: 'This field should be a valid email.',
  isEqual: 'This field should be equals to %s.',
  isInteger: 'This field should be integer.',
  isLength: 'Este campo deve ser aaaaaaaaaa.',
  isRequired: 'This field is required.',
  isStrictEqual: 'This field should be equals to %s.'
};

exports.default = MESSAGES;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MESSAGES = {
  defaultMessage: 'Este valor é inválido.',
  isBoolean: 'Este campo deve ser booleano.',
  isCPF: 'Este campo deve ser um CPF válido.',
  isDate: 'Este campo deve ser uma data válida.',
  isEmail: 'Este campo deve ser um e-mail válido.',
  isEqual: 'Este campo deve ser igual a %s.',
  isInteger: 'Este campo deve ser inteiro.',
  isLength: 'Este campo deve estar entre %s e %s.',
  isRequired: 'Este campo é obrigatório.',
  isStrictEqual: 'Este campo deve ser igual a %s.'
};

exports.default = MESSAGES;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _iterate = require('./utils/iterate');

var _iterate2 = _interopRequireDefault(_iterate);

var _en = require('./i18n/en');

var _en2 = _interopRequireDefault(_en);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CLASSES = {
  'errorField': 'error-field',
  'errorMessage': 'error-message',
  'errorLabel': 'error-label'
};

var prevErrors = [];
var errors = [];
var doc = undefined;
var messages = _en2.default;

function resetErrors() {
  errors = [];
}

function setError(element, rule) {
  var error = {
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
  var verifyIfHasError = willVerify || false;

  if (!elementHasError(element) || verifyIfHasError) {
    removeErrorClasses(element);
  }

  removeMessage(element);
}

function removeErrorClasses(element) {
  var id = element.split('#')[1];
  var labelSelector = '[for="' + id + '"]';

  if (doc.querySelector(labelSelector) !== null) {
    doc.querySelector(labelSelector).classList.remove(CLASSES.errorLabel);
  }
  doc.querySelector(element).classList.remove(CLASSES.errorField);
}

function removeMessage(element) {
  if (doc.querySelector(element).parentNode.querySelector('.' + CLASSES.errorMessage) !== null) {
    doc.querySelector(element).parentNode.querySelector('.' + CLASSES.errorMessage).remove();
  }
}

function setElementError(element, error) {
  var span = doc.createElement('span');
  span.innerHTML = messages[error] || messages['defaultMessage'] || error;
  span.setAttribute('class', CLASSES.errorMessage);

  if (!elementHasError(element)) {
    var id = element.split('#')[1];
    var labelSelector = '[for="' + id + '"]';

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

var FlamingoJS = (function () {
  function FlamingoJS(options) {
    _classCallCheck(this, FlamingoJS);

    try {
      if (options.hasOwnProperty('document')) {
        doc = options.document;
      }
    } catch (e) {
      doc = document;
    }
  }

  _createClass(FlamingoJS, [{
    key: 'setMessages',
    value: function setMessages(msg) {
      messages = (0, _merge2.default)(true, msg);
    }
  }, {
    key: 'showError',
    value: function showError(element, error, errorElement) {
      var elementSelector = errorElement ? errorElement : element;

      clearElement(element);
      setElementError(elementSelector, error);
    }
  }, {
    key: 'validate',
    value: function validate(fields) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        resetErrors();

        fields.forEach(function (field) {
          var error = null;

          field.rules.forEach(function (rule) {
            if (error === null) {
              var ruleOptions = rule.options || {};
              var value = getElementText(field.element);

              if (!rule.validator(value, ruleOptions)) {
                error = setError(field.element, rule.validator.name);
              }
            }
          });

          if (error !== null) {
            var prevError = prevErrors[error.element] || {};

            if (prevError.element === field.element && prevError.rule !== error.rule || !prevError.hasOwnProperty('element')) {
              _this.showError(field.element, error.rule);
            }
          } else {
            clearElement(field.element, true);
          }
        });

        prevErrors = errors;
        resolve(errors);
      });
    }
  }]);

  return FlamingoJS;
})();

exports.default = FlamingoJS;
module.exports = exports['default'];

},{"./i18n/en":2,"./utils/iterate":5,"merge":9}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = iterate;
function iterate(items, callback) {
  Array.prototype.forEach.call(items, function (element) {
    callback(element);
  });
};
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;
function isEmail(string) {
  var pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  return pattern.test(string);
}
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isLength;
function verifyMaxLength(string, maxLenght) {
  return string.length <= maxLenght;
}

function verifyMinLength(string, minLength) {
  return string.length >= minLength;
}

function isLength(string, options) {
  var isCorrect = true;

  if (options.hasOwnProperty('min')) {
    isCorrect = verifyMinLength(string, options.min);
  }

  if (options.hasOwnProperty('max') && isCorrect) {
    isCorrect = verifyMaxLength(string, options.max);
  }

  return isCorrect;
}
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRequired;
function isRequired(string) {
  try {
    return string.length !== 0;
  } catch (e) {
    return false;
  }
}
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
/*!
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	/**
	 * Merge one or more objects 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	var Public = function(clone) {

		return merge(clone === true, false, arguments);

	}, publicName = 'merge';

	/**
	 * Merge two or more objects recursively 
	 * @param bool? clone
	 * @param mixed,... arguments
	 * @return object
	 */

	Public.recursive = function(clone) {

		return merge(clone === true, true, arguments);

	};

	/**
	 * Clone the input removing any reference
	 * @param mixed input
	 * @return mixed
	 */

	Public.clone = function(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = Public.clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = Public.clone(input[index]);

		}

		return output;

	};

	/**
	 * Merge two objects recursively
	 * @param mixed input
	 * @param mixed extend
	 * @return mixed
	 */

	function merge_recursive(base, extend) {

		if (typeOf(base) !== 'object')

			return extend;

		for (var key in extend) {

			if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {

				base[key] = merge_recursive(base[key], extend[key]);

			} else {

				base[key] = extend[key];

			}

		}

		return base;

	}

	/**
	 * Merge two or more objects
	 * @param bool clone
	 * @param bool recursive
	 * @param array argv
	 * @return object
	 */

	function merge(clone, recursive, argv) {

		var result = argv[0],
			size = argv.length;

		if (clone || typeOf(result) !== 'object')

			result = {};

		for (var index=0;index<size;++index) {

			var item = argv[index],

				type = typeOf(item);

			if (type !== 'object') continue;

			for (var key in item) {

				var sitem = clone ? Public.clone(item[key]) : item[key];

				if (recursive) {

					result[key] = merge_recursive(result[key], sitem);

				} else {

					result[key] = sitem;

				}

			}

		}

		return result;

	}

	/**
	 * Get type of variable
	 * @param mixed input
	 * @return string
	 *
	 * @see http://jsperf.com/typeofvar
	 */

	function typeOf(input) {

		return ({}).toString.call(input).slice(8, -1).toLowerCase();

	}

	if (isNode) {

		module.exports = Public;

	} else {

		window[publicName] = Public;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L21haW4uanMiLCJsaWIvaTE4bi9lbi5qcyIsImxpYi9pMThuL3B0LWJyLmpzIiwibGliL2luZGV4LmpzIiwibGliL3V0aWxzL2l0ZXJhdGUuanMiLCJsaWIvdmFsaWRhdG9ycy9pc0VtYWlsLmpzIiwibGliL3ZhbGlkYXRvcnMvaXNMZW5ndGguanMiLCJsaWIvdmFsaWRhdG9ycy9pc1JlcXVpcmVkLmpzIiwibm9kZV9tb2R1bGVzL21lcmdlL21lcmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDT0EsT0FBTyxDQUFDLEdBQUcsZ0JBQVUsQ0FBQztBQUN0QixJQUFJLFFBQVEsR0FBRyxxQkFBZ0IsQ0FBQztBQUNoQyxRQUFRLENBQUMsV0FBVyxnQkFBVSxDQUFDOztBQUUvQixJQUFNLE1BQU0sR0FBRyxDQUNiO0FBQ0UsV0FBUyxFQUFFLFdBQVc7QUFDdEIsU0FBTyxFQUFFLENBQ1AsRUFBRSxXQUFXLHNCQUFZLEVBQUUsRUFDM0I7QUFDRSxlQUFXLG9CQUFVO0FBQ3JCLGFBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtHQUNsQyxDQUNGO0NBQ0YsRUFDRDtBQUNFLFdBQVMsRUFBRSxXQUFXO0FBQ3RCLFNBQU8sRUFBRSxDQUNQLEVBQUUsV0FBVyxzQkFBWSxFQUFFLEVBQzNCO0FBQ0UsZUFBVyxvQkFBVTtBQUNyQixhQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7R0FDbEMsQ0FDRjtDQUNGLEVBQ0Q7QUFDRSxXQUFTLEVBQUUsUUFBUTtBQUNuQixTQUFPLEVBQUUsQ0FDUCxFQUFFLFdBQVcsc0JBQVksRUFBRSxFQUMzQjtBQUNFLGVBQVcsb0JBQVU7QUFDckIsYUFBUyxF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TUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztHQUNsRDs7QUFFRCxTQUFPLFNBQVMsQ0FBQztDQUNsQjs7Ozs7Ozs7O2tCQ3BCdUIsVUFBVTtBQUFuQixTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDekMsTUFBSTtBQUNGLFdBQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7R0FDNUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNWLFdBQU8sS0FBSyxDQUFDO0dBQ2Q7Q0FDRjs7OztBQ05EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBpc0xlbmd0aCBmcm9tICcuLi9saWIvdmFsaWRhdG9ycy9pc0xlbmd0aCc7XG5pbXBvcnQgaXNFbWFpbCBmcm9tICcuLi9saWIvdmFsaWRhdG9ycy9pc0VtYWlsJztcbmltcG9ydCBpc1JlcXVpcmVkIGZyb20gJy4uL2xpYi92YWxpZGF0b3JzL2lzUmVxdWlyZWQnO1xuXG5pbXBvcnQgbWVzc2FnZXMgZnJvbSAnLi4vbGliL2kxOG4vcHQtYnInO1xuaW1wb3J0IEZsYW1pbmdvSlMgZnJvbSAnLi4vbGliL2luZGV4JztcblxuY29uc29sZS5sb2cobWVzc2FnZXMpO1xubGV0IGZsYW1pbmdvID0gbmV3IEZsYW1pbmdvSlMoKTtcbmZsYW1pbmdvLnNldE1lc3NhZ2VzKG1lc3NhZ2VzKTtcblxuY29uc3QgZmllbGRzID0gW1xuICB7XG4gICAgJ2VsZW1lbnQnOiAnI3VzZXJuYW1lJyxcbiAgICAncnVsZXMnOiBbXG4gICAgICB7ICd2YWxpZGF0b3InOiBpc1JlcXVpcmVkIH0sXG4gICAgICB7XG4gICAgICAgICd2YWxpZGF0b3InOiBpc0xlbmd0aCxcbiAgICAgICAgJ29wdGlvbnMnOiB7ICdtaW4nOiAyLCAnbWF4JzogOSB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgJ2VsZW1lbnQnOiAnI3Bhc3N3b3JkJyxcbiAgICAncnVsZXMnOiBbXG4gICAgICB7ICd2YWxpZGF0b3InOiBpc1JlcXVpcmVkIH0sXG4gICAgICB7XG4gICAgICAgICd2YWxpZGF0b3InOiBpc0xlbmd0aCxcbiAgICAgICAgJ29wdGlvbnMnOiB7ICdtaW4nOiAyLCAnbWF4JzogOSB9XG4gICAgICB9XG4gICAgXVxuICB9LFxuICB7XG4gICAgJ2VsZW1lbnQnOiAnI2VtYWlsJyxcbiAgICAncnVsZXMnOiBbXG4gICAgICB7ICd2YWxpZGF0b3InOiBpc1JlcXVpcmVkIH0sXG4gICAgICB7XG4gICAgICAgICd2YWxpZGF0b3InOiBpc0xlbmd0aCxcbiAgICAgICAgJ29wdGlvbnMnOiB7ICdtaW4nOiAyLCAnbWF4JzogNjAgfVxuICAgICAgfSxcbiAgICAgIHsgJ3ZhbGlkYXRvcic6IGlzRW1haWwgfVxuICAgIF1cbiAgfVxuXTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgZmxhbWluZ28udmFsaWRhdGUoZmllbGRzKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIH0pO1xufSk7XG5cbmNvbnNvbGUubG9nKCdIZWxsbycpXG4iLCJjb25zdCBNRVNTQUdFUyA9IHtcbiAgZGVmYXVsdE1lc3NhZ2U6ICdUaGlzIHZhbHVlIGlzIGludmFsaWQuJyxcbiAgaXNCb29sZWFuOiAnVGhpcyBmaWVsZCBzaG91bGQgYmUgYm9vbGVhbi4nLFxuICBpc0NQRjogJ1RoaXMgZmllbGQgc2hvdWxkIGJlIGEgdmFsaWQgQ1BGLicsXG4gIGlzRGF0ZTogJ1RoaXMgZmllbGQgc2hvdWxkIGJlIGEgdmFsaWQgZGF0ZS4nLFxuICBpc0VtYWlsOiAnVGhpcyBmaWVsZCBzaG91bGQgYmUgYSB2YWxpZCBlbWFpbC4nLFxuICBpc0VxdWFsOiAnVGhpcyBmaWVsZCBzaG91bGQgYmUgZXF1YWxzIHRvICVzLicsXG4gIGlzSW50ZWdlcjogJ1RoaXMgZmllbGQgc2hvdWxkIGJlIGludGVnZXIuJyxcbiAgaXNMZW5ndGg6ICdFc3RlIGNhbXBvIGRldmUgc2VyIGFhYWFhYWFhYWEuJyxcbiAgaXNSZXF1aXJlZDogJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQuJyxcbiAgaXNTdHJpY3RFcXVhbDogJ1RoaXMgZmllbGQgc2hvdWxkIGJlIGVxdWFscyB0byAlcy4nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTUVTU0FHRVM7XG4iLCJjb25zdCBNRVNTQUdFUyA9IHtcbiAgZGVmYXVsdE1lc3NhZ2U6ICdFc3RlIHZhbG9yIMOpIGludsOhbGlkby4nLFxuICBpc0Jvb2xlYW46ICdFc3RlIGNhbXBvIGRldmUgc2VyIGJvb2xlYW5vLicsXG4gIGlzQ1BGOiAnRXN0ZSBjYW1wbyBkZXZlIHNlciB1bSBDUEYgdsOhbGlkby4nLFxuICBpc0RhdGU6ICdFc3RlIGNhbXBvIGRldmUgc2VyIHVtYSBkYXRhIHbDoWxpZGEuJyxcbiAgaXNFbWFpbDogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgdW0gZS1tYWlsIHbDoWxpZG8uJyxcbiAgaXNFcXVhbDogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgaWd1YWwgYSAlcy4nLFxuICBpc0ludGVnZXI6ICdFc3RlIGNhbXBvIGRldmUgc2VyIGludGVpcm8uJyxcbiAgaXNMZW5ndGg6ICdFc3RlIGNhbXBvIGRldmUgZXN0YXIgZW50cmUgJXMgZSAlcy4nLFxuICBpc1JlcXVpcmVkOiAnRXN0ZSBjYW1wbyDDqSBvYnJpZ2F0w7NyaW8uJyxcbiAgaXNTdHJpY3RFcXVhbDogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgaWd1YWwgYSAlcy4nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTUVTU0FHRVM7XG4iLCJpbXBvcnQgbWVyZ2UgZnJvbSAnbWVyZ2UnO1xuaW1wb3J0IGl0ZXJhdGUgZnJvbSAnLi91dGlscy9pdGVyYXRlJztcbmltcG9ydCBkZWZhdWx0TWVzc2FnZXMgZnJvbSAnLi9pMThuL2VuJztcblxuY29uc3QgQ0xBU1NFUyA9IHtcbiAgJ2Vycm9yRmllbGQnOiAnZXJyb3ItZmllbGQnLFxuICAnZXJyb3JNZXNzYWdlJzogJ2Vycm9yLW1lc3NhZ2UnLFxuICAnZXJyb3JMYWJlbCc6ICdlcnJvci1sYWJlbCdcbn07XG5cbmxldCBwcmV2RXJyb3JzID0gW107XG5sZXQgZXJyb3JzID0gW107XG5sZXQgZG9jO1xubGV0IG1lc3NhZ2VzID0gZGVmYXVsdE1lc3NhZ2VzO1xuXG5mdW5jdGlvbiByZXNldEVycm9ycygpIHtcbiAgZXJyb3JzID0gW107XG59XG5cbmZ1bmN0aW9uIHNldEVycm9yKGVsZW1lbnQsIHJ1bGUpIHtcbiAgY29uc3QgZXJyb3IgPSB7XG4gICAgJ2VsZW1lbnQnOiBlbGVtZW50LFxuICAgICdydWxlJzogcnVsZVxuICB9O1xuXG4gIGVycm9yc1tlbGVtZW50XSA9IGVycm9yO1xuXG4gIHJldHVybiBlcnJvcjtcbn1cblxuZnVuY3Rpb24gZWxlbWVudEhhc0Vycm9yKGVsZW1lbnQpIHtcbiAgcmV0dXJuIHByZXZFcnJvcnNbZWxlbWVudF07XG59XG5cbmZ1bmN0aW9uIGNsZWFyRWxlbWVudChlbGVtZW50LCB3aWxsVmVyaWZ5KSB7XG4gIGNvbnN0IHZlcmlmeUlmSGFzRXJyb3IgPSB3aWxsVmVyaWZ5IHx8IGZhbHNlO1xuXG4gIGlmICghZWxlbWVudEhhc0Vycm9yKGVsZW1lbnQpIHx8IHZlcmlmeUlmSGFzRXJyb3IpIHtcbiAgICByZW1vdmVFcnJvckNsYXNzZXMoZWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVNZXNzYWdlKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFcnJvckNsYXNzZXMoZWxlbWVudCkge1xuICBsZXQgaWQgPSBlbGVtZW50LnNwbGl0KCcjJylbMV07XG4gIGxldCBsYWJlbFNlbGVjdG9yID0gYFtmb3I9XCIke2lkfVwiXWA7XG5cbiAgaWYgKGRvYy5xdWVyeVNlbGVjdG9yKGxhYmVsU2VsZWN0b3IpICE9PSBudWxsKSB7XG4gICAgZG9jLnF1ZXJ5U2VsZWN0b3IobGFiZWxTZWxlY3RvcikuY2xhc3NMaXN0LnJlbW92ZShDTEFTU0VTLmVycm9yTGFiZWwpO1xuICB9XG4gIGRvYy5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NFUy5lcnJvckZpZWxkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWVzc2FnZShlbGVtZW50KSB7XG4gIGlmIChkb2MucXVlcnlTZWxlY3RvcihlbGVtZW50KS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoYC4ke0NMQVNTRVMuZXJyb3JNZXNzYWdlfWApICE9PSBudWxsKSB7XG4gICAgZG9jLnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCkucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKGAuJHtDTEFTU0VTLmVycm9yTWVzc2FnZX1gKS5yZW1vdmUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50RXJyb3IoZWxlbWVudCwgZXJyb3IpIHtcbiAgbGV0IHNwYW4gPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzcGFuLmlubmVySFRNTCA9IG1lc3NhZ2VzW2Vycm9yXSB8fCBtZXNzYWdlc1snZGVmYXVsdE1lc3NhZ2UnXSB8fCBlcnJvcjtcbiAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ0xBU1NFUy5lcnJvck1lc3NhZ2UpO1xuXG4gIGlmICghZWxlbWVudEhhc0Vycm9yKGVsZW1lbnQpKSB7XG4gICAgbGV0IGlkID0gZWxlbWVudC5zcGxpdCgnIycpWzFdO1xuICAgIGxldCBsYWJlbFNlbGVjdG9yID0gYFtmb3I9XCIke2lkfVwiXWA7XG5cbiAgICBpZiAoZG9jLnF1ZXJ5U2VsZWN0b3IobGFiZWxTZWxlY3RvcikgIT09IG51bGwpIHtcbiAgICAgIGRvYy5xdWVyeVNlbGVjdG9yKGxhYmVsU2VsZWN0b3IpLmNsYXNzTGlzdC5hZGQoQ0xBU1NFUy5lcnJvckxhYmVsKTtcbiAgICB9XG5cbiAgICBkb2MucXVlcnlTZWxlY3RvcihlbGVtZW50KS5jbGFzc0xpc3QuYWRkKENMQVNTRVMuZXJyb3JGaWVsZCk7XG4gIH1cblxuICBkb2MucXVlcnlTZWxlY3RvcihlbGVtZW50KS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHNwYW4pO1xufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50VGV4dChlbGVtZW50KSB7XG4gIHJldHVybiBkb2MucXVlcnlTZWxlY3RvcihlbGVtZW50KS52YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxhbWluZ29KUyB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2RvY3VtZW50JykpIHtcbiAgICAgICAgZG9jID0gb3B0aW9ucy5kb2N1bWVudDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBkb2MgPSBkb2N1bWVudDtcbiAgICB9XG4gIH1cblxuICBzZXRNZXNzYWdlcyhtc2cpIHtcbiAgICBtZXNzYWdlcyA9IG1lcmdlKHRydWUsIG1zZyk7XG4gIH1cblxuICBzaG93RXJyb3IoZWxlbWVudCwgZXJyb3IsIGVycm9yRWxlbWVudCkge1xuICAgIGNvbnN0IGVsZW1lbnRTZWxlY3RvciA9IGVycm9yRWxlbWVudCA/IGVycm9yRWxlbWVudCA6IGVsZW1lbnQ7XG5cbiAgICBjbGVhckVsZW1lbnQoZWxlbWVudCk7XG4gICAgc2V0RWxlbWVudEVycm9yKGVsZW1lbnRTZWxlY3RvciwgZXJyb3IpO1xuICB9XG5cbiAgdmFsaWRhdGUoZmllbGRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc2V0RXJyb3JzKCk7XG5cbiAgICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgICBsZXQgZXJyb3IgPSBudWxsO1xuXG4gICAgICAgIGZpZWxkLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJ1bGVPcHRpb25zID0gcnVsZS5vcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRFbGVtZW50VGV4dChmaWVsZC5lbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKCFydWxlLnZhbGlkYXRvcih2YWx1ZSwgcnVsZU9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgIGVycm9yID0gc2V0RXJyb3IoZmllbGQuZWxlbWVudCwgcnVsZS52YWxpZGF0b3IubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZXJyb3IgIT09IG51bGwpIHtcbiAgICAgICAgICBsZXQgcHJldkVycm9yID0gcHJldkVycm9yc1tlcnJvci5lbGVtZW50XSB8fCB7fTtcblxuICAgICAgICAgIGlmICgocHJldkVycm9yLmVsZW1lbnQgPT09IGZpZWxkLmVsZW1lbnQgJiYgcHJldkVycm9yLnJ1bGUgIT09IGVycm9yLnJ1bGUpIHx8XG4gICAgICAgICAgICAgICFwcmV2RXJyb3IuaGFzT3duUHJvcGVydHkoJ2VsZW1lbnQnKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IoZmllbGQuZWxlbWVudCwgZXJyb3IucnVsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsZWFyRWxlbWVudChmaWVsZC5lbGVtZW50LCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHByZXZFcnJvcnMgPSBlcnJvcnM7XG4gICAgICByZXNvbHZlKGVycm9ycyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGl0ZXJhdGUoaXRlbXMsIGNhbGxiYWNrKSB7XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoaXRlbXMsIChlbGVtZW50KSA9PiB7XG4gICAgY2FsbGJhY2soZWxlbWVudCk7XG4gIH0pO1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRW1haWwoc3RyaW5nKSB7XG4gIGNvbnN0IHBhdHRlcm4gPSAvXlstYS16MC05fiEkJV4mKl89K317XFwnP10rKFxcLlstYS16MC05fiEkJV4mKl89K317XFwnP10rKSpAKFthLXowLTlfXVstYS16MC05X10qKFxcLlstYS16MC05X10rKSpcXC4oYWVyb3xhcnBhfGJpenxjb218Y29vcHxlZHV8Z292fGluZm98aW50fG1pbHxtdXNldW18bmFtZXxuZXR8b3JnfHByb3x0cmF2ZWx8bW9iaXxbYS16XVthLXpdKXwoWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfSkpKDpbMC05XXsxLDV9KT8kL2k7XG5cbiAgcmV0dXJuIHBhdHRlcm4udGVzdChzdHJpbmcpO1xufVxuIiwiZnVuY3Rpb24gdmVyaWZ5TWF4TGVuZ3RoKHN0cmluZywgbWF4TGVuZ2h0KSB7XG4gIHJldHVybiBzdHJpbmcubGVuZ3RoIDw9IG1heExlbmdodDtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5TWluTGVuZ3RoKHN0cmluZywgbWluTGVuZ3RoKSB7XG4gIHJldHVybiBzdHJpbmcubGVuZ3RoID49IG1pbkxlbmd0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNMZW5ndGgoc3RyaW5nLCBvcHRpb25zKSB7XG4gIHZhciBpc0NvcnJlY3QgPSB0cnVlO1xuXG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdtaW4nKSkge1xuICAgIGlzQ29ycmVjdCA9IHZlcmlmeU1pbkxlbmd0aChzdHJpbmcsIG9wdGlvbnMubWluKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KCdtYXgnKSAmJiBpc0NvcnJlY3QpIHtcbiAgICBpc0NvcnJlY3QgPSB2ZXJpZnlNYXhMZW5ndGgoc3RyaW5nLCBvcHRpb25zLm1heCk7XG4gIH1cblxuICByZXR1cm4gaXNDb3JyZWN0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNSZXF1aXJlZChzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aCAhPT0gMDtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLyohXHJcbiAqIEBuYW1lIEphdmFTY3JpcHQvTm9kZUpTIE1lcmdlIHYxLjIuMFxyXG4gKiBAYXV0aG9yIHllaWtvc1xyXG4gKiBAcmVwb3NpdG9yeSBodHRwczovL2dpdGh1Yi5jb20veWVpa29zL2pzLm1lcmdlXHJcblxyXG4gKiBDb3B5cmlnaHQgMjAxNCB5ZWlrb3MgLSBNSVQgbGljZW5zZVxyXG4gKiBodHRwczovL3Jhdy5naXRodWIuY29tL3llaWtvcy9qcy5tZXJnZS9tYXN0ZXIvTElDRU5TRVxyXG4gKi9cclxuXHJcbjsoZnVuY3Rpb24oaXNOb2RlKSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1lcmdlIG9uZSBvciBtb3JlIG9iamVjdHMgXHJcblx0ICogQHBhcmFtIGJvb2w/IGNsb25lXHJcblx0ICogQHBhcmFtIG1peGVkLC4uLiBhcmd1bWVudHNcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cclxuXHR2YXIgUHVibGljID0gZnVuY3Rpb24oY2xvbmUpIHtcclxuXHJcblx0XHRyZXR1cm4gbWVyZ2UoY2xvbmUgPT09IHRydWUsIGZhbHNlLCBhcmd1bWVudHMpO1xyXG5cclxuXHR9LCBwdWJsaWNOYW1lID0gJ21lcmdlJztcclxuXHJcblx0LyoqXHJcblx0ICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0cyByZWN1cnNpdmVseSBcclxuXHQgKiBAcGFyYW0gYm9vbD8gY2xvbmVcclxuXHQgKiBAcGFyYW0gbWl4ZWQsLi4uIGFyZ3VtZW50c1xyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblxyXG5cdFB1YmxpYy5yZWN1cnNpdmUgPSBmdW5jdGlvbihjbG9uZSkge1xyXG5cclxuXHRcdHJldHVybiBtZXJnZShjbG9uZSA9PT0gdHJ1ZSwgdHJ1ZSwgYXJndW1lbnRzKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2xvbmUgdGhlIGlucHV0IHJlbW92aW5nIGFueSByZWZlcmVuY2VcclxuXHQgKiBAcGFyYW0gbWl4ZWQgaW5wdXRcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblxyXG5cdFB1YmxpYy5jbG9uZSA9IGZ1bmN0aW9uKGlucHV0KSB7XHJcblxyXG5cdFx0dmFyIG91dHB1dCA9IGlucHV0LFxyXG5cdFx0XHR0eXBlID0gdHlwZU9mKGlucHV0KSxcclxuXHRcdFx0aW5kZXgsIHNpemU7XHJcblxyXG5cdFx0aWYgKHR5cGUgPT09ICdhcnJheScpIHtcclxuXHJcblx0XHRcdG91dHB1dCA9IFtdO1xyXG5cdFx0XHRzaXplID0gaW5wdXQubGVuZ3RoO1xyXG5cclxuXHRcdFx0Zm9yIChpbmRleD0wO2luZGV4PHNpemU7KytpbmRleClcclxuXHJcblx0XHRcdFx0b3V0cHV0W2luZGV4XSA9IFB1YmxpYy5jbG9uZShpbnB1dFtpbmRleF0pO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcclxuXHJcblx0XHRcdG91dHB1dCA9IHt9O1xyXG5cclxuXHRcdFx0Zm9yIChpbmRleCBpbiBpbnB1dClcclxuXHJcblx0XHRcdFx0b3V0cHV0W2luZGV4XSA9IFB1YmxpYy5jbG9uZShpbnB1dFtpbmRleF0pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gb3V0cHV0O1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNZXJnZSB0d28gb2JqZWN0cyByZWN1cnNpdmVseVxyXG5cdCAqIEBwYXJhbSBtaXhlZCBpbnB1dFxyXG5cdCAqIEBwYXJhbSBtaXhlZCBleHRlbmRcclxuXHQgKiBAcmV0dXJuIG1peGVkXHJcblx0ICovXHJcblxyXG5cdGZ1bmN0aW9uIG1lcmdlX3JlY3Vyc2l2ZShiYXNlLCBleHRlbmQpIHtcclxuXHJcblx0XHRpZiAodHlwZU9mKGJhc2UpICE9PSAnb2JqZWN0JylcclxuXHJcblx0XHRcdHJldHVybiBleHRlbmQ7XHJcblxyXG5cdFx0Zm9yICh2YXIga2V5IGluIGV4dGVuZCkge1xyXG5cclxuXHRcdFx0aWYgKHR5cGVPZihiYXNlW2tleV0pID09PSAnb2JqZWN0JyAmJiB0eXBlT2YoZXh0ZW5kW2tleV0pID09PSAnb2JqZWN0Jykge1xyXG5cclxuXHRcdFx0XHRiYXNlW2tleV0gPSBtZXJnZV9yZWN1cnNpdmUoYmFzZVtrZXldLCBleHRlbmRba2V5XSk7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRiYXNlW2tleV0gPSBleHRlbmRba2V5XTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJhc2U7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0c1xyXG5cdCAqIEBwYXJhbSBib29sIGNsb25lXHJcblx0ICogQHBhcmFtIGJvb2wgcmVjdXJzaXZlXHJcblx0ICogQHBhcmFtIGFycmF5IGFyZ3ZcclxuXHQgKiBAcmV0dXJuIG9iamVjdFxyXG5cdCAqL1xyXG5cclxuXHRmdW5jdGlvbiBtZXJnZShjbG9uZSwgcmVjdXJzaXZlLCBhcmd2KSB7XHJcblxyXG5cdFx0dmFyIHJlc3VsdCA9IGFyZ3ZbMF0sXHJcblx0XHRcdHNpemUgPSBhcmd2Lmxlbmd0aDtcclxuXHJcblx0XHRpZiAoY2xvbmUgfHwgdHlwZU9mKHJlc3VsdCkgIT09ICdvYmplY3QnKVxyXG5cclxuXHRcdFx0cmVzdWx0ID0ge307XHJcblxyXG5cdFx0Zm9yICh2YXIgaW5kZXg9MDtpbmRleDxzaXplOysraW5kZXgpIHtcclxuXHJcblx0XHRcdHZhciBpdGVtID0gYXJndltpbmRleF0sXHJcblxyXG5cdFx0XHRcdHR5cGUgPSB0eXBlT2YoaXRlbSk7XHJcblxyXG5cdFx0XHRpZiAodHlwZSAhPT0gJ29iamVjdCcpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGl0ZW0pIHtcclxuXHJcblx0XHRcdFx0dmFyIHNpdGVtID0gY2xvbmUgPyBQdWJsaWMuY2xvbmUoaXRlbVtrZXldKSA6IGl0ZW1ba2V5XTtcclxuXHJcblx0XHRcdFx0aWYgKHJlY3Vyc2l2ZSkge1xyXG5cclxuXHRcdFx0XHRcdHJlc3VsdFtrZXldID0gbWVyZ2VfcmVjdXJzaXZlKHJlc3VsdFtrZXldLCBzaXRlbSk7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0cmVzdWx0W2tleV0gPSBzaXRlbTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0eXBlIG9mIHZhcmlhYmxlXHJcblx0ICogQHBhcmFtIG1peGVkIGlucHV0XHJcblx0ICogQHJldHVybiBzdHJpbmdcclxuXHQgKlxyXG5cdCAqIEBzZWUgaHR0cDovL2pzcGVyZi5jb20vdHlwZW9mdmFyXHJcblx0ICovXHJcblxyXG5cdGZ1bmN0aW9uIHR5cGVPZihpbnB1dCkge1xyXG5cclxuXHRcdHJldHVybiAoe30pLnRvU3RyaW5nLmNhbGwoaW5wdXQpLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHR9XHJcblxyXG5cdGlmIChpc05vZGUpIHtcclxuXHJcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFB1YmxpYztcclxuXHJcblx0fSBlbHNlIHtcclxuXHJcblx0XHR3aW5kb3dbcHVibGljTmFtZV0gPSBQdWJsaWM7XHJcblxyXG5cdH1cclxuXHJcbn0pKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZSAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKTsiXX0=
