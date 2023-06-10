const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const Issues = db.issues;
const Repository = db.repositorys;
let renderissues = async (req, res) => {
  res.render("issues");
};
let issuecreate = async (req, res) => {
  res.render("createissue");
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
    const issues = await Issues.create({
      title: req.body.title,
      description: req.body.description,
      assignto: req.body.assignto,
      labels: req.body.labels,
    });
    console.log("issues created", { issues});
  } catch (err) {
    console.log("error while creating issue:", err);
  }
};
let issuedelete = async (req, res) => {
  try {
    console.log("<<<<<<<<<<<issue delete call");
    const deleteissu = await Issues.destroy({
      where: { id: req.params.id },
    });
    return deleteissu;
  } catch (err) {
    throw err;
  }
};
let button = async (req, res) => {
  res.render("editissue");
};

let editissue = async (req, res) => {
  const id = req.params.id;
  const { title, description, assignto, labels } = req.body;
  try {
    const issue = await Issues.findByPk(id);
    if (!issue) {
      return res.status(404).json({ error: "issue not found" });
    }
    issue.title = title;
    issue.description = description;
    issue.assignto = assignto;
    issue.labels = labels;
    await issue.save();
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
  console.log("proid<<<<<<<<<<<<", user.productId);
  const uid = user.id;

  const issues = await Repository.findAll({
    where: { userId: uid, id: req.query.id },
    include: {
      model: Issues,
    },
  });
  console.log("issuessss<", issues[0].issuessses[0].id);
  var data = issues[0].issuessses;

  res.render("issues", { data });
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
};
