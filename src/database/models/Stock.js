module.exports = (sequelize, DataTypes) => {
    let alias = "Stock";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
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
    return Stock;
} 