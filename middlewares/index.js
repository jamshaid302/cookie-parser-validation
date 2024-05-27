const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const data = jwt.verify(token, "secret");
    req.userId = data.id;
    req.userRole = data.role;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  authorization,
};
