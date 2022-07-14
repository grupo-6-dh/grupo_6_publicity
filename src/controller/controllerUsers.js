const path = require('path');
let usuarios= require('../data/users.json');
const fs = require("fs");

const controllerUsers = {
    listar: (req, res) => {
        return res.render('usuarios',{usuarios});
    },

    login: (req, res) => {
        return res.render('login');
    },

    loginProcess: (req,res) => {
         
        let encontrado=usuarios.find(unUsuario=> unUsuario.email==req.body.email);
        // para cuando tengamos hash en las pass
        //let verificarPass=bcryptjs.compareSync(req.body.pass,encontrado.contrasenia);
        
        if(encontrado){
            if(encontrado.contrasenia==req.body.pass){
                return res.redirect('/');

            }
            res.render('login',{
                errors:{
                    pass: {
                        msg: '*Contraseña incorrecta'
                    }
                }
            });
        }
        res.render('login',{
            errors:{
                email: {
                    msg: '*Email incorrecto'
                }
            }
        });
    },

    registro: (req, res) => {
        return res.render('registro');
    },

    eliminar:(req,res) => {
        let id=req.params.id;
        let nuevaListaUsuarios=usuarios.filter((item)=>item.id != id);
        fs.writeFileSync(path.join(__dirname, "../data/users.json"), JSON.stringify(nuevaListaUsuarios, null, 4),
        {encoding: "utf-8",});
        res.render('usuarios', {'usuarios':nuevaListaUsuarios});
    }

}

module.exports = controllerUsers;
