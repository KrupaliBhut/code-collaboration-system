"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class issuesss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // issuesss.belongsTo(models.reposss, { foreignKey: "repositoryId" });
    }
  }
  issuesss.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      assignto: DataTypes.STRING,
      labels: DataTypes.STRING,
      repositoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "issuesss",
    }
  );
  return issuesss;
};
