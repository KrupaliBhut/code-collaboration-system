const express = require("express");
const router = express.Router();
const {
  pagecollabs,
  collab,
  createcollabs,
  deletecollabs,
  pagecollabs2,
} = require("../controller/collabcontroller");
const authenticateUser = require("../middleware/authtoken");

// router.route("/createcollabs").get(createcollabs);
// router.route("/pagecollabs").get(pagecollabs);
// router.route("/pagecollabs2").get(pagecollabs2);
// router.route("/collab").get(collab);
// router.route("/deletecollabs").get(deletecollabs);
router.route("/deletecollabs").delete(deletecollabs);
router.get("/createcollabs", authenticateUser, createcollabs);
router.get("/pagecollabs", authenticateUser, pagecollabs);
router.get("/collab", authenticateUser, collab);
router.get("/pagecollabs2", authenticateUser, pagecollabs2);
module.exports = router;
