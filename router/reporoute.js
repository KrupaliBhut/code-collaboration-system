const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const auth2 = require("../middleware/auth2");

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
  pagecollabs,
  extra,
  tabs2,
} = require("../controller/repocontroller");
const validateUser = require("../middleware/authtoken");

router.route("/repos").get(repos);
// router.get("/repo", auth2.repos);
// routers.get('/login',authController.userLogin);
router.route("/repocreate").get(repocreate);
router.route("/repolist").post(repolist);
// router.route("/repodelete/:id").delete(repodelete);
router.route("/repodelete").get(repodelete);
router.route("/pagecollabss").get(pagecollabs);
router.route("/extra").get(extra);
router.route("/tabs/:id").get(tabs);
router.route("/tabs2/:id").get(tabs2);
router.route("/searchrepo").get(searchrepo);
router.route("/dashboard", auth2).get(dashboard);
router.route("/repoissu/:id").get(repoissu);

module.exports = router;
