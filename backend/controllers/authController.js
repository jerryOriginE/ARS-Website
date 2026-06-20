const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const logEvent = require("../utils/logger");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/mailer");

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

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = bcrypt.compareSync(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(`trrying  User ${username} logged in`);

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

    //await sendVerificationEmail(newUser.email, token);

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
  ensureAdminUser
};