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
  }, function (errors) {
    console.log(errors);
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
  isLength: 'Este campo deve ser aaaaaaaaaa.',
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

var _dom = require('./utils/dom');

var _dom2 = _interopRequireDefault(_dom);

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

  _dom2.default.removeClass(labelSelector, CLASSES.errorLabel);
  _dom2.default.removeClass(element, CLASSES.errorField);
}

function removeMessage(element) {
  var message = _dom2.default.getSiblingElement(element, '.' + CLASSES.errorMessage);

  _dom2.default.remove(message);
}

function setElementError(element, error) {
  var message = messages[error] || messages['defaultMessage'] || error;
  var span = _dom2.default.create('span', {
    'innerHTML': message,
    'attributes': {
      'class': CLASSES.errorMessage
    }
  });

  if (!elementHasError(element)) {
    var id = element.split('#')[1];
    var labelSelector = '[for="' + id + '"]';

    _dom2.default.addClass(labelSelector, CLASSES.errorLabel);
    _dom2.default.addClass(element, CLASSES.errorField);
  }

  _dom2.default.insertAfter(element, span);
}

var FlamingoJS = (function () {
  function FlamingoJS() {
    _classCallCheck(this, FlamingoJS);
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
              var value = _dom2.default.getElement(field.element).value;

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

        if (Object.keys(errors).length === 0) {
          resolve(true);
        } else {
          reject(errors);
        }
      });
    }
  }]);

  return FlamingoJS;
})();

exports.default = FlamingoJS;
module.exports = exports['default'];

},{"./i18n/en":2,"./utils/dom":5,"merge":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

exports.default = {
  getElement: getElement,
  getElements: getElements,
  remove: remove,
  create: create,
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  appendChild: appendChild,
  insertAfter: insertAfter,
  insertBefore: insertBefore,
  getChild: getChild,
  getSiblingElement: getSiblingElement,
  isNode: isNode
};

function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

function remove(element) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  if (isNode(element)) {
    element.parentNode.removeChild(element);
  }
}

function create(elementType, options) {
  var element = document.createElement(elementType);

  if (options.hasOwnProperty('innerHTML')) {
    element.innerHTML = options.innerHTML;
  }

  if (options.hasOwnProperty('attributes')) {
    for (var name in options.attributes) {
      var attribute = options.attributes[name];

      element.setAttribute(name, attribute);
    }
  }

  return element;
}

function addClass(element, className) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  element.classList.add(className);
}

function hasClass(element, className) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  return element.classList.contains(className);
}

function removeClass(element, className) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  element.classList.remove(className);
}

function appendChild(element, content) {
  if (!isNode(element)) {
    element = getElement(element);
  }

  element.appendChild(content);
}

function insertAfter(selector, content) {
  var element = getElement(selector);

  element.parentNode.appendChild(content, element.nextSibling);
}

function insertBefore(selector, content) {
  var element = getElement(selector);

  element.parentNode.insertBefore(content, element);
}

function getChild(father, childSelector) {
  if (!isNode(father)) {
    father = getElement(father);
  }

  var child = father.querySelector(childSelector);

  return child;
}

function getSiblingElement(father, childSelector) {
  if (!isNode(father)) {
    father = getElement(father);
  }

  var child = getChild(father.parentNode, childSelector);

  return child;
}

function isNode(o) {
  return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) == 'object' ? o instanceof Node : o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) == 'object' && typeof o.nodeType == 'number' && typeof o.nodeName == 'string';
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L21haW4uanMiLCJsaWIvaTE4bi9lbi5qcyIsImxpYi9pMThuL3B0LWJyLmpzIiwibGliL2luZGV4LmpzIiwibGliL3V0aWxzL2RvbS5qcyIsImxpYi92YWxpZGF0b3JzL2lzRW1haWwuanMiLCJsaWIvdmFsaWRhdG9ycy9pc0xlbmd0aC5qcyIsImxpYi92YWxpZGF0b3JzL2lzUmVxdWlyZWQuanMiLCJub2RlX21vZHVsZXMvbWVyZ2UvbWVyZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNPQSxPQUFPLENBQUMsR0FBRyxnQkFBVSxDQUFDO0FBQ3RCLElBQUksUUFBUSxHQUFHLHFCQUFnQixDQUFDO0FBQ2hDLFFBQVEsQ0FBQyxXQUFXLGdCQUFVLENBQUM7O0FBRS9CLElBQU0sTUFBTSxHQUFHLENBQ2I7QUFDRSxXQUFTLEVBQUUsV0FBVztBQUN0QixTQUFPLEVBQUUsQ0FDUCxFQUFFLFdBQVcsc0JBQVksRUFBRSxFQUMzQjtBQUNFLGVBQVcsb0JBQVU7QUFDckIsYUFBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0dBQ2xDLENBQ0Y7Q0FDRixFQUNEO0FBQ0UsV0FBUyxFQUFFLFdBQVc7QUFDdEIsU0FBTyxFQUFFLENBQ1AsRUFBRSxXQUFXLHNCQUFZLEVBQUUsRUFDM0I7QUFDRSxlQUFXLG9CQUFVO0FBQ3JCLGFBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtHQUNsQyxDQUNGO0NBQ0YsRUFDRDtBQUNFLFdBQVMsRUFBRSxRQUFRO0FBQ25CLFNBQU8sRUFBRSxDQUNQLEVBQUUsV0FBVyxzQkFBWSxFQUFFLEVBQzNCO0FBQ0UsZUFBVyxvQkFBVTtBQUNyQixhQUFTLEVBQUUs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4uL2xpYi92YWxpZGF0b3JzL2lzTGVuZ3RoJztcbmltcG9ydCBpc0VtYWlsIGZyb20gJy4uL2xpYi92YWxpZGF0b3JzL2lzRW1haWwnO1xuaW1wb3J0IGlzUmVxdWlyZWQgZnJvbSAnLi4vbGliL3ZhbGlkYXRvcnMvaXNSZXF1aXJlZCc7XG5cbmltcG9ydCBtZXNzYWdlcyBmcm9tICcuLi9saWIvaTE4bi9wdC1icic7XG5pbXBvcnQgRmxhbWluZ29KUyBmcm9tICcuLi9saWIvaW5kZXgnO1xuXG5jb25zb2xlLmxvZyhtZXNzYWdlcyk7XG5sZXQgZmxhbWluZ28gPSBuZXcgRmxhbWluZ29KUygpO1xuZmxhbWluZ28uc2V0TWVzc2FnZXMobWVzc2FnZXMpO1xuXG5jb25zdCBmaWVsZHMgPSBbXG4gIHtcbiAgICAnZWxlbWVudCc6ICcjdXNlcm5hbWUnLFxuICAgICdydWxlcyc6IFtcbiAgICAgIHsgJ3ZhbGlkYXRvcic6IGlzUmVxdWlyZWQgfSxcbiAgICAgIHtcbiAgICAgICAgJ3ZhbGlkYXRvcic6IGlzTGVuZ3RoLFxuICAgICAgICAnb3B0aW9ucyc6IHsgJ21pbic6IDIsICdtYXgnOiA5IH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICAnZWxlbWVudCc6ICcjcGFzc3dvcmQnLFxuICAgICdydWxlcyc6IFtcbiAgICAgIHsgJ3ZhbGlkYXRvcic6IGlzUmVxdWlyZWQgfSxcbiAgICAgIHtcbiAgICAgICAgJ3ZhbGlkYXRvcic6IGlzTGVuZ3RoLFxuICAgICAgICAnb3B0aW9ucyc6IHsgJ21pbic6IDIsICdtYXgnOiA5IH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICAnZWxlbWVudCc6ICcjZW1haWwnLFxuICAgICdydWxlcyc6IFtcbiAgICAgIHsgJ3ZhbGlkYXRvcic6IGlzUmVxdWlyZWQgfSxcbiAgICAgIHtcbiAgICAgICAgJ3ZhbGlkYXRvcic6IGlzTGVuZ3RoLFxuICAgICAgICAnb3B0aW9ucyc6IHsgJ21pbic6IDIsICdtYXgnOiA2MCB9XG4gICAgICB9LFxuICAgICAgeyAndmFsaWRhdG9yJzogaXNFbWFpbCB9XG4gICAgXVxuICB9XG5dO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBmbGFtaW5nby52YWxpZGF0ZShmaWVsZHMpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgfSwgKGVycm9ycykgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyb3JzKTtcbiAgICB9KTtcbn0pO1xuXG5jb25zb2xlLmxvZygnSGVsbG8nKVxuIiwiY29uc3QgTUVTU0FHRVMgPSB7XG4gIGRlZmF1bHRNZXNzYWdlOiAnVGhpcyB2YWx1ZSBpcyBpbnZhbGlkLicsXG4gIGlzQm9vbGVhbjogJ1RoaXMgZmllbGQgc2hvdWxkIGJlIGJvb2xlYW4uJyxcbiAgaXNDUEY6ICdUaGlzIGZpZWxkIHNob3VsZCBiZSBhIHZhbGlkIENQRi4nLFxuICBpc0RhdGU6ICdUaGlzIGZpZWxkIHNob3VsZCBiZSBhIHZhbGlkIGRhdGUuJyxcbiAgaXNFbWFpbDogJ1RoaXMgZmllbGQgc2hvdWxkIGJlIGEgdmFsaWQgZW1haWwuJyxcbiAgaXNFcXVhbDogJ1RoaXMgZmllbGQgc2hvdWxkIGJlIGVxdWFscyB0byAlcy4nLFxuICBpc0ludGVnZXI6ICdUaGlzIGZpZWxkIHNob3VsZCBiZSBpbnRlZ2VyLicsXG4gIGlzTGVuZ3RoOiAnRXN0ZSBjYW1wbyBkZXZlIHNlciBhYWFhYWFhYWFhLicsXG4gIGlzUmVxdWlyZWQ6ICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLicsXG4gIGlzU3RyaWN0RXF1YWw6ICdUaGlzIGZpZWxkIHNob3VsZCBiZSBlcXVhbHMgdG8gJXMuJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTUVTU0FHRVM7XG4iLCJjb25zdCBNRVNTQUdFUyA9IHtcbiAgZGVmYXVsdE1lc3NhZ2U6ICdFc3RlIHZhbG9yIMOpIGludsOhbGlkby4nLFxuICBpc0Jvb2xlYW46ICdFc3RlIGNhbXBvIGRldmUgc2VyIGJvb2xlYW5vLicsXG4gIGlzQ1BGOiAnRXN0ZSBjYW1wbyBkZXZlIHNlciB1bSBDUEYgdsOhbGlkby4nLFxuICBpc0RhdGU6ICdFc3RlIGNhbXBvIGRldmUgc2VyIHVtYSBkYXRhIHbDoWxpZGEuJyxcbiAgaXNFbWFpbDogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgdW0gZS1tYWlsIHbDoWxpZG8uJyxcbiAgaXNFcXVhbDogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgaWd1YWwgYSAlcy4nLFxuICBpc0ludGVnZXI6ICdFc3RlIGNhbXBvIGRldmUgc2VyIGludGVpcm8uJyxcbiAgaXNMZW5ndGg6ICdFc3RlIGNhbXBvIGRldmUgc2VyIGFhYWFhYWFhYWEuJyxcbiAgaXNSZXF1aXJlZDogJ0VzdGUgY2FtcG8gw6kgb2JyaWdhdMOzcmlvLicsXG4gIGlzU3RyaWN0RXF1YWw6ICdFc3RlIGNhbXBvIGRldmUgc2VyIGlndWFsIGEgJXMuJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTUVTU0FHRVM7XG4iLCJpbXBvcnQgbWVyZ2UgZnJvbSAnbWVyZ2UnO1xuaW1wb3J0IGRvbSBmcm9tICcuL3V0aWxzL2RvbSc7XG5pbXBvcnQgZGVmYXVsdE1lc3NhZ2VzIGZyb20gJy4vaTE4bi9lbic7XG5cbmNvbnN0IENMQVNTRVMgPSB7XG4gICdlcnJvckZpZWxkJzogJ2Vycm9yLWZpZWxkJyxcbiAgJ2Vycm9yTWVzc2FnZSc6ICdlcnJvci1tZXNzYWdlJyxcbiAgJ2Vycm9yTGFiZWwnOiAnZXJyb3ItbGFiZWwnXG59O1xuXG5sZXQgcHJldkVycm9ycyA9IFtdO1xubGV0IGVycm9ycyA9IFtdO1xubGV0IG1lc3NhZ2VzID0gZGVmYXVsdE1lc3NhZ2VzO1xuXG5mdW5jdGlvbiByZXNldEVycm9ycygpIHtcbiAgZXJyb3JzID0gW107XG59XG5cbmZ1bmN0aW9uIHNldEVycm9yKGVsZW1lbnQsIHJ1bGUpIHtcbiAgY29uc3QgZXJyb3IgPSB7XG4gICAgJ2VsZW1lbnQnOiBlbGVtZW50LFxuICAgICdydWxlJzogcnVsZVxuICB9O1xuXG4gIGVycm9yc1tlbGVtZW50XSA9IGVycm9yO1xuXG4gIHJldHVybiBlcnJvcjtcbn1cblxuZnVuY3Rpb24gZWxlbWVudEhhc0Vycm9yKGVsZW1lbnQpIHtcbiAgcmV0dXJuIHByZXZFcnJvcnNbZWxlbWVudF07XG59XG5cbmZ1bmN0aW9uIGNsZWFyRWxlbWVudChlbGVtZW50LCB3aWxsVmVyaWZ5KSB7XG4gIGNvbnN0IHZlcmlmeUlmSGFzRXJyb3IgPSB3aWxsVmVyaWZ5IHx8IGZhbHNlO1xuXG4gIGlmICghZWxlbWVudEhhc0Vycm9yKGVsZW1lbnQpIHx8IHZlcmlmeUlmSGFzRXJyb3IpIHtcbiAgICByZW1vdmVFcnJvckNsYXNzZXMoZWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVNZXNzYWdlKGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFcnJvckNsYXNzZXMoZWxlbWVudCkge1xuICBjb25zdCBpZCA9IGVsZW1lbnQuc3BsaXQoJyMnKVsxXTtcbiAgY29uc3QgbGFiZWxTZWxlY3RvciA9IGBbZm9yPVwiJHtpZH1cIl1gO1xuXG4gIGRvbS5yZW1vdmVDbGFzcyhsYWJlbFNlbGVjdG9yLCBDTEFTU0VTLmVycm9yTGFiZWwpO1xuICBkb20ucmVtb3ZlQ2xhc3MoZWxlbWVudCwgQ0xBU1NFUy5lcnJvckZpZWxkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWVzc2FnZShlbGVtZW50KSB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBkb20uZ2V0U2libGluZ0VsZW1lbnQoZWxlbWVudCwgYC4ke0NMQVNTRVMuZXJyb3JNZXNzYWdlfWApO1xuXG4gIGRvbS5yZW1vdmUobWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHNldEVsZW1lbnRFcnJvcihlbGVtZW50LCBlcnJvcikge1xuICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbZXJyb3JdIHx8IG1lc3NhZ2VzWydkZWZhdWx0TWVzc2FnZSddIHx8IGVycm9yO1xuICBjb25zdCBzcGFuID0gZG9tLmNyZWF0ZSgnc3BhbicsIHtcbiAgICAnaW5uZXJIVE1MJzogbWVzc2FnZSxcbiAgICAnYXR0cmlidXRlcyc6IHtcbiAgICAgICdjbGFzcyc6IENMQVNTRVMuZXJyb3JNZXNzYWdlXG4gICAgfVxuICB9KTtcblxuICBpZiAoIWVsZW1lbnRIYXNFcnJvcihlbGVtZW50KSkge1xuICAgIGNvbnN0IGlkID0gZWxlbWVudC5zcGxpdCgnIycpWzFdO1xuICAgIGNvbnN0IGxhYmVsU2VsZWN0b3IgPSBgW2Zvcj1cIiR7aWR9XCJdYDtcblxuICAgIGRvbS5hZGRDbGFzcyhsYWJlbFNlbGVjdG9yLCBDTEFTU0VTLmVycm9yTGFiZWwpO1xuICAgIGRvbS5hZGRDbGFzcyhlbGVtZW50LCBDTEFTU0VTLmVycm9yRmllbGQpO1xuICB9XG5cbiAgZG9tLmluc2VydEFmdGVyKGVsZW1lbnQsIHNwYW4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFtaW5nb0pTIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHNldE1lc3NhZ2VzKG1zZykge1xuICAgIG1lc3NhZ2VzID0gbWVyZ2UodHJ1ZSwgbXNnKTtcbiAgfVxuXG4gIHNob3dFcnJvcihlbGVtZW50LCBlcnJvciwgZXJyb3JFbGVtZW50KSB7XG4gICAgY29uc3QgZWxlbWVudFNlbGVjdG9yID0gZXJyb3JFbGVtZW50ID8gZXJyb3JFbGVtZW50IDogZWxlbWVudDtcblxuICAgIGNsZWFyRWxlbWVudChlbGVtZW50KTtcbiAgICBzZXRFbGVtZW50RXJyb3IoZWxlbWVudFNlbGVjdG9yLCBlcnJvcik7XG4gIH1cblxuICB2YWxpZGF0ZShmaWVsZHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVzZXRFcnJvcnMoKTtcblxuICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGxldCBlcnJvciA9IG51bGw7XG5cbiAgICAgICAgZmllbGQucnVsZXMuZm9yRWFjaCgocnVsZSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgcnVsZU9wdGlvbnMgPSBydWxlLm9wdGlvbnMgfHwge307XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRvbS5nZXRFbGVtZW50KGZpZWxkLmVsZW1lbnQpLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXJ1bGUudmFsaWRhdG9yKHZhbHVlLCBydWxlT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgZXJyb3IgPSBzZXRFcnJvcihmaWVsZC5lbGVtZW50LCBydWxlLnZhbGlkYXRvci5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHByZXZFcnJvciA9IHByZXZFcnJvcnNbZXJyb3IuZWxlbWVudF0gfHwge307XG5cbiAgICAgICAgICBpZiAoKHByZXZFcnJvci5lbGVtZW50ID09PSBmaWVsZC5lbGVtZW50ICYmIHByZXZFcnJvci5ydWxlICE9PSBlcnJvci5ydWxlKSB8fFxuICAgICAgICAgICAgICAhcHJldkVycm9yLmhhc093blByb3BlcnR5KCdlbGVtZW50JykpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKGZpZWxkLmVsZW1lbnQsIGVycm9yLnJ1bGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbGVhckVsZW1lbnQoZmllbGQuZWxlbWVudCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBwcmV2RXJyb3JzID0gZXJyb3JzO1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChlcnJvcnMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGdldEVsZW1lbnQ6IGdldEVsZW1lbnQsXG4gIGdldEVsZW1lbnRzOiBnZXRFbGVtZW50cyxcbiAgcmVtb3ZlOiByZW1vdmUsXG4gIGNyZWF0ZTogY3JlYXRlLFxuICBoYXNDbGFzczogaGFzQ2xhc3MsXG4gIGFkZENsYXNzOiBhZGRDbGFzcyxcbiAgcmVtb3ZlQ2xhc3M6IHJlbW92ZUNsYXNzLFxuICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gIGluc2VydEFmdGVyOiBpbnNlcnRBZnRlcixcbiAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gIGdldENoaWxkOiBnZXRDaGlsZCxcbiAgZ2V0U2libGluZ0VsZW1lbnQ6IGdldFNpYmxpbmdFbGVtZW50LFxuICBpc05vZGU6IGlzTm9kZVxufTtcblxuZnVuY3Rpb24gZ2V0RWxlbWVudChzZWxlY3Rvcikge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRzKHNlbGVjdG9yKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQpIHtcbiAgaWYgKCFpc05vZGUoZWxlbWVudCkpIHtcbiAgICBlbGVtZW50ID0gZ2V0RWxlbWVudChlbGVtZW50KTtcbiAgfVxuXG4gIGlmIChpc05vZGUoZWxlbWVudCkpIHtcbiAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlKGVsZW1lbnRUeXBlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnRUeXBlKTtcblxuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnaW5uZXJIVE1MJykpIHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IG9wdGlvbnMuaW5uZXJIVE1MO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2F0dHJpYnV0ZXMnKSkge1xuICAgIGZvciAoY29uc3QgbmFtZSBpbiBvcHRpb25zLmF0dHJpYnV0ZXMpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9wdGlvbnMuYXR0cmlidXRlc1tuYW1lXTtcblxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgYXR0cmlidXRlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmICghaXNOb2RlKGVsZW1lbnQpKSB7XG4gICAgZWxlbWVudCA9IGdldEVsZW1lbnQoZWxlbWVudCk7XG4gIH1cblxuICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbn1cblxuZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmICghaXNOb2RlKGVsZW1lbnQpKSB7XG4gICAgZWxlbWVudCA9IGdldEVsZW1lbnQoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmICghaXNOb2RlKGVsZW1lbnQpKSB7XG4gICAgZWxlbWVudCA9IGdldEVsZW1lbnQoZWxlbWVudCk7XG4gIH1cblxuICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQoZWxlbWVudCwgY29udGVudCkge1xuICBpZiAoIWlzTm9kZShlbGVtZW50KSkge1xuICAgIGVsZW1lbnQgPSBnZXRFbGVtZW50KGVsZW1lbnQpO1xuICB9XG5cbiAgZWxlbWVudC5hcHBlbmRDaGlsZChjb250ZW50KTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoc2VsZWN0b3IsIGNvbnRlbnQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGdldEVsZW1lbnQoc2VsZWN0b3IpO1xuXG4gIGVsZW1lbnQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjb250ZW50LCBlbGVtZW50Lm5leHRTaWJsaW5nKTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHNlbGVjdG9yLCBjb250ZW50KSB7XG4gIGNvbnN0IGVsZW1lbnQgPSBnZXRFbGVtZW50KHNlbGVjdG9yKTtcblxuICBlbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbnRlbnQsIGVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBnZXRDaGlsZChmYXRoZXIsIGNoaWxkU2VsZWN0b3IpIHtcbiAgaWYgKCFpc05vZGUoZmF0aGVyKSkge1xuICAgIGZhdGhlciA9IGdldEVsZW1lbnQoZmF0aGVyKTtcbiAgfVxuXG4gIGNvbnN0IGNoaWxkID0gZmF0aGVyLnF1ZXJ5U2VsZWN0b3IoY2hpbGRTZWxlY3Rvcik7XG5cbiAgcmV0dXJuIGNoaWxkO1xufVxuXG5mdW5jdGlvbiBnZXRTaWJsaW5nRWxlbWVudChmYXRoZXIsIGNoaWxkU2VsZWN0b3IpIHtcbiAgaWYgKCFpc05vZGUoZmF0aGVyKSkge1xuICAgIGZhdGhlciA9IGdldEVsZW1lbnQoZmF0aGVyKTtcbiAgfVxuXG4gIGNvbnN0IGNoaWxkID0gZ2V0Q2hpbGQoZmF0aGVyLnBhcmVudE5vZGUsIGNoaWxkU2VsZWN0b3IpO1xuXG4gIHJldHVybiBjaGlsZDtcbn1cblxuZnVuY3Rpb24gaXNOb2RlKG8pIHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgTm9kZSA9PSAnb2JqZWN0JyA/XG4gICAgICAgIG8gaW5zdGFuY2VvZiBOb2RlIDpcbiAgICAgICAgbyAmJiB0eXBlb2YgbyA9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygby5ub2RlVHlwZSA9PSAnbnVtYmVyJyAmJlxuICAgICAgICB0eXBlb2Ygby5ub2RlTmFtZSA9PSAnc3RyaW5nJ1xuICApO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNFbWFpbChzdHJpbmcpIHtcbiAgY29uc3QgcGF0dGVybiA9IC9eWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSsoXFwuWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSspKkAoW2EtejAtOV9dWy1hLXowLTlfXSooXFwuWy1hLXowLTlfXSspKlxcLihhZXJvfGFycGF8Yml6fGNvbXxjb29wfGVkdXxnb3Z8aW5mb3xpbnR8bWlsfG11c2V1bXxuYW1lfG5ldHxvcmd8cHJvfHRyYXZlbHxtb2JpfFthLXpdW2Etel0pfChbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9KSkoOlswLTldezEsNX0pPyQvaTtcblxuICByZXR1cm4gcGF0dGVybi50ZXN0KHN0cmluZyk7XG59XG4iLCJmdW5jdGlvbiB2ZXJpZnlNYXhMZW5ndGgoc3RyaW5nLCBtYXhMZW5naHQpIHtcbiAgcmV0dXJuIHN0cmluZy5sZW5ndGggPD0gbWF4TGVuZ2h0O1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlNaW5MZW5ndGgoc3RyaW5nLCBtaW5MZW5ndGgpIHtcbiAgcmV0dXJuIHN0cmluZy5sZW5ndGggPj0gbWluTGVuZ3RoO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0xlbmd0aChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgbGV0IGlzQ29ycmVjdCA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21pbicpKSB7XG4gICAgaXNDb3JyZWN0ID0gdmVyaWZ5TWluTGVuZ3RoKHN0cmluZywgb3B0aW9ucy5taW4pO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21heCcpICYmIGlzQ29ycmVjdCkge1xuICAgIGlzQ29ycmVjdCA9IHZlcmlmeU1heExlbmd0aChzdHJpbmcsIG9wdGlvbnMubWF4KTtcbiAgfVxuXG4gIHJldHVybiBpc0NvcnJlY3Q7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1JlcXVpcmVkKHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoICE9PSAwO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvKiFcclxuICogQG5hbWUgSmF2YVNjcmlwdC9Ob2RlSlMgTWVyZ2UgdjEuMi4wXHJcbiAqIEBhdXRob3IgeWVpa29zXHJcbiAqIEByZXBvc2l0b3J5IGh0dHBzOi8vZ2l0aHViLmNvbS95ZWlrb3MvanMubWVyZ2VcclxuXHJcbiAqIENvcHlyaWdodCAyMDE0IHllaWtvcyAtIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20veWVpa29zL2pzLm1lcmdlL21hc3Rlci9MSUNFTlNFXHJcbiAqL1xyXG5cclxuOyhmdW5jdGlvbihpc05vZGUpIHtcclxuXHJcblx0LyoqXHJcblx0ICogTWVyZ2Ugb25lIG9yIG1vcmUgb2JqZWN0cyBcclxuXHQgKiBAcGFyYW0gYm9vbD8gY2xvbmVcclxuXHQgKiBAcGFyYW0gbWl4ZWQsLi4uIGFyZ3VtZW50c1xyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblxyXG5cdHZhciBQdWJsaWMgPSBmdW5jdGlvbihjbG9uZSkge1xyXG5cclxuXHRcdHJldHVybiBtZXJnZShjbG9uZSA9PT0gdHJ1ZSwgZmFsc2UsIGFyZ3VtZW50cyk7XHJcblxyXG5cdH0sIHB1YmxpY05hbWUgPSAnbWVyZ2UnO1xyXG5cclxuXHQvKipcclxuXHQgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzIHJlY3Vyc2l2ZWx5IFxyXG5cdCAqIEBwYXJhbSBib29sPyBjbG9uZVxyXG5cdCAqIEBwYXJhbSBtaXhlZCwuLi4gYXJndW1lbnRzXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHJcblx0UHVibGljLnJlY3Vyc2l2ZSA9IGZ1bmN0aW9uKGNsb25lKSB7XHJcblxyXG5cdFx0cmV0dXJuIG1lcmdlKGNsb25lID09PSB0cnVlLCB0cnVlLCBhcmd1bWVudHMpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDbG9uZSB0aGUgaW5wdXQgcmVtb3ZpbmcgYW55IHJlZmVyZW5jZVxyXG5cdCAqIEBwYXJhbSBtaXhlZCBpbnB1dFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHJcblx0UHVibGljLmNsb25lID0gZnVuY3Rpb24oaW5wdXQpIHtcclxuXHJcblx0XHR2YXIgb3V0cHV0ID0gaW5wdXQsXHJcblx0XHRcdHR5cGUgPSB0eXBlT2YoaW5wdXQpLFxyXG5cdFx0XHRpbmRleCwgc2l6ZTtcclxuXHJcblx0XHRpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xyXG5cclxuXHRcdFx0b3V0cHV0ID0gW107XHJcblx0XHRcdHNpemUgPSBpbnB1dC5sZW5ndGg7XHJcblxyXG5cdFx0XHRmb3IgKGluZGV4PTA7aW5kZXg8c2l6ZTsrK2luZGV4KVxyXG5cclxuXHRcdFx0XHRvdXRwdXRbaW5kZXhdID0gUHVibGljLmNsb25lKGlucHV0W2luZGV4XSk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xyXG5cclxuXHRcdFx0b3V0cHV0ID0ge307XHJcblxyXG5cdFx0XHRmb3IgKGluZGV4IGluIGlucHV0KVxyXG5cclxuXHRcdFx0XHRvdXRwdXRbaW5kZXhdID0gUHVibGljLmNsb25lKGlucHV0W2luZGV4XSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1lcmdlIHR3byBvYmplY3RzIHJlY3Vyc2l2ZWx5XHJcblx0ICogQHBhcmFtIG1peGVkIGlucHV0XHJcblx0ICogQHBhcmFtIG1peGVkIGV4dGVuZFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHJcblx0ZnVuY3Rpb24gbWVyZ2VfcmVjdXJzaXZlKGJhc2UsIGV4dGVuZCkge1xyXG5cclxuXHRcdGlmICh0eXBlT2YoYmFzZSkgIT09ICdvYmplY3QnKVxyXG5cclxuXHRcdFx0cmV0dXJuIGV4dGVuZDtcclxuXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gZXh0ZW5kKSB7XHJcblxyXG5cdFx0XHRpZiAodHlwZU9mKGJhc2Vba2V5XSkgPT09ICdvYmplY3QnICYmIHR5cGVPZihleHRlbmRba2V5XSkgPT09ICdvYmplY3QnKSB7XHJcblxyXG5cdFx0XHRcdGJhc2Vba2V5XSA9IG1lcmdlX3JlY3Vyc2l2ZShiYXNlW2tleV0sIGV4dGVuZFtrZXldKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGJhc2Vba2V5XSA9IGV4dGVuZFtrZXldO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmFzZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzXHJcblx0ICogQHBhcmFtIGJvb2wgY2xvbmVcclxuXHQgKiBAcGFyYW0gYm9vbCByZWN1cnNpdmVcclxuXHQgKiBAcGFyYW0gYXJyYXkgYXJndlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblxyXG5cdGZ1bmN0aW9uIG1lcmdlKGNsb25lLCByZWN1cnNpdmUsIGFyZ3YpIHtcclxuXHJcblx0XHR2YXIgcmVzdWx0ID0gYXJndlswXSxcclxuXHRcdFx0c2l6ZSA9IGFyZ3YubGVuZ3RoO1xyXG5cclxuXHRcdGlmIChjbG9uZSB8fCB0eXBlT2YocmVzdWx0KSAhPT0gJ29iamVjdCcpXHJcblxyXG5cdFx0XHRyZXN1bHQgPSB7fTtcclxuXHJcblx0XHRmb3IgKHZhciBpbmRleD0wO2luZGV4PHNpemU7KytpbmRleCkge1xyXG5cclxuXHRcdFx0dmFyIGl0ZW0gPSBhcmd2W2luZGV4XSxcclxuXHJcblx0XHRcdFx0dHlwZSA9IHR5cGVPZihpdGVtKTtcclxuXHJcblx0XHRcdGlmICh0eXBlICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gaXRlbSkge1xyXG5cclxuXHRcdFx0XHR2YXIgc2l0ZW0gPSBjbG9uZSA/IFB1YmxpYy5jbG9uZShpdGVtW2tleV0pIDogaXRlbVtrZXldO1xyXG5cclxuXHRcdFx0XHRpZiAocmVjdXJzaXZlKSB7XHJcblxyXG5cdFx0XHRcdFx0cmVzdWx0W2tleV0gPSBtZXJnZV9yZWN1cnNpdmUocmVzdWx0W2tleV0sIHNpdGVtKTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHNpdGVtO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHR5cGUgb2YgdmFyaWFibGVcclxuXHQgKiBAcGFyYW0gbWl4ZWQgaW5wdXRcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqXHJcblx0ICogQHNlZSBodHRwOi8vanNwZXJmLmNvbS90eXBlb2Z2YXJcclxuXHQgKi9cclxuXHJcblx0ZnVuY3Rpb24gdHlwZU9mKGlucHV0KSB7XHJcblxyXG5cdFx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChpbnB1dCkuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdH1cclxuXHJcblx0aWYgKGlzTm9kZSkge1xyXG5cclxuXHRcdG1vZHVsZS5leHBvcnRzID0gUHVibGljO1xyXG5cclxuXHR9IGVsc2Uge1xyXG5cclxuXHRcdHdpbmRvd1twdWJsaWNOYW1lXSA9IFB1YmxpYztcclxuXHJcblx0fVxyXG5cclxufSkodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpOyJdfQ==
