const Notification = require('../models/notification');
const { publishToQueue } = require('../config/queue');

exports.createNotification = async (req, res) => {
  const { message } = req.body;

  const notification = new Notification({
    userId: req.user.id,
    message,
  });

  await notification.save();

  publishToQueue('notifications', JSON.stringify(notification));

  res.status(201).json(notification);
};

// Get all notifications with pagination
exports.getNotifications = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const notifications = await Notification.find({ userId: req.user.id })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Notification.countDocuments({ userId: req.user.id });
  
      res.json({
        notifications,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
    });
} catch (error) {
  res.status(500).json({ message: 'Failed to retrieve notifications', error });
}
};

exports.getNotificationById = async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification && notification.userId === req.user.id) {
    res.json(notification);
  } else {
    res.status(404).json({ message: 'Notification not found' });
  }
};
//Mark notification as read
exports.updateNotification = async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification && notification.userId === req.user.id) {
    notification.read = true;
    await notification.save();
    res.json(notification);
  } else {
    res.status(404).json({ message: 'Notification not found' });
  }
};
