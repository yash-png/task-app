"use strict";

//Mongoosemodel = just like creating a table in sql.
// user model start -
var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var Task = require('../models/task');

var sharp = require('sharp');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    "default": 'Anonymous',
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate: function validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    }
  },
  age: {
    type: Number,
    "default": 0,
    validate: function validate(value) {
      if (value < 0) {
        throw new Error('Age must be greater than zero');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'Owner'
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

userSchema.methods.generateAuthTokens = function _callee() {
  var user, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //why not arrow?
          user = this; // console.log(user);

          token = jwt.sign({
            _id: user._id.toString()
          }, process.env.JWT_SECRET);
          console.log(token);
          user.tokens = user.tokens.concat({
            token: token
          });
          console.log(user.tokens);
          _context.next = 7;
          return regeneratorRuntime.awrap(user.save());

        case 7:
          return _context.abrupt("return", token);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

userSchema.statics.findByCredentials = function _callee2(email, password) {
  var user, isMatch;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 2:
          user = _context2.sent;

          if (user) {
            _context2.next = 5;
            break;
          }

          throw new Error('Unable to login');

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 7:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 10;
            break;
          }

          throw new Error('Unable to login');

        case 10:
          return _context2.abrupt("return", user);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
};

userSchema.pre('save', function _callee3(next) {
  var user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = this; // console.log(user);

          if (!user.isModified('password')) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context3.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this);
});
userSchema.pre('remove', function _callee4(next) {
  var user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = this;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Task.deleteMany({
            owner: user._id
          }));

        case 3:
          next();

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this);
}); //it save the object in db.
// user model closed

var User = mongoose.model('User', userSchema);
module.exports = User;