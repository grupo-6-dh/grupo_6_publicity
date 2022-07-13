const path = require('path');
let usuarios= require('../data/users.json');
const fs = require("fs");

const controllerUsers = {
    listar: (req, res) => {
        return res.render('usuarios',{usuarios});
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

}

module.exports = controllerUsers;
