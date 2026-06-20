// controllers/notificationsController.js
const db = require("../db");
const logEvent = require("../utils/logger");

/**
 * Create notification for a user
 * (usually called internally from other controllers)
 */
async function createNotification(userId, title, message) {
  try {
    const [notification] = await db("notifications")
      .insert({
        user_id: userId,
        title,
        message,
        read: false
      })
      .returning("*");

    return notification;
  } catch (err) {
    console.error("Create notification error:", err);
    return null;
  }
}

/**
 * Get all notifications for logged-in user
 */
async function getUserNotifications(req, res) {
  try {
    const notifications = await db("notifications")
      .where({ user_id: req.user.id })
      .orderBy("date", "desc");

    res.json(notifications);
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ message: "Error fetching notifications" });
  }
}

/**
 * Mark one notification as read
 */
async function markAsRead(req, res) {
  try {
    const updated = await db("notifications")
      .where({
        id: req.params.id,
        user_id: req.user.id
      })
      .update({
        read: true
      });

    if (!updated) {
      return res.status(404).json({ message: "Notification not found" });
    }

    logEvent(req.user.id, "read_notification", req.params.id);

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    console.error("Mark notification error:", err);
    res.status(500).json({ message: "Error updating notification" });
  }
}

/**
 * Mark all notifications as read
 */
async function markAllAsRead(req, res) {
  try {
    await db("notifications")
      .where({ user_id: req.user.id })
      .update({ read: true });

    logEvent(req.user.id, "read_all_notifications");

    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error("Mark all notifications error:", err);
    res.status(500).json({ message: "Error updating notifications" });
  }
}

/**
 * Delete a notification
 */
async function deleteNotification(req, res) {
  try {
    const deleted = await db("notifications")
      .where({
        id: req.params.id,
        user_id: req.user.id
      })
      .del();

    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }

    logEvent(req.user.id, "delete_notification", req.params.id);

    res.json({ message: "Notification deleted" });
  } catch (err) {
    console.error("Delete notification error:", err);
    res.status(500).json({ message: "Error deleting notification" });
  }
}

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
};