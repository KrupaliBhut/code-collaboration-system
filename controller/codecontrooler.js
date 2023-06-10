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
// let filelist = async (req, res) => {
//   try {
//     console.log("<<hello filelist");
//     const listfile = await File.findAll();
//     console.log("<<repos listfile", listfile);
//     res.status(200).json({
//       repos: listfile,
//     });
//   } catch (err) {
//     console.log("error", err);
//   }
// };
let filelist = async (req, res) => {
  try {
    console.log("<<hello repos");
    const repositories = await File.findAll();
    console.log("<<repos repositories", repositories);
    res.status(200).json({
      repos: repositories,
    });
  } catch (err) {
    console.log("error", err);
  }
};

let filedelete = async (req, res) => {
  try {
    console.log("<<<<<<<<<<<file delete call");
    const deletefile = await File.destroy({
      where: { id: req.params.id },
    });
    return deletefile;
  } catch (err) {
    throw err;
  }
};
module.exports = { files, upload, createfile, filelist, filedelete };
