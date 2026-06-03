const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "không có token" });
  }
  try {
    const decode = jwt.verify(token, SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: "token không hợp lệ" });
  }
};

module.exports = auth;
