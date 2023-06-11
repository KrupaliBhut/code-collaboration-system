const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const File = db.files;
const multer = require("multer");
const Repository = db.repositorys;
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
let codedata = async (req, res) => {
  console.log("Codedata<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  const token = req.headers.cookie;
  console.log("token", token);
  console.log("token", token);
  const user = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf-8")
  );
  console.log("user.id", user.id);
  const uid = user.id;

  const issues = await Repository.findAll({
    where: { userId: uid, id: req.query.id },
    include: {
      model: File,
    },
  });
  console.log("issue<>>>>>>>>>>>>>>>>>>>>>>>>>>>>", issues);
  console.log("filessss<", issues[0].files[0].id);
  var datacode = issues[0].files;

  res.render("code", { datacode });
};
module.exports = { files, upload, createfile, filelist, filedelete, codedata };
