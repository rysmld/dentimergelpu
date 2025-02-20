const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if needed
  password: "rysmld", // Add your MySQL password if you have one
  database: "dentimerge_lpu" // Replace with your actual database name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// User's student_number whose password needs to be updated
const student_number = "20240003"; // Change this to the correct student_number
const plainPassword = "instructor123"; // Change this to the desired password

// Hash the password and update it in the database
bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
    db.end(); // Close DB connection
    return;
  }

  console.log("Hashed Password:", hash);

  // Update password in database
  const sql = "UPDATE users SET password = ? WHERE student_number = ?";
  db.query(sql, [hash, student_number], (err, result) => {
    if (err) {
      console.error("Error updating password in database:", err);
    } else {
      console.log("Password updated successfully for student number:", student_number);
    }
    db.end(); // Close DB connection
  });
});
