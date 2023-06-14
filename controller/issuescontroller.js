const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const { render } = require("ejs");
const { json } = require("body-parser");
const { login } = require("./usercontroller");
const Issues = db.issues;
const Collabs = db.collabs;
const Repository = db.repositorys;
const Users = db.users;
const Labels = db.labels;
const Lab = db.lab;
let renderissues = async (req, res) => {
  res.render("issues");
};
let issuecreate = async (req, res) => {
  var token = req.headers.cookie;
  if (token) {
    var id = req.query.id;
    console.log("iiiiiiiiiiiiiiiiiiiiiiiiii", id);
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
    const alllabel = await Lab.findAll({});
    console.log("allcolaabs list,............ ", allcollabs);
    console.log("alllabel list,............ ", alllabel);
    console.log("req.query.id.....................", req.query.id);
    res.render("createissue", { id, allcollabs, alllabel });
  } else {
    res.redirect("/login");
  }
};
let label = async (req, res) => {
  var token = req.headers.cookie;
 
  if (token) {
    var id = req.query.id;

    console.log("alllabel list,............ ", alllabel);

    res.render("createissue", { alllabel });
  } else {
    res.redirect("/login");
  }
};
let issue = async (req, res) => {
  try {
    var token = req.headers.cookie;
    if (token) {
      console.log("<<hello issues");
      const issues = await Issues.findAll();
      console.log("<<repos issues", issues);
      res.status(200).json({
        repos: issues,
      });
      console.log("issues<<<<<", { issues });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("error", err);
  }
};
let tabss = async (req, res) => {
  var token = req.headers.cookie;
  console.log("token in token........", token);
  if (token) {
   
    const repositoryId = req.params.id;
    console.log("<<req.params.id", req.params.id);
    const issues = await Issues.findAll({});
    //   res.render("issues");
    //   renderissues.json(issues);
    console.log("issues<", issues);
    res.status(200).json({
      repos: issues,
    });
  } else {
    res.redirect("/login");
  }
};
// let issues = async (req, res) => {
//   try {
//     var token = req.headers.cookie;
//     console.log("token in token........", token);
//     if (token) {
//       console.log(" insert issues<<<<<<<<<<<<", req.body);
//       var labels = req.body.labels.toString();
//       // var labels = labelss.split(",");
//       console.log("<<<<<<<<labels", labels);
//       const issues = await Issues.create({
//         title: req.body.title,
//         description: req.body.description,
//         assignto: req.body.assignto,
//         labels: JSON.stringify(req.body.labels),
//         repositoryId: req.body.create,
//       });
//       var id = req.body.create;
//       // res.redirect("/issueData");
//       // res.render("issues", { id });
//       res.redirect(`/issueData?id=${id}`);
//       console.log("issues created", { issues });
//     } else {
//       res.redirect("/login");
//     }
//   } catch (err) {
//     console.log("error while creating issue:", err);
//   }
// };
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
  var token = req.headers.cookie;
  console.log("token in token for button........", token);
  if (token) {
    var id = req.query.id;
    console.log("button id.....>>>>>...", req.query.id);
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
    const alllabel = await Lab.findAll({});
    // const issuesedit = await Labels.findAll({ where: { issueId: id } });
    const issuesedit = await Issues.findAll({ where: { id: id } });
    console.log("issuesedit>>>>>>>>>>>>>>>>>>>>>>", issuesedit[0].assignto);
    res.render("editissue", { id, issuesedit, allcollabs, alllabel });
  } else {
    res.redirect("/login");
  }
};
let issueData = async (req, res) => {
  var tokens = req.headers.cookie;

  if (tokens) {
    console.log("<<", req.header);
    const token = req.headers.cookie;
    console.log("token", token);
    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    console.log("user<<<<", user);
    console.log("user.id", user.id);
    const uid = user.id;

    const issues = await Repository.findAll({
      where: { userId: uid, id: req.query.id },
      include: [{ model: Issues, include: [Labels] }],
    });
    console.log("???????????issuesshow ", issues);
    console.log("???????????issues[0].issuessses ", issues[0].issuessses[1]);
    var data = issues[0].issuessses;
    var id = req.query.id;
    res.render("issues", { data, id });
  } else {
    res.redirect("/login");
  }
};
let check = async (req, res) => {
  const alllabel = await Issues.findAll({
    include: { model: Labels, as: "labissues" },
  });
  let response = {
    data: alllabel,
  };
  res.status(200).json(response);

};

let issues = async (req, res) => {
  console.log(" insert issues<<<<<<<<<<<<", req.body);
  console.log("...", req.body.labels);
  try {
    var token = req.headers.cookie;
    if (token) {
      let issues = await Issues.create({
        title: req.body.title,
        description: req.body.description,
        assignto: req.body.assignto,
        labels: req.body.labels,
        repositoryId: req.body.create,
      });

      if (issues && issues.dataValues.id) {
        const labels = req.body.labels;
        // for (i = 0; i < labels.length; i++) {
        await Labels.create({
          labels: labels,
          issueId: issues.dataValues.id,
        });
      }

      console.log("datainsert<<<<<<<<<<<<<", issues);
      var id = req.body.create;
      // res.redirect("/issueData");
      // res.render("issues", { id });
      res.redirect(`/issueData?id=${id}`);
      console.log("issues created", { issues });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log("error while creating issue:", err);
  }
};
let editissue = async (req, res) => {
  try {
    var token = req.headers.cookie;
    console.log("token in token........", token);
    if (token) {
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
    } else {
      res.redirect("/login");
    }
    // return res.status(500).json({ error: "server error" });
  } catch (err) {
    console.log("errro", err);
  }
};

// const editissue = async (req, res) => {
//   console.log("????????????????????", req.body);
//   const id = req.query.id;
//   var repositoryId = req.query.repositoryId;
//   try {
//     var token = req.headers.cookie;
//     console.log("token in token........", token);
//     if (token) {
//       console.log("edddddiittititittt");
//       const issue = await Issues.findByPk(id);
//       if (!issue) {
//         return res.status(404).json({ error: "issue not found" });
//       }
//       issue.title = req.body.title;
//       issue.description = req.body.description;
//       issue.assignto = req.body.assignto;
//       await issue.save();
//       console.log("issue.log", req.body.labels);

//       // const label = await Labels.findAll({ where: { issueId: id } });
//       // var labels = req.body.labels;
//       // for (const task of labels)
//       //   if (labels.includes(task.id)) {
//       //     task.labels = req.body.labels;
//       //     await task.save();
//       //   }

//       res.redirect(`/issueData?id=${repositoryId}`);
//       return { issue };
//     } else {
//       res.redirect("/login");
//     }
//     // return res.status(500).json({ error: "server error" });
//   } catch (err) {
//     console.log("errro", err);
//   }
// };

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
  check,
};
