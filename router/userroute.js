const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  log,
  reg,
  logout,
} = require("../controller/usercontroller");
const validateUser = require("../controller/uservalidator");
const UserController = require("../controller/usercontroller");
router.route("/registration").get(reg);
router.route("/registration").post(registration);
router.route("/repos").post(login);
router.route("/login").get(log);
router.route("/logout").get(logout);

module.exports = router;
