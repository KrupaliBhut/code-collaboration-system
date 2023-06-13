'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lab.init({
    labels: DataTypes.STRING,
    repositoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lab',
  });
  return lab;
};