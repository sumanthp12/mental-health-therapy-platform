const connectDB = require("./src/config/database");
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./src/routes/adminRoutes");
const therapistRoutes = require("./src/routes/therapistRoutes");
const intakeRoutes = require("./src/routes/intakeRoutes");
const assignmentRoutes = require("./src/routes/assignmentRoutes");
const sessionRoutes = require("./src/routes/sessionRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./src/routes/userRoutes");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  console.log(
    `User Connected: ${socket.id}`
  );

  socket.on(
    "send_message",
    (data) => {

      socket.broadcast.emit(
        "receive_message",
        data
      );

    }
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        `User Disconnected: ${socket.id}`
      );

    }
  );

});

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/intake", intakeRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Mental Health Therapy API Running 🚀");
});

const PORT = process.env.PORT || 8000;
connectDB();

server.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});