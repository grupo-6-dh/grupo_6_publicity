const express = require('express');
const path = require('path');
const upload = require ('../middlewares/multerMid');
const controller = require("../controller/controller");

const routes = express.Router();

const { body } = require ('express-validator');

//validaciones
const validacionDatosProducto = [
    body('nombre')
                .notEmpty().withMessage('Debes ingresar el nombre del producto')
                .isLength({ min: 3 }).withMessage('El nombre debe tener como mínimo 3 caracteres'),
    body('precio')
                .notEmpty().withMessage('Debes ingresar el precio del producto'),
    body('descripcion')
                .notEmpty().withMessage('Debes agregar una descripcion del producto'),
    body('tamanio')
                .notEmpty().withMessage('Debes ingresar el tamaño del producto'),
    body('cantMinima')
                .notEmpty().withMessage('Debes ingresar la cantidad mínima de compra'),
    body('img')
    .custom((value , { req })=> {
        let file = req.file;
        let extensionAceptada = ['.png', ',jpg', '.gif'];
        //controlamos que se suba una imagen
        if(!file){
            throw new Error ('Debes subir una imágen')
        }else{
            //controlamos que sea valida la extension del archivo subido
            let extension = path.extname(file.originalname);
            if(!extensionAceptada.includes(extension)){
                throw new Error (`Los tipos de archivo permitidos son ${extensionAceptada.join(', ')}`);
            }
        }
        return true;
    })
]

//---rutas---
routes.get("/", controller.index)

routes.get("/info-pago", controller.info)

routes.get("/detalleProducto/:id", controller.detalleProducto);

routes.get("/products/:categoria", controller.categoria);

routes.get("/products", controller.listar)

routes.get("/recuperarPass", controller.recuperarPass)

routes.get("/carrito", controller.carrito)

routes.get("/modificarProducto", controller.modificarProducto)

routes.get("/abml", controller.abml)

routes.delete("/eliminar/:id", controller.eliminar)

routes.get("/alta",controller.alta)

routes.post("/nuevo", upload.single("img"), validacionDatosProducto, controller.crear)

routes.get("/info",controller.info)

routes.get("/products/:id/edit", controller.modificarProducto)

routes.put("/products/:id/edit", upload.single("img"), validacionDatosProducto, controller.edit)





module.exports = routes;

