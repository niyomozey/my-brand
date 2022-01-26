"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("jest-extended");

var _mongodb = require("mongodb");

var _app = _interopRequireDefault(require("../../app"));

var _user = _interopRequireDefault(require("../models/user"));

var _supertest = _interopRequireDefault(require("supertest"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _verifyUser = _interopRequireDefault(require("../middleware/verifyUser"));

require("regenerator-runtime/runtime.js");

var request = (0, _supertest["default"])(_app["default"]);
beforeEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user["default"].deleteMany();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
afterEach( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user["default"].deleteMany();

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('should get All users', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
  var response;
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return request.get('/niyo/profile').send();

        case 2:
          response = _context3.sent;
          expect(response.status).toBe(200);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('go to landing page', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
  var response;
  return _regenerator["default"].wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return request.get('/niyo/home').send();

        case 2:
          response = _context4.sent;
          expect(response.status).toBe(200);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));
test('should be able to signup user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
  var response;
  return _regenerator["default"].wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return request.post('niyo/signup').send({
            fullName: 'Niyonkuru Moise',
            username: 'niyonkuru',
            telphone: '0780644280',
            password: '123456',
            cpassword: '123456',
            email: 'moiseniyonkuru1@gmail.com'
          });

        case 2:
          response = _context5.sent;
          expect(response.status).toBe(202);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5);
})));
test('User should not signup with incorrent email', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
  var response;
  return _regenerator["default"].wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return request.post('niyo/signup').send({
            fullName: 'Niyonkuru Moise',
            username: 'niyonkuru',
            telphone: '0780644280',
            password: '123456',
            cpassword: '123456',
            email: 'moiseniyonkuru1.com'
          });

        case 2:
          response = _context6.sent;
          expect(response.status).toBe(400);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  }, _callee6);
})));
test('User should not signup with incorrent password', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
  var response;
  return _regenerator["default"].wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return request.post('niyo/signup').send({
            fullName: 'Niyonkuru Moise',
            username: 'niyonkuru',
            telphone: '0780644280',
            password: '1234',
            cpassword: '123456',
            email: 'moiseniyonkuru1@gmail.com'
          });

        case 2:
          response = _context7.sent;
          expect(response.status).toBe(400);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  }, _callee7);
})));