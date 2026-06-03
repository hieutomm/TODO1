const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const existed = await User.findOne({ user_name });
    if (existed) {
      return res.status(401).json({ message: "User đã tồn tại" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      user_name,
      password: hashed,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await User.findOne({ user_name });
    if (!user) {
      return res.status(403).json({ message: " Không tìm thấy người dùng" });
    }
    const confirm = await bcrypt.compare(password, user.password);
    if (!confirm) {
      return res.status(401).json({ message: "Mật khấu không chính xác" });
    }
    const accessToken = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, {
      expiresIn: "7d",
    });
    user.refreshToken = refreshToken;
    await user.save();
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Không có refresh token" });
    }
    const decode = await jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await User.findById(decode.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "token không hợp lệ" });
    }
    const newAccessToken = jwt.sign(
      {
        id: user._id,
      },
      SECRET,
      {
        expiresIn: "15m",
      },
    );
    res.json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  register,
  login,
  refresh,
};
