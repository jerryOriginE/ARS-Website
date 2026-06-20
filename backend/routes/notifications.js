const express = require("express");
const router = express.Router();

const {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require("../controllers/notificationsController");

const authenticate = require("../middleware/auth");

/**
 * User notifications
 */
router.get("/", authenticate, getUserNotifications);

/**
 * Mark single notification as read
 */
router.put("/:id/read", authenticate, markAsRead);

/**
 * Mark all notifications as read
 */
router.put("/read-all", authenticate, markAllAsRead);

/**
 * Delete notification
 */
router.delete("/:id", authenticate, deleteNotification);

module.exports = router;