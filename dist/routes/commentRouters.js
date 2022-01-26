"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _commentController = _interopRequireDefault(require("../controllers/commentController"));

var commentRouter = _express["default"].Router();

var app = (0, _express["default"])();
commentRouter.post('/comment/:id', _commentController["default"].findCommentById);
commentRouter.get('/comments/:id', _commentController["default"].getAll);
var _default = commentRouter;
exports["default"] = _default;