"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _express = _interopRequireDefault(require("express"));

var _BlogMulterConf = _interopRequireDefault(require("../config/BlogMulterConf"));

var _blogImageProcessor = _interopRequireDefault(require("../middleware/blogImageProcessor.js"));

var _blogController = _interopRequireDefault(require("../controllers/blogController"));

var blogRouter = _express["default"].Router();

var app = (0, _express["default"])();
blogRouter.get('/blogs', _blogController["default"].getAll);
blogRouter.get('/blog/:id', _blogController["default"].findBlogById);
blogRouter["delete"]('/deleteArticle/:id', _auth["default"], _blogController["default"]["delete"]);
blogRouter.post('/createBlog', _auth["default"], _BlogMulterConf["default"].single('photo'), _blogImageProcessor["default"], _blogController["default"].createBlog);
blogRouter.patch('/updateArticle/:id', _auth["default"], _BlogMulterConf["default"].single('photo'), _blogImageProcessor["default"], _blogController["default"].update);
var _default = blogRouter;
exports["default"] = _default;