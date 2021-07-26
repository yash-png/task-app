"use strict";

// crud  : create read update delete.
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var connectionURL = 'mongodb://127.0.0.1:27017'; // we can write localhost rather than to write whole ip address but 
// typing causes slows down the application and may be app fails down.

var databaseName = 'task-manager';
MongoClient.connect(connectionURL, {
  useNewUrlParser: true
}, function (error, client) {
  if (error) {
    return console.log("Unable to connect to database");
  }

  console.log("Connected successfully");
});