module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define("user", {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,

    });
    return user;
};