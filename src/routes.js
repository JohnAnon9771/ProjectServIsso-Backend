const express = require('express')
const multer = require('multer')

const SessionController = require('./controllers/SessionController')
const PostController = require('./controllers/PostController')

const uploadConfig = require('./config/upload') 
const upload = multer(uploadConfig)

const routes = express.Router()

//GET(buscar), POST(criar), PUT(alterar) e DELETE(deletar)

//req.query  = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)


routes.post('/sessions', SessionController.store)
routes.get('/sessions', SessionController.index)
routes.put('/sessions', SessionController.update)

routes.post('/posts', upload.single('thumbnail'), PostController.store)
routes.get('/posts/:category', PostController.index)
routes.put('/posts', PostController.update)
routes.delete('/posts/delete', PostController.destroy)


module.exports = routes

