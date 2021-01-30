const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
  var user_data = sequelize.define("user_data", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 140],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    sign: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    // following: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     len: [1, 140],
    //   },
    // },
  });
  // User.associate = function (models) {
  //   // add associations here
  //   User.hasMany(models.Review);
  // };

  user_data.beforeCreate(function (user_data) {
    user_data.password = bcrypt.hashSync(
      user_data.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  // return Test;
  return user_data;
};
