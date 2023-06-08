const { Sequelize } = require("../models");
const { Op } = require("sequelize");
var db = require("../models/index");
const bcrypt = require("bcrypt");
const { jwt } = require("jsonwebtoken");
const Users = db.users;
const SecreteKey = "krupali";
let registration = async (req, res) => {
  try {
    // const { username, email, password, confirmpassword } = req.body;
    // let finduser = await Users.findOne({ where: { email } });
    // if (finduser) {
    //   console.log("email is already exist");
    // } else {
    const hash = await bcrypt.hash(password, 10);
    let data = await Users.create({
      username: username,
      email: email,
      password: hash,
      confirmpassword: confirmpassword,
    });
    res.render("register");
  } catch (err) {
    console.log("error", err);
  }
};
let login = async (req, res) => {
  try {
    console.log("<<<signin<<<<<");
    let reasponce = "token get";
    // console.log("req<<<", req);
    const result = await Users.findOne({
      where: { username: req.body.username },
    });
    console.log("<<<<<<<<", result);
    var match = bcrypt.compareSync(req.body.password, result.password);
    // const result = await Users.findOne( {where :{email: req.body.email }} );

    // var match = bcrypt.compare(req.body.password, result.password);
    console.log("match", match);
    if (!match) {
      console.log("<<<<<<<<<<<<<<<<<<<");
      let params = {
        username: result.username,
      };
      console.log("params", params);
      var token = jwt.sign(params, SecreteKey, { expiresIn: "300s" });
      console.log("token", token);
    }
    res.status(200).json({ message: "token", token: reasponce });
   
  } catch (err) {
    console.log("error", err);
  }
};
module.exports = {
  registration,
  login,
};
