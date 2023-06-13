const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const File = db.files;
const multer = require("multer");
const Repository = db.repositorys;
let files = async (req, res) => {
  var token = req.headers.cookie;
  console.log("token in token........", token);
  if (token) {
    res.render("code");
  } else {
    res.redirect("/login");
  }
};
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // const mimeExtension = {
    //   "text/html": ".html",
    //   " text/xml": ".xml",
    //   "text/csv": ".csv",
    // };
    // cb(null, file.filename + "-" + mimeExtension(file.mimetype));
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploadfile = multer({
  storage: storage,
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
    var token = req.headers.cookie;
    console.log("token in token........", token);
    if (token) {
      console.log("<<hello repos");
      const repositories = await File.findAll();
      console.log("<<repos repositories", repositories);
      res.status(200).json({
        repos: repositories,
      });
    } else {
      res.redirect("/login");
    }
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
    var token = req.headers.cookie;
    console.log("token in token........", token);
    if (token) {
      console.log("...................................createfile");
      const { filename, path, content } = req.body;
      console.log("req.body file<<<<<<<<<<<<<<<<<<<<<<<", req.file.path);
      const file = await File.create({
        filename: filename,
        path: req.file.path,
        content: content,
        repositoryId: req.body.create,
      });
      console.log("{{{{{{{{{{{{{{{{{{{{{{", file);
      var id = req.body.create;
      res.redirect(`/codedata?id=${id}`);
    } else {
      res.redirect("/login");
    }
    // res.render("fileupload");
  } catch (err) {
    console.log("error while uploading file", err);
    res.status(500).send("error while uploading file");
  }
};
let codedata = async (req, res) => {
  var tokens = req.headers.cookie;
  if (tokens) {
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
  } else {
    res.redirect("/login");
  }
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
