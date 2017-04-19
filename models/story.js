"use strict";

const { MongoClient } = require('mongodb');
// const dbConnection = process.env['MONGODB_URI'];
const dbConnection = 'mongodb://localhost:27017/bambara';

function updateIsCovered(req, res, next) {
  MongoClient.connect(dbConnection, function(err, db) {
    if(err) throw err;

    db.collection('story')
      .update(
        { code: req.params.code },
        { $set: { isCovered: false } },
        function(err, results){
          if(err) throw err;
          next()
        }
      )
    }
  )
}

function getStory(req, res, next) {
  MongoClient.connect(dbConnection, function(err, db) {
    if(err) throw err;

    db.collection('story')
      .find()
      .toArray(function(err, results) {
        if (err) throw err;
        res.results = results
        next()
      })
  })
}


module.exports = { getStory, updateIsCovered }
