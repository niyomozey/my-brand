"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRouters = _interopRequireDefault(require("./routes/userRouters"));

var _blogRouters = _interopRequireDefault(require("./routes/blogRouters"));

var _commentRouters = _interopRequireDefault(require("./routes/commentRouters"));

var _contactRouters = _interopRequireDefault(require("./routes/contactRouters"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _con = _interopRequireDefault(require("./db/con.js"));

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use('../uploads', _express["default"]["static"]('uploads/'));
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use('/niyo', _userRouters["default"]);
app.use('/niyo', _blogRouters["default"]);
app.use('/niyo', _commentRouters["default"]);
app.use('/niyo', _contactRouters["default"]);
var _default = app;
exports["default"] = _default;