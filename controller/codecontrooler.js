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
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const mimeExtension = {
      "text/html": ".html",
      " text/xml": ".xml",
      "text/csv": ".csv",
    };
    cb(null, file.filename + "-" + mimeExtension(file.mimetype));
  },
});
const uploadfile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "text/html" ||
      file.mimetype === "text/xml" ||
      file.mimetype === "text/csv"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      req.fileError = "file formate is not valid";
    }
  },
});
let upload = async (req, res) => {
  res.render("fileupload");
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
let filecreate = async (req, res) => {
  var id = req.query.id;
  console.log("idfile,,,,,,,,,,,,,,,,,,", id);
  console.log("req.query.id.....................", req.query.id);
  res.render("fileupload", { id });
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
let createfile = async (req, res) => {
  try {
    console.log("...................................createfile");
    const { filename, path, content } = req.body;
    const file = await File.create({
      filename: filename,
      path: path,
      content: content,
      repositoryId: req.body.create,
    });
    console.log("{{{{{{{{{{{{{{{{{{{{{{", file);
    var id = req.body.create;
    res.redirect(`/codedata?id=${id}`);
    // res.render("fileupload");
  } catch (err) {
    console.log("error while uploading file", err);
    res.status(500).send("error while uploading file");
  }
};
let codedata = async (req, res) => {
  console.log("<<", req.header);
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
  // console.log("filessss<", issues[0].files[0].id);
  var datacode = issues[0].files;
  var id = req.query.id;
  res.render("code", { datacode, id });
};
module.exports = {
  files,
  upload,
  createfile,
  filelist,
  filedelete,
  codedata,
  uploadfile,
  filecreate,
};
