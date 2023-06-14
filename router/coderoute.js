const express = require("express");
const router = express.Router();
const {
  files,
  upload,
  createfile,
  filelist,
  filedelete,
  codedata,
  uploadfile,
  filecreate,
} = require("../controller/codecontrooler");

router.route("/code").get(files);

router.route("/upload").get(upload);
// router.route("/createfile", uploadfile.single("path")).post(createfile);

router.post("/createfile", uploadfile.single("path"), createfile);
router.route("/filecreate").get(filecreate);
router.route("/filelist").get(filelist);
router.route("/codedata").get(codedata);
router.route("/filedelete/:id").delete(filedelete);
module.exports = router;
