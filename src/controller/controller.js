const path = require('path');
var productos= require('../data/products.json');
const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    
    listar: (req, res) => {
       return res.render('products',{productos});
    },

    
    detalleProducto: (req, res) => {
        let id=req.params.id;
        let detalle=productos.find((item)=>item.id==id);
        return res.render('detalle-producto',{detalle});
    },
    
    categoria: (req, res) => {
        let cat=req.params.categoria;
        let contienen=[];
        let bool=false;
        for(let i=0;i<productos.length;i++){
            if(productos[i].nombre.includes(cat)){
                contienen.push(productos[i]);
                bool=true;
            }
        }
        if(bool==true){
            return res.render('products',{'productos':contienen});
        }else{
            return res.render('products',{productos});
        }
    },
    
    registro: (req, res) => {
        return res.render('registro');
    },
    
    login: (req, res) => {
        return res.render('login');
    },

    recuperarPass: (req, res) => {
        return res.render('recuperarPass');
    },

    carrito: (req, res) => {
        return res.render('carrito');
    },
    modificarProducto: (req,res) => {
        return res.render('modificar-producto');
    },
   abml: (req,res) => {
        return res.render('abml-productos',{productos});
   },
    alta:(req,res) => {
        return res.render('alta-producto');
    },
    info:(req,res) => {
        return res.render('info-pago');
    }
}

module.exports = controller;