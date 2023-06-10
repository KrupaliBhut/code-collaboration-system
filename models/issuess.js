'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issuess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  issuess.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    assignto: DataTypes.STRING,
    labels: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'issuess',
  });
  return issuess;
};