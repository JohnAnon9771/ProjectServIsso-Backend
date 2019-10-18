const express = require("express");
const multer = require("multer");

const SessionController = require("./controllers/SessionController");
const CompanyController = require("./controllers/CompanyController");
const PostController = require("./controllers/PostController");
const AuthController = require("./controllers/AuthController");
const ProjectController = require("./controllers/ProjectController");

const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);
const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

//GET(buscar), POST(criar), PUT(alterar) e DELETE(deletar)

//req.query  = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

routes.post("/", SessionController.store);
routes.get("/show", SessionController.show);
routes.put("/update", SessionController.update);
routes.delete("/destroy", SessionController.destroy);

routes.post("/company", CompanyController.store);
routes.get("/company/show", CompanyController.show);
routes.get("/company/index", CompanyController.index);

routes.post("/posts", upload.single("thumbnail"), PostController.store);
routes.get("/posts", PostController.show);
routes.get("/posts/index", PostController.index);
routes.put("/posts/update", PostController.update);
routes.delete("/posts/destroy", PostController.destroy);

routes.post("/authenticate", AuthController.store);

routes.get("/home", authMiddleware, ProjectController.show);

module.exports = routes;
