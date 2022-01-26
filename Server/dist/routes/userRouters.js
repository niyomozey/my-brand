"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _verifyUser = _interopRequireDefault(require("../middleware/verifyUser"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _express = _interopRequireDefault(require("express"));

var _blog = _interopRequireDefault(require("../models/blog"));

var _UserMulterConf = _interopRequireDefault(require("../config/UserMulterConf"));

var _lodash = require("lodash");

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _userImageProcessor = _interopRequireDefault(require("../middleware/userImageProcessor"));

var userRouter = _express["default"].Router();

var app = (0, _express["default"])();
userRouter.get('/home', function (req, res) {
  res.send('Landing Page....');
});
userRouter.post('/login', _userController["default"].login);
userRouter.post('/logout', _auth["default"], _userController["default"].logout);
userRouter.post('/signup', _auth["default"], _UserMulterConf["default"].single('avatar'), [_verifyUser["default"].checkDuplicateEmail], _userImageProcessor["default"], _userController["default"].signup);
userRouter.put('/update/:id', _auth["default"], _UserMulterConf["default"].single('avatar'), _userImageProcessor["default"], _userController["default"].update);
userRouter.post('/changeppic/:id', _auth["default"], _UserMulterConf["default"].single('avatar'), _userImageProcessor["default"], _userController["default"].updateProfilePicture);
userRouter.get('/profile', _auth["default"], _userController["default"].profile);
userRouter.get('/delete/:id', _auth["default"], _userController["default"]["delete"]);
var _default = userRouter;
exports["default"] = _default;