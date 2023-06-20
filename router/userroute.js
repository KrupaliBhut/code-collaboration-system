const express = require("express");
const router = express.Router();
const auth2 = require("../middleware/auth2");

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
router.route("/repos", auth2).post(login);
// router.route("/login").get(log);
router.route("/login", auth2).get(log);
router.route("/logout").get(logout);
module.exports = router;
