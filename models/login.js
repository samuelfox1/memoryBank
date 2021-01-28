module.exports = function (sequelize, DataTypes) {
  var login = sequelize.define("login", {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,

  });
  return login;
};
