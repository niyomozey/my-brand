"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var port = process.env.port || 1111;

_app["default"].listen(port, function () {
  console.log("Connected on ".concat(port, " port"));
});