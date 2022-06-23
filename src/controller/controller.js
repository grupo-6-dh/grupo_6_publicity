const path = require('path');
var productos= require('../data/products.json');
const controller = {
    index: (req, res) => {
        return res.render('index');
    },
    
    listar: (req, res) => {
       return res.render('products',{productos});
    },

    registro: (req, res) => {
        return res.render('registro');
    },

    detalleProducto: (req, res) => {
        return res.render('detalle-producto');
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