const express = require('express');
const path = require('path');

const routesUsers = express.Router();
const controller = require("../controller/controllerUsers")

//---rutas---
routesUsers.get("/usuarios",controller.listar);

routesUsers.get("/registro",)


module.exports = routesUsers;

