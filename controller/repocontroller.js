const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ok } = require("assert");
const Repository = db.repositorys;
const Issues = db.issues;
const Users = db.users;

let repos = async (req, res, next) => {
  try {
    var tokens = req.headers.cookie;

    if (tokens) {
      const token = req.headers.cookie;
      console.log("token", token);
      console.log("token", token);
      const user = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString("utf-8")
      );

      console.log("user.id", user.id);
      const uid = user.id;
      console.log("<<hello repos");
      const repositories = await Repository.findAll({
        where: { userId: uid },
      });
      // const repositoriespublic = await Repository.findAll({
      //   where: { isPublic: "true" },
      // });
      // const repositoriesprivate = await Repository.findAll({
      //   where: { privateValue: "true" },
      // });
      // console.log("repositoriespublic<......", repositoriespublic);
      // console.log("repositoriesprivate<......", repositoriesprivate);
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

let repocreate = async (req, res, next) => {
  // const newToken = req.query.token;
  // const previousToken = req.headers.cookie;
  // console.log("previousToken.........................<<...?<<", previousToken);
  // req.headers.cookie = newToken;
  // console.log("new token", newToken);
  // const token = req;
  // console.log("token", token);
  // const token = req.headers.cookie;
  // console.log("token", token);
  // const decoded = jwt.sign(token, "krupali");
  // req.user = decoded;
  // const user = await Users.findOne(decoded.id);
  // const newtoken = token;
  // console.log("newtoken", newtoken);
  // if (token !== newtoken) {
  //   const errormsg = "Invalid token";
  //   return res.render("index", { errormsg });
  // }
  // console.log("decoded", decoded);
  const token = req.headers.cookie;
  if (token) {
    res.render("createrepo");
  } else {
    res.redirect("/login");
  }
};

let dashboard = async (req, res) => {
  const token = req.headers.cookie;

  console.log("token in token.dash.......", token);
  if (token) {
    res.render("dashboard");
  } else {
    res.redirect("/login");
  }
};

let repolist = async (req, res, next) => {
  console.log("<<<<<<<<<<<<<<<<<<<createrepo call");
  // const { name, description, isPublic, privateValue } = req.body;
  const token = req.headers.cookie;
  console.log("token", token);
  const user = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf-8")
  );
  console.log("user.id", user.id);
  const uid = user.id;

  try {
    await Repository.create({
      name: req.body.name,
      description: req.body.description,
      isPublic: req.body.isPublic,
      privateValue: req.body.privateValue,
      userId: uid,
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log("error while creating repo", err);
    // res.status(500).send("error while creating repo");
  }
};
let repodelete = async (req, res) => {
  try {
    const token = req.headers.cookie;
    console.log("token", token);
    console.log("token", token);
    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    console.log("user.id", user.id);
    const uid = user.id;
    console.log("<<<<<<<<<<<repodelete call");
    const deleterepo = await Repository.destroy({
      where: { id: req.query.id },
    });
    var id = req.query.uid;
    // res.redirect(`/dashboard?id=${id}`);
    res.redirect("/dashboard");
  } catch (err) {
    throw err;
  }
};

let tabs = async (req, res, next) => {
  console.log("tab<<<<<<<<<<<");
  const id = req.params.id;
  var token = req.headers.cookie;
  if (token !== token) {
    const errormsg = "Invalid token";
    return res.render("index", { errormsg });
  }
  try {
    var token = req.headers.cookie;
    console.log("token in token........", token);
    if (token) {
      const repository = await Repository.findOne({ where: { id } });
      if (repository) {
        console.log("hello lkhj");
        res.render("threetabs", { repository });
      } else {
        // res.status(404).send("Repository not found");
      }
      console.log("repository<<<", repository);
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("retriving error", err);
    // res.status(500).send("error retriewing");
  }
};
let repoissu = async (req, res, next) => {
  var token = req.headers.cookie;
  if (token !== token) {
    const errormsg = "Invalid token";
    return res.render("index", { errormsg });
  }
  const id = req.params.id;
  const repository = await Issues.findOne({
    where: { id: id },
    include: {
      model: Repository,
    },
  });
  res.json(Repository);
};
let searchrepo = async (req, res) => {
  console.log("<<<<<<<<<<<<search all repos");
  try {
    var token = req.headers.cookie;
    console.log("token in token........", token);
    if (token) {
      const { name } = req.query;
      console.log("search repo", req.query.name);
      const users = await Repository.findAll({
        where: {
          isPublic: "true",
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      console.log("user<<<", users);
      res.status(200).json({
        repos: users,
      });
    } else {
      res.redirect("/login");
    }
    // res.json(users);
  } catch (err) {
    console.log(
      "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    );
    console.log(err.message);
    // res.status(500).json({ error: "server error" });
  }
};
let pagecollabs = async (req, res) => {
  var token = req.headers.cookie;
  console.log("token in token........", token);
  if (token) {
    var id = req.query.repositoryId;
    console.log("id..<<", req.query.repositoryId);
    // const coid = await Collabs.findAll({
    //   where: { repositoryId: id },
    // });
    const coid = await Repository.findAll({
      where: { id: id },
    });
    console.log("searchrepos???????????????????", coid);
    // res.status(200).json({
    //   repos: coid,
    // });
    res.render("extra", { coid, id });
  } else {
    res.redirect("/login");
  }
};
let extra = async (req, res) => {
  res.render("extra");
};
let tabs2 = async (req, res) => {
  console.log("tabs2<<<<<<<<<<<");
  const id = req.params.id;
  console.log("tab<<<<<<<<<<<id", req.params.id);
  try {
    var token = req.headers.cookie;
    console.log("token in token........", token);
    if (token) {
      const repository = await Repository.findOne({ where: { id: id } });
      if (repository) {
        console.log("hello lkhj");
        res.render("three2", { repository });
      } else {
        // res.status(404).send("Repository not found");
      }
      console.log("repository<<<", repository);
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("retriving error", err);
    // res.status(500).send("error retriewing");
  }
};
module.exports = {
  repos,
  repolist,
  repocreate,
  repodelete,
  tabs,
  repoissu,
  dashboard,
  searchrepo,
  pagecollabs,
  extra,
  tabs2,
};
