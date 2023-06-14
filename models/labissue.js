'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class labissue extends Model {
    static associate(models) {

      labissue.belongsTo(models.issuesss, {
        foreignKey: "issueId",
      });
    }
  }
  labissue.init({
    labels: DataTypes.STRING,
    issueId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'labissue',
  });
  return labissue;
};