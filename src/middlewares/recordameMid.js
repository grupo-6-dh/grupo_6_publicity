const path = require('path');
let usuarios = require('../data/users.json');

function recordameMiddleware(req,res,next){
    

    if (req.cookies.recordame != undefined &&
        req.session.usuarioLogueado == undefined){
        let encontrado = usuarios.find(unUsuario => unUsuario.email == req.cookies.recordame);
        if (encontrado) {
            req.session.usuarioLogueado = encontrado;                  
        } 
    }

    next();
}

module.exports = recordameMiddleware;