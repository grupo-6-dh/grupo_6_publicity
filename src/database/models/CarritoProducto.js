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

    CarritoProducto.associate = function (models){
        CarritoProducto.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "idProduct"
        });
        CarritoProducto.belongsTo(models.Carrito, {
            as: "carrito",
            foreignKey: "idCart"
        });
    }
    
    return CarritoProducto;
} 