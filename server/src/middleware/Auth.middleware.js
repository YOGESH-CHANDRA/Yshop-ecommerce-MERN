const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const Auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token Not Found" });
  const token = authorization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // console.log(process.env.JWT_SECRET_KEY)
    // console.log(token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token", err: err.message });
  }
};

module.exports = Auth;
