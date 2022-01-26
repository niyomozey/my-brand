"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _mongoose = _interopRequireDefault(require("mongoose"));

var dbname = process.env.DB_NAME;
var con = "".concat(process.env.DB_URL);
console.log('wait database connected......');

_mongoose["default"].connect(con, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var connection = _mongoose["default"].connection;
connection.once('open', function () {
  console.log("MongoDB database connection established successfully");
});