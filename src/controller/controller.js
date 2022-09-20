
const { fstat } = require('fs');
const path = require('path');
let productos = require('../data/products.json');
const fs = require("fs");

//Multer
const multer = require('multer')
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
        let coloresNoAsignados = [];

        Promise.all([stock, prod, bolsaColores, tamanios, categorias])
            .then(function ([stock, prod, bolsaColores, tamanios, categorias]) {
                 //buscamos los colores de bolsa que no fueron asignados al producto y se lo pasamos a la vista
                for(let j=0;j < bolsaColores.length; j++){
                    coloresNoAsignados.push(bolsaColores[j]);
                    for(let i=0;i < stock.length; i++){ 
                        if(stock[i].idProduct==prod.id) {  
                            if(stock[i].idBagColor == bolsaColores[j].id) { 
                                coloresNoAsignados.pop();
                            }  
                        }
                    }
                }

                return res.render('productos/modificar', { 'producto': prod, 'stock': stock, 'bolsaColores': bolsaColores, 'tamanios': tamanios, 'categorias': categorias, 'coloresNoAsignados': coloresNoAsignados });
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
  
    edit:(req,res) => {
        
        // obtenemos los datos
        let idProducto = req.params.id;
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
                
                let stock = db.Stock.findAll();                   
                let categorias = db.CategoriaProducto.findAll();
                let bolsaColores = db.ColorBolsa.findAll();
                let tamanios = db.TamanioBolsa.findAll();
                let prod=db.Producto.findByPk(idProducto);

                Promise.all([stock, prod, bolsaColores, tamanios, categorias])
                    .then(function ([stock, prod, bolsaColores, tamanios, categorias]) {
                        
                        //verifica si el check de agregar nuevos colores se selecciono para poder agregar nuevos
                        if(req.body.agregar==1){
                            //agrega nuevo color
                            let colorNoAsignado = req.body.colorNoAsignado;
                            for (let i = 0; i < stock.length; i++) {
                                
                                if(stock[i].idProduct==idProducto) {
                                                            
                                    if(stock[i].idBagColor!=colorNoAsignado){
                                        
                                        db.Stock.create({
                                            stock: req.body.stockNuevo,
                                            idBagColor: colorNoAsignado,
                                            idProduct: idProducto
                                        });
                                        break;
                                    }
                                }
                            }
                        }

                        //modificar los stocks
                        let idStock=req.body.idStock;
                        let cantidadStock=req.body.stock;
                        for (let i = 0; i < stock.length; i++) {
                                
                            for(let j = 0; j< idStock.length; j++){
                                
                                if(stock[i].id==idStock[j]){
                    
                                    db.Stock.create({
                                        stock: cantidadStock[j],
                                        idBagColor: stock[i].idBagColor,
                                        idProduct: idProducto
                                    });

                                    db.Stock.destroy({
                                        where:{
                                            id: idStock[j]
                                        }
                                    })

                                }
                            } 

                        }
                        

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
 
                let stock = db.Stock.findAll();                   
                let categorias = db.CategoriaProducto.findAll();
                let bolsaColores = db.ColorBolsa.findAll();
                let tamanios = db.TamanioBolsa.findAll();
                let prod=db.Producto.findByPk(idProducto);

                Promise.all([stock, prod, bolsaColores, tamanios, categorias])
                    .then(function ([stock, prod, bolsaColores, tamanios, categorias]) {
                        
                        if(req.body.agregar==1){
                            //agrega nuevo color
                            let colorNoAsignado = req.body.colorNoAsignado;
                            for (let i = 0; i < stock.length; i++) {
                                
                                if(stock[i].idProduct==idProducto) {
                                                            
                                    if(stock[i].idBagColor!=colorNoAsignado){
                                        
                                        db.Stock.create({
                                            stock: req.body.stockNuevo,
                                            idBagColor: colorNoAsignado,
                                            idProduct: idProducto
                                        });
                                        break;
                                    }
                                }
                            }
                        }

                        //modificar los stocks
                        let idStock=req.body.idStock;
                        let cantidadStock=req.body.stock;
                         for (let i = 0; i < stock.length; i++) {
                                
                            for(let j = 0; j< idStock.length; j++){
                                
                                if(stock[i].id==idStock[j]){
                    
                                    db.Stock.create({
                                        stock: cantidadStock[j],
                                        idBagColor: stock[i].idBagColor,
                                        idProduct: idProducto
                                    });

                                    db.Stock.destroy({
                                        where:{
                                            id: idStock[j]
                                        }
                                    })
                                }
                            } 

                        }

                        return res.render('productos/detalle', { 'detalle': prod, 'stock': stock, 'bolsaColores': bolsaColores, 'tamanios': tamanios, 'categorias': categorias });
                    })
            })
        }   
    },

    apiList: (req, res) => {
        let productos = db.Producto.findAll();
        let categorias = db.CategoriaProducto.findAll();
        let sizes = db.TamanioBolsa.findAll();

        Promise.all([productos, categorias, sizes]).then(function ([productos, categorias, sizes]) {
            let categoriesData = [];
            

            categorias.forEach((categoria) => {
                let productCount = 0;
                productos.forEach((producto) => {
                    if(producto.idProductCategory == categoria.id){
                        productCount++;
                    }
                })
                let categoryData = {
                    id: categoria.id,
                    productCategory: categoria.productCategory,
                    productCount: productCount,
                }

                categoriesData.push(categoryData);
            })
            
            let productsData = []
            
            productos.forEach((product) => {
                let category = '';
                let size = ''; 
                categorias.forEach((categoria) =>{
                    if(categoria.id == product.idProductCategory){
                        category = categoria.productCategory;
                    }
                })
                sizes.forEach((tamanio) => {
                    if (tamanio.id == product.idSize) {
                        size = tamanio.size;
                    }
                })
                let productData = {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: category,
                    bag_size: size,
                    detail: 'localhost:3001/api/products/' + product.id,
                }
                productsData.push(productData);
            })

            return res.json({
                count: productos.length,
                countByCategory: categoriesData,
                products: productsData,
                status: 200,
            });
        });
    },

    apiGetOne: (req, res) =>{
        let product = db.Producto.findByPk(req.params.id).then((product) => {
            let category = db.CategoriaProducto.findByPk(product.idProductCategory);
            let size = db.TamanioBolsa.findByPk(product.idSize);
            let stock = db.Stock.findAll({
                where: {
                    idProduct: product.id,
                }
            })
            let colors = db.ColorBolsa.findAll();

            Promise.all([category, size, stock, colors]).then(([category, size, stock, colors]) => {
                let stock_by_color = [];
                stock.forEach((colorStock) => {
                    colors.forEach((color) => {
                        if(color.id == colorStock.idBagColor){
                            let aux = {
                                bagColor: color.color,
                                stock: colorStock.stock,
                            }
                            stock_by_color.push(aux)
                        }
                    })
                })
                return res.json({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    bag_size: size.size,
                    category: category.productCategory,
                    stock_by_color: stock_by_color,
                    image: 'localhost:3000/public/' + product.image,
                    status: 200,
                })
            })
            ;
        })
    },
    apiGetLastProduct: (req,res)=>{
        productos=db.Producto.findAll().then(function (prod) {
            let indice=prod.length-1;
            let ultimo=prod[indice];

            return res.json({
                id: ultimo.id,
                name: ultimo.name,
                description: ultimo.description,
                price: ultimo.price,
                bag_size: ultimo.size,
                category: ultimo.productCategory,
                image: 'localhost:3001/public/' + ultimo.image,
                status: 200,
            })
        })
       
       
        
    }    

    
}

module.exports = controller;