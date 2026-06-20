const db = require('../db');

async function logEvent(userId, action, item = null, details = null, status = 'success') {
  try {
    await db('logs').insert({ user_id: userId, action, item, details, status, timestamp: new Date(Date.now() - new Date().getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ') });
    console.log(`Logged event: ${action} by user ${userId}`);
  } catch (err) {
    console.error('Error logging event:', err.message);
  }
}

module.exports = logEvent;
