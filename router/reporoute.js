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
} = require("../controller/repocontroller");
const validateUser = require("../middleware/authtoken");

router.route("/repos").get(repos);
router.route("/repocreate").get(repocreate);
router.route("/repolist").post(repolist);
router.route("/repodelete/:id").delete(repodelete);
router.route("/tabs/:id").get(tabs);

router.route("/dashboard").get(dashboard);
router.route("/repoissu/:id").get(repoissu);

// router.get("/repos", auth,repos);
// router.get("/repocreate", auth, repocreate);
// router.post("/repolist", auth, repolist);
// router.delete("/repodelete/:id", auth, repodelete);
// router.get("/tabs/:id", auth, tabs);
// router.get("/dashboard", auth, dashboard);
// router.get("/repoissu/:id", auth, repoissu);
module.exports = router;
