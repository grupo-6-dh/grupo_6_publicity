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

    ColorBolsa.associate = function (models){
        ColorBolsa.hasMany(models.Stock, {
            as: "stock",
            foreignKey: "idBagColor"
        });
    }
    return ColorBolsa;
} 