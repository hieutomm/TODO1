require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const authRoute = require("./Routes/authRoute");
const profileRoute = require("./Routes/profileRoute");
const taskRoute = require("./Routes/taskRoute");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Todo API is running",
    docs: "/api-docs",
  });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/tasks", taskRoute);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
}

module.exports = app;
