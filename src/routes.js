const express = require('express')
const DevController = require('./controllers/devController.js')
const likeController = require('./controllers/likeController')
const dislikeController = require('./controllers/dislikeController')

const routes = express.Router()

routes.get('/devs',  DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', likeController.store)
routes.post('/devs/:devId/dislikes', dislikeController.store)

module.exports = routes
