const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI environment variable");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Da ket noi DB");
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = connectDB;
