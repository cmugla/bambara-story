"use strict";

const storyRouter = require('express').Router()
const { updateIsCovered, getStory } = require('../models/story')

/* REVEAL */
// code: isee will update isCovered of value's object
storyRouter.put('/:code', updateIsCovered, getStory, function(req, res) {
  res.json(res.results)
})

/* GET STORY */
storyRouter.get('/', getStory, function(req, res) {
  res.json(res.results)
})

module.exports = storyRouter;