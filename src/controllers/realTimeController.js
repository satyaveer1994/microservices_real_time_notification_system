const socketIO = require("socket.io");
const { connectQueue, subscribeToQueue } = require("../config/queue");

// Set up Socket.IO server
const io = socketIO(5005, {
  cors: {
    origin: "*",
  },
});

// Handle new client connections
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Connect to RabbitMQ and subscribe to notifications queue
connectQueue((channel) => {
  console.log("Connected to RabbitMQ, subscribing to notifications queue");

  subscribeToQueue("notifications", (message) => {
    const notification = JSON.parse(message);
    io.emit(`notification-${notification.userId}`, notification);
  });
});

module.exports = {
  handleConnection: (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  },
};
