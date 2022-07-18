let usuarios = require('../data/users.json');

function recordameMiddleware(req,res,next){
    

    if (req.cookie != undefined &&
        req.session.usuarioLogueado == undefined){
        let encontrado = usuarios.find(unUsuario => unUsuario.email == req.cookies.recordame);
        if (encontrado) {
            req.session.usuarioLogueado = encontrado;                  
        } 
    }

    
    next();
    
}

module.exports = recordameMiddleware;