"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _verifyUser = _interopRequireDefault(require("../middleware/verifyUser"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _comment = _interopRequireDefault(require("../models/comment"));

var _blog = _interopRequireDefault(require("../models/blog"));

var _user = _interopRequireDefault(require("../models/user"));

var _express = _interopRequireDefault(require("express"));

var _blogImageProcessor = _interopRequireDefault(require("../middleware/blogImageProcessor.js"));

var _lodash = require("lodash");

var _validator = _interopRequireDefault(require("validator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = new ( /*#__PURE__*/function () {
  function userController() {
    (0, _classCallCheck2["default"])(this, userController);
  }

  (0, _createClass2["default"])(userController, [{
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var data, User, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = req.body;
                console.log(data);
                _context.prev = 2;
                _context.next = 5;
                return _user["default"].findByCredentials(data.email, data.password);

              case 5:
                User = _context.sent;
                _context.next = 8;
                return User.generateAuthToken();

              case 8:
                token = _context.sent;
                res.cookie('jwtoken', token);
                res.header("Authorization", token).send({
                  user: User.getPublicProfile()
                });
                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);
                res.status(400).send({
                  message: _context.t0.message
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 13]]);
      }));

      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "logout",
    value: function () {
      var _logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var maxAge;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                maxAge = 3 * 60 * 60 * 24;
                _context2.prev = 1;
                req.user.tokens = req.user.tokens.filter(function (token) {
                  return token.token !== req.token;
                });
                _context2.next = 5;
                return req.user.save();

              case 5:
                res.cookie('jwtoken', '', {
                  maxAge: 1
                });
                res.send('signout successfully');
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                res.status(500).send({
                  message: _context2.t0
                });

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }));

      function logout(_x4, _x5) {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var maxAge, data, User, token;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                maxAge = 3 * 60 * 60 * 24;
                data = (0, _lodash.pick)(req.body, ['fullname', 'username', 'telphone', 'email', 'password', 'avatar', 'tokens']);
                console.log(data);
                User = new _user["default"](_objectSpread({}, data));
                _context3.prev = 4;
                _context3.next = 7;
                return User.save();

              case 7:
                _context3.next = 9;
                return User.generateAuthToken();

              case 9:
                token = _context3.sent;
                res.cookie('jwtoken', token, {
                  httpOnly: true,
                  maxAge: maxAge * 1000
                });
                res.send({
                  user: _user["default"],
                  token: token
                });
                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](4);
                res.status(401).send(_context3.t0.message);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 14]]);
      }));

      function signup(_x6, _x7) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var User, allowedUser, isUserValid, profile;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                User = Object.keys(req.body);
                delete User.cpassword;
                allowedUser = ['fullname', 'username', 'telphone', 'email', 'password', 'avatar', 'tokens'];
                isUserValid = User.every(function (userProp) {
                  console.log(userProp);
                  allowedUser.includes(userProp);
                });

                if (isUserValid) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", res.status(404).send({
                  message: 'Invalid Data fields'
                }));

              case 6:
                _context4.next = 8;
                return _user["default"].findByIdAndUpdate(req.params.id, req.body, {
                  "new": true,
                  runvalidator: true
                });

              case 8:
                profile = _context4.sent;

                if (profile) {
                  _context4.next = 12;
                  break;
                }

                photo;
                return _context4.abrupt("return", res.status(404).send("User you're try to reach out!!doesnt exist"));

              case 12:
                res.send({
                  message: 'Profile update successfully',
                  profile: profile
                });

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function update(_x8, _x9, _x10) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "profile",
    value: function () {
      var _profile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                data = _user["default"].find({}, function (err, userprofile) {
                  if (!userprofile) {
                    return res.send({
                      message: 'No User found'
                    });
                  }

                  res.status(200).send({
                    message: 'User Found',
                    userprofile: userprofile
                  });
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function profile(_x11, _x12) {
        return _profile.apply(this, arguments);
      }

      return profile;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var article;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _user["default"].findByIdAndDelete(req.params.id);

              case 2:
                article = _context6.sent;

                if (article) {
                  _context6.next = 5;
                  break;
                }

                return _context6.abrupt("return", res.status(404).send({
                  message: "unable to delete"
                }));

              case 5:
                res.send({
                  message: 'User deleted successfully',
                  article: article
                });

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function _delete(_x13, _x14) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "updateProfilePicture",
    value: function () {
      var _updateProfilePicture = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
        var User, allowedUser, isUserValid, profile;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                User = Object.keys(req.body);
                allowedUser = ['avatar', 'tokens'];
                isUserValid = User.every(function (userProp) {
                  allowedUser.includes(userProp);
                }); // if(!isUserValid){
                //     return res.status(404).send({
                //         message:'Invalid Data fields'
                //     })
                // }

                _context7.next = 5;
                return _user["default"].findByIdAndUpdate(req.params.id, {
                  'avatar': req.body.avatar
                }, {
                  "new": true,
                  runvalidator: true
                });

              case 5:
                profile = _context7.sent;

                if (profile) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", res.status(404).send("User profile you're try to reach out!!doesnt exist"));

              case 8:
                res.send({
                  message: 'Profile pictures update successfully',
                  profile: profile
                });

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function updateProfilePicture(_x15, _x16, _x17) {
        return _updateProfilePicture.apply(this, arguments);
      }

      return updateProfilePicture;
    }()
  }]);
  return userController;
}())();

exports["default"] = _default;