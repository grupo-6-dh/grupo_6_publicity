const path = require('path');

const controller = {
    registro: (req, res) => {
        res.sendFile(path.join(__dirname, '../view/registro.html'));
    },

    detalleProducto: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../view/detalle-producto.html'));
    },

    index: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../view/index.html'));
    },

    products: (req, res) => {
        res.sendFile(path.resolve(__dirname, '../view/products.html'));
    },

    login: (req, res) => {
        res.sendFile(path.join(__dirname, '../view/login.html'));
    },

    recuperarPass: (req, res) => {
        res.sendFile(path.join(__dirname, '../view/recuperarPass.html'));
    },

    carrito: (req, res) => {
        res.sendFile(path.join(__dirname, '../view/carrito.html'))
    },
}

module.exports = controller;