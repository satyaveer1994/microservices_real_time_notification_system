const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const notificationSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  userId: {
    type: String, // Use String type to match the id in User model
    ref: 'User',  // Reference to the User model
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
