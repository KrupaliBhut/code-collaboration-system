const db = require("../models");
const Users = db.users;
const  jwt  = require("jsonwebtoken");
const authenticateUser = async (req, res, next) => {
  const token = req.rawHeaders[7];
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = jwt.verify(token, "krupali");
  const user = await Users.findOne(decoded.id);

  if (!user) {
    return res.satus(401).json({ message: "user not found" });
  }
  req.user = user;
  next();

  jwt.verify(token, "krupali", async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    try {
      const user = await Users.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });
};

module.exports = { authenticateUser };
