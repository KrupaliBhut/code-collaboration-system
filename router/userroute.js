const express = require("express");
const authenticateUser = require("../middleware/authtoken");
const router = express.Router();
const {
  registration,
  login,
  log,
  reg,
} = require("../controller/usercontroller");
const UserController = require("../controller/usercontroller");

router.route("/registration").get(reg);
router.route("/registration").post(registration);
// router.get("/registration", UserController.registration);
router.route("/repos").post(login);
router.route("/login").get(log);
// router.post("/login", UserController.login);
// router.route("/profile", authenticateUser, profile);
// router.route("/repos").get(repos);
module.exports = router;
