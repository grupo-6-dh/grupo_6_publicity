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
        }
    };
    let config = {
        tableName : "Products",
        timestamps : false
    }
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = function (models){
        Producto.belongsTo(models.TamanioBolsa, {
            as: "tamanio",
            foreignKey: "idSize"
        });

        Producto.belongsTo(models.CategoriaProducto, {
            as: "categoria",
            foreignKey: "idProductCategory"
        });

        Producto.hasMany(models.Stock, {
            as: "stock",
            foreignKey: "idProduct"
        });

        Producto.hasMany(models.CarritoProducto, {
            as: "carrito",
            foreignKey: "idCart"
        });

    }

    return Producto;
}

