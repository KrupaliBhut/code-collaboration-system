const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authtoken");
const {
  renderissues,
  issue,
  issues,
  issuecreate,
  issuedelete,
  editissue,
  button,
  tabss,
  issueData,
  check,
  issueData2,
} = require("../controller/issuescontroller");

// router.route("/renderissues").get(renderissues);
// router.route("/issue").get(issue);
// router.route("/createissues").post(issues);
// router.route("/issuecreate").get(issuecreate);
router.route("/issuedelete").get(issuedelete);
// router.route("/issues").post(editissue);
// router.route("/button").get(button);
router.route("/check").get(check);
// router.route("/issueData").get(issueData);
// router.route("/issueData2").get(issueData2);
// router.route("/tabss/:id").get(tabss);

router.get("/issueData", authenticateUser, issueData);
router.get("/renderissues", authenticateUser, renderissues);
router.get("/tabss/:id", authenticateUser, tabss).get(tabss);
router.get("/button", authenticateUser, button);
router.get("/issuecreate", authenticateUser, issuecreate);
router.get("/issueData2", authenticateUser, issueData2);
router.get("/issue", authenticateUser, issue);
router.post("/issues", authenticateUser, editissue).post(editissue);
router.post("/createissues", authenticateUser, issues);
module.exports = router;
