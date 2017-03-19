'use strict'

const storyRouter = require('express').Router()
const { updateIsCovered, getStory } = require('../models/story')

/* REVEAL */
storyRouter.get('/reveal', updateIsCovered, function(req, res){
  res.redirect('/story')
})

/* GET STORY */
storyRouter.get('/', getStory, function(req, res){
  res.send()
})

module.exports = storyRouter;