const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://ars.balamserver.top",
    "http://localhost:4000"
]

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

console.log('Database client:', db.client.config.client);
console.log('Connection config:', db.client.config.connection);

const routes = [
  { path: '/auth', route: './routes/auth' },
  { path: '/logs', route: './routes/logs' },
  { path: '/news', route: './routes/news' },
  { path: '/notifications', route: './routes/notifications' }
];

routes.forEach(route => {
  app.use(route.path, require(route.route));
  console.log(`Loaded ${route.path} routes`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
})

app.get('/stats', async (_req, res) => {
  try {
    const [usersResult, logsResult, latestLog] = await Promise.all([
      db('users').count({ count: '*' }),
      db('logs').count({ count: '*' }),
      db('logs').select('timestamp').orderBy('timestamp', 'desc').first(),
    ]);

    res.json({
      users: Number(usersResult?.[0]?.count || 0),
      logs: Number(logsResult?.[0]?.count || 0),
      lastActivity: latestLog?.timestamp || null,
      status: 'online',
    });
  } catch (err) {
    console.error('Error loading stats:', err);
    res.status(500).json({ message: 'Error loading stats' });
  }
});

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>tech4good API</title>

  <style>
    :root {
      --bg-main: #0b0b0b;
      --card-bg: rgba(28, 28, 28, 0.75);
      --accent: #00ff9f;
      --danger: #ff4d4d;
      --warn: #ffaa00;
      --muted: #aaa;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background:
        radial-gradient(circle at top, #1a1a1a, #000),
        linear-gradient(135deg, #0f0f0f, #1a1a1a);
      color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .container {
      max-width: 900px;
      width: 100%;
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      border-radius: 18px;
      padding: 40px;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.05),
        0 20px 60px rgba(0,255,159,0.25);
    }

    h1 {
      font-size: 3rem;
      margin: 0;
      color: var(--accent);
      letter-spacing: 1px;
      text-shadow: 0 0 15px rgba(0,255,159,0.6);
    }

    .subtitle {
      margin-top: 8px;
      color: #ccc;
    }

    .server-status {
      margin-top: 12px;
      font-weight: 600;
    }

    .pulse {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { text-shadow: 0 0 5px var(--accent); }
      50% { text-shadow: 0 0 15px var(--accent); }
      100% { text-shadow: 0 0 5px var(--accent); }
    }

    .api-links {
      margin-top: 40px;
      display: grid;
      gap: 18px;
    }

    .api-link-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px;
      border-radius: 12px;
      background: rgba(255,255,255,0.03);
      transition: 0.2s ease;
      border: 1px solid rgba(255,255,255,0.04);
    }

    .api-link-item:hover {
      background: rgba(0,255,159,0.08);
      transform: translateX(4px);
    }

    .api-link-item a {
      color: var(--accent);
      text-decoration: none;
      font-family: monospace;
      font-size: 1rem;
    }

    .status-badge {
      font-size: 0.75rem;
      padding: 5px 12px;
      border-radius: 999px;
      font-weight: 700;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .status-online {
      background: rgba(0,255,159,0.2);
      color: var(--accent);
    }

    .status-offline {
      background: rgba(255,77,77,0.2);
      color: var(--danger);
    }

    .status-maintenance {
      background: rgba(255,170,0,0.25);
      color: var(--warn);
    }

    .status-loading {
      background: rgba(255,255,255,0.15);
      color: var(--muted);
    }

    @media (max-width: 600px) {
      .container {
        padding: 24px;
      }

      h1 {
        font-size: 2.2rem;
      }

      .api-link-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>tech4good API</h1>

    <div class="subtitle">
      Backend API Services
    </div>

    <div class="server-status pulse">
      Status: 🟢 ONLINE · Version: 1.0.0
    </div>

    <div class="api-links">
      <div class="api-link-item">
        <a href="/auth">/auth</a>
        <span class="status-badge status-loading">checking</span>
      </div>

      <div class="api-link-item">
        <a href="/logs">/logs</a>
        <span class="status-badge status-loading">checking</span>
      </div>
    </div>
  </div>

  <script>
    const routes = [
      '/auth',
      '/logs'
    ];

    async function checkRouteHealth(route) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      try {
        const res = await fetch(route + '/health', {
          signal: controller.signal
        });

        clearTimeout(timeout);

        if (res.status === 503) return 'maintenance';

        return res.ok ? 'online' : 'offline';
      } catch {
        return 'offline';
      }
    }

    async function updateStatuses() {
      for (const route of routes) {
        const status = await checkRouteHealth(route);

        const badge = document.querySelector(
          \`a[href="\${route}"] + .status-badge\`
        );

        if (!badge) continue;

        badge.textContent = status;
        badge.className = 'status-badge status-' + status;
      }
    }

    updateStatuses();
  </script>
</body>
</html>
`);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

app.get('/docs/health', async (_, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;