module.exports = function (sequelize, DataTypes) {
  var daily_history = sequelize.define("daily_history", {
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    compatibility: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    date_range: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lucky_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    lucky_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140],
      },
    },
    memory_image: {
      type: DataTypes.STRING,
      allowNull: true,
      default: "",
    },

    journal_entry: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    public_status: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  });

  daily_history.associate = function (models) {
    // add associations here
    daily_history.belongsTo(models.user_data);
    // Review.belongsToMany(models.Platform,{through:"ReviewPlatform"})
  };
  // return Test;
  return daily_history;
};
