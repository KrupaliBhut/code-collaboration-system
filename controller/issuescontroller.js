const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const { render } = require("ejs");
const Issues = db.issues;
const Collabs = db.collabs;
const Repository = db.repositorys;
const Users = db.users;
const Labels = db.labels;
let renderissues = async (req, res) => {
  res.render("issues");
};
let issuecreate = async (req, res) => {
  var id = req.query.id;
  const allcollabs = await Users.findAll({
    attributes: ["username", "email"],
    include: [
      {
        model: Collabs,
        where: {
          repositoryId: id,
        },
        required: true,
        raw: true,
      },
    ],
  });
  const alllabel = await Labels.findAll({});
  console.log("allcolaabs list,............ ", allcollabs);
  console.log("alllabel list,............ ", alllabel);
  console.log("req.query.id.....................", req.query.id);
  res.render("createissue", { id, allcollabs, alllabel });
};
let label = async (req, res) => {
  var id = req.query.id;

  console.log("alllabel list,............ ", alllabel);

  res.render("createissue", { alllabel });
};
let issue = async (req, res) => {
  try {
    console.log("<<hello issues");
    const issues = await Issues.findAll();
    console.log("<<repos issues", issues);
    res.status(200).json({
      repos: issues,
    });
    console.log("issues<<<<<", { issues });
  } catch (err) {
    console.log("error", err);
  }
};
let tabss = async (req, res) => {
  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  const repositoryId = req.params.id;
  console.log("<<req.params.id", req.params.id);
  const issues = await Issues.findAll({});
  //   res.render("issues");
  //   renderissues.json(issues);
  console.log("issues<", issues);
  res.status(200).json({
    repos: issues,
  });
};
let issues = async (req, res) => {
  try {
    console.log(" insert issues<<<<<<<<<<<<", req.body);
    console.log(" insert issues req.query<<<<<<<<<<<<", req.query);
    var labels = req.body.labels;
    for (var i = 0; i < labels.length; i++) {
      const issues = await Issues.create({
        title: req.body.title,
        description: req.body.description,
        assignto: req.body.assignto,
        labels: labels[i],
        repositoryId: req.body.create,
      });
    }
    var id = req.body.create;
    // res.redirect("/issueData");
    // res.render("issues", { id });
    res.redirect(`/issueData?id=${id}`);
    console.log("issues created", { issues });
  } catch (err) {
    console.log("error while creating issue:", err);
  }
};
let issuedelete = async (req, res) => {
  try {
    console.log("<<<<<<<<<<<issue delete call");
    const deleteissu = await Issues.destroy({
      where: { id: req.query.id },
    });
    var id = req.query.repositoryId;
    res.redirect(`/issueData?id=${id}`);
    return deleteissu;
  } catch (err) {
    throw err;
  }
};
let button = async (req, res) => {
  var id = req.query.id;
  var repositoryId = req.query.repositoryId;
  console.log("id>>>>>>>>>>>>>>>>>>>>>>", id);
  const allcollabs = await Users.findAll({
    attributes: ["username", "email"],
    include: [
      {
        model: Collabs,
        where: {
          repositoryId: repositoryId,
        },
        required: true,
        raw: true,
      },
    ],
  });
  const alllabel = await Labels.findAll({});
  const issuesedit = await Issues.findAll({ where: { id: id } });
  console.log("issuesedit>>>>>>>>>>>>>>>>>>>>>>", issuesedit[0].assignto);
  res.render("editissue", { id, issuesedit, allcollabs, alllabel });
};

let editissue = async (req, res) => {
  try {
    const id = req.query.id;
    var repositoryId = req.query.repositoryId;
    console.log("edddddiittititittt");
    const issue = await Issues.findByPk(id);
    if (!issue) {
      return res.status(404).json({ error: "issue not found" });
    }
    issue.title = req.body.title;
    issue.description = req.body.description;
    issue.assignto = req.body.assignto;
    issue.labels = req.body.labels;
    await issue.save();
    res.redirect(`/issueData?id=${repositoryId}`);
    return { issue };
    // return res.status(500).json({ error: "server error" });
  } catch (err) {
    console.log("errro", err);
  }
};

let issueData = async (req, res) => {
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
      model: Issues,
    },
  });
  console.log("issuessss<", issues[0].issuessses[0].id);
  var data = issues[0].issuessses;
  var id = req.query.id;
  res.render("issues", { data, id });
};
module.exports = {
  renderissues,
  issue,
  issues,
  issuecreate,
  issuedelete,
  issueData,
  editissue,
  button,
  tabss,
  label,
};
