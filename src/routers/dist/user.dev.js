"use strict";

var express = require('express');

var router = new express.Router();

var User = require('../models/user');

var auth = require('../middleware/auth');

var multer = require('multer');

var sharp = require('sharp');

router.post('/users', function _callee(req, res) {
  var user, token;
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
          _context.next = 6;
          return regeneratorRuntime.awrap(user.generateAuthTokens());

        case 6:
          token = _context.sent;
          res.status(201).send({
            user: user,
            token: token
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          res.status(400).send(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}); // hash the plain text password before saving.

router.post('/users/login', function _callee2(req, res) {
  var user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("hello ");
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findByCredentials(req.body.email, req.body.password));

        case 4:
          user = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(user.generateAuthTokens());

        case 7:
          token = _context2.sent;
          res.status(201).send({
            user: user,
            token: token
          }); // console.log(user, token);

          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          res.status(400).send(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
router.post('/users/logout', auth, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          req.user.tokens = req.user.tokens.filter(function (token) {
            return token.token !== req.token;
          });
          _context3.next = 4;
          return regeneratorRuntime.awrap(req.user.save());

        case 4:
          res.send();
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).send();

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/users/logoutAll', auth, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          req.user.tokens = [];
          _context4.next = 4;
          return regeneratorRuntime.awrap(req.user.save());

        case 4:
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          res.status(500).send();

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.get('/users/me', auth, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.send(req.user);

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // router.get('/users', auth, async(req, res) => {
//     // res.send(req.user);
//     try {
//         const user = await User.find({});
//         res.status(200).send(user);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// });
// router.get('/users/:id', async(req, res) => {
//     const _id = req.params.id;
// this route is removed coz we are getting response as our id. due to it, we don't have to specify it.
//     try {
//         const user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(404).send();
//     }
// });

router.patch('/users/me', auth, function _callee6(req, res) {
  var updates, allowedUpdates, isValidOperation;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          //updating user     
          updates = Object.keys(req.body);
          allowedUpdates = ['name', 'email', 'password', 'age'];
          isValidOperation = updates.every(function (update) {
            return allowedUpdates.includes(update);
          });

          if (isValidOperation) {
            _context6.next = 5;
            break;
          }

          return _context6.abrupt("return", res.status(400).send('Error: Invalid updates!'));

        case 5:
          _context6.prev = 5;
          // const user = await User.findById(req.params.id);
          // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
          updates.forEach(function (update) {
            req.user[update] = req.body[update];
          });
          _context6.next = 9;
          return regeneratorRuntime.awrap(req.user.save());

        case 9:
          res.send(req.user); // if (!user) {
          //     res.status(404).send();
          // }

          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](5);
          res.status(400).send();

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 12]]);
});
router["delete"]('/users/me', auth, function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(req.user.remove());

        case 3:
          res.send(req.user);
          _context7.next = 10;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(500).send(_context7.t0);

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
var upload = multer({
  limits: {
    fileSize: 10000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
      return cb(new Error('Please upload the img file'));
    }

    cb(undefined, true); // cb(new Error("file must be in a pdf format"));
    // cb(undefined, true);
    // cb(undefined, false);
  }
});
router.post('/users/me/avatar', auth, upload.single('avatar'), function _callee8(req, res) {
  var buffer;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(sharp(req.file.buffer).resize({
            width: 250,
            height: 250
          }).png().toBuffer());

        case 2:
          buffer = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(req.user.save());

        case 5:
          res.send("hello");

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
}, function (error, req, res, next) {
  res.status(400).send({
    error: error.message
  });
});
router["delete"]('/users/me/avatar', auth, upload.single('avatar'), function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          req.user.avatar = undefined;
          _context9.next = 3;
          return regeneratorRuntime.awrap(req.user.save());

        case 3:
          res.send('delete successfully!');

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
router.get('/users/:id/avatar', function _callee10(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(user.findById(req.params.id));

        case 3:
          user = _context10.sent;

          if (!(!user || !user.avatar)) {
            _context10.next = 6;
            break;
          }

          throw new Error('Not found! Try again');

        case 6:
          res.set('Content-type', 'image/png');
          res.send(user.avatar);
          _context10.next = 13;
          break;

        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](0);
          res.status(404).send();

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;