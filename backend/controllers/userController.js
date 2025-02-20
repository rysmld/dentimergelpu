const db = require("../config/db") // Use promise-based queries
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token

    const [rows] = await db.execute("SELECT id, student_number, first_name, last_name, role FROM users WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]); // Return user profile data
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let query = "SELECT * FROM users";
    let queryParams = [];

    if (search) {
      query += ` WHERE CONCAT(first_name, ' ', last_name) LIKE ? 
                 OR student_number LIKE ? 
                 OR first_name LIKE ? 
                 OR last_name LIKE ?`;
      queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += " ORDER BY student_number ASC"; // Optional: Sort results for consistency

    console.log("Executing Query:", query);
    console.log("With Parameters:", queryParams);

    // ✅ Execute MySQL query using promises
    const [rows] = await db.execute(query, queryParams);

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    console.log("Query Result:", rows);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
      const { student_number, email, first_name, last_name, role, password } = req.body;

      if (!student_number || !email || !first_name || !last_name || !role || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Check if student_number or email already exists
      const [existingUser] = await db.execute(
          "SELECT * FROM users WHERE student_number = ? OR email = ?", 
          [student_number, email]
      );
      if (existingUser.length > 0) {
          return res.status(400).json({ message: "Student number or email already exists" });
      }

      // Hash the password BEFORE inserting
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user with hashed password
      const [result] = await db.execute(
          "INSERT INTO users (student_number, email, first_name, last_name, role, password, status) VALUES (?, ?, ?, ?, ?, ?, 'Active')",
          [student_number, email, first_name, last_name, role, hashedPassword]
      );

      if (result.affectedRows === 0) {
          return res.status(500).json({ message: "Failed to insert user" });
      }

      res.status(201).json({ message: "User added successfully" });

  } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "Server error" });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const { student_number } = req.params;

    // Update user status to "Inactive"
    const query = "UPDATE users SET status = 'Inactive' WHERE student_number = ?";
    const [result] = await db.execute(query, [student_number]);

    if (result.affectedRows > 0) {
      res.json({ message: "User has been deactivated." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const reactivateUser = async (req, res) => {
  try {
    const { student_number } = req.params; 

    // ✅ Update user status to Active
    const [result] = await db.execute("UPDATE users SET status = 'Active' WHERE student_number = ?", [student_number]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User account reactivated successfully" });
  } catch (error) {
    console.error("Error reactivating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const query = "SELECT student_number, first_name, last_name FROM users WHERE role = ?";
    
    const [users] = await db.execute(query, [role]);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPatients = async (req, res) => {
  try {
    const query = "SELECT patient_number, first_name, last_name, middle_initial, sex_gender FROM patients";
    const [patients] = await db.execute(query);

    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { student_number } = req.body;

  try {
    console.log("Received student_number:", student_number); // Debugging log

    // Check if the user exists
    const [users] = await db.query("SELECT student_number FROM users WHERE student_number = ?", [student_number]);

    console.log("Database Query Result:", users); // Debugging log

    if (!users.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // Generate a new password
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
    const newPassword = `${user.student_number}${today}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    await db.query("UPDATE users SET password = ? WHERE student_number = ?", [hashedPassword, student_number]);

    console.log("Password reset successful"); // Debugging log
    res.json({ message: `Password reset successfully to: ${newPassword}` });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};



module.exports = { getAllUsers, getProfile, addUser, deactivateUser, reactivateUser, getUsersByRole, getPatients, resetPassword};
