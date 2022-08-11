module.exports = (sequelize, DataTypes) => {
    let alias = "CarritoProducto";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
            allowNull: false,
        },
        amount:{
            type: DataTypes.INTEGER
        },
        idProduct:{
            type: DataTypes.INTEGER
        },
        idCart:{
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName : "product_carts",
        timestamps : false
    }
    const CarritoProducto = sequelize.define(alias, cols, config);
    return CarritoProducto;
} 