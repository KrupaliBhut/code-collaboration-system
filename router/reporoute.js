const express = require("express");
const app = express();
const { auth } = require("../middleware/auth");
const router = express.Router();
const {
  repos,
  repolist,
  repocreate,
  repodelete,
  tabs,
  repoissu,
  dashboard,
  searchrepo,
} = require("../controller/repocontroller");
const validateUser = require("../middleware/authtoken");

router.route("/repos").get(repos);
router.route("/repocreate").get(repocreate);
router.route("/repolist").post(repolist);
// router.route("/repodelete/:id").delete(repodelete);
router.route("/repodelete").get(repodelete);
router.route("/tabs/:id").get(tabs);
router.route("/searchrepo").get(searchrepo);
router.route("/dashboard").get(dashboard);
router.route("/repoissu/:id").get(repoissu);

module.exports = router;
