const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ok } = require("assert");
const Repository = db.repositorys;
const Issues = db.issues;
// let repos = async (req, res) => {
//   try {
//     const repositories = await Repository.findAll();

//     repo.forEach((repository) => {
//       console.log("<<<name", repository.name);
//       res.render("repolist", { repositories });
//     });
//   } catch (err) {
//     console.log("error", err);
//   }
// };
let repos = async (req, res) => {
  try {
    var token = req.headers.cookie;
    console.log("token in token........", token);
    if (token) {
      console.log("<<hello repos");
      const repositories = await Repository.findAll();
      console.log("<<repos repositories", repositories);
      res.status(200).json({
        repos: repositories,
      });
    } else {
      res.redirect("/login");
    }
    // res.render("dashboard");
  } catch (err) {
    console.log("error", err);
  }
};
let repocreate = async (req, res) => {
  res.render("createrepo");
};
let dashboard = async (req, res) => {
  var token = req.headers.cookie;
  console.log("token in token........", token);
  if (token) {
    res.render("dashboard");
  } else {
    res.redirect("/login");
  }
};
let repolist = async (req, res) => {
  console.log("<<<<<<<<<<<<<<<<<<<createrepo call");
  // const { name, description, isPublic, privateValue } = req.body;
  const token = req.headers.cookie;
  console.log("token", token);
  console.log("token", token);
  const user = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf-8")
  );
  console.log("user.id", user.id);
  const uid = user.id;

  try {
    var tokens = req.headers.cookie;

    if (tokens) {
      await Repository.create({
        name: req.body.name,
        description: req.body.description,
        isPublic: req.body.isPublic,
        privateValue: req.body.privateValue,
        userId: uid,
      });
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("error while creating repo", err);
    res.status(500).send("error while creating repo");
  }
};
let repodelete = async (req, res) => {
  try {
    console.log("<<<<<<<<<<<repodelete call");
    const deleterepo = await Repository.destroy({
      where: { id: req.params.id },
    });

    res.redirect("/dashboard");
  } catch (err) {
    throw err;
  }
};

let tabs = async (req, res) => {
  console.log("tab<<<<<<<<<<<");
  const id = req.params.id;

  try {
    var token = req.headers.cookie;
    console.log("token in token........", token);
    if (token) {
      const repository = await Repository.findOne({ where: { id } });
      if (repository) {
        console.log("hello lkhj");
        res.render("threetabs", { repository });
      } else {
        res.status(404).send("Repository not found");
      }
      console.log("repository<<<", repository);
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("retriving error", err);
    res.status(500).send("error retriewing");
  }
};
let repoissu = async (req, res) => {
  const id = req.params.id;
  const repository = await Issues.findOne({
    where: { id: id },
    include: {
      model: Repository,
    },
  });
  res.json(Repository);
};
module.exports = {
  repos,
  repolist,
  repocreate,
  repodelete,
  tabs,
  repoissu,
  dashboard,
};
