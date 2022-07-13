const express = require('express');
const path = require('path');
const routesUsers = express.Router();
const { body } = require ('express-validator');
const controllerUsers = require('../controller/controllerUsers');
const controller = require('../controller/controller');

//---rutas---

routesUsers.get("/registro", controllerUsers.registro)

routesUsers.post("/registro", validaciones, controllerUsers.crearUsuario)

routesUsers.get("/", controller.index)

module.exports = routesUsers;

