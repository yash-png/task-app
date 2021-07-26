"use strict";

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}); // Mongoose-model = just like creating a table in sql.

var User = mongoose.model('User', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});
var me = new User({
  name: "Andrew",
  age: 27
});
me.save().then(function () {
  console.log(me);
})["catch"](function (error) {
  console.log('Error', error);
}); //it save the object in db.