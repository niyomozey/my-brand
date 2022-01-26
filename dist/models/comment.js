"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var commentSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  blog: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: 'blog'
  }
});

var Comment = _mongoose["default"].model('comment', commentSchema);

var _default = Comment;
exports["default"] = _default;