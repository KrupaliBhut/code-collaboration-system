const express = require("express");
const router = express.Router();
const { files, upload, createfile } = require("../controller/codecontrooler");

router.route("/code").get(files);
router.route("/upload").get(upload);

router.route("/createfile").post(createfile);
module.exports = router;
