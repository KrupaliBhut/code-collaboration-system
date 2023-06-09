const express = require("express");
const router = express.Router();
const {
  repos,
  repolist,
  repocreate,
  repodelete,
  tabs,
} = require("../controller/repocontroller");

router.route("/repos").get(repos);
router.route("/repocreate").get(repocreate);
router.route("/repolist").post(repolist);
router.route("/repodelete/:id").delete(repodelete);
router.route("/tabs/:id").get(tabs);
module.exports = router;
