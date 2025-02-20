const express = require("express");
const db = require("../config/db");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");
const { getDashboardCounts, getWeeklyUserGrowth, getWeeklyPatientGrowth } = require("../controllers/dashboardController");
const router = express.Router();

// 📌 Fetch total users, patients, and cases
router.get("/", verifyToken, async (req, res) => {
  try {
    const [[totalUsers]] = await db.execute("SELECT COUNT(*) as total FROM users");
    const [[totalPatients]] = await db.execute("SELECT COUNT(*) as total FROM patients");
    const [[totalCases]] = await db.execute("SELECT COUNT(*) as total FROM subjective_form");

    res.json({
      totalUsers: totalUsers.total,
      totalPatients: totalPatients.total,
      totalCases: totalCases.total,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Example routes
router.get("/admin-dashboard", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

router.get("/clinician-dashboard", verifyToken, authorizeRoles("clinician"), (req, res) => {
  res.json({ message: "Welcome to Clinician Dashboard" });
});

router.get("/instructor-dashboard", verifyToken, authorizeRoles("clinical_instructor"), (req, res) => {
  res.json({ message: "Welcome to Clinical Instructor Dashboard" });
});

//Dashboard Counts
router.get("/", verifyToken, getDashboardCounts);
router.get("/weekly-user-growth", verifyToken, getWeeklyUserGrowth);
router.get("/weekly-case-growth", verifyToken, getWeeklyUserGrowth);
router.get("/weekly-patient-growth", verifyToken, getWeeklyPatientGrowth);

module.exports = router;
