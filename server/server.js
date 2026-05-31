const connectDB = require("./src/config/database");
const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Mental Health Therapy API Running 🚀");
});

const PORT = process.env.PORT || 8000;
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost: ${PORT}`);
});