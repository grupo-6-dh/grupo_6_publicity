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
    return ColorTinta;
} 