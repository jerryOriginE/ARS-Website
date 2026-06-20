// controllers/newsController.js
const db = require("../db");
const logEvent = require("../utils/logger");
const notifyAllUsers = require("../utils/notifyAllUsers");

/**
 * Create a news post 
 */

async function createNews(req, res) {
  const { title, area } = req.body;

  try {
    if (!title || !area) {
      return res.status(400).json({
        message: "Title and area are required"
      });
    }

    const [news] = await db("news")
      .insert({
        content: title,
        label: area
      })
      .returning("*");

    await notifyAllUsers(
      "📰 News Update",
      title
    );

    res.status(201).json({
      message: "News created + notifications sent",
      news
    });

  } catch (err) {
    console.error("Create news error:", err);
    res.status(500).json({ message: "Error creating news" });
  }
}

/**
 * Get all news (latest first)
 */
async function getAllNews(req, res) {
  try {
    const news = await db("news")
      .select("*")
      .orderBy("created_at", "desc");

    res.json(news);
  } catch (err) {
    console.error("Get news error:", err);
    res.status(500).json({ message: "Error fetching news" });
  }
}

/**
 * Get single news item
 */
async function getNewsById(req, res) {
  try {
    const news = await db("news")
      .where({ id: req.params.id })
      .first();

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(news);
  } catch (err) {
    console.error("Get news by id error:", err);
    res.status(500).json({ message: "Error fetching news" });
  }
}

/**
 * Delete news (admin only recommended)
 */
async function deleteNews(req, res) {
  try {
    const deleted = await db("news")
      .where({ id: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({ message: "News not found" });
    }

    logEvent(req.user?.id, "delete_news", req.params.id, "News deleted");

    res.json({ message: "News deleted successfully" });
  } catch (err) {
    console.error("Delete news error:", err);
    res.status(500).json({ message: "Error deleting news" });
  }
}

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  deleteNews
};