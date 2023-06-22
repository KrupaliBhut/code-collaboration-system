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
  codedata2,
} = require("../controller/codecontrooler");
const authenticateUser = require("../middleware/authtoken");

router.route("/code").get(files);

router.route("/upload").get(upload);
// router.route("/createfile", uploadfile.single("path")).post(createfile);

router.post("/createfile", uploadfile.single("path"), createfile);
// router.route("/filecreate").get(filecreate);
// router.route("/filelist").get(filelist);
// router.route("/codedata").get(codedata);
// router.route("/codedata2").get(codedata2);
// router.route("/filedelete/:id").delete(filedelete);
router.get("/filecreate", authenticateUser, filecreate);
router.get("/filelist", authenticateUser, filelist);
router.get("/codedata", authenticateUser, codedata);
router.get("/codedata2", authenticateUser, codedata2);
router.route("/filedelete/:id").delete(filedelete);

module.exports = router;
