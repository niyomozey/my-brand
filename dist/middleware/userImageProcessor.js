"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sharp = _interopRequireDefault(require("sharp"));

var _multer = _interopRequireDefault(require("multer"));

var _appRootPath = _interopRequireDefault(require("app-root-path"));

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    // cb(null, './uploads/profilePictures/')
    cb(null, _appRootPath["default"].path + '/src/uploads/profilePictures/');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.filename);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});

var imageProcessor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.file !== undefined) {
              req.body.avatar = req.file.path;
              next();
            } else {
              next();
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function imageProcessor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = imageProcessor;
exports["default"] = _default;