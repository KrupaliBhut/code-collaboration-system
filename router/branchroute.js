const express = require("express");
const router = express.Router();
const { createbranch, getbranch } = require("../controller/branchcontroller");

router.route("/createbranch").get(createbranch);

router.route("/getbranch").get(getbranch);
module.exports = router;
