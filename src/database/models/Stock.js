module.exports = (sequelize, DataTypes) => {
    let alias = "Stock";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey : true, 
            allowNull: false,
        },
        stock:{
            type: DataTypes.INTEGER
        }, 
        idBagColor:{
            type: DataTypes.INTEGER
        }, 
        idProduct:{
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName : "Stock",
        timestamps : false
    }
    const Stock = sequelize.define(alias, cols, config);

    Stock.associate = function (models){
        Stock.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "idProduct"
        });

        Stock.belongsTo(models.ColorBolsa, {
            as: "bolsaColores",
            foreignKey: "idBagColor"
        });
    }
    return Stock;
} 