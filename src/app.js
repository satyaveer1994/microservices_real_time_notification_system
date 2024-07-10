const express = require('express');
const connectDB = require('./config/db');
const { connectQueue } = require('./config/queue');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const realTimeRoutes = require('./routes/realTimeRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();


const app = express();
const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ['./routes/*.js'],
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

connectDB();
connectQueue((channel) => {
  console.log('RabbitMQ connected');
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/real-time', realTimeRoutes);


module.exports = app;


