const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    console.log("Decoded Token:", verified);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role.toLowerCase().replace(" ", "_"); // Normalize role
    console.log("User Role:", userRole); // Debugging output
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};


module.exports = { verifyToken, authorizeRoles };
