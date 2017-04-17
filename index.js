"use strict";

const express = require('express')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

const storyRoute = require('./routes/storyRoute')

const app = express()
const PORT = process.env.PORT || process.argv[2] || 3000
const env = process.env.NODE_ENV || 'dev';
const DEV = env==='dev';

// set up some logging
app.use( logger( DEV ? 'dev' : 'common') );

// we're only going to accept json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set up ejs to render the views
app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'));

/* ROUTES */
app.use('/story', storyRoute);
app.use(express.static(path.join(__dirname, 'dist')))

// set up server
app.listen(PORT, function(){
  console.log("server up and running on port ", PORT)
})
