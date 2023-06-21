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
const auth2 = require("./middleware/auth2");
const { repos } = require("./controller/repocontroller");
// app.get('/add', userctrl.addUser);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
var authe2 = bodyParser.urlencoded({ extended: false });
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use("/", authe2, createtable);
app.use("/", authe2, repo);
app.use("/", authe2, file);
app.use("/", authe2, branch);
app.use("/", authe2, issues);
app.use("/", authe2, collab);
// app.use((req,res,next)=> {
//   res.status(404).send('404-Not Found');
// });
app.all("*", authe2);
// app.get("*", (req, res, next) => {
//   const err = new Error("Can not find ${req.originalUrl} on the server");
//   err.status = "fail";
//   err.statusCode = 404;
//   next(err);
// });
// app.use(function (req, res, err, next) {
//   err.statusCode = err.statusCode || 500;
//   err.status = error.status || "error";
//   repos.status(err.statusCode).json({
//     status: err.statusCode,
//     message: err.message,
//   });
//   // res.status(490).json({ message: err.message });
// });
app.listen(3001, () => {
  console.log(`Server is Running on 3000`);
});
