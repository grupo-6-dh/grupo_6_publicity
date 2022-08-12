module.exports = (sequelize, DataTypes) => {
    let alias = "ColorTinta";
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
        tableName : "ink_colors",
        timestamps : false
    }
    const ColorTinta = sequelize.define(alias, cols, config);

ColorTinta.associate = function (models){
    ColorTinta.belongsToMany(models.Producto, {
    as: "productos",
    through: "product_ink",
    foreignKey: "idInkColor",
    otherKey: "idProduct", 
    timestamps : false
    });
}

    return ColorTinta;
} 