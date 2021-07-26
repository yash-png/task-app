const express = require('express');
const app = express();
require('./db/mongoose');
// const User = require('./models/user');
// const Task = require('./models/task');
const chalk = require('chalk');

const bcrypt = require('bcryptjs');
const userRouter = require('./routers/user'); //file not found
const taskRouter = require('./routers/task');
const { Router } = require('express');
const Task = require('./models/task');
const User = require('./models/user');
const port = process.env.PORT;
const multer = require('multer');


app.use(express.json());
app.use(userRouter);
app.use(taskRouter);




app.listen(port, () => {
    console.log('Server is listening on the port ' + port);
});