const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const logEvent = require("../utils/logger");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/mailer");
const { createNotification } = require("./notificationsController");

const SECRET_KEY = process.env.JWT_SECRET || "ars-secret-key";

// --------------------
// Helpers
// --------------------
function calculateLevel(points) {
  return Math.floor(points / 100) + 1;
}

function clampPoints(points) {
  return points < 0 ? 0 : points;
}

// --------------------
// Ensure admin exists
// --------------------
async function ensureAdminUser() {
  const admin = await db("users").where({ username: "admin" }).first();

  if (!admin) {
    const adminHash = bcrypt.hashSync("1233", 10);

    await db("users").insert({
      username: "admin",
      email: "admin@local",
      password_hash: adminHash,
      role: "admin",
      points: 0,
      is_verified: true
    });

    console.log("Admin user created");
  }
}

// --------------------
// LOGIN
// --------------------
async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await db("users").where({ username }).first();
    console.log(`User ${username} logged in`, user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);
    console.log(`Password valid: ${valid}`);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(`Trying to log in User ${username} - Verified: ${user.is_verified}`);

    if (!user.is_verified) {
      return res.status(403).json({
        message: "Please verify your email first"
      });
    }

    const points = user.points || 0;

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      id: user.id,
      username: user.username,
      role: user.role,
      points,
      level: calculateLevel(points)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error" });
  }
}

// --------------------
// REGISTER
// --------------------
async function register(req, res) {
  const { username, password, email } = req.body;

  try {

    const existingUser = await db("users")
      .where({ username })
      .orWhere({ email })
      .first();

    if (existingUser) {
          return res.status(400).json({
            message:
              existingUser.email === email
                ? "Email already registered"
                : "Username already taken"
          });
        }

    const passwordHash = bcrypt.hashSync(password, 10);

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 1000 * 60 * 60 * 24;

    const [newUser] = await db("users")
      .insert({
        username,
        email,
        password_hash: passwordHash,
        role: "member",
        points: 0,
        is_verified: false,
        verification_token: token,
        verification_expires: expires
      })
      .returning(["id", "email"]);

    await sendVerificationEmail(newUser.email, token);
    // notify user and thanks for registration
    await createNotification(newUser.id, "Bienvenido a ARS!", "Gracias por registrarte en nuestro sistema de recompensas. ¡Explora las actividades y gana puntos para subir de nivel!");


    const link = `http://localhost:5000/auth/verify-email?token=${token}`;

    console.log("VERIFY USER LINK:", link);

    res.json({
      message: "User registered successfully"
    });

  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(400).json({ message: "User already exists" });
    }

    res.status(500).json({ message: "Registration error" });
  }
}

// --------------------
// VERIFY EMAIL
// --------------------
async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const user = await db("users")
      .where({ verification_token: token })
      .first();

    if (!user) {
      return res.status(400).send("Invalid token");
    }

    if (user.verification_expires < Date.now()) {
      return res.status(400).send("Token expired");
    }

    await db("users")
      .where({ id: user.id })
      .update({
        is_verified: true,
        verification_token: null,
        verification_expires: null
      });

    res.send("Email verified successfully ✅ You can now login.");

  } catch (err) {
    console.error(err);
    res.status(500).send("Verification error");
  }
}

// --------------------
// VERIFY USER 
// --------------------
// this will reicve qr data as
//  {"company":"ARS","id":"4","username":"jerry","role":"member","generatedAt":"2026-06-22T01:24:46.177Z"}
// and it must verify the user database to finda valid caldiate for all the data and return true or false and the user data if true
async function verifyUser(req, res) {
  const { company, id, username, role, generatedAt } = req.body;
  console.log("Verifying user:", { company, id, username, role, generatedAt });
  if (company !== "ARS") {
    return res.status(400).json({ message: "Invalid company" });
  }

  try {
    const user = await db("users")
      .where({ id, username, role })
      .first();

    if (!user) {
      console.log("User not found for verification:", { id, username, role });
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User verified successfully:", { id, username, role });
    
    res.json({
      valid: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        points: user.points,
        level: calculateLevel(user.points || 0)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification error" });
  }
}

// server will recieve the user id and the type of waset we create a table 
const POINTS_AWARD = {
  "plastic": 10,
  "glass": 15,
  "metal": 20,
  "trash": 5
};

// we alos log it in a new table called user_waste_log with user_id, waste_type, points_awarded, created_at
async function awardPoints(req, res) {
  const { userId, wasteType } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  if (!POINTS_AWARD[wasteType]) {
    return res.status(400).json({ message: "Invalid waste type" });
  }

  try {
    await addPoints(userId, POINTS_AWARD[wasteType]);

    await db("user_waste_log").insert({
      user_id: userId,
      waste_type: wasteType,
      points_awarded: POINTS_AWARD[wasteType],
      created_at: db.fn.now(),
    });

    // we reurn the amount of points
    res.json({
      message: `Awarded ${POINTS_AWARD[wasteType]} points for ${wasteType}`,
      points: POINTS_AWARD[wasteType],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error awarding points" });
  }
}

async function getWasteLog(req, res) {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const logs = await db("user_waste_log")
      .where({ user_id: userId })
      .select("waste_type", "points_awarded", "created_at")
      .orderBy("created_at", "desc");

    res.json(logs);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching waste log" });
  }
}

// this will log each session of the user (only needs userId)
// expects { userId }
// also when ending a session send a notification thanking the user for participating
async function endSession(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    // insert a simple session log with timestamp. Table: sessions (user_id, ended_at)
    await db("sessions").insert({ user_id: userId, ended_at: db.fn.now() });
    // send a notification thanking the user for participating
    try {
      await createNotification(userId, "Gracias por participar", "Gracias por participar en la sesión. ¡Gracias por tu contribución!");
    } catch (notifyErr) {
      console.error("Notification error:", notifyErr);
      // continue even if notification fails
    }

    res.json({ message: "Session logged" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging session" });
  }
}
  
// --------------------
// PROFILE
// --------------------
async function getProfile(req, res) {
  try {
    const user = await db("users")
      .select("id", "username", "email", "role", "points", "is_verified", "created_at")
      .where({ id: req.user.id })
      .first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      ...user,
      level: calculateLevel(user.points || 0)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile error" });
  }
}

// --------------------
// POINTS
// --------------------
async function addPoints(userId, amount) {
  const user = await db("users").where({ id: userId }).first();
  if (!user) return null;

  const newPoints = clampPoints((user.points || 0) + amount);

  await db("users")
    .where({ id: userId })
    .update({
      points: newPoints,
      last_updated: db.fn.now()
    });

  return {
    points: newPoints,
    level: calculateLevel(newPoints)
  };
}

async function removePoints(userId, amount) {
  return addPoints(userId, -amount);
}

async function addUserPoints(req, res) {
  try {
    const result = await addPoints(req.user.id, req.body.amount);

    res.json({
      message: "Points updated",
      ...result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating points" });
  }
}

// --------------------
// EXPORTS
// --------------------
module.exports = {
  login,
  register,
  getProfile,
  addPoints,
  removePoints,
  addUserPoints,
  verifyEmail,
  verifyUser,
  ensureAdminUser,
  awardPoints,
  endSession,
  getWasteLog
};