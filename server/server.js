const connectDB = require("./src/config/database");
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./src/routes/adminRoutes");
const therapistRoutes = require("./src/routes/therapistRoutes");
const intakeRoutes = require("./src/routes/intakeRoutes");

const userRoutes = require("./src/routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/intake", intakeRoutes);

app.get("/", (req, res) => {
  res.send("Mental Health Therapy API Running 🚀");
});

const PORT = process.env.PORT || 8000;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost: ${PORT}`);
});