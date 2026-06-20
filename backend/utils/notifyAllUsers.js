const db = require("../db");
const { createNotification } = require("../controllers/notificationsController");

async function notifyAllUsers(title, message) {
  const users = await db("users").select("id");

  const promises = users.map(user =>
    createNotification(user.id, title, message)
  );

  await Promise.all(promises);
}

module.exports = notifyAllUsers;