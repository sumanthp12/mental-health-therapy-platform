require("dotenv").config();

const connectDB = require("./src/config/database");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./src/middleware/errorMiddleware");

const adminRoutes = require("./src/routes/adminRoutes");
const therapistRoutes = require("./src/routes/therapistRoutes");
const intakeRoutes = require("./src/routes/intakeRoutes");
const assignmentRoutes = require("./src/routes/assignmentRoutes");
const sessionRoutes = require("./src/routes/sessionRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const http = require("http");
const { Server } = require("socket.io");
const { initSocket } = require("./src/socket/chatSocket");
const notificationRoutes = require("./src/routes/notificationRoutes");
const aiRoutes = require("./src/routes/aiRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

const userRoutes = require("./src/routes/userRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");



const app = express();
const server = http.createServer(app);
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message:
      "Too many authentication attempts. Please try again later.",
  },
});

const frontendUrl =
  process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: frontendUrl,
  },
});

initSocket(io);

app.use(helmet());
app.use(
  cors({
    origin: frontendUrl,
  })
);
app.use(express.json());

app.use("/api", apiLimiter);

app.use("/api/users", authLimiter, userRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/intake", intakeRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
  res.send("Mental Health Therapy API Running 🚀");
});

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
connectDB();

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});