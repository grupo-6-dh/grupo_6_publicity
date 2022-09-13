const path = require('path');
let usuarios= require('../data/users.json');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const db = require('../database/models');
const { brotliDecompress } = require('zlib');

const controllerUsers = {
    listar: (req, res) => {
        db.Usuario.findAll().then(function (result) {
            return res.render('usuarios/usuarios', { 'usuarios': result });
        });
    },

    
    login: (req, res) => {
        return res.render('usuarios/login');
    },

    loginProcess: (req,res) => {
        db.Usuario.findOne({
            where: {
                email: req.body.email,
            }
        }).then((encontrado) => {
            if (encontrado) {
                if (verificarPass = bcrypt.compareSync(req.body.pass, encontrado.password)) {
                    req.session.usuarioLogueado = encontrado;
                    if(encontrado.idUserCategory == 2){
                        req.session.admin = true;
                    }
                    if (req.body.recordame != undefined) {
                        res.cookie('recordame', encontrado.email, { maxAge: 60000000 })
                    }
                    res.redirect('/')
                } else { //error de contraseña no coincide
                    res.render('usuarios/login', { errors: { pass: { msg: '*Contraseña incorrecta' } }, datosViejos: req.body });
                }
            } else { //error de usuario no encontrado
                res.render('usuarios/login', { errors: { email: { msg: '*Email incorrecto' } }, datosViejos: req.body });
            }
        });
    },
    logout: (req, res) => {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    res.status(400).send('Unable to log out')
                } else {
                    if(req.cookies.recordame){
                        res.clearCookie("recordame");
                    }
                    res.redirect('/')
                }
            });
        } else {
            res.end()
        }
    },

    registro: (req, res) => {
        return res.render('usuarios/registro');
    },

    eliminar:(req,res) => {
        let id = req.params.id;
        db.Usuario.destroy({
            where: {
                id: id,
            }
        }).then(function(){
            db.Usuario.findAll().then(function (result) {
                return res.render('usuarios/usuarios', { 'usuarios': result });
            });
        })
        
    },
    
    crearUsuario: (req, res) => {
        // obtenemos los datos
        let nombre = req.body.nombre;
        let email = req.body.email;
        // guardamos la contraseña hasheada
        let contrasenia = bcrypt.hashSync(req.body.contrasenia, 10)

        let usuario = db.Usuario.create({
            name: nombre,
            email: email,
            password: contrasenia,
            idUserCategory: 1,
        }).then(function (usuario){
            return res.render('')
        })
    },

    makeAdmin: (req, res) => {
        // obtenemos los datos
        let id = req.params.id
        db.Usuario.update({
            idUserCategory: 2,
        },{
            where: {
                id: id,
            }
        }).then(function(){
            db.Usuario.findAll().then(function (result) {
                return res.render('usuarios/usuarios', { 'usuarios': result });
            });
        });
    },

    makeNormalUser: (req, res) => {
        // obtenemos los datos
        let id = req.params.id
        db.Usuario.update({
            idUserCategory: 1,
        }, {
            where: {
                id: id,
            }
        }).then(function () {
            db.Usuario.findAll().then(function (result) {
                return res.render('usuarios/usuarios', { 'usuarios': result });
            });
        });
    },

    apiList: (req, res) => {
        db.Usuario.findAll().then(function (usuarios) {
            let usersData = []
            usuarios.forEach((usuario) => {
                let userData = {
                    id: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    detail: 'localhost:3000/api/users/' + usuario.id,
                }
                usersData.push(userData);
            })
            return res.json({
                count: usuarios.length,
                users: usersData,
                status: 200,
            });
        });
    },

    apiGetOne: (req, res) => {
        db.Usuario.findOne({
            where: {
                id: req.params.id,
            }
        }).then(function (usuario) {
            let usersData = []
            usuarios.forEach((usuario) => {
                let userData = {
                    id: usuario.id,
                    name: usuario.name,
                    email: usuario.email,
                    detail: 'localhost:3000/api/users/' + usuario.id,
                }
                usersData.push(userData);
            })
            return res.json({
                id: usuario.id,
                name: usuario.name,
                email: usuario.email,
                detail: 'localhost:3000/api/users/' + usuario.id,
                profilePictureUrl: 'localhost:3000/public/img/1661985692039-img.PNG',
                //profilePictureUrl: usuario.profilePicture,
                status: 200,
            });
        });
    },

}

module.exports = controllerUsers;
