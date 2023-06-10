const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const { name } = require("ejs");
const Collabs = db.collabs;
const Users = db.users;
let pagecollabs = async (req, res) => {
  res.render("collab");
};
let collab = async (req, res) => {
  console.log("<<<<<<<<<<<<colaab");
  const { name } = req.query;
  try {
    const users = await Users.findAll({
      where: {
        username: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    console.log("user<<<", users);
    if (!users) {
      res.send("not found");
    }
    res.status(200).json({
      repos: users,
    });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
module.exports = { pagecollabs, collab };
