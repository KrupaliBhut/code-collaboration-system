const express = require("express");
const app = express();
const auth = require("../middleware/auth");
const auth2 = require("../middleware/auth2");
const authenticateUser = require("../middleware/authtoken");
const checkTokenValidity = require("../middleware/token");
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

// router.route("/repocreate", authenticateUser).get(repocreate);
router.route("/repolist", authenticateUser).post(repolist);
// router.route("/repodelete/:id").delete(repodelete);
router.route("/repodelete", authenticateUser).get(repodelete);
router.route("/pagecollabss", authenticateUser).get(pagecollabs);
router.route("/extra").get(extra);
// router.route("/tabs/:id").get(tabs);
router.route("/tabs2/:id").get(tabs2);
router.route("/searchrepo").get(searchrepo);
// router.route("/dashboard", checkTokenValidity).get(dashboard);
router.route("/repoissu/:id").get(repoissu);
router.get("/repocreate", authenticateUser, repocreate);
router.get("/dashboard", authenticateUser, dashboard);
router.post("/repolist", authenticateUser, repolist);
router.get("/tabs/:id", authenticateUser, tabs);

module.exports = router;
