const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Adjust based on your DB connection file

// Get user count per role
router.get("/user-stats", async (req, res) => {
  try {
    const query = `SELECT role, COUNT(*) as count FROM users GROUP BY role`;
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
