const http = require("http");
const socketIo = require("socket.io");
const { connectQueue, subscribeToQueue } = require("./config/queue");

const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

connectQueue((channel) => {
  subscribeToQueue("notifications", (message) => {
    const notification = JSON.parse(message);
    io.emit(`notification-${notification.userId}`, notification);
  });
});

const PORT = process.env.REAL_TIME_PORT || 5005;

server.listen(PORT, () => {
  console.log(`Real-time server running on port ${PORT}`);
});
