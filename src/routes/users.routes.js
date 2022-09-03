const express = require('express');
const path = require('path');
const routesUsers = express.Router();
const controller = require("../controller/controllerUsers")
const guestMid = require('../middlewares/guestMid')
const adminMid = require('../middlewares/adminMid')
const userValidationMid = require('../middlewares/userValidationMid')

//---rutas---
routesUsers.get("/usuarios", adminMid, controller.listar);

routesUsers.delete("/eliminar/:id", adminMid, controller.eliminar);

routesUsers.get("/login", guestMid, controller.login);

routesUsers.post("/loginProcess", guestMid, userValidationMid.validacionLogin, controller.loginProcess);

routesUsers.get('/logout', controller.logout)

routesUsers.get("/upgrade/:id", adminMid,controller.makeAdmin)

routesUsers.get("/downgrade/:id", adminMid, controller.makeNormalUser)

routesUsers.get("/registro", guestMid, controller.registro)

routesUsers.post("/registro", userValidationMid.validacionRegistro, controller.crearUsuario)


module.exports = routesUsers;

