const express = require("express");
const router = express.Router();
const { pagecollabs, collab } = require("../controller/collabcontroller");

router.route("/pagecollabs").get(pagecollabs);
router.route("/collab").get(collab);
module.exports = router;
