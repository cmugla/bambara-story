'use strict'

const express           = require('express')
const logger            = require('morgan')
const path              = require('path')
const bodyParser        = require('body-parser')

const storyRoute		= require('./routes/storyRoute')

const app               = express()
const PORT              = process.env.PORT || process.argv[2] || 3000

// set up logging so that we can see what's happening
app.use(logger('dev'))
app.use(bodyParser.json())

// set up ejs to render the views
app.set('view engine', 'ejs')

// set up server
app.listen(PORT, function(){
  console.log("server up and running on port ", PORT)
})

/* ROUTES */
app.use('/story', storyRoute);