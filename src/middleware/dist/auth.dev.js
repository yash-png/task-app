"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var auth = function auth(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function auth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Auth middleware');
          _context.prev = 1;
          token = req.header('Authorization').replace('Bearer ', ''); //add space after bearer

          console.log(token);
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log(decoded);
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decoded._id,
            'tokens.token': token
          }));

        case 8:
          user = _context.sent;

          if (user) {
            _context.next = 11;
            break;
          }

          throw new Error();

        case 11:
          req.token = token;
          req.user = user;
          next();
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          res.status(401).send("Error:Please Authenticate ");
          console.log(_context.t0);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 16]]);
};

module.exports = auth;