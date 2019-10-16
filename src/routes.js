const express = require("express");
const multer = require("multer");

const SessionController = require("./controllers/SessionController");
const PostController = require("./controllers/PostController");
const AuthController = require("./controllers/AuthController");
const ProjectController = require('./controllers/ProjectController')

const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);
const authMiddleware = require('./middlewares/auth')

const routes = express.Router();

//GET(buscar), POST(criar), PUT(alterar) e DELETE(deletar)

//req.query  = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

routes.post("/sessions", SessionController.store);
routes.get("/sessions", SessionController.show);
routes.put("/sessions", SessionController.update);
routes.delete("/sessions", SessionController.destroy);

routes.post("/posts", upload.single("thumbnail"), PostController.store);
routes.get("/posts/:category", PostController.index);
routes.put("/posts", PostController.update);
routes.delete("/posts/delete", PostController.destroy);

routes.post("/authenticate", AuthController.store);

routes.get('/home', authMiddleware, ProjectController.show)

module.exports = routes
