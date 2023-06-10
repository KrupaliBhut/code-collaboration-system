const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
// const con = require('./database/dbconnect.js');
// const userController=require('./controller/userController.js');
const createtable = require("./router/userroute");
const repo = require("./router/reporoute");
const file = require("./router/coderoute");
const branch = require("./router/branchroute");
const issues = require("./router/issuesroute");
const collab = require("./router/collabroute");
// app.get('/add', userctrl.addUser);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use("/", createtable);
app.use("/", repo);

app.use("/", file);
app.use("/", branch);
app.use("/", issues);
app.use("/", collab);
app.listen(3000, () => {
  console.log(`Server is Running on 3000`);
});
