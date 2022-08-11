module.exports = (sequelize, DataTypes) => {
    let alias = "Carrito";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
            allowNull: false,
        },
        delivery:{
            type: DataTypes.STRING
        },
        deliveryAdress:{
            type: DataTypes.STRING
        },
        paymentMethod:{
            type: DataTypes.STRING
        },
        total:{
            type: DataTypes.FLOAT
        },
        idUser:{
            type: DataTypes.INTEGER
        },
        idStatus:{
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName : "Carts",
        timestamps : false
    }
    const Carrito = sequelize.define(alias, cols, config);
    return Carrito;
} 