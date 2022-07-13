const path = require('path');
let usuarios= require('../data/users.json');

const controllerUsers = {
    listar: (req, res) => {
        return res.render('usuarios',{usuarios});
    },

    registro: (req, res) => {
        return res.render('registro');
    },

}

module.exports = controllerUsers;
