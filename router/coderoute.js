const express = require("express");
const router = express.Router();
const {
  files,
  upload,
  createfile,
  filelist,
  filedelete,
} = require("../controller/codecontrooler");

router.route("/code").get(files);
router.route("/upload").get(upload);
router.route("/createfile").post(createfile);
router.route("/filelist").get(filelist);

router.route("/filedelete/:id").delete(filedelete);
module.exports = router;
