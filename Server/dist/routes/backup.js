"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _verifySignup = _interopRequireDefault(require("../middleware/verifySignup"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _comment = _interopRequireDefault(require("../models/comment"));

var _blog = _interopRequireDefault(require("../models/blog"));

var _user = _interopRequireDefault(require("../models/user"));

var _express = _interopRequireDefault(require("express"));

var _blogImageProcessor = _interopRequireDefault(require("../middleware/blogImageProcessor.js"));

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var router = _express["default"].Router();

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // app.use(bodyParser.json())
// app.use(express.json())

var urlencodedparser = _bodyParser["default"].urlencoded({
  extended: false
});

router.get('/home', function (req, res) {
  res.send('Landing Page....');
});
router.post('/login', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data, User, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = req.body;
            _context.prev = 1;
            _context.next = 4;
            return _user["default"].findByCredentials(data.email, data.password);

          case 4:
            User = _context.sent;
            _context.next = 7;
            return User.generateAuthToken();

          case 7:
            token = _context.sent;
            res.header("x-auth-token", token).send({
              user: User.getPublicProfile()
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            res.status(400).send({
              message: _context.t0.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/logout', _auth["default"], /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            req.user.tokens = req.user.tokens.filter(function (token) {
              return token.token !== req.token;
            });
            _context2.next = 4;
            return req.user.save();

          case 4:
            res.send('signout successfully');
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.status(500).send({
              message: _context2.t0
            });

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/signup', [_verifySignup["default"]], /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var data, User, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = req.body;
            User = new _user["default"](data);
            _context3.prev = 2;
            _context3.next = 5;
            return User.save();

          case 5:
            _context3.next = 7;
            return User.generateAuthToken();

          case 7:
            token = _context3.sent;
            res.send({
              user: _user["default"],
              token: token
            });
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](2);
            res.status(401).send(_context3.t0.message);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 11]]);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
router.post('/contact', function (req, res) {
  res.send();
});
router.post('/createBlog', upload.single('photo'), _blogImageProcessor["default"], /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var data, Blog;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = (0, _lodash.pick)(req.body, ['title', 'author', 'content', 'photo']);
            Blog = new _blog["default"](_objectSpread({}, data));
            console.log(req.body);
            _context4.prev = 3;
            _context4.next = 6;
            return Blog.save();

          case 6:
            res.send({
              message: 'Article create successfully',
              blog: _blog["default"]
            });
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](3);
            res.status(401).send(_context4.t0.message);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 9]]);
  }));

  return function (_x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}());
router.patch('/updateArticle/:id', upload.single('photo'), _blogImageProcessor["default"], /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var articles, allowedBlog, isBlogValid, article;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            articles = Object.keys(req.body);
            allowedBlog = ['id', 'title', 'author', 'content', 'photo'];
            console.log(req.params.id);
            isBlogValid = articles.every(function (blogProp) {
              return allowedBlog.includes(blogProp);
            });

            if (!isBlogValid) {
              res.status(404).send({
                message: 'Article inserted is not valid'
              });
            }

            _context5.next = 7;
            return _blog["default"].findByIdAndUpdate(req.params.id, req.body, {
              "new": true,
              runvalidator: true
            });

          case 7:
            article = _context5.sent;

            if (!article) {
              res.status(404).send("Article you're try to reach out!!doesnt exist");
            }

            res.send({
              message: 'blog update successfully',
              article: article
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());
router["delete"]('/deleteArticle/:id', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var article;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _blog["default"].findByIdAndDelete(req.params.id);

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
              message: 'Article delete successfully',
              article: article
            });

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/blogs', /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var blogs;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            blogs = {};

            _blog["default"].find({}, function (err, articles) {
              articles.forEach(function (article) {
                blogs[article.id] = article;
              });
              res.send(blogs);
            });

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function (_x15, _x16) {
    return _ref7.apply(this, arguments);
  };
}());
router.post('/contactUs', /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var transporter, info;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            transporter = _nodemailer["default"].createTransport({
              host: "smtp.gmail.com",
              port: 465,
              //587 //465
              secure: true,
              auth: {
                user: "moiseniyonkuru1@gmail.com",
                pass: "rwanda12."
              }
            }); // send mail with defined transport object

            _context8.next = 4;
            return transporter.sendMail({
              from: "moiseniyonkuru1@gmail.com",
              // sender address
              to: "moiseniyonkuru1@gmail.com",
              // list of receivers
              subject: "Message from My brand App ✔",
              // Subject line
              text: "Hello world?",
              // plain text body
              html: "<div>\n                    <div style=\"width:80%;margin:auto;background: teal;color:white;\">\n                        <br>\n                        <p style=\"font-size: 18px;padding: 0px 10px;\">Fullname: ".concat(req.body.fullname, "</p>\n                        <p style=\"font-size: 18px;padding: 0px 10px;\">Email: ").concat(req.body.email, "</p>\n                        <p style=\"font-size: 18px;padding: 0px 10px;\">Phone Number: ").concat(req.body.telphone, "</p>\n                        <p style=\"font-size: 18px;padding: 0px 10px;\">Address: ").concat(req.body.address, "</p>\n                        <br>\n                    </div>\n                    <div style=\"width:80%;margin:auto;background: teal;color:white;text-align: center;\">\n                        <p style=\"width: 20%;margin: auto;border-bottom: solid 2px white;color:white;padding-top: 10px;font-size: 22.5px;\">Message</p>\n                        <p style=\"padding: 15px 10px;font-size: 22.5px;\">\" ").concat(req.body.message, " \"</p>\n                        <p style=\"padding: 15px 10px;font-size: 22.5px;\">-- ").concat(new Date(), " --</p>\n                    </div>\n                    </div>") // html body

            }, function (err, info) {
              if (err) {
                console.log(err);
                res.status(404).send('Unable to send Message');
              }

              console.log(info);
              res.send({
                message: "message sent"
              });
            });

          case 4:
            info = _context8.sent;
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            res.send({
              message: 'unable to send email!!'
            });

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function (_x17, _x18) {
    return _ref8.apply(this, arguments);
  };
}());
router.post('/comment/:id', /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var comment;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            comment = new _comment["default"](_objectSpread(_objectSpread({}, req.body), {}, {
              blog: req.params.id
            }));
            _context9.next = 4;
            return comment.save();

          case 4:
            res.send({
              message: 'Comment Sent Succesfully'
            });
            _context9.next = 10;
            break;

          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            res.send({
              message: 'Comment Not Sent'
            });

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));

  return function (_x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}());
router.get('/comments/:id', /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var comments;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            try {
              comments = _comment["default"].find({
                blog: req.params.id
              }, function (err, comments) {
                return res.send({
                  message: "comment found",
                  comments: comments
                });
              });
            } catch (error) {
              res.send({
                message: 'Comment not found!'
              });
            }

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function (_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}());
router.get('/blog/:id', /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _blog["default"].findById({
              _id: req.params.id
            }, function (err, blog) {
              if (err) {
                return res.status(404).send({
                  message: 'Blog not found'
                });
              }

              var comments = _comment["default"].find({
                "blog": blog.id
              }, function (err, comments) {
                res.send({
                  blog: blog,
                  comments: comments
                });
              });
            });

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function (_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}());
router.post('/picture', upload.single('photo'), _blogImageProcessor["default"], function (req, res, next) {
  var data = (0, _lodash.pick)(req.body, ['title', 'author', 'content', 'photo']);
  console.log(data);
});
var _default = router;
exports["default"] = _default;