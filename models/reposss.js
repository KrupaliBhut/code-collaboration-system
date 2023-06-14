"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reposss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // reposss.hasOne(models.issuesss, { foreignKey: "repositoryId" });
      reposss.belongsTo(models.users, {
        foreignKey: "userId",
      });
      reposss.hasMany(models.issuesss, {
        foreignKey: "id",
      });
    }
  }
  reposss.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      isPublic: DataTypes.STRING,
      privateValue: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "reposss",
    }
  );
  return reposss;
};
