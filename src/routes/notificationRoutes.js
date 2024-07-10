/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notifications management
 */

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       201:
 *         description: Notification created successfully
 *   get:
 *     summary: Get all notifications for the logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */

/**
 * @swagger
 * /notifications/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification found
 *       404:
 *         description: Notification not found
 *   put:
 *     summary: Update a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification updated
 *       404:
 *         description: Notification not found
 */


const express = require('express');
const router = express.Router();
const {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
} = require('../controllers/notificationController');
const protect = require('../middlewares/authMiddleware');

router.post('/',protect, createNotification);
router.get('/',protect, getNotifications);
router.get('/:id',protect, getNotificationById);
router.put('/:id',protect, updateNotification);

module.exports = router;

