module.exports = (sequelize, DataTypes) => {
    let alias = "CarritoStatus";
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey : true, 
            autoIncrement: true,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName : "status_carts",
        timestamps : false
    }
    const CarritoStatus = sequelize.define(alias, cols, config);

    CarritoStatus.associate = function (models){
        CarritoStatus.hasMany(models.Carrito, {
            as: "carrito",
            foreignKey: "idStatus"
        });

    }
    return CarritoStatus;
} 