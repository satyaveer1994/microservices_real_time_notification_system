

const amqp = require('amqplib/callback_api');

let channel = null;

const connectQueue = (callback) => {
  const connect = (retries = 5) => {
    amqp.connect(process.env.RABBITMQ_URI, (err, connection) => {
      if (err) {
        console.error('Error connecting to RabbitMQ:', err);
        if (retries === 0) {
          process.exit(1); // Exit if no retries left
        } else {
          console.log(`Retrying connection in 5 seconds... (${retries} retries left)`);
          setTimeout(() => connect(retries - 1), 5000); // Retry after 5 seconds
        }
        return;
      }
      connection.createChannel((err, ch) => {
        if (err) {
          console.error('Error creating channel:', err);
          process.exit(1); // Exit if channel creation fails
        }
        channel = ch;
        console.log('RabbitMQ connected');
        callback(channel);
      });
    });
  };

  connect();
};

const publishToQueue = (queue, message) => {
  if (!channel) {
    console.error('Channel is not available. Message not sent:', message);
    return;
  }
  channel.sendToQueue(queue, Buffer.from(message));
};

const subscribeToQueue = (queue, callback) => {
  if (!channel) {
    console.error('Channel is not available. Cannot subscribe to queue:', queue);
    return;
  }
  channel.consume(queue, (msg) => {
    callback(msg.content.toString());
  }, { noAck: true });
};

module.exports = {
  connectQueue,
  publishToQueue,
  subscribeToQueue,
};
