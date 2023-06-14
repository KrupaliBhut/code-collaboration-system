"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
   
    static associate(models) {
      // define association here
      // users.hashOne(models.reposss, {
      //   foreignKey: "userId",
      // });
      users.hasMany(models.collas, {
        foreignKey: "userId",
      });
    }
  }
  users.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      confirmpassword: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
