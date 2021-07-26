"use strict";

var express = require('express');

var router = new express.Router();

var User = require('../models/user'); //file not found


router.post('/users', function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log(req.body);
          user = new User(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          res.status(201).send(user);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          res.status(400).send(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
router.get('/users', function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.find({}));

        case 3:
          user = _context2.sent;
          res.status(200).send(user);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(400).send(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/users/:id', function _callee3(req, res) {
  var _id, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findById(_id));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).send());

        case 7:
          res.send(user);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          res.status(404).send();

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router.patch('/users/:id', function _callee4(req, res) {
  var updates, allowedUpdates, isValidOperation, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //updating user     
          updates = Object.keys(req.body);
          allowedUpdates = ['name', 'email', 'password', 'age'];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(400).send('Error: Invalid updates!'));

        case 5:
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          }));

        case 8:
          user = _context4.sent;

          if (!user) {
            res.status(404).send();
          }

          res.send(user);
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](5);
          res.status(400).send();

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 13]]);
});
router["delete"]('/users/:id', function _callee5(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(req, params.id));

        case 3:
          user = _context5.sent;

          if (user) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).send());

        case 6:
          res.send(user);
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(500).send(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;