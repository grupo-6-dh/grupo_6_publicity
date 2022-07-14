const express = require('express');
const path = require('path');
const routesUsers = express.Router();
const controllerUsers = require('../controller/controllerUsers');
const controller = require('../controller/controller');

//solicitamos la funcion body de express validator
const { body } = require ('express-validator');

//validaciones
const validacionRegistro = [
    body('nombre')
                .notEmpty().withMessage('Debes completar el campo con tu nombre completo')
                .isLength({ min: 3 }).withMessage('El nombre debe tener como mínimo 3 caracteres'),
    body('email')
                .notEmpty().withMessage('Debes ingresar un email')
                .isEmail().withMessage('Debes ingresar un email válido'),
    body('contrasenia')
                .notEmpty().withMessage('Debes ingresar una contraseña')
                .isLength({ min: 5 }).withMessage('La contraseña debe tener como mínimo 5 caracteres'),
    body('contraseniaConfirmada')
                .matches('contrasenia').withMessage('Las contraseñas deben coincidir'),
]
//---rutas---
routesUsers.get("/registro", controllerUsers.registro)

routesUsers.post("/registro", validacionRegistro, controllerUsers.crearUsuario)

routesUsers.get("/", controller.index)

module.exports = routesUsers;

