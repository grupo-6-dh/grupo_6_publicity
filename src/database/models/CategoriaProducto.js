module.exports = (sequelize, DataTypes) => {
    let alias = "CategoriaProducto";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true, 
            allowNull: false,
        },
        productCategory:{
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName : "product_categorys",
        timestamps : false
    }
    const CategoriaProducto = sequelize.define(alias, cols, config);

    CategoriaProducto.associate = function (models){
        CategoriaProducto.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "idProductCategory"
        });
    }
    return CategoriaProducto;
} 