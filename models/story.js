const { MongoClient } = require('mongodb');
// const dbConnection = process.env['MONGODB_URI'];
const dbConnection = 'mongodb://localhost:27017/bambara';

function updateIsCovered(req, res, next) {
  console.log('updateIsCovered req', req.params)

  MongoClient.connect(dbConnection, function(err, db){
    if(err) throw err;

    db.collection('story_values')
      .findOneAndUpdate(
        { code: req.params.code },
        { $set: { isCovered: false } },
        function(err, results){
          if(err) throw err;
          // console.log('updateIsCovered results', results)
          res.story = results
          next()
        }
      )
    }
  )
}

function getStory(req, res, next) {
  MongoClient.connect(dbConnection, function(err, db){
    if(err) throw err;

    db.collection('story_values')
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