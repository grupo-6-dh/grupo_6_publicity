const express = require('express');
const path = require('path');
const routesUsers = express.Router();
const controllerUsers = require('../controller/controllerUsers');
const controller = require('../controller/controller');
const guestMid = require('../middlewares/guestMid');
const userValidationMid = require('../middlewares/userValidationMid');

//---rutas---
routesUsers.get("/registro", guestMid, controllerUsers.registro)

routesUsers.post("/registro", controllerUsers.crearUsuario)

routesUsers.get("/", controller.index)

module.exports = routesUsers;

