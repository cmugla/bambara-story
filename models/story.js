"use strict";

const { MongoClient } = require("mongodb");
// const dbConnection = process.env['MONGODB_URI'];
// const dbConnection = 'mongodb://localhost:27017/bambara';
const dbConnection =
  "mongodb://celeste:bambara123@cluster-tfm93rzf-shard-00-00.iw7xg.mongodb.net:27017,cluster-tfm93rzf-shard-00-01.iw7xg.mongodb.net:27017,cluster-tfm93rzf-shard-00-02.iw7xg.mongodb.net:27017/heroku_tfm93rzf?ssl=true&replicaSet=atlas-10ap8l-shard-0&authSource=admin&retryWrites=true&w=majority";

function updateIsCovered(req, res, next) {
  MongoClient.connect(dbConnection, function (err, db) {
    if (err) throw err;

    db.collection("story").update(
      { code: req.params.code },
      { $set: { isCovered: false } },
      function (err, results) {
        if (err) throw err;
        next();
      }
    );
  });
}

function getStory(req, res, next) {
  MongoClient.connect(dbConnection, function (err, db) {
    if (err) throw err;

    db.collection("story")
      .find()
      .toArray(function (err, results) {
        if (err) throw err;
        res.results = results;
        next();
      });
  });
}

module.exports = { getStory, updateIsCovered };
