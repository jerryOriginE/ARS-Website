// backend/routes/logs.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { getLogs, getInstanceLogs } = require('../controllers/logsController');

router.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

router.get('/instance/:instanceId', getInstanceLogs);

router.get('/', authenticate, authorize('admin', 'member'), getLogs);


module.exports = router;
