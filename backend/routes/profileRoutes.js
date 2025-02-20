const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const db = require("../config/db");
const bcrypt = require("bcrypt");

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const query =
      "SELECT student_number, first_name, last_name, role, profile_picture FROM users WHERE student_number = ?";
    const [rows] = await db.execute(query, [req.user.student_number]);
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Change password
router.put("/change-password", verifyToken, async (req, res) => {
    console.log("User requesting password change:", req.user);
    console.log("New password:", req.body.newPassword);
  
    const { currentPassword, newPassword } = req.body;
  
    try {
      if (!req.user || !req.user.student_number) {
        console.error("Error: student_number is undefined");
        return res.status(400).json({ message: "Invalid token data" });
      }
  
      const [rows] = await db.execute(
        "SELECT password FROM users WHERE student_number = ?",
        [req.user.student_number]
      );
  
      if (rows.length === 0) return res.status(404).json({ message: "User not found" });
  
      const validPassword = await bcrypt.compare(currentPassword, rows[0].password);
      if (!validPassword) return res.status(400).json({ message: "Incorrect current password" });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.execute("UPDATE users SET password = ? WHERE student_number = ?", [
        hashedPassword,
        req.user.student_number,
      ]);
  
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating password" });
    }
  });
  
  
  


module.exports = router;
