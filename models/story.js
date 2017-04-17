"use strict";

const { MongoClient } = require('mongodb');
const dbConnection = process.env['MONGODB_URI'];
// const dbConnection = 'mongodb://localhost:27017/bambara';

function updateIsCovered(req, res, next) {
  MongoClient.connect(dbConnection, function(err, db) {
    if(err) throw err;

    db.collection('story_values')
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

    db.collection('story_values')
      .find()
      .toArray(function(err, results) {
        if (err) throw err;
        res.json(results)
        next()
      })
  })
}


module.exports = { getStory, updateIsCovered }
