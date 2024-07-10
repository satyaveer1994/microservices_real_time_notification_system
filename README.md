# Real-time Notification System

This project is a microservices-based real-time notification system built using Node.js, Express, MongoDB, RabbitMQ (or Kafka), and Socket.IO. It handles high-volume message processing and delivers real-time notifications to users.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT
- Role-based access control
- Real-time notifications using Socket.IO
- Message queuing with RabbitMQ (or Kafka)
- Pagination for GET endpoints
- API documentation with Swagger

## Requirements

- Node.js
- MongoDB
- RabbitMQ (or Kafka)
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/satyaveer1994/microservices_real_time_notification_system.git
   cd real-time-notification-system

2. Install dependencies:
   
   npm install

3. Set up environment variables:
   
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/notification_system
   JWT_SECRET=your_jwt_secret
   RABBITMQ_URL=amqp://localhost

## Configuration
   
  .Database: MongoDB is used to store user and notification data.

  . Message Queue: RabbitMQ (or Kafka) is used for message queuing.

  . Real-Time Communication: Socket.IO is used for real-time notifications.
   .Authentication: JWT is used for securing endpoints.
