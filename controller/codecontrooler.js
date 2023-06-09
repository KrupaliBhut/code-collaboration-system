const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const File = db.files;
const multer = require("multer");

let files = async (req, res) => {
  res.render("code");
};
let upload = async (req, res) => {
  res.render("fileupload");
};

let createfile = async (req, res) => {
  console.log("<<<<<<<<createfile");
  const { filename, path, content } = req.body;
  try {
    const file = await File.create({
      filename: filename,
      path: path,
      content: content,
    });
    res.render("fileupload");
  } catch (err) {
    console.log("error while uploading file", err);
    res.status(500).send("error while uploading file");
  }
};

module.exports = { files, upload, createfile };
