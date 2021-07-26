"use strict";

var express = require('express');

var app = express();

require('./db/mongoose'); // const User = require('./models/user');
// const Task = require('./models/task');


var chalk = require('chalk');

var bcrypt = require('bcryptjs');

var userRouter = require('./routers/user'); //file not found


var taskRouter = require('./routers/task');

var _require = require('express'),
    Router = _require.Router;

var Task = require('./models/task');

var User = require('./models/user');

var port = process.env.PORT;

var multer = require('multer');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(port, function () {
  console.log('Server is listening on the port ' + port);
});