const express = require('express');
const path = require('path');
const routesUsers = express.Router();
const controller = require("../controller/controllerUsers")
const guestMid = require('../middlewares/guestMid')
const adminMid = require('../middlewares/adminMid')
const userValidationMid = require('../middlewares/userValidationMid')

//--rutas api--//
routesUsers.get("/users", controller.apiList)

routesUsers.get("/users/:id", controller.apiGetOne)

module.exports = routesUsers;

