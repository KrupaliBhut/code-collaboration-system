const express = require("express");
const router = express.Router();
const {
  pagecollabs,
  collab,
  createcollabs,
  deletecollabs,
  pagecollabs2,
} = require("../controller/collabcontroller");

router.route("/createcollabs").get(createcollabs);
router.route("/pagecollabs").get(pagecollabs);
router.route("/pagecollabs2").get(pagecollabs2);
router.route("/collab").get(collab);
// router.route("/deletecollabs").get(deletecollabs);
router.route("/deletecollabs").delete(deletecollabs);
module.exports = router;
