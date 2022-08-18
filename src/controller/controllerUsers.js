const path = require('path');
let usuarios= require('../data/users.json');
const fs = require("fs");
const bcrypt = require("bcryptjs");


const controllerUsers = {
    listar: (req, res) => {
        return res.render('usuarios/usuarios',{usuarios});
    },

    login: (req, res) => {
        return res.render('usuarios/login');
    },

    loginProcess: (req,res) => {
        let encontrado=usuarios.find(unUsuario=> unUsuario.email==req.body.email);
        
        if (encontrado) {
            if (verificarPass = bcrypt.compareSync(req.body.pass, encontrado.contrasenia)) {
                req.session.usuarioLogueado = encontrado;
                if(req.body.recordame != undefined){
                    res.cookie('recordame', encontrado.email, {maxAge : 60000000 })
                }
                res.redirect('/')
            }else{ //error de contraseña no coincide
                res.render('usuarios/login', { errors: { pass: { msg: '*Contraseña incorrecta' } }, datosViejos: req.body });
            }
        }else{ //error de usuario no encontrado
            res.render('usuarios/login', { errors: { email: { msg: '*Email incorrecto' } }, datosViejos: req.body });
        }
            

        //Deprecado por uso de session
        /*if(encontrado){
            if(encontrado.contrasenia==req.body.pass){
                return res.redirect('/');

            }
            res.render('usuarios/login',{
                errors:{
                    pass: {
                        msg: '*Contraseña incorrecta'
                    }
                }
            });
        } */ 
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
        let id=req.params.id;
        let nuevaListaUsuarios=usuarios.filter((item)=>item.id != id);
        fs.writeFileSync(path.join(__dirname, "../data/users.json"), JSON.stringify(nuevaListaUsuarios, null, 4),
        {encoding: "utf-8",});
        res.render('usuarios/usuarios', {'usuarios':nuevaListaUsuarios});
    },
    
    crearUsuario: (req, res) => {
        let nuevoUsuario = {
            id: usuarios[(usuarios.length - 1)].id + 1,
            nombre : req.body.nombre,
            email : req.body.email,
            //guardamos la contraseña hasheada
            contrasenia: bcrypt.hashSync(req.body.contrasenia, 10)
        }        
        usuarios.push(nuevoUsuario);
        fs.writeFileSync(
            path.join(__dirname,"../data/users.json"),
            JSON.stringify(usuarios,null,4),
            {
                encoding: 'utf-8',
            }
        );
        return res.render(''); 
    },

}

module.exports = controllerUsers;
