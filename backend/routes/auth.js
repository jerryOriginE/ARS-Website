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
  ensureAdminUser
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

// --------------------
// HEALTH CHECK
// --------------------
router.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = router;