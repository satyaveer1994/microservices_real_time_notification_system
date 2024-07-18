const Notification = require("../models/notification");
const { publishToQueue } = require("../config/queue");

exports.createNotification = async (req, res) => {
  try {
    const { message } = req.body;

    const notification = new Notification({
      userId: req.user.id, // Use req.user.id since userId is now a String
      message,
    });

    await notification.save();

    publishToQueue("notifications", JSON.stringify(notification));

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const query = { userId: req.user.id };

    const notifications = await Notification.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Notification.countDocuments(query);

    res.json({
      notifications,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve notifications", error });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Mark notification as read
exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
