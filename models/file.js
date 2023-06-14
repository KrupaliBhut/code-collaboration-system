'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      file.belongsTo(models.reposss, {
        foreignKey: "repositoryId",
      });
    }
  }
  file.init({
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    content: DataTypes.STRING,
    repositoryId: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'file',
  });
  return file;
};