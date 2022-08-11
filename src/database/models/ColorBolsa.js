module.exports = (sequelize, DataTypes) => {
    let alias = "ColorBolsa";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
            allowNull: false,
        },
        color:{
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName : "bag_colors",
        timestamps : false
    }
    const ColorBolsa = sequelize.define(alias, cols, config);
    return ColorBolsa;
} 