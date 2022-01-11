"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PatternMatcher =
/*#__PURE__*/
function () {
  function PatternMatcher(pattern) {
    _classCallCheck(this, PatternMatcher);

    this.matchTree = new PatternParser().parse(pattern); // console.log(JSON.stringify(this.matchTree, null, 2))
  }

  _createClass(PatternMatcher, [{
    key: "match",
    value: function match(string) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          allowOverflow = _ref.allowOverflow;

      if (!string) {
        throw new Error('String is required');
      }

      var result = _match(string.split(''), this.matchTree, true);

      if (result && result.match) {
        delete result.matchedChars;
      }

      if (result && result.overflow) {
        if (!allowOverflow) {
          return;
        }
      }

      return result;
    }
  }]);

  return PatternMatcher;
}();

exports["default"] = PatternMatcher;

function _match(characters, tree, last) {
  if (typeof tree === 'string') {
    if (last) {
      if (characters.length > tree.length) {
        return {
          overflow: true
        };
      }
    }

    var characterString = characters.join('');

    if (tree.indexOf(characterString) === 0) {
      if (characters.length === tree.length) {
        return {
          match: true,
          matchedChars: characters
        };
      }

      return {
        partialMatch: true // matchedChars: characters

      };
    }

    if (characterString.indexOf(tree) === 0) {
      return {
        match: true,
        matchedChars: characters.slice(0, tree.length)
      };
    }

    return;
  }

  if (Array.isArray(tree)) {
    var restCharacters = characters.slice();
    var i = 0;

    while (i < tree.length) {
      var subtree = tree[i];

      var result = _match(restCharacters, subtree, last && i === tree.length - 1);

      if (!result || result.overflow) {
        return result;
      }

      if (result.match) {
        // Continue with the next subtree with the rest of the characters.
        restCharacters = restCharacters.slice(result.matchedChars.length);

        if (restCharacters.length === 0) {
          if (i === tree.length - 1) {
            return {
              match: true,
              matchedChars: characters
            };
          } else {
            return {
              partialMatch: true // matchedChars: characters

            };
          }
        }
      } else if (result.partialMatch) {
        return {
          partialMatch: true // matchedChars: characters

        };
      } else {
        throw new Error("Unsupported match result:\n".concat(JSON.stringify(result, null, 2)));
      }

      i++;
    }

    if (last) {
      return {
        overflow: true
      };
    }

    return {
      match: true,
      matchedChars: characters.slice(0, characters.length - restCharacters.length)
    };
  }

  switch (tree.op) {
    case '|':
      var partialMatch;

      for (var _iterator = tree.args, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var branch = _ref2;

        var _result = _match(characters, branch, last);

        if (_result) {
          if (_result.overflow) {
            return _result;
          } else if (_result.match) {
            return {
              match: true,
              matchedChars: _result.matchedChars
            };
          } else if (_result.partialMatch) {
            partialMatch = true;
          }
        }
      }

      if (partialMatch) {
        return {
          partialMatch: true // matchedChars: ...

        };
      } // Not even a partial match.


      return;

    case '[]':
      for (var _iterator2 = tree.args, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref3 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref3 = _i2.value;
        }

        var _char = _ref3;

        if (characters[0] === _char) {
          if (characters.length === 1) {
            return {
              match: true,
              matchedChars: characters
            };
          }

          if (last) {
            return {
              overflow: true
            };
          }

          return {
            match: true,
            matchedChars: [_char]
          };
        }
      } // No character matches.


      return;

    default:
      throw new Error("Unsupported instruction tree: ".concat(tree));
  }
}

var OPERATOR = new RegExp( // any of:
'(' + // or operator
'\\|' + // or
'|' + // or group start
'\\(\\?\\:' + // or
'|' + // or group end
'\\)' + // or
'|' + // one-of set start
'\\[' + // or
'|' + // one-of set end
'\\]' + ')');

var PatternParser =
/*#__PURE__*/
function () {
  function PatternParser() {
    _classCallCheck(this, PatternParser);
  }

  _createClass(PatternParser, [{
    key: "parse",
    value: function parse(pattern) {
      this.context = [{
        or: true,
        instructions: []
      }];
      this.parsePattern(pattern);

      if (this.context.length !== 1) {
        throw new Error('Non-finalized contexts left when pattern parse ended');
      }

      var _this$context$ = this.context[0],
          branches = _this$context$.branches,
          instructions = _this$context$.instructions;

      if (branches) {
        return [{
          op: '|',
          args: branches.concat([instructions])
        }];
      }

      if (instructions.length === 0) {
        throw new Error('Pattern is required');
      }

      return instructions;
    }
  }, {
    key: "startContext",
    value: function startContext(context) {
      this.context.push(context);
    }
  }, {
    key: "endContext",
    value: function endContext() {
      this.context.pop();
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.context[this.context.length - 1];
    }
  }, {
    key: "parsePattern",
    value: function parsePattern(pattern) {
      if (!pattern) {
        throw new Error('Empty pattern passed');
      }

      var match = pattern.match(OPERATOR);

      if (!match) {
        this.getContext().instructions = this.getContext().instructions.concat(pattern.split(''));
        return;
      }

      var operator = match[1];
      var before = pattern.slice(0, match.index);
      var rightPart = pattern.slice(match.index + operator.length);

      switch (operator) {
        case '(?:':
          if (before) {
            this.parsePattern(before);
          }

          this.startContext({
            or: true,
            instructions: [],
            branches: []
          });
          break;

        case ')':
          if (!this.getContext().or) {
            throw new Error('")" operator must be preceded by "(?:" operator');
          }

          if (before) {
            this.parsePattern(before);
          }

          if (this.getContext().instructions.length === 0) {
            throw new Error('No instructions found after "|" operator in an "or" group');
          }

          var _this$getContext = this.getContext(),
              branches = _this$getContext.branches;

          branches.push(this.getContext().instructions);
          this.endContext();
          this.getContext().instructions.push({
            op: '|',
            args: branches
          });
          break;

        case '|':
          if (!this.getContext().or) {
            throw new Error('"|" operator can only be used inside "or" groups');
          }

          if (before) {
            this.parsePattern(before);
          } // The top-level is an implicit "or" group, if required.


          if (!this.getContext().branches) {
            if (this.context.length === 1) {
              this.getContext().branches = [];
            } else {
              throw new Error('"branches" not found in an "or" group context');
            }
          }

          this.getContext().branches.push(this.getContext().instructions);
          this.getContext().instructions = [];
          break;

        case '[':
          if (before) {
            this.parsePattern(before);
          }

          this.startContext({
            oneOfSet: true
          });
          break;

        case ']':
          if (!this.getContext().oneOfSet) {
            throw new Error('"]" operator must be preceded by "[" operator');
          }

          this.endContext();
          this.getContext().instructions.push({
            op: '[]',
            args: parseOneOfSet(before)
          });
          break;

        default:
          throw new Error("Unknown operator: ".concat(operator));
      }

      if (rightPart) {
        this.parsePattern(rightPart);
      }
    }
  }]);

  return PatternParser;
}();

function parseOneOfSet(pattern) {
  var values = [];
  var i = 0;

  while (i < pattern.length) {
    if (pattern[i] === '-') {
      if (i === 0 || i === pattern.length - 1) {
        throw new Error("Couldn't parse a one-of set pattern: ".concat(pattern));
      }

      var prevValue = pattern[i - 1].charCodeAt(0) + 1;
      var nextValue = pattern[i + 1].charCodeAt(0) - 1;
      var value = prevValue;

      while (value <= nextValue) {
        values.push(String.fromCharCode(value));
        value++;
      }
    } else {
      values.push(pattern[i]);
    }

    i++;
  }

  return values;
}
//# sourceMappingURL=AsYouTypeFormatter.PatternMatcher.js.map