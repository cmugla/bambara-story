const { MongoClient } = require('mongodb');
// const dbConnection = process.env['MONGODB_URI'];
const dbConnection = 'mongodb://localhost:27017/bambara';

function updateIsCovered(req, res, next) {
  console.log('updateIsCovered req', req.query.code)

  let { code } = req.query

  MongoClient.connect(dbConnection, function(err, db){
    if(err) throw err;

    db.collection('story_test')
      .update(
        { "code": code },
        { $set: { "isCovered": true } }
      ,
      function(err, results){
        if(err) throw err;
        // console.log(results)
        next()
      }
    )
  })
}

function getStory(req, res, next) {
  MongoClient.connect(dbConnection, function(err, db){
    if(err) throw err;

    db.collection('story_test')
      .find()
      .toArray(function(err, results){
        if (err) throw err;
        // console.log('getStory results', results)
        res.json(results)
        next()
      })
  })
}


module.exports = { getStory, updateIsCovered }