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


  var db = client.db(databaseName);
});
