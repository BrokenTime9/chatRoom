const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socketManager = require("./socketManager");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://chat-room-dpktems3g-brokentime9s-projects.vercel.app/"],
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: ["https://chat-room-dpktems3g-brokentime9s-projects.vercel.app/"],
  }),
);

socketManager.socketManager(io);

app.get("/data", socketManager.data);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
