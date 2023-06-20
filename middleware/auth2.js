const jwt = require("jsonwebtoken");

let authe2 = async (req, res, next) => {
  console.log("auth<<<<<<<<<<<<<<<<<<<<<<");
  try {
    const token = jwt.sign({ id: user.id }, "krupali");
    console.log("token>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", token);
    res.cookie("token", token, {});
    // res.json({ token });
    const tokens = req.headers.cookie;
    const decoded = tokens ? jwt.verify(token, "krupali") : null;
    // if (decoded) {
    //   return res.render("dashboard");
    // }
    const path = req.originalUrl;
    console.log(
      "req.originalUrl..............................<<<<<<<.......",
      path
    );
    if (path == "/login" && token == null) {
      res.redirect("/repos");
    }

    console.log("Request...");
    next();
    console.log("decoded", decoded);

    res.render("dashboard", { token });
  } catch (error) {
    console.log("error", error);
    res.render("login", { error });
  }
};

module.exports = authe2;
