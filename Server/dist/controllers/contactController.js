"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _verifyUser = _interopRequireDefault(require("../middleware/verifyUser"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _comment = _interopRequireDefault(require("../models/comment"));

var _blog = _interopRequireDefault(require("../models/blog"));

var _user = _interopRequireDefault(require("../models/user"));

var _express = _interopRequireDefault(require("express"));

var _blogImageProcessor = _interopRequireDefault(require("../middleware/blogImageProcessor.js"));

var _lodash = require("lodash");

var _default = new ( /*#__PURE__*/function () {
  function contactController() {
    (0, _classCallCheck2["default"])(this, contactController);
  }

  (0, _createClass2["default"])(contactController, [{
    key: "sendEmail",
    value: function () {
      var _sendEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var transporter, info;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                try {
                  transporter = _nodemailer["default"].createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    //587 //465
                    secure: false,
                    //milky8175@gmail.com
                    auth: {
                      user: "milky8175@gmail.com",
                      pass: "Milky8175.."
                    }
                  }); // send mail with defined transport object

                  info = transporter.sendMail({
                    from: "milky8175@gmail.com",
                    // sender address
                    to: "moiseniyonkuru1@gmail.com",
                    // list of receivers
                    subject: "Message from My brand App ✔",
                    // Subject line
                    text: "Hello world?",
                    // plain text body
                    html: "<div>\n                        <div style=\"width:80%;margin:auto;background: teal;color:white;\">\n                            <br>\n                            <p style=\"font-size: 18px;padding: 0px 10px;\">Fullname: ".concat(req.body.fullname, "</p>\n                            <p style=\"font-size: 18px;padding: 0px 10px;\">Email: ").concat(req.body.email, "</p>\n                            <p style=\"font-size: 18px;padding: 0px 10px;\">Phone Number: ").concat(req.body.telphone, "</p>\n                            <p style=\"font-size: 18px;padding: 0px 10px;\">Address: ").concat(req.body.address, "</p>\n                            <br>\n                        </div>\n                        <div style=\"width:80%;margin:auto;background: teal;color:white;text-align: center;\">\n                            <p style=\"width: 20%;margin: auto;border-bottom: solid 2px white;color:white;padding-top: 10px;font-size: 22.5px;\">Message</p>\n                            <p style=\"padding: 15px 10px;font-size: 22.5px;\">\" ").concat(req.body.message, " \"</p>\n                            <p style=\"padding: 15px 10px;font-size: 22.5px;\">-- ").concat(new Date(), " --</p>\n                        </div>\n                        </div>") // html body

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
                } catch (error) {
                  res.send({
                    message: 'unable to send email!!'
                  });
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function sendEmail(_x, _x2) {
        return _sendEmail.apply(this, arguments);
      }

      return sendEmail;
    }()
  }]);
  return contactController;
}())();

exports["default"] = _default;