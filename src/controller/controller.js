
const { fstat } = require('fs');
const path = require('path');
let productos = require('../data/products.json');
const fs = require("fs");

//Multer
const multer = require('multer')
//solicitamos la funcion validationResult de express validator
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { brotliDecompress } = require('zlib');

const controller = {
    index: (req, res) => {
        return res.render('index');
    },

    listar: (req, res) => {
        db.Producto.findAll().then(function (prod) {

            return res.render('productos/products', { 'productos': prod });
        })
    },

    detalleProducto: (req, res) => {
        let id = req.params.id;
        let stock = db.Stock.findAll();
        let prod = db.Producto.findByPk(id);
        let categorias = db.CategoriaProducto.findAll();
        let bolsaColores = db.ColorBolsa.findAll();
        let tamanios = db.TamanioBolsa.findAll();

        Promise.all([stock, prod, bolsaColores, tamanios, categorias])
            .then(function ([stock, prod, bolsaColores, tamanios, categorias]) {
                return res.render('productos/detalle', { 'detalle': prod, 'stock': stock, 'bolsaColores': bolsaColores, 'tamanios': tamanios, 'categorias': categorias });
            })

    },

    categoria: (req, res) => {
        let cat = req.params.categoria;
        let id;
        if (cat == 'Friselina') {
            id = 1;
        }
        if (cat == 'plastica') {
            id = 2;
        }
        if (cat == 'Cristal') {
            id = 3;
        }

        let prod = db.Producto.findAll({
            where: {
                idProductCategory: id
            }
        }
        ).then(function (prod) {
            return res.render('productos/products', { 'productos': prod });
        });
    },

    eliminar: (req, res) => {
        
        //obtengo el id del producto
        let idProducto= req.params.id;
         
         //elimino el stock relacionado con el producto
         db.Stock.destroy({
             where: {
                 idProduct : idProducto
             }
         })

        //elimino el producto
        db.Producto.destroy({
            where:{
                id: idProducto
            }
        })

        //busco el producto y obtengo su imagen, para poder borrarla del sistema
        let producto = db.Producto.findByPk(idProducto)
        //obtenemos la ruta de la imagen del producto
        let imagen = path.join(__dirname, "../../public/img" + producto.image);
        //utilizamos existsSync para preguntar si existe el archivo
        if (fs.existsSync(imagen)) {
            //utilizamos unlinkSync para eliminar un archivo
            fs.unlinkSync(imagen);
        }

            
        //obtengo todos los productos para pasarselo a la vista
        db.Producto.findAll().then(function(result){ 
                return res.render('productos/abml',{'productos':result});
            });
    },

    alta: (req, res) => {
        let bolsaColores = db.ColorBolsa.findAll();
        let tamanios = db.TamanioBolsa.findAll();
        let categorias = db.CategoriaProducto.findAll();
        Promise.all([bolsaColores, tamanios, categorias])
            .then(function ([bolsaColores, tamanios, categorias]) {
                return res.render('productos/alta', { 'bolsaColores': bolsaColores, 'tamanios': tamanios, 'categorias': categorias });
            })
    },

    crear: (req, res) => {
        //le enviamos a express validator el objeto req, para que controle si todos los campos son correctos
        let errores = validationResult(req);
       
        if (errores.isEmpty()) {

            // obtenemos los datos
            let img = req.file;
            let imagen = `img/${img.filename}`;
            let nombre = req.body.nombre;
            let descripcion = req.body.descripcion;
            let precio = req.body.precio;
            let idTamanio = req.body.tamanio;
            let idCategoria = req.body.categoria;

            //damos de alta el producto           
            let producto = db.Producto.create({
                    name: nombre,
                    description: descripcion,
                    price: precio,
                    image: imagen,
                    idSize: idTamanio,
                    idProductCategory: idCategoria
                }).then(function (producto){
                    let id = producto.id;
                    //obtenemos el id del producto creado
                    let color = req.body.color;  //me devuelve un array con los id de los colores seleccionados
                        // damos de alta el stock utilizando el id del producto creado
                        //por cada color seleccionado, creamos un stock con el valor del stock ingresado 
                        for (let i = 0; i < color.length; i++) {
                            db.Stock.create({
                                stock: req.body.stock[color[i] - 1],
                                idBagColor: color[i],
                                idProduct: id
                            });
                        }
                        
                        db.Producto.findAll().then(function(result){ 
                            return res.render('productos/abml',{'productos':result});
                        });
    
                    })

        } else {
            //si se cargo una imagen previamente la borramos
            if (req.file != 'undefined') {
                fs.unlinkSync(path.join(__dirname, "../../public/img/", req.file.filename));
            }
            // si hay errores, renderizamos la vista registro enviandole el objeto mensajeError con los errores encontrados
            //podemos enviar errores.array o errores.mapped dependiendo de si queremos utilizarlo en la vista como array o como objeto, en este caso enviamos un objeto
            return res.render('productos/alta', { mensajeDeError: errores.mapped(), datosViejos: req.body});
        }
    },

    registro: (req, res) => {
        return res.render('registro');
    },

    login: (req, res) => {
        return res.render('login');
    },

    recuperarPass: (req, res) => {
        return res.render('usuarios/recuperarPass');
    },

    carrito: (req, res) => {
        return res.render('carrito');
    },
    modificarProducto: (req, res) => {
        let id = req.params.id;
        let stock = db.Stock.findAll();
        let prod = db.Producto.findByPk(id);
        let categorias = db.CategoriaProducto.findAll();
        let bolsaColores = db.ColorBolsa.findAll();
        let tamanios = db.TamanioBolsa.findAll();

        Promise.all([stock, prod, bolsaColores, tamanios, categorias])
            .then(function ([stock, prod, bolsaColores, tamanios, categorias]) {
                return res.render('productos/modificar', { 'producto': prod, 'stock': stock, 'bolsaColores': bolsaColores, 'tamanios': tamanios, 'categorias': categorias });
            })
    },
    abml: (req, res) => {

        db.Producto.findAll().then(function(result){

            return res.render('productos/abml', {'productos':result });
        });
    },

    info: (req, res) => {
        return res.render('info-pago');
    },
    edit: (req, res) => {
        //le enviamos a express validator el objeto req, para que controle si todos los campos son correctos
        let errores = validationResult(req);
        //si hay errores, renderizamos la vista registro enviandole el objeto mensajeError con los errores encontrados
        if (errores.isEmpty()) {

            let idProducto = req.params.id;
             // obtenemos los datos
             let img = req.file;
             let nombre = req.body.nombre;
             let descripcion = req.body.descripcion;
             let precio = req.body.precio;
             let idTamanio = req.body.tamanio;
             let idCategoria = req.body.categoria;
             if(img != undefined){
                let imagen = `img/${img.filename}`;
                
                db.Producto.update({
                    name: nombre,
                    description: descripcion,
                    price: precio,
                    image: imagen,
                    idSize: idTamanio,
                    idProductCategory: idCategoria
                },{
                where: {
                    id: idProducto
                }
                }).then(function(){
                    // damos de alta el stock utilizando el id del producto creado
                 let color = req.body.color;
 
                 for (let i = 0; i < color.length; i++) {
                     db.Stock.update({
                         stock: req.body.stock[color[i] - 1],
                         idBagColor: color[i],
                         idProduct: idProducto
                     },{
                        where: {
                            idProduct : idProducto
                        }
                     })
                    }
                    
                    let stock = db.Stock.findAll();                   
                    let categorias = db.CategoriaProducto.findAll();
                    let bolsaColores = db.ColorBolsa.findAll();
                    let tamanios = db.TamanioBolsa.findAll();
                    let prod=db.Producto.findByPk(idProducto);

                    Promise.all([stock, prod, bolsaColores, tamanios, categorias])
                        .then(function ([stock, prod, bolsaColores, tamanios, categorias]) {
                            return res.render('productos/detalle', { 'detalle': prod, 'stock': stock, 'bolsaColores': bolsaColores, 'tamanios': tamanios, 'categorias': categorias });
                        })
                })

             }else{
                
                db.Producto.update({
                    name: nombre,
                    description: descripcion,
                    price: precio,
                    idSize: idTamanio,
                    idProductCategory: idCategoria
                },{
                where: {
                    id: idProducto
                }
                }).then(function(){
                    // damos de alta el stock utilizando el id del producto creado
                 let color = req.body.color;
                 for (let i = 0; i < color.length; i++) {
                     db.Stock.update({
                         stock: req.body.stock[color[i] - 1],
                         idBagColor: color[i],
                         idProduct: idProducto
                     },{
                        where: {
                            idProduct : idProducto
                        }
                     })
                    }
                    
                    let stock = db.Stock.findAll();                   
                    let categorias = db.CategoriaProducto.findAll();
                    let bolsaColores = db.ColorBolsa.findAll();
                    let tamanios = db.TamanioBolsa.findAll();
                    let prod=db.Producto.findByPk(idProducto);

                    Promise.all([stock, prod, bolsaColores, tamanios, categorias])
                        .then(function ([stock, prod, bolsaColores, tamanios, categorias]) {
                            return res.render('productos/detalle', { 'detalle': prod, 'stock': stock, 'bolsaColores': bolsaColores, 'tamanios': tamanios, 'categorias': categorias });
                        })
                })

             }
        
                 
                    
             }else {
            //podemos enviar errores.array o errores.mapped dependiendo de si queremos utilizarlo en la vista como array o como objeto, en este caso enviamos un objeto
            //return res.render('productos/modificar', { mensajeDeError: errores.mapped() });
            return console.log('no anda')

        }
    }



}

module.exports = controller;