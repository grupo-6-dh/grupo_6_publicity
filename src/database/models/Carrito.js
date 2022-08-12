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

    Carrito.associate = function (models){
        Carrito.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "idUser"
        });

        Carrito.belongsTo(models.CarritoStatus, {
            as: "status",
            foreignKey: "idStatus"
        });

        Carrito.hasMany(models.CarritoProducto, {
            as: "producto",
            foreignKey: "idCart"
        });

    }

    return Carrito;
} 