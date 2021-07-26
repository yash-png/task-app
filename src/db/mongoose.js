const mongoose = require('mongoose');
// const validator = require('validator');
// const User = ('./models/user');
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

// const me = new User({
//     name: '       Munna bhai',
//     email: 'mike@45.com   ',
//     password: 'India@11'
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error', error);
// });


// const task = new tasks({
//     description: "Take AI for masters!",
//     completed: false
// });

// task.save().then(() => {
//     console.log("task added successfully");
// }).catch((error) => {
//     console.log('Error : ' + error);
// });