const express = require('express');
const path = require('path');

const routes = express.Router();
const controller = require("../controller/controller")

//---rutas---
routes.get("/", controller.index)

routes.get("/registro", controller.registro)

routes.get("/detalle-producto", controller.detalleProducto)

routes.get("/products", controller.products)

routes.get("/login", controller.login)

routes.get("/recuperarPass", controller.recuperarPass)

routes.get("/carrito", controller.carrito)



module.exports = routes;

