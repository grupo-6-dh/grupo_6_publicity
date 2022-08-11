const { DataTypes } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    let alias = "Producto";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.FLOAT
        },
        image:{
            type: DataTypes.STRING
        },
        idSize:{
            type: DataTypes.INTEGER
        },
        idProductCategory:{
            type: DataTypes.INTEGER
        },
        idInkColor:{
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName : "Products",
        timestamps : false
    }
    const Producto = sequelize.define(alias, cols, config);
    return Producto;
}

/*
module.exports = (sequelize, DataTypes) => {
    let alias = "Producto";
    let cols = {

    };
    let config = {
        tableName : "Products",
        timestamps : false
    }
    const Producto = sequelize.define(alias, cols, config);
    return Producto;
} */