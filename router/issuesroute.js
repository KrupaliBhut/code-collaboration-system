const express = require("express");
const router = express.Router();
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
  check,issueData2
} = require("../controller/issuescontroller");

router.route("/renderissues").get(renderissues);
router.route("/issue").get(issue);
router.route("/createissues").post(issues);
router.route("/issuecreate").get(issuecreate);
router.route("/issuedelete").get(issuedelete);
router.route("/issues").post(editissue);
router.route("/button").get(button);

router.route("/check").get(check);
router.route("/issueData").get(issueData);
router.route("/issueData2").get(issueData2);
router.route("/tabss/:id").get(tabss);
module.exports = router;
