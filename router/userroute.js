const express = require("express");
const router = express.Router();
const { registration, login } = require("../controller/usercontroller");

router.route("/registration").get(registration);
router.route("/login").post(login);

module.exports = router;
