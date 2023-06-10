const express = require("express");
const app = express();
const userData = require("../controller/repocontroller");
const router = express.Router();
const {
  repos,
  repolist,
  repocreate,
  repodelete,
  tabs,repoissu
} = require("../controller/repocontroller");
const validateUser = require("../middleware/authtoken");
// router.get("/repos", validateUser, userData.repos);
router.route("/repos", validateUser).get(repos);
router.route("/repocreate").get(repocreate);
router.route("/repolist").post(repolist);
router.route("/repodelete/:id").delete(repodelete);
router.route("/tabs/:id").get(tabs);

router.route("/repoissu/:id").get(repoissu);
module.exports = router;
