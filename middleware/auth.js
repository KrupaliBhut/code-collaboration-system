const jwt = require("jsonwebtoken");

let auth = async (req, res) => {
  try {
    console.log("<<", req.header);
    const token = req.headers.cookie;
    console.log("token", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, "krupali");
    if (decoded) {
      return res.redirect("/repos");
    }
    const path = req.originalUrl;
    console.log("req.originalUrl.....................................", path);
    console.log(decoded);
    next();
  } catch (err) {
    res.render("login");
  }
};
module.exports = auth;
