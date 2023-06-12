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
// router.get("/registration", reg);
// router.post("/registration", validateUser, registration);
router.route("/registration").get(reg);
router.route("/registration").post(registration);
router.route("/repos").post(login);
router.route("/login").get(log);
router.route("/logout").get(logout);
// router.post("/login", UserController.login);
// router.route("/profile", authenticateUser, profile);
// router.route("/repos").get(repos);
module.exports = router;
