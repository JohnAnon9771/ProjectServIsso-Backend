const express = require('express');
const multer = require('multer');

const SessionController = require('./controllers/SessionController');
const PostController = require('./controllers/PostController');
const AuthController = require('./controllers/AuthController');
const ProjectController = require('./controllers/ProjectController');

const uploadConfig = require('./config/upload');

const upload = multer(uploadConfig);
const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

// GET(buscar), POST(criar), PUT(alterar) e DELETE(deletar)

// req.query  = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)
routes.post('/', upload.single('photo'), SessionController.store);
routes.get('/index', SessionController.index);
routes.get('/index/:profession', SessionController.indexUserFiltred);
routes.get('/show/:id', SessionController.show);
routes.put('/update', SessionController.update);
routes.delete('/destroy', SessionController.destroy);

routes.post('/posts', upload.single('thumbnail'), PostController.store);
routes.get('/posts/index', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.put('/posts/update', PostController.update);
routes.delete('/posts/destroy', PostController.destroy);

routes.post('/authenticate', AuthController.store);

routes.get('/home', authMiddleware, ProjectController.show);

module.exports = routes;
