const jwt = require("jsonwebtoken");
const authenticateUser = async (req, res, next) => {
  try {
    console.log("Authenticating");
    const token = req.headers.cookie;
    console.log("token<", token);
    if (!token) {
      // return res.status(401).json({ message: "No token provided" });
      res.redirect("/login");
    }
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");

    const decoded = jwt.verify(token);
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
    console.log("decoded", decoded);
    if (decoded) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "server error" });
    }
    req.user = decoded;

    next();
  } catch (err) {
    // res.status(500).json({ message: "server error" });
  }
};
module.exports = authenticateUser;
