const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization; // simpler

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  // Expect: "Bearer <token>"
  const parts = authHeader.split(" ");
  const type = parts[0];
  const token = parts[1];

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Authorization must be: Bearer <token>" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    console.log("JWT VERIFY ERROR:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticateJWT;
