const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to database:", error.message);
  }
};

// ✅ Function to close DB (important for Jest tests)
const close_db = async () => {
  await mongoose.connection.close();
  console.log("Closed MongoDB connection");
};

connect_db();

app.get("/", (req, res) => {
  res.send("Welcome to Chat Now 2023");
});

// Routes
app.use("/user", userRoutes);
app.use("/chats", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Start server function (to control Jest tests)
let server;
const startServer = () => {
  if (!server) {
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
};

// ✅ Stop server function (Now returns a Promise for Jest)
const closeServer = () => {
  return new Promise((resolve) => {
    if (server) {
      server.close(() => {
        console.log("Server closed");
        resolve();
      });
    } else {
      resolve();
    }
  });
};

// ✅ Export for testing
module.exports = { app, startServer, closeServer, close_db };

// 🔵 SOCKET.IO SETUP
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
});

const onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("setup", (userId) => {
    onlineUsers[userId] = socket.id;
    socket.join(userId);
    socket.emit("connected");
    io.emit("user online", userId);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id,
    );
    if (userId) {
      delete onlineUsers[userId];
      io.emit("user offline", userId);
    }
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing", room));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing", room));

  socket.on("new message", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.users not found");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageStatus.sender._id) return;
      socket.in(user._id).emit("message received", newMessageStatus);
    });
  });
});
startServer();
