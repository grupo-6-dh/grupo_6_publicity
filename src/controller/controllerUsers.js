const path = require('path');
let usuarios= require('../data/users.json');
const fs = require("fs");
//solicitamos la funcion body de express validator
const { validationResult } = require ('express-validator');

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
