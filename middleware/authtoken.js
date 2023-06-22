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

    // const decoded = jwt.verify(token,"krupali");
    // console.log(
    //   ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    // );
    // console.log("decoded", decoded);
    // if (decoded) {
    //   return res.status(401).json({ message: "Invalid token" });
    // } else {
    //   res.status(500).json({ message: "server error" });
    // }
    // req.user = decoded;

    // next();
    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );
    console.log("user<<<<", user);
    console.log("user.id", user.id);
    const uid = user.id;
    if (!user) {
      res.status(500).json({ message: "invalid token" });
    }
    next();
    // res.cookie("token", token, {});
  } catch (err) {
    // const error = "invalid token";
    // res.status(404).json({ message: "invalid token" });
    return res.status(490).render("login");

    // return res.redirect("/login");
  }
};
module.exports = authenticateUser;
