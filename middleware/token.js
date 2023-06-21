const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.set("view engine", "ejs");

const checkTokenValidity = (req, res, next) => {
  console.log("heyaaa");
  const token = req.cookies.token;
  console.log(" req.cookies.token", req.cookies.token);
  
  if (!token) {
    return res.status(404).render("index");
  }
  next();
};
module.exports = checkTokenValidity;
