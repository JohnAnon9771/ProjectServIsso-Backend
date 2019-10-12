const express = require('express')
const multer = require('multer')

const SessionController = require('./controllers/SessionController')
const PostController = require('./controllers/PostController')
const SessionListController = require('./controllers/SessionListController')

const uploadConfig = require('./config/upload') 
const upload = multer(uploadConfig)

const routes = express.Router()

routes.post('/sessions', SessionController.store)
routes.get('/sessions', SessionListController.index)
routes.post('/posts', upload.single('thumbnail'), PostController.store)
routes.get('/posts/:category', PostController.index)


module.exports = routes

