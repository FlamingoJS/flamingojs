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

var _iterate = require('./utils/iterate');

var _iterate2 = _interopRequireDefault(_iterate);

var _en = require('./i18n/en');

var _en2 = _interopRequireDefault(_en);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CLASSES = {
  'errorField': 'error-field',
  'errorMessage': 'error-message',
  'errorLabel': 'error-label'
};

var errors = [];
var doc = undefined;
var messages = _en2.default;

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
  var selector = '.' + CLASSES.errorLabel;

  (0, _iterate2.default)(doc.querySelectorAll(selector), function (element) {
    element.classList.remove(CLASSES.errorLabel);
  });

  selector = '.' + CLASSES.errorField;
  (0, _iterate2.default)(doc.querySelectorAll(selector), function (element) {
    element.classList.remove(CLASSES.errorField);
  });

  selector = '.' + CLASSES.errorMessage;
  (0, _iterate2.default)(doc.querySelectorAll(selector), function (element) {
    element.remove();
  });
}

function setElementError(element, error) {
  var span = doc.createElement('span');
  span.innerHTML = messages[error] || messages['defaultMessage'] || error;
  span.setAttribute('class', CLASSES.errorMessage);

  var id = element.split('#')[1];
  var labelSelector = '[for="' + id + '"]';

  if (doc.querySelector(labelSelector) !== null) {
    doc.querySelector(labelSelector).classList.add(CLASSES.errorLabel);
  }

  doc.querySelector(element).classList.add(CLASSES.errorField);
  doc.querySelector(element).parentNode.appendChild(span);
}

function getElementText(element) {
  return doc.querySelector(element).value;
}

var FlamingoJS = (function () {
  function FlamingoJS(options) {
    _classCallCheck(this, FlamingoJS);

    if ((typeof document === 'undefined' ? 'undefined' : _typeof(document)) !== 'object') {
      doc = options.document;
    } else {
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

      setElementError(elementSelector, error);
    }
  }, {
    key: 'validate',
    value: function validate(fields) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        clearElements();
        resetErrors();

        fields.forEach(function (field) {
          var hasError = false;

          field.rules.forEach(function (rule) {
            if (!hasError) {
              var ruleOptions = rule.options || {};
              var value = getElementText(field.element);

              if (!rule.validator(value, ruleOptions)) {
                hasError = true;
                setError(field.element, rule.validator.name);
                _this.showError(field.element, rule.validator.name);
              }
            }
          });
        });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L21haW4uanMiLCJsaWIvaTE4bi9lbi5qcyIsImxpYi9pMThuL3B0LWJyLmpzIiwibGliL2luZGV4LmpzIiwibGliL3V0aWxzL2l0ZXJhdGUuanMiLCJsaWIvdmFsaWRhdG9ycy9pc0VtYWlsLmpzIiwibGliL3ZhbGlkYXRvcnMvaXNMZW5ndGguanMiLCJsaWIvdmFsaWRhdG9ycy9pc1JlcXVpcmVkLmpzIiwibm9kZV9tb2R1bGVzL21lcmdlL21lcmdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDT0EsT0FBTyxDQUFDLEdBQUcsZ0JBQVUsQ0FBQztBQUN0QixJQUFJLFFBQVEsR0FBRyxxQkFBZ0IsQ0FBQztBQUNoQyxRQUFRLENBQUMsV0FBVyxnQkFBVSxDQUFDOztBQUUvQixJQUFNLE1BQU0sR0FBRyxDQUNiO0FBQ0UsV0FBUyxFQUFFLFdBQVc7QUFDdEIsU0FBTyxFQUFFLENBQ1AsRUFBRSxXQUFXLHNCQUFZLEVBQUUsRUFDM0I7QUFDRSxlQUFXLG9CQUFVO0FBQ3JCLGFBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtHQUNsQyxDQUNGO0NBQ0YsRUFDRDtBQUNFLFdBQVMsRUFBRSxXQUFXO0FBQ3RCLFNBQU8sRUFBRSxDQUNQLEVBQUUsV0FBVyxzQkFBWSxFQUFFLEVBQzNCO0FBQ0UsZUFBVyxvQkFBVTtBQUNyQixhQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7R0FDbEMsQ0FDRjtDQUNGLEVBQ0Q7QUFDRSxXQUFTLEVBQUUsUUFBUTtBQUNuQixTQUFPLEVBQUUsQ0FDUCxFQUFFLFdBQVcsc0JBQVksRUFBRSxFQUMzQjtBQUNFLGVBQVcsb0JBQVU7QUFDckIsYUFBUyxF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TyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLEVBQUU7QUFDOUMsYUFBUyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ2xEOztBQUVELFNBQU8sU0FBUyxDQUFDO0NBQ2xCOzs7Ozs7Ozs7a0JDcEJ1QixVQUFVO0FBQW5CLFNBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUN6QyxNQUFJO0FBQ0YsV0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztHQUM1QixDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ1YsV0FBTyxLQUFLLENBQUM7R0FDZDtDQUNGOzs7O0FDTkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4uL2xpYi92YWxpZGF0b3JzL2lzTGVuZ3RoJztcbmltcG9ydCBpc0VtYWlsIGZyb20gJy4uL2xpYi92YWxpZGF0b3JzL2lzRW1haWwnO1xuaW1wb3J0IGlzUmVxdWlyZWQgZnJvbSAnLi4vbGliL3ZhbGlkYXRvcnMvaXNSZXF1aXJlZCc7XG5cbmltcG9ydCBtZXNzYWdlcyBmcm9tICcuLi9saWIvaTE4bi9wdC1icic7XG5pbXBvcnQgRmxhbWluZ29KUyBmcm9tICcuLi9saWIvaW5kZXgnO1xuXG5jb25zb2xlLmxvZyhtZXNzYWdlcyk7XG5sZXQgZmxhbWluZ28gPSBuZXcgRmxhbWluZ29KUygpO1xuZmxhbWluZ28uc2V0TWVzc2FnZXMobWVzc2FnZXMpO1xuXG5jb25zdCBmaWVsZHMgPSBbXG4gIHtcbiAgICAnZWxlbWVudCc6ICcjdXNlcm5hbWUnLFxuICAgICdydWxlcyc6IFtcbiAgICAgIHsgJ3ZhbGlkYXRvcic6IGlzUmVxdWlyZWQgfSxcbiAgICAgIHtcbiAgICAgICAgJ3ZhbGlkYXRvcic6IGlzTGVuZ3RoLFxuICAgICAgICAnb3B0aW9ucyc6IHsgJ21pbic6IDIsICdtYXgnOiA5IH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICAnZWxlbWVudCc6ICcjcGFzc3dvcmQnLFxuICAgICdydWxlcyc6IFtcbiAgICAgIHsgJ3ZhbGlkYXRvcic6IGlzUmVxdWlyZWQgfSxcbiAgICAgIHtcbiAgICAgICAgJ3ZhbGlkYXRvcic6IGlzTGVuZ3RoLFxuICAgICAgICAnb3B0aW9ucyc6IHsgJ21pbic6IDIsICdtYXgnOiA5IH1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICAnZWxlbWVudCc6ICcjZW1haWwnLFxuICAgICdydWxlcyc6IFtcbiAgICAgIHsgJ3ZhbGlkYXRvcic6IGlzUmVxdWlyZWQgfSxcbiAgICAgIHtcbiAgICAgICAgJ3ZhbGlkYXRvcic6IGlzTGVuZ3RoLFxuICAgICAgICAnb3B0aW9ucyc6IHsgJ21pbic6IDIsICdtYXgnOiA2MCB9XG4gICAgICB9LFxuICAgICAgeyAndmFsaWRhdG9yJzogaXNFbWFpbCB9XG4gICAgXVxuICB9XG5dO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBmbGFtaW5nby52YWxpZGF0ZShmaWVsZHMpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgfSk7XG59KTtcblxuY29uc29sZS5sb2coJ0hlbGxvJylcbiIsImNvbnN0IE1FU1NBR0VTID0ge1xuICBkZWZhdWx0TWVzc2FnZTogJ1RoaXMgdmFsdWUgaXMgaW52YWxpZC4nLFxuICBpc0Jvb2xlYW46ICdUaGlzIGZpZWxkIHNob3VsZCBiZSBib29sZWFuLicsXG4gIGlzQ1BGOiAnVGhpcyBmaWVsZCBzaG91bGQgYmUgYSB2YWxpZCBDUEYuJyxcbiAgaXNEYXRlOiAnVGhpcyBmaWVsZCBzaG91bGQgYmUgYSB2YWxpZCBkYXRlLicsXG4gIGlzRW1haWw6ICdUaGlzIGZpZWxkIHNob3VsZCBiZSBhIHZhbGlkIGVtYWlsLicsXG4gIGlzRXF1YWw6ICdUaGlzIGZpZWxkIHNob3VsZCBiZSBlcXVhbHMgdG8gJXMuJyxcbiAgaXNJbnRlZ2VyOiAnVGhpcyBmaWVsZCBzaG91bGQgYmUgaW50ZWdlci4nLFxuICBpc0xlbmd0aDogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgYWFhYWFhYWFhYS4nLFxuICBpc1JlcXVpcmVkOiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZC4nLFxuICBpc1N0cmljdEVxdWFsOiAnVGhpcyBmaWVsZCBzaG91bGQgYmUgZXF1YWxzIHRvICVzLicsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNRVNTQUdFUztcbiIsImNvbnN0IE1FU1NBR0VTID0ge1xuICBkZWZhdWx0TWVzc2FnZTogJ0VzdGUgdmFsb3Igw6kgaW52w6FsaWRvLicsXG4gIGlzQm9vbGVhbjogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgYm9vbGVhbm8uJyxcbiAgaXNDUEY6ICdFc3RlIGNhbXBvIGRldmUgc2VyIHVtIENQRiB2w6FsaWRvLicsXG4gIGlzRGF0ZTogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgdW1hIGRhdGEgdsOhbGlkYS4nLFxuICBpc0VtYWlsOiAnRXN0ZSBjYW1wbyBkZXZlIHNlciB1bSBlLW1haWwgdsOhbGlkby4nLFxuICBpc0VxdWFsOiAnRXN0ZSBjYW1wbyBkZXZlIHNlciBpZ3VhbCBhICVzLicsXG4gIGlzSW50ZWdlcjogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgaW50ZWlyby4nLFxuICBpc0xlbmd0aDogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgYWFhYWFhYWFhYS4nLFxuICBpc1JlcXVpcmVkOiAnRXN0ZSBjYW1wbyDDqSBvYnJpZ2F0w7NyaW8uJyxcbiAgaXNTdHJpY3RFcXVhbDogJ0VzdGUgY2FtcG8gZGV2ZSBzZXIgaWd1YWwgYSAlcy4nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTUVTU0FHRVM7XG4iLCJpbXBvcnQgbWVyZ2UgZnJvbSAnbWVyZ2UnO1xuaW1wb3J0IGl0ZXJhdGUgZnJvbSAnLi91dGlscy9pdGVyYXRlJztcbmltcG9ydCBkZWZhdWx0TWVzc2FnZXMgZnJvbSAnLi9pMThuL2VuJztcblxuY29uc3QgQ0xBU1NFUyA9IHtcbiAgJ2Vycm9yRmllbGQnOiAnZXJyb3ItZmllbGQnLFxuICAnZXJyb3JNZXNzYWdlJzogJ2Vycm9yLW1lc3NhZ2UnLFxuICAnZXJyb3JMYWJlbCc6ICdlcnJvci1sYWJlbCdcbn07XG5cbmxldCBlcnJvcnMgPSBbXTtcbmxldCBkb2M7XG5sZXQgbWVzc2FnZXMgPSBkZWZhdWx0TWVzc2FnZXM7XG5cbmZ1bmN0aW9uIHJlc2V0RXJyb3JzKCkge1xuICBlcnJvcnMgPSBbXTtcbn1cblxuZnVuY3Rpb24gc2V0RXJyb3IoZWxlbWVudCwgcnVsZSkge1xuICBlcnJvcnMucHVzaCh7XG4gICAgJ2VsZW1lbnQnOiBlbGVtZW50LFxuICAgICdydWxlJzogcnVsZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJFbGVtZW50cygpIHtcbiAgbGV0IHNlbGVjdG9yID0gJy4nICsgQ0xBU1NFUy5lcnJvckxhYmVsO1xuXG4gIGl0ZXJhdGUoZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDTEFTU0VTLmVycm9yTGFiZWwpO1xuICB9KTtcblxuICBzZWxlY3RvciA9ICcuJyArIENMQVNTRVMuZXJyb3JGaWVsZDtcbiAgaXRlcmF0ZShkb2MucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIChlbGVtZW50KSA9PiB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKENMQVNTRVMuZXJyb3JGaWVsZCk7XG4gIH0pO1xuXG4gIHNlbGVjdG9yID0gJy4nICsgQ0xBU1NFUy5lcnJvck1lc3NhZ2U7XG4gIGl0ZXJhdGUoZG9jLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAoZWxlbWVudCkgPT4ge1xuICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50RXJyb3IoZWxlbWVudCwgZXJyb3IpIHtcbiAgbGV0IHNwYW4gPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzcGFuLmlubmVySFRNTCA9IG1lc3NhZ2VzW2Vycm9yXSB8fCBtZXNzYWdlc1snZGVmYXVsdE1lc3NhZ2UnXSB8fCBlcnJvcjtcbiAgc3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgQ0xBU1NFUy5lcnJvck1lc3NhZ2UpO1xuXG4gIGxldCBpZCA9IGVsZW1lbnQuc3BsaXQoJyMnKVsxXTtcbiAgbGV0IGxhYmVsU2VsZWN0b3IgPSBgW2Zvcj1cIiR7aWR9XCJdYDtcblxuICBpZiAoZG9jLnF1ZXJ5U2VsZWN0b3IobGFiZWxTZWxlY3RvcikgIT09IG51bGwpIHtcbiAgICBkb2MucXVlcnlTZWxlY3RvcihsYWJlbFNlbGVjdG9yKS5jbGFzc0xpc3QuYWRkKENMQVNTRVMuZXJyb3JMYWJlbCk7XG4gIH1cblxuICBkb2MucXVlcnlTZWxlY3RvcihlbGVtZW50KS5jbGFzc0xpc3QuYWRkKENMQVNTRVMuZXJyb3JGaWVsZCk7XG4gIGRvYy5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoc3Bhbik7XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRUZXh0KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGRvYy5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpLnZhbHVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFtaW5nb0pTIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICdvYmplY3QnKSB7XG4gICAgICBkb2MgPSBvcHRpb25zLmRvY3VtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2MgPSBkb2N1bWVudDtcbiAgICB9XG4gIH1cblxuICBzZXRNZXNzYWdlcyhtc2cpIHtcbiAgICBtZXNzYWdlcyA9IG1lcmdlKHRydWUsIG1zZyk7XG4gIH1cblxuICBzaG93RXJyb3IoZWxlbWVudCwgZXJyb3IsIGVycm9yRWxlbWVudCkge1xuICAgIGNvbnN0IGVsZW1lbnRTZWxlY3RvciA9IGVycm9yRWxlbWVudCA/IGVycm9yRWxlbWVudCA6IGVsZW1lbnQ7XG5cbiAgICBzZXRFbGVtZW50RXJyb3IoZWxlbWVudFNlbGVjdG9yLCBlcnJvcik7XG4gIH1cblxuICB2YWxpZGF0ZShmaWVsZHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY2xlYXJFbGVtZW50cygpO1xuICAgICAgcmVzZXRFcnJvcnMoKTtcblxuICAgICAgZmllbGRzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGxldCBoYXNFcnJvciA9IGZhbHNlO1xuXG4gICAgICAgIGZpZWxkLnJ1bGVzLmZvckVhY2goKHJ1bGUpID0+IHtcbiAgICAgICAgICBpZiAoIWhhc0Vycm9yKSB7XG4gICAgICAgICAgICBjb25zdCBydWxlT3B0aW9ucyA9IHJ1bGUub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0RWxlbWVudFRleHQoZmllbGQuZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmICghcnVsZS52YWxpZGF0b3IodmFsdWUsIHJ1bGVPcHRpb25zKSkge1xuICAgICAgICAgICAgICBoYXNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgIHNldEVycm9yKGZpZWxkLmVsZW1lbnQsIHJ1bGUudmFsaWRhdG9yLm5hbWUpO1xuICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvcihmaWVsZC5lbGVtZW50LCBydWxlLnZhbGlkYXRvci5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJlc29sdmUoZXJyb3JzKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXRlcmF0ZShpdGVtcywgY2FsbGJhY2spIHtcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChpdGVtcywgKGVsZW1lbnQpID0+IHtcbiAgICBjYWxsYmFjayhlbGVtZW50KTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNFbWFpbChzdHJpbmcpIHtcbiAgY29uc3QgcGF0dGVybiA9IC9eWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSsoXFwuWy1hLXowLTl+ISQlXiYqXz0rfXtcXCc/XSspKkAoW2EtejAtOV9dWy1hLXowLTlfXSooXFwuWy1hLXowLTlfXSspKlxcLihhZXJvfGFycGF8Yml6fGNvbXxjb29wfGVkdXxnb3Z8aW5mb3xpbnR8bWlsfG11c2V1bXxuYW1lfG5ldHxvcmd8cHJvfHRyYXZlbHxtb2JpfFthLXpdW2Etel0pfChbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9KSkoOlswLTldezEsNX0pPyQvaTtcblxuICByZXR1cm4gcGF0dGVybi50ZXN0KHN0cmluZyk7XG59XG4iLCJmdW5jdGlvbiB2ZXJpZnlNYXhMZW5ndGgoc3RyaW5nLCBtYXhMZW5naHQpIHtcbiAgcmV0dXJuIHN0cmluZy5sZW5ndGggPD0gbWF4TGVuZ2h0O1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlNaW5MZW5ndGgoc3RyaW5nLCBtaW5MZW5ndGgpIHtcbiAgcmV0dXJuIHN0cmluZy5sZW5ndGggPj0gbWluTGVuZ3RoO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0xlbmd0aChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgdmFyIGlzQ29ycmVjdCA9IHRydWU7XG5cbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21pbicpKSB7XG4gICAgaXNDb3JyZWN0ID0gdmVyaWZ5TWluTGVuZ3RoKHN0cmluZywgb3B0aW9ucy5taW4pO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21heCcpICYmIGlzQ29ycmVjdCkge1xuICAgIGlzQ29ycmVjdCA9IHZlcmlmeU1heExlbmd0aChzdHJpbmcsIG9wdGlvbnMubWF4KTtcbiAgfVxuXG4gIHJldHVybiBpc0NvcnJlY3Q7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1JlcXVpcmVkKHN0cmluZykge1xuICB0cnkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoICE9PSAwO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCIvKiFcclxuICogQG5hbWUgSmF2YVNjcmlwdC9Ob2RlSlMgTWVyZ2UgdjEuMi4wXHJcbiAqIEBhdXRob3IgeWVpa29zXHJcbiAqIEByZXBvc2l0b3J5IGh0dHBzOi8vZ2l0aHViLmNvbS95ZWlrb3MvanMubWVyZ2VcclxuXHJcbiAqIENvcHlyaWdodCAyMDE0IHllaWtvcyAtIE1JVCBsaWNlbnNlXHJcbiAqIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20veWVpa29zL2pzLm1lcmdlL21hc3Rlci9MSUNFTlNFXHJcbiAqL1xyXG5cclxuOyhmdW5jdGlvbihpc05vZGUpIHtcclxuXHJcblx0LyoqXHJcblx0ICogTWVyZ2Ugb25lIG9yIG1vcmUgb2JqZWN0cyBcclxuXHQgKiBAcGFyYW0gYm9vbD8gY2xvbmVcclxuXHQgKiBAcGFyYW0gbWl4ZWQsLi4uIGFyZ3VtZW50c1xyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblxyXG5cdHZhciBQdWJsaWMgPSBmdW5jdGlvbihjbG9uZSkge1xyXG5cclxuXHRcdHJldHVybiBtZXJnZShjbG9uZSA9PT0gdHJ1ZSwgZmFsc2UsIGFyZ3VtZW50cyk7XHJcblxyXG5cdH0sIHB1YmxpY05hbWUgPSAnbWVyZ2UnO1xyXG5cclxuXHQvKipcclxuXHQgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzIHJlY3Vyc2l2ZWx5IFxyXG5cdCAqIEBwYXJhbSBib29sPyBjbG9uZVxyXG5cdCAqIEBwYXJhbSBtaXhlZCwuLi4gYXJndW1lbnRzXHJcblx0ICogQHJldHVybiBvYmplY3RcclxuXHQgKi9cclxuXHJcblx0UHVibGljLnJlY3Vyc2l2ZSA9IGZ1bmN0aW9uKGNsb25lKSB7XHJcblxyXG5cdFx0cmV0dXJuIG1lcmdlKGNsb25lID09PSB0cnVlLCB0cnVlLCBhcmd1bWVudHMpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDbG9uZSB0aGUgaW5wdXQgcmVtb3ZpbmcgYW55IHJlZmVyZW5jZVxyXG5cdCAqIEBwYXJhbSBtaXhlZCBpbnB1dFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHJcblx0UHVibGljLmNsb25lID0gZnVuY3Rpb24oaW5wdXQpIHtcclxuXHJcblx0XHR2YXIgb3V0cHV0ID0gaW5wdXQsXHJcblx0XHRcdHR5cGUgPSB0eXBlT2YoaW5wdXQpLFxyXG5cdFx0XHRpbmRleCwgc2l6ZTtcclxuXHJcblx0XHRpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xyXG5cclxuXHRcdFx0b3V0cHV0ID0gW107XHJcblx0XHRcdHNpemUgPSBpbnB1dC5sZW5ndGg7XHJcblxyXG5cdFx0XHRmb3IgKGluZGV4PTA7aW5kZXg8c2l6ZTsrK2luZGV4KVxyXG5cclxuXHRcdFx0XHRvdXRwdXRbaW5kZXhdID0gUHVibGljLmNsb25lKGlucHV0W2luZGV4XSk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xyXG5cclxuXHRcdFx0b3V0cHV0ID0ge307XHJcblxyXG5cdFx0XHRmb3IgKGluZGV4IGluIGlucHV0KVxyXG5cclxuXHRcdFx0XHRvdXRwdXRbaW5kZXhdID0gUHVibGljLmNsb25lKGlucHV0W2luZGV4XSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBvdXRwdXQ7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1lcmdlIHR3byBvYmplY3RzIHJlY3Vyc2l2ZWx5XHJcblx0ICogQHBhcmFtIG1peGVkIGlucHV0XHJcblx0ICogQHBhcmFtIG1peGVkIGV4dGVuZFxyXG5cdCAqIEByZXR1cm4gbWl4ZWRcclxuXHQgKi9cclxuXHJcblx0ZnVuY3Rpb24gbWVyZ2VfcmVjdXJzaXZlKGJhc2UsIGV4dGVuZCkge1xyXG5cclxuXHRcdGlmICh0eXBlT2YoYmFzZSkgIT09ICdvYmplY3QnKVxyXG5cclxuXHRcdFx0cmV0dXJuIGV4dGVuZDtcclxuXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gZXh0ZW5kKSB7XHJcblxyXG5cdFx0XHRpZiAodHlwZU9mKGJhc2Vba2V5XSkgPT09ICdvYmplY3QnICYmIHR5cGVPZihleHRlbmRba2V5XSkgPT09ICdvYmplY3QnKSB7XHJcblxyXG5cdFx0XHRcdGJhc2Vba2V5XSA9IG1lcmdlX3JlY3Vyc2l2ZShiYXNlW2tleV0sIGV4dGVuZFtrZXldKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGJhc2Vba2V5XSA9IGV4dGVuZFtrZXldO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmFzZTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzXHJcblx0ICogQHBhcmFtIGJvb2wgY2xvbmVcclxuXHQgKiBAcGFyYW0gYm9vbCByZWN1cnNpdmVcclxuXHQgKiBAcGFyYW0gYXJyYXkgYXJndlxyXG5cdCAqIEByZXR1cm4gb2JqZWN0XHJcblx0ICovXHJcblxyXG5cdGZ1bmN0aW9uIG1lcmdlKGNsb25lLCByZWN1cnNpdmUsIGFyZ3YpIHtcclxuXHJcblx0XHR2YXIgcmVzdWx0ID0gYXJndlswXSxcclxuXHRcdFx0c2l6ZSA9IGFyZ3YubGVuZ3RoO1xyXG5cclxuXHRcdGlmIChjbG9uZSB8fCB0eXBlT2YocmVzdWx0KSAhPT0gJ29iamVjdCcpXHJcblxyXG5cdFx0XHRyZXN1bHQgPSB7fTtcclxuXHJcblx0XHRmb3IgKHZhciBpbmRleD0wO2luZGV4PHNpemU7KytpbmRleCkge1xyXG5cclxuXHRcdFx0dmFyIGl0ZW0gPSBhcmd2W2luZGV4XSxcclxuXHJcblx0XHRcdFx0dHlwZSA9IHR5cGVPZihpdGVtKTtcclxuXHJcblx0XHRcdGlmICh0eXBlICE9PSAnb2JqZWN0JykgY29udGludWU7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gaXRlbSkge1xyXG5cclxuXHRcdFx0XHR2YXIgc2l0ZW0gPSBjbG9uZSA/IFB1YmxpYy5jbG9uZShpdGVtW2tleV0pIDogaXRlbVtrZXldO1xyXG5cclxuXHRcdFx0XHRpZiAocmVjdXJzaXZlKSB7XHJcblxyXG5cdFx0XHRcdFx0cmVzdWx0W2tleV0gPSBtZXJnZV9yZWN1cnNpdmUocmVzdWx0W2tleV0sIHNpdGVtKTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRyZXN1bHRba2V5XSA9IHNpdGVtO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IHR5cGUgb2YgdmFyaWFibGVcclxuXHQgKiBAcGFyYW0gbWl4ZWQgaW5wdXRcclxuXHQgKiBAcmV0dXJuIHN0cmluZ1xyXG5cdCAqXHJcblx0ICogQHNlZSBodHRwOi8vanNwZXJmLmNvbS90eXBlb2Z2YXJcclxuXHQgKi9cclxuXHJcblx0ZnVuY3Rpb24gdHlwZU9mKGlucHV0KSB7XHJcblxyXG5cdFx0cmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbChpbnB1dCkuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdH1cclxuXHJcblx0aWYgKGlzTm9kZSkge1xyXG5cclxuXHRcdG1vZHVsZS5leHBvcnRzID0gUHVibGljO1xyXG5cclxuXHR9IGVsc2Uge1xyXG5cclxuXHRcdHdpbmRvd1twdWJsaWNOYW1lXSA9IFB1YmxpYztcclxuXHJcblx0fVxyXG5cclxufSkodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpOyJdfQ==
