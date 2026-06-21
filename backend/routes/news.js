const express = require("express");
const router = express.Router();

const {
  createNews,
  getAllNews,
  getNewsById,
  deleteNews
} = require("../controllers/newsController");

const authenticate = require("../middleware/auth");
const authorize = require("../middleware/authorize");

/**
 * Public routes
 */
router.get("/", getAllNews);
router.get("/:id", getNewsById);

/**
 * Admin-only routes
 */
router.post("/", authenticate, authorize("admin"), createNews);
router.delete("/:id", authenticate, authorize("admin"), deleteNews);

router.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = router;