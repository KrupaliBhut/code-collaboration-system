const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const Branch = db.branches;

let createbranch = async (req, res) => {
  res.render("createbranch");
};
let getbranch = async (req, res) => {
  try {
    console.log("<<hello repos");
    const branch = await Branch.findAll();
    console.log("<<repos branch", branch);
    res.status(200).json({
      repos: branch,
    });
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = { createbranch, getbranch };
