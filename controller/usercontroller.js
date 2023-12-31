const { Sequelize, sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nextTick } = require("process");
const Users = db.users;
const key = "krupali";
let reg = async (req, res) => {
  var error = " ";

  res.render("register", { error });
};
let registration = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    let finduser = await Users.findOne({ where: { email } });

    if (finduser) {
      const error = "email is already exists";
      res.render("register", { error });
      return;
    } else if (password != confirmpassword) {
      const error = "plz match password and confirm password";
      res.render("register", { error });
      return;
    } else {
      const hash = await bcrypt.hash(password, 10);
      let data = await Users.create({
        username: username,
        email: email,
        password: hash,
        confirmpassword: confirmpassword,
      });
      res.redirect("/login");
    }
  } catch (err) {
    console.log("error", err);
  }
};
// let login = async (req, res) => {
//   try {
//     console.log("<<<signin<<<<<");
//     let reasponce = "token get";
//     // console.log("req<<<", req);
//     const result = await Users.findOne({
//       where: { username: req.body.username },
//     });
//     console.log("<<<<<<<<result", result);
//     var match = bcrypt.compareSync(req.body.password, result.password);
//     // const result = await Users.findOne( {where :{email: req.body.email }} );

//     // var match = bcrypt.compare(req.body.password, result.password);
//     console.log("match", match);
//     if (!match) {
//       console.log("<<<<<<<<<<<<<<<<<<<");
//       let params = {
//         username: result.username,
//       };
//       console.log("params", params);
//       var token = jwt.sign(params, SecreteKey, { expiresIn: "300s" });
//       console.log("token", token);
//     }
//     res.status(200).json({ message: "token", token: reasponce });
//   } catch (err) {
//     console.log("error", err);
//   }
// };
let login = async (req, res, next) => {
  try {
    const { usernameemail, password } = req.body;
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ username: usernameemail }, { email: usernameemail }],
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invaid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = "password is invalid";
      res.render("login", { error });
      return;
      // return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id }, "krupali");
    console.log("token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", token);
    res.cookie("token", token, {});

    // res.json({ token });
    const tokens = req.headers.cookie;
    const decoded = tokens ? jwt.verify(token, "krupali") : null;
    const path = req.originalUrl;
    console.log("req.originalUrl.....................................", path);
    if (path == "/login" && token == null) {
      res.redirect("/repos");
    }

    console.log("Request...");

    console.log("decoded", decoded);

    res.render("dashboard", { token });
  } catch (error) {
    console.log("error", error);
    // res.render("login", { error });
  }
};

let log = async (req, res, next) => {
  const token = req.headers.cookie;
  console.log("tokens>>>>>>>>>>>", token);

  if (token) {
    const decoded = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    console.log("data<<<<<<<<<", decoded);
  }
  // const decoded = jwt.verify(token, key);
  // const data = jwt.verify(token, "krupali");
  const path = req.originalUrl;
  console.log(
    "req.originalUrlinlog.....................................",
    path
  );
  if (path == "/login" && token) {
    res.redirect("/dashboard");
  }
  console.log("Request...");
  next();
  var error = " ";
  res.render("login", { error });
};

// res.render("login", { error });

let logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

module.exports = {
  registration,
  login,
  reg,
  log,
  logout,
};
