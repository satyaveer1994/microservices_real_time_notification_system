const io = require('socket.io')(5006, {
    cors: {
      origin: '*',
    },
  });
  
  const { connectQueue } = require('../config/queue');
  
  connectQueue((channel) => {
    channel.consume('notifications', (msg) => {
      const notification = JSON.parse(msg.content.toString());
      io.emit(`notification-${notification.userId}`, notification);
    }, { noAck: true });
  });
  
  exports.handleConnection = (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  };













  
//   const { Server } = require('socket.io');
// const { connectQueue } = require('../config/queue');

// let io;

// const setupWebSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log('New client connected');

//     // Join the user to their specific room
//     socket.on('join', (userId) => {
//       socket.join(userId);
//       console.log(`User ${userId} joined room ${userId}`);
//     });

//     socket.on('disconnect', () => {
//       console.log('Client disconnected');
//     });
//   });

//   setupQueueListener();
// };

// const setupQueueListener = () => {
//   connectQueue((channel) => {
//     channel.consume('notifications', (msg) => {
//       const notification = JSON.parse(msg.content.toString());
//       io.to(notification.userId).emit('notification', notification);
//     }, { noAck: true });
//   });
// };

// module.exports = { setupWebSocket };

