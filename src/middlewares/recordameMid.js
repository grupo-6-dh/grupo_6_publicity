const path = require('path');
const db = require('../database/models');
const { brotliDecompress } = require('zlib');

function recordameMiddleware(req,res,next){
    

    if (req.cookies.recordame != undefined &&
        req.session.usuarioLogueado == undefined){
        db.Usuario.findOne({
            where: {
                email: req.cookies.recordame,
            }
        }).then((encontrado) =>{
            if(encontrado) {
                req.session.usuarioLogueado = encontrado;
                if (encontrado.idUserCategory == 2) {
                    req.session.admin = true;
                }
            } 
        })
        
    }

    next();
}

module.exports = recordameMiddleware;