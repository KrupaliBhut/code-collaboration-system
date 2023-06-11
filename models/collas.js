'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  collas.init({
    userId: DataTypes.INTEGER,
    repositoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'collas',
  });
  return collas;
};