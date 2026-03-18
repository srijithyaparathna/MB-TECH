const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
   
    const token = req.headers["authorization"]?.split(" ")[1] || req.body.token;
    console.log("Token received in middleware:", token);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
    } catch (err) {
      console.log("JWT verification error:", err.message);
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      } else {
        return res.status(401).json({ error: "Invalid token" });
      }
    }


    const user = await User.findByPk(decoded.userId);
    console.log("User from DB:", user);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

 
    req.user = user;
    next();
  } catch (err) {
    console.log("Auth middleware error:", err.message);
    res.status(500).json({ error: "Server error in auth middleware" });
  }
};

module.exports = authMiddleware;