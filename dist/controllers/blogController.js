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

var _comment = _interopRequireDefault(require("../models/comment"));

var _blog = _interopRequireDefault(require("../models/blog"));

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _default = new ( /*#__PURE__*/function () {
  function BlogController() {
    (0, _classCallCheck2["default"])(this, BlogController);
  }

  (0, _createClass2["default"])(BlogController, [{
    key: "createBlog",
    value: function () {
      var _createBlog = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var data, Blog;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = (0, _lodash.pick)(req.body, ['title', 'author', 'content', 'photo']);
                Blog = new _blog["default"](_objectSpread({}, data));
                console.log(req.body);
                _context.prev = 3;
                _context.next = 6;
                return Blog.save();

              case 6:
                res.send({
                  message: 'Article create successfully',
                  blog: _blog["default"]
                });
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](3);
                res.status(401).send(_context.t0.message);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 9]]);
      }));

      function createBlog(_x, _x2, _x3) {
        return _createBlog.apply(this, arguments);
      }

      return createBlog;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var articles, allowedBlog, isBlogValid, article;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
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

                _context2.next = 7;
                return _blog["default"].findByIdAndUpdate(req.params.id, req.body, {
                  "new": true,
                  runvalidator: true
                });

              case 7:
                article = _context2.sent;

                if (!article) {
                  res.status(404).send("Article you're try to reach out!!doesnt exist");
                }

                res.send({
                  message: 'blog update successfully',
                  article: article
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function update(_x4, _x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var article;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _blog["default"].findByIdAndDelete(req.params.id);

              case 2:
                article = _context3.sent;

                if (article) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", res.status(404).send({
                  message: "unable to delete"
                }));

              case 5:
                res.send({
                  message: 'Article delete successfully',
                  article: article
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var blogs;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
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
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getAll(_x9, _x10) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "findBlogById",
    value: function () {
      var _findBlogById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
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
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function findBlogById(_x11, _x12) {
        return _findBlogById.apply(this, arguments);
      }

      return findBlogById;
    }()
  }]);
  return BlogController;
}())();

exports["default"] = _default;