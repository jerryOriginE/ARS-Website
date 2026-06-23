const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/authController");

const authenticate = require("../middleware/auth");

// run once
ensureAdminUser();

// --------------------
// AUTH
// --------------------
router.post("/login", login);
router.post("/register", register);

// --------------------
// PROFILE
// --------------------
router.get("/profile", authenticate, getProfile);

// --------------------
// EMAIL VERIFY
// --------------------
router.get("/verify-email", verifyEmail);

// --------------------
// ARS
// --------------------
router.post("/verify-user", verifyUser);

router.post("/award-points", awardPoints);

router.post("/end-session", endSession);

router.get("/history/:userId", getWasteLog);

// --------------------
// POINTS
// --------------------
router.post("/points/add", authenticate, async (req, res) => {
  try {
    const result = await addPoints(req.user.id, req.body.amount);
    res.json({ message: "Points added", ...result });
  } catch (err) {
    res.status(500).json({ message: "Error adding points" });
  }
});

router.post("/points/remove", authenticate, async (req, res) => {
  try {
    const result = await removePoints(req.user.id, req.body.amount);
    res.json({ message: "Points removed", ...result });
  } catch (err) {
    res.status(500).json({ message: "Error removing points" });
  }
});

router.post("/points/me", authenticate, addUserPoints);

router.get("/users", authenticate, async (req, res) => {
  try {
    const db = require("../db");

    const users = await db("users").select(
      "id",
      "username",
      "email",
      "role",
      "points",
      "created_at"
    );

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// --------------------
// ADMIN: UPDATE USER POINTS
// --------------------
router.post("/admin/points", authenticate, async (req, res) => {
  try {
    const db = require("../db");

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { userId, amount } = req.body;

    const user = await db("users").where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPoints = Math.max(0, (user.points || 0) + amount);

    await db("users")
      .where({ id: userId })
      .update({ points: newPoints });

    res.json({
      message: "Points updated",
      userId,
      points: newPoints
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating points" });
  }
});

// --------------------
// HEALTH CHECK
// --------------------
router.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = router;