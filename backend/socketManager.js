const rooms = new Set();
const users = new Set();
const roomMessages = {};

function userSize() {
  return users.size - 1;
}

const data = async (req, res) => {
  return res.status(200).json({ rooms: Array.from(rooms), users: userSize() });
};

const socketManager = (io) => {
  io.on("connection", (socket) => {
    users.add(socket.id);
    let id = socket.id;

    socket.emit("currentUser", id);

    socket.emit("updateRooms", Array.from(rooms));

    socket.on("createRoom", (room) => {
      if (rooms.has(room)) {
        socket.emit("error", "room already exists");
      } else {
        rooms.add(room);
        io.emit("updateRooms", Array.from(rooms));
      }
    });

    io.emit("totalUsers", userSize());

    socket.on("joinRoom", (room) => {
      socket.join(room);
      socket.emit("newMessage", { room, message: roomMessages[room] || [] });
    });

    socket.on("sendMessage", ({ room, message }) => {
      if (!roomMessages[room]) {
        roomMessages[room] = [];
      }

      const msg = { sender: socket.id, text: message, timestamp: new Date() };
      roomMessages[room].push(msg);

      io.to(room).emit("newMessage", { room, message: msg });
    });

    socket.on("disconnect", () => {
      users.delete(socket.id);
      console.log(`User disconnected: ${socket.id}`);

      io.emit("totalUsers", userSize());
    });
  });
};

module.exports = { socketManager, data };
