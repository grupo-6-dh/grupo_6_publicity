module.exports = (sequelize, DataTypes) => {
    let alias = "Usuario";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        idUserCategory:{
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName : "Users",
        timestamps : false
    }
    const Usuario = sequelize.define(alias, cols, config);
    return Usuario; 
}