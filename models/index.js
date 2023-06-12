"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("../models/users")(sequelize, DataTypes);
db.repositorys = require("../models/reposss")(sequelize, DataTypes);
db.files = require("../models/file")(sequelize, DataTypes);
db.branches = require("../models/branch")(sequelize, DataTypes);
db.issues = require("../models/issuesss")(sequelize, DataTypes);
db.collabs = require("../models/collas")(sequelize, DataTypes);
db.labels = require("../models/label")(sequelize, DataTypes);
// db.users.hashOne(db.repositorys, { foreignKey: "userId" });
db.repositorys.belongsTo(db.users);

db.repositorys.hasMany(db.issues, { foreignKey: "repositoryId" });
db.issues.belongsTo(db.repositorys, { foreignKey: "repositoryId" });
// db.repositorys.hasMany(db.issues, { foreignKey: "id" });
// db.issues.belongsTo(db.repository, { foreignKey: "repositoryId" });
db.repositorys.hasMany(db.files, { foreignKey: "repositoryId" });
db.files.belongsTo(db.repositorys, { foreignKey: "repositoryId" });

db.files.hasMany(db.repositorys, { foreignKey: "repositoryId" });
db.repositorys.belongsTo(db.files, { foreignKey: "repositoryId" });

db.users.hasMany(db.collabs, { foreignKey: "userId" });
db.collabs.belongsTo(db.users, { foreignKey: "repositoryId" });
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("table created ");
  })
  .catch((error) => {
    console.log("unable to creating table");
  });

module.exports = db;
