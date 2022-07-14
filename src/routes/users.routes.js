const express = require('express');
const path = require('path');

const routesUsers = express.Router();
const controller = require("../controller/controllerUsers")

//---rutas---
routesUsers.get("/usuarios",controller.listar);

routesUsers.delete("/eliminar/:id",controller.eliminar);

routesUsers.get("/login", controller.login);

routesUsers.post("/loginProcess",controller.loginProcess);


module.exports = routesUsers;

