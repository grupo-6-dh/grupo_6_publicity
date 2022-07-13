const path = require('path');
let usuarios= require('../data/users.json');
const fs = require("fs");
//solicitamos la funcion body de express validator
const { validationResult } = require ('express-validator');

const controllerUsers = {
    registro: (req, res) => {
        return res.render('registro');
    },
    crearUsuario: (req, res) => {
        //le enviamos a express validator el objeto req, para que controle si todos los campos son correctos
        let errores = validationResult(req);
        //si hay errores, renderizamos la vista registro enviandole el objeto mensajeError con los errores encontrados
        if(errores.isEmpty()){
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
        }else{
            //podemos enviar errores.array o errores.mapped dependiendo de si queremos utilizarlo en la vista como array o como objeto, en este caso enviamos un objeto
            return res.render('registro', { mensajeDeError: errores.mapped(), datosViejos: req.body});
        }
       
    }
}

module.exports = controllerUsers;