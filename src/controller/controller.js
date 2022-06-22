const path = require('path');

const controller = {
    registro: (req, res) => {
        return res.render('registro');
    },

    detalleProducto: (req, res) => {
        return res.render('detalle-producto');
    },

    index: (req, res) => {
        return res.render('index');
    },

    products: (req, res) => {
       return res.render('products');
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
        return res.render('abml-productos');
   },
    alta:(req,res) => {
        return res.render('alta-producto');
    },
    info:(req,res) => {
        return res.render('info-pago');
    }
}

module.exports = controller;