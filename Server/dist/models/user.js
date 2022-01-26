"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("dotenv/config");

var userSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    validate: function validate(value) {
      if (!_validator["default"].isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    require: true,
    trim: true,
    minlength: 5,
    validate: function validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error("password cannot contain 'password'");
      }
    }
  },
  fullname: {
    type: String,
    required: true
  },
  telphone: {
    type: String,
    min: 10,
    max: 13
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  tokens: [{
    token: {
      type: String,
      require: true
    }
  }]
});

userSchema.methods.getPublicProfile = function () {
  var User = this;
  var userObject = User.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var maxAge, user, token, t;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          maxAge = 3 * 60 * 60 * 24;
          user = this;
          token = _jsonwebtoken["default"].sign({
            _id: user._id.toString()
          }, process.env.SECRET_KEY);
          user.tokens = user.tokens.concat({
            token: token
          });
          t = _jsonwebtoken["default"].sign({
            _id: user._id.toString()
          }, process.env.SECRET_KEY);
          _context.next = 7;
          return user.save();

        case 7:
          return _context.abrupt("return", t);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

userSchema.statics.findByCredentials = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, password) {
    var User, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return user.findOne({
              email: email
            });

          case 2:
            User = _context2.sent;

            if (User) {
              _context2.next = 5;
              break;
            }

            throw new Error('Unable to login!User doesnt exists');

          case 5:
            _context2.next = 7;
            return _bcrypt["default"].compare(password, User.password);

          case 7:
            isMatch = _context2.sent;

            if (isMatch) {
              _context2.next = 10;
              break;
            }

            throw new Error('Incorrect usernate or password!');

          case 10:
            return _context2.abrupt("return", User);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

userSchema.pre('save', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(next) {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = this;

            if (!user.isModified('password')) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return _bcrypt["default"].hash(user.password, 8);

          case 4:
            user.password = _context3.sent;

          case 5:
            next();

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());

var user = _mongoose["default"].model('users', userSchema);

var _default = user;
exports["default"] = _default;