"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validatePhoneNumberLength;

var _parsePhoneNumber = require("./parsePhoneNumber");

var _parsePhoneNumber_ = _interopRequireDefault(require("./parsePhoneNumber_"));

var _ParseError = _interopRequireDefault(require("./ParseError"));

var _metadata = _interopRequireDefault(require("./metadata"));

var _checkNumberLength = _interopRequireDefault(require("./helpers/checkNumberLength"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function validatePhoneNumberLength() {
  var _normalizeArguments = (0, _parsePhoneNumber.normalizeArguments)(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  options = _objectSpread({}, options, {
    extract: false // Parse phone number.

  });

  try {
    var phoneNumber = (0, _parsePhoneNumber_["default"])(text, options, metadata);
    metadata = new _metadata["default"](metadata);
    metadata.selectNumberingPlan(phoneNumber.countryCallingCode);
    var result = (0, _checkNumberLength["default"])(phoneNumber.nationalNumber, metadata);

    if (result !== 'IS_POSSIBLE') {
      return result;
    }
  } catch (error) {
    /* istanbul ignore else */
    if (error instanceof _ParseError["default"]) {
      return error.message;
    } else {
      throw error;
    }
  }
}
//# sourceMappingURL=validatePhoneNumberLength.js.map