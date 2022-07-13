const path = require('path');
let usuarios= require('../data/users.json');
const fs = require("fs");

const controllerUsers = {
    registro: (req, res) => {
        return res.render('registro');
    },
    crearUsuario: (req, res) => {
        let nuevoUsuario = {
             id: usuarios[(usuarios.length - 1)].id + 1,
             nombre : req.body.nombre,
             email : req.body.email,
             contrasenia : req.body.contrasenia
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
    }
}

module.exports = controllerUsers;