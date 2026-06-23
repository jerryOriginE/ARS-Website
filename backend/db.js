// backend/db.js
const knex = require('knex');

const isProduction = !!process.env.DATABASE_URL;
console.log('Environment:', isProduction ? 'Production' : 'Development');
const db = knex({
  client: isProduction ? 'pg' : 'sqlite3',
  connection: isProduction
    ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
    : { filename: './data.db' },
  useNullAsDefault: !isProduction,
});

// Automatically create tables if they don't exist
async function initializeTables() {
  try {
    // Users table
    const hasUsers = await db.schema.hasTable('users');
    if (!hasUsers) {
      await db.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').unique().notNullable();
        table.string('password_hash').notNullable();
        table.string('email').unique().notNullable();
        table.string('role').defaultTo('user'); // 'admin' or 'user'

        table.integer('points').defaultTo(0); // New points column

        table.boolean("is_verified").defaultTo(false);
        table.string("verification_token");
        table.timestamp("verification_expires");

        table.timestamp('created_at').defaultTo(db.fn.now());
        table.timestamp('last_updated').defaultTo(db.fn.now());
      });
      console.log('Created users table');
    }

    // News table
    const hasNews = await db.schema.hasTable('news');
    if (!hasNews) {
      await db.schema.createTable('news', (table) => {
        table.increments('id').primary();
        table.text('content').notNullable();
        table.string('label').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('Created news table');
    }

    // User notifications
    const hasNotifications = await db.schema.hasTable('notifications');
    if (!hasNotifications) {
      await db.schema.createTable('notifications', (table) => {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.string('title').notNullable();
        table.text('message').notNullable();
        table.boolean('read').defaultTo(false);
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('Created notifications table');
    }

    const hasLogs = await db.schema.hasTable('logs');
    if (!hasLogs) {
      await db.schema.createTable('logs', (table) => {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
        table.string('action').notNullable();
        table.string('item');
        table.text('details');
        table.string('status').defaultTo('success');
        table.timestamp('timestamp').defaultTo(db.fn.now());
      });
      console.log('Created logs table');
    }

    // sessions
    const hasSessions = await db.schema.hasTable('sessions');
    if (!hasSessions) {
      await db.schema.createTable('sessions', (table) => {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
        table.timestamp('ended_at').defaultTo(db.fn.now());
      });
      console.log('Created sessions table');
    }

    //table called user_waste_log with user_id, waste_type, points_awarded, created_at
    const hasUserWasteLog = await db.schema.hasTable('user_waste_log');
    if (!hasUserWasteLog) {
      await db.schema.createTable('user_waste_log', (table) => {
        table.increments('id').primary();
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
        table.string('waste_type').notNullable();
        table.integer('points_awarded').notNullable();
        table.timestamp('created_at').defaultTo(db.fn.now());
      });
      console.log('Created user_waste_log table');
    }

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

initializeTables();

module.exports = db;