"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

require("dotenv/config");

var auth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.header('Authorization').replace('Bearer ', ''); // const token = req.header('x-auth-token');
            // const token = req.cookie('jwtoken')

            decoded = _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);
            _context.next = 5;
            return _user["default"].findOne({
              _id: decoded._id
            });

          case 5:
            user = _context.sent;
            console.log(user);

            if (user) {
              _context.next = 9;
              break;
            }

            throw new Error();

          case 9:
            req.token = token;
            req.user = user;
            next();
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            res.status(401).send({
              message: 'Please authenticate...'
            });
            return _context.abrupt("return");

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = auth;
exports["default"] = _default;