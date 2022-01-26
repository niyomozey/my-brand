"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    // cb(null, path.join(__dirname,'../uploads/blogImages/'))
    cb(null, _path["default"].join(_appRootPath["default"].path, '/src/uploads/blogImages/'));
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 1000000
  }
});
var _default = upload;
exports["default"] = _default;