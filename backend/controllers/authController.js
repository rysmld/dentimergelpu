const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const loginUser = async (req, res) => {
  try {
    const { student_number, password } = req.body;

    // ✅ Fetch user from DB
    const [users] = await db.execute(
      "SELECT * FROM users WHERE student_number = ?",
      [student_number]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // ✅ Debug: Log user status
    console.log("User Status:", user.status);

    // ❌ Prevent login if user is inactive
    if (user.status.trim().toLowerCase() === "inactive") {
      return res.status(403).json({
        message: "Your account is inactive. Please contact the admin.",
      });
    }

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token without `id`
    const token = jwt.sign(
      { student_number: user.student_number, role: user.role }, // No `id`
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      student_number: user.student_number,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { loginUser };
