const db = require("../config/db");

// Get total users and patients
const getDashboardCounts = async (req, res) => {
  try {
    const [[usersCount]] = await db.execute("SELECT COUNT(*) as totalUsers FROM users");
    const [[patientsCount]] = await db.execute("SELECT COUNT(*) as totalPatients FROM patients");

    res.json({
      totalUsers: usersCount.totalUsers,
      totalPatients: patientsCount.totalPatients
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getWeeklyUserGrowth = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        YEAR(created_at) AS year,
        WEEK(created_at) AS week, 
        COUNT(id) AS count
      FROM users 
      GROUP BY YEAR(created_at), WEEK(created_at) 
      ORDER BY YEAR(created_at) ASC, WEEK(created_at) ASC
    `);

    res.json({ weeklyUserGrowth: rows });
  } catch (error) {
    console.error("Error fetching weekly user growth:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getWeeklyCaseGrowth = async (req, res) => {
  try {
    const query = `
      SELECT YEAR(date_created) AS year, WEEK(date_created) AS week, COUNT(*) AS count
      FROM subjective_form
      GROUP BY year, week
      ORDER BY year, week;
    `;

    const [rows] = await db.execute(query);
    res.json({ weeklyCaseGrowth: rows });
  } catch (error) {
    console.error("Error fetching weekly case growth:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getWeeklyPatientGrowth = async (req, res) => {
  try {
    const query = `
      SELECT YEAR(created_at) AS year, WEEK(created_at) AS week, COUNT(*) AS count
      FROM patients
      GROUP BY year, week
      ORDER BY year, week;
    `;

    const [rows] = await db.execute(query);
    res.json({ weeklyPatientGrowth: rows });
  } catch (error) {
    console.error("Error fetching weekly case growth:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = { getDashboardCounts, getWeeklyUserGrowth, getWeeklyCaseGrowth, getWeeklyPatientGrowth };
