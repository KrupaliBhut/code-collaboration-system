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
} = require("../controller/issuescontroller");

router.route("/renderissues").get(renderissues);
router.route("/issue").get(issue);
router.route("/createissues").post(issues);
router.route("/issuecreate").get(issuecreate);
router.route("/issuedelete/:id").delete(issuedelete);
router.route("/issues/:id").put(editissue);
router.route("/button").get(button);

router.route("/issueData").get(issueData);
router.route("/tabss/:id").get(tabss);
module.exports = router;
