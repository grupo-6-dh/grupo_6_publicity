const express = require('express');
const path = require('path');
const upload = require ('../middlewares/multerMid');
const controller = require("../controller/controller");

const routes = express.Router();


//---rutas---
routes.get("/", controller.index)

routes.get("/info-pago", controller.info)

routes.get("/registro", controller.registro)

routes.get("/detalleProducto/:id", controller.detalleProducto);

routes.get("/products/:categoria", controller.categoria);

routes.get("/products", controller.listar)

routes.get("/login", controller.login)

routes.get("/recuperarPass", controller.recuperarPass)

routes.get("/carrito", controller.carrito)

routes.get("/modificarProducto", controller.modificarProducto)

routes.get("/abml", controller.abml)

routes.delete("/eliminar/:id", controller.eliminar)

routes.get("/alta",controller.alta)

routes.get("/info",controller.info)



module.exports = routes;

