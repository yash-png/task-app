"use strict";

// crud  : create read update delete.
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.objectId;
var _require = require('mongodb'),
    MongoClient = _require.MongoClient,
    ObjectID = _require.ObjectID,
    ObjectId = _require.ObjectId;

var connectionURL = 'mongodb://127.0.0.1:27017'; // we can write localhost rather than to write whole ip address but 
// typing causes slows down the application and may be app fails down.

var databaseName = 'task-manager';
var id = new ObjectID(); // console.log(id.id.length);
// console.log(id.toHexString().length);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (error, client) {
  if (error) {
    return console.log("Unable to connect to database");
  } // console.log("Connected successfully");


  var db = client.db(databaseName); //connection to the specific db.
  //read :
  // db.collection ("users").findOne({ age: 27 }, (error, user) => {
  //     if (error) {
  //         console.log("Unable to fetch the user");
  //     }
  //     console.log(user);
  // });
  // db.collection("users").find({ age: 25 }).toArray((error, user) => {
  //     // if (error) {
  //     //     console.log("Unable to fetch the user");
  //     // }
  //     console.log(user);
  // });
  // db.collection("task").findOne({ _id: new ObjectID("60e73e0d96a7711cc0ee1ca5") }, ((error, tasks) => {
  //     // if (error) {
  //     //     console.log("Unable to fetch the user");
  //     // }
  //     console.log(tasks);
  // }));
  // db.collection("task").find({ completed: false }).toArray((err, tasks) => {
  //     console.log(tasks);
  // });
  // update :
  // const updatePromise = db.collection('users').updateOne({
  //     _id: ObjectId("60e6d772a31c051dc4a0f405")
  // }, {
  //     $inc: {
  //         age: 2
  //     }
  // });
  // updatePromise.then((result) => {
  //     console.log(result);
  // }).catch((error) => {
  //     console.log(error);
  // });
  // db.collection('task').updateMany({
  //     completed: false
  // }, {
  //     $set: {
  //         completed: true
  //     }
  // }).then((result) => {
  //     console.log(result.modifiedCount);
  // }).catch((error) => {
  //     console.log(error);
  // });
  // create :
  // db.collection('users').insertOne({
  //     _id: id,~
  //     name: "Monica",
  //     age: 25
  // }, (error, result) => {
  //     if (error) {
  //         return console.log('Unable ot connect the db');
  //     }
  //     console.log(result);
  // });
  // db.collection('task').insertMany([{
  //     description: 'Clean the house',
  //     completed: true
  // }, {
  //     description: 'Renew inspection',
  //     completed: false
  // }, {
  //     description: 'Pot Plants',
  //     completed: false
  // }], (error, result) => {
  //     if (error) {
  //         return console.log('Unable to insert task');
  //     }
  //     // console.log(result.ops);
  // });
});