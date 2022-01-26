"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _contactController = _interopRequireDefault(require("../controllers/contactController"));

var _express = _interopRequireDefault(require("express"));

var _lodash = require("lodash");

var contactRouter = _express["default"].Router();

var app = (0, _express["default"])();
contactRouter.post('/contactUs', _contactController["default"].sendEmail);
var _default = contactRouter;
exports["default"] = _default;