const express = require('express');
const path = require('path');
const routesUsers = express.Router();
const controller = require("../controller/controllerUsers")
const guestMid = require('../middlewares/guestMid')
const userValidationMid = require('../middlewares/userValidationMid')

//---rutas---
routesUsers.get("/usuarios",controller.listar);

routesUsers.delete("/eliminar/:id",controller.eliminar);

routesUsers.get("/login", guestMid, controller.login);

routesUsers.post("/loginProcess", guestMid, userValidationMid.validacionLogin, controller.loginProcess);

routesUsers.get('/logout', controller.logout)

routesUsers.get("/upgrade/:id",controller.makeAdmin)

routesUsers.get("/downgrade/:id", controller.makeNormalUser)


module.exports = routesUsers;

