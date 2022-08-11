module.exports = (sequelize, DataTypes) => {
    let alias = "TamanioBolsa";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
            allowNull: false,
        },
        size:{
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName : "bag_sizes",
        timestamps : false
    }
    const TamanioBolsa = sequelize.define(alias, cols, config);
    return TamanioBolsa;
} 