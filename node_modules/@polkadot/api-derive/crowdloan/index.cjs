"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _childKey = require("./childKey.cjs");

Object.keys(_childKey).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _childKey[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _childKey[key];
    }
  });
});

var _contributions = require("./contributions.cjs");

Object.keys(_contributions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _contributions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _contributions[key];
    }
  });
});

var _onwContributions = require("./onwContributions.cjs");

Object.keys(_onwContributions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _onwContributions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _onwContributions[key];
    }
  });
});