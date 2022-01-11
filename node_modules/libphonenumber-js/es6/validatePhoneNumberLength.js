function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { normalizeArguments } from './parsePhoneNumber';
import parsePhoneNumber from './parsePhoneNumber_';
import ParseError from './ParseError';
import Metadata from './metadata';
import checkNumberLength from './helpers/checkNumberLength';
export default function validatePhoneNumberLength() {
  var _normalizeArguments = normalizeArguments(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  options = _objectSpread({}, options, {
    extract: false // Parse phone number.

  });

  try {
    var phoneNumber = parsePhoneNumber(text, options, metadata);
    metadata = new Metadata(metadata);
    metadata.selectNumberingPlan(phoneNumber.countryCallingCode);
    var result = checkNumberLength(phoneNumber.nationalNumber, metadata);

    if (result !== 'IS_POSSIBLE') {
      return result;
    }
  } catch (error) {
    /* istanbul ignore else */
    if (error instanceof ParseError) {
      return error.message;
    } else {
      throw error;
    }
  }
}
//# sourceMappingURL=validatePhoneNumberLength.js.map