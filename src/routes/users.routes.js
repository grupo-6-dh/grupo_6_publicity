const express = require('express');
const path = require('path');
const routesUsers = express.Router();
const controller = require("../controller/controllerUsers")

const guestMid = require('../middlewares/guestMid')

//solicitamos la funcion body de express validator
const { body } = require('express-validator');

//--validaciones--
const validacionLogin = [
    body('email')
        .notEmpty().withMessage('Debes ingresar un email')
        .isEmail().withMessage('Debes ingresar un email válido'),
]


//---rutas---
routesUsers.get("/usuarios",controller.listar);

routesUsers.delete("/eliminar/:id",controller.eliminar);

routesUsers.get("/login", guestMid, controller.login);

routesUsers.post("/loginProcess", guestMid, validacionLogin, controller.loginProcess);

routesUsers.get('/logout', controller.logout)


module.exports = routesUsers;

