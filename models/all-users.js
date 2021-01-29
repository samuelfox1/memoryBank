module.exports = function (sequelize, DataTypes) {
  var all_user = sequelize.define("all_user", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
  });
  return all_user;
};
