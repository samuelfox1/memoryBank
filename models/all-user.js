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
  all_user.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    all_user.hasOne(models.user_data, {
      // onDelete: "cascade",
    });
  };
  return all_user;
};
