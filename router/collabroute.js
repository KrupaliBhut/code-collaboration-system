const express = require("express");
const router = express.Router();
const {
  pagecollabs,
  collab,
  createcollabs,
  deletecollabs,
} = require("../controller/collabcontroller");

router.route("/createcollabs").get(createcollabs);
router.route("/pagecollabs").get(pagecollabs);
router.route("/collab").get(collab);
router.route("/deletecollabs").get(deletecollabs);
module.exports = router;
