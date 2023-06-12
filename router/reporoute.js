const express = require("express");
const app = express();
const userData = require("../controller/repocontroller");
const router = express.Router();
const {
  repos,
  repolist,
  repocreate,
  repodelete,
  tabs,
  repoissu,
  dashboard,
} = require("../controller/repocontroller");
const validateUser = require("../middleware/authtoken");
// router.get("/repos", validateUser, userData.repos);
router.route("/repos").get(repos);
router.route("/repocreate").get(repocreate);
router.route("/repolist").post(repolist);
router.route("/repodelete/:id").delete(repodelete);
router.route("/tabs/:id").get(tabs);

router.route("/dashboard").get(dashboard);
router.route("/repoissu/:id").get(repoissu);
module.exports = router;
