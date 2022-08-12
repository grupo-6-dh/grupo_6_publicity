module.exports = (sequelize, DataTypes) => {
    let alias = "CateoriaProducto";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
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
        CategoriaProducto.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "idProductCategory"
        });
    }
    return CategoriaProducto;
} 