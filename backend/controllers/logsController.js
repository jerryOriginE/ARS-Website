// backend/controllers/logsController.js
const db = require('../db');

async function getAllLogs(req, res) {
  try {
    const logs = await db('logs')
      .select('logs.*', 'users.username')
      .leftJoin('users', 'logs.user_id', 'users.id')
      .orderBy('timestamp', 'desc');

    res.json(logs);
  } catch (err) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ message: 'Error fetching logs' });
  }
}

// only fetch logs related to a specific instance by instance ID
async function getLogs(req, res) {
  try {
    const userId = req.user.id;
    const logs = await db('logs')
      .select('logs.*', 'users.username')
      .leftJoin('users', 'logs.user_id', 'users.id')
      .where('logs.user_id', userId)
      .orderBy('timestamp', 'desc');
    res.json(logs);
  }
    catch (err) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ message: 'Error fetching logs' });
  }
}

// Get logs related to a specific instance by instance ID
async function getInstanceLogs(req, res) {
  try {
    const { instanceId } = req.params;
    
    const logs = await db('logs')
      .select('logs.*', 'users.username')
      .leftJoin('users', 'logs.user_id', 'users.id')
      .where('action', 'like', '%instance%')
      .whereRaw(`(item LIKE ? OR details LIKE ?)`, [`%Instance ID ${instanceId}%`, `%ID: ${instanceId}%`])
      .orderBy('timestamp', 'desc');

    res.json(logs);
  } catch (err) {
    console.error('Error fetching instance logs:', err);
    res.status(500).json({ message: 'Error fetching instance logs' });
  }
}

module.exports = { getLogs, getInstanceLogs };
