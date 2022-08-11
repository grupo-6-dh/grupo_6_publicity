module.exports = (sequelize, DataTypes) => {
    let alias = "CategoriaUsuario";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
            allowNull: false,
        },
        userCategory:{
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName : "user_categorys",
        timestamps : false
    }
    const CategoriaUsuario = sequelize.define(alias, cols, config);
    return CategoriaUsuario;
} 