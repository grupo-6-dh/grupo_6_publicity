const express = require('express');
const path = require('path');
const routes = express.Router();
const controllerUsers = require("../controller/controllerUsers")
const controllerProducts = require("../controller/controller")
const guestMid = require('../middlewares/guestMid')
const adminMid = require('../middlewares/adminMid')
const userValidationMid = require('../middlewares/userValidationMid')

//--rutas usuarios--//
routes.get("/users", controllerUsers.apiList)

routes.get("/users/:id", controllerUsers.apiGetOne)

//--rutas productos--//
routes.get("/products", controllerProducts.apiList)

module.exports = routes;

