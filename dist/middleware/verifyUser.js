"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("../models/user"));

var _default = new ( /*#__PURE__*/function () {
  function verifyUser() {
    (0, _classCallCheck2["default"])(this, verifyUser);
  }

  (0, _createClass2["default"])(verifyUser, [{
    key: "checkDuplicateEmail",
    value: function checkDuplicateEmail(req, res, next) {
      _user["default"].findOne({
        email: req.body.email
      }).exec(function (err, user) {
        if (err) {
          return res.status(500).send({
            message: err
          }); // return;
        }

        if (user) {
          return res.status(400).send({
            message: 'Failed! User already exists.'
          }); // return;
        }

        if (req.body.password !== req.body.cpassword) {
          return res.status(404).send({
            message: 'Password are not matching'
          });
        }

        next();
      });
    }
  }]);
  return verifyUser;
}())();

exports["default"] = _default;