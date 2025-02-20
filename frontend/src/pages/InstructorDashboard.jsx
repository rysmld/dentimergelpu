import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Dashboard.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalUsers: 0,
    totalPatients: 0,
    totalCases: 0,
  });
  const [stats, setStats] = useState({ monthlyCases: [], patientGrowth: [] });
  const [currentUser, setCurrentUser] = useState("");
  const [weeklyGrowth, setWeeklyGrowth] = useState([]);
  const [weeklyCases, setWeeklyCases] = useState([]);
  const [weeklyPatients, setWeeklyPatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }, // Ensure authentication
          }
        );
        setCounts({
          totalUsers: response.data.totalUsers,
          totalPatients: response.data.totalPatients,
          totalCases: response.data.totalCases,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve stored token

        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in request
            },
          }
        );

        setCurrentUser(response.data.first_name || "User");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setCurrentUser("User");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleWidgetClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchWeeklyGrowth = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get stored token

        const response = await axios.get(
          "http://localhost:5000/api/dashboard/weekly-user-growth",
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Send token in request
            },
          }
        );

        console.log("API Response:", response.data); // ✅ Debugging log
        setWeeklyGrowth(response.data.weeklyUserGrowth);
      } catch (error) {
        console.error(
          "Error fetching weekly user growth:",
          error.response?.data || error.message
        );
      }
    };

    fetchWeeklyGrowth();
  }, []);

  useEffect(() => {
    const fetchWeeklyPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dashboard/weekly-patient-growth",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setWeeklyPatients(response.data.weeklyPatientGrowth);
      } catch (error) {
        console.error("Error fetching weekly patient growth:", error);
      }
    };

    fetchWeeklyPatients();
  }, []);

  const lineChartData = {
    labels: weeklyGrowth.map((data) => `Week ${data.week}, ${data.year}`),
    datasets: [
      {
        label: "Users Added Per Week",
        data: weeklyGrowth.map((data) => data.count),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const patientLineChartData = {
    labels:
      weeklyPatients?.map((data) => `Week ${data.week}, ${data.year}`) || [],
    datasets: [
      {
        label: "New Patients Per Week",
        data: weeklyPatients?.map((data) => data.count) || [],
        fill: false,
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {currentUser}!</h1>
        <p>Here you can manage users, patients, and case records.</p>
      </div>

      {/* Widgets Section */}
      <div className="dashboard-widgets">
        <div
          className="widget widget-users"
          onClick={() => handleWidgetClick("/users")}
        >
          <h3>Total Users</h3>
          <p className="count">{counts.totalUsers}</p>
        </div>
        <div
          className="widget widget-patients"
          onClick={() => handleWidgetClick("/clinician-patients")}
        >
          <h3>Total Patients</h3>
          <p className="count">{counts.totalPatients}</p>
        </div>
        <div
          className="widget widget-cases"
          onClick={() => handleWidgetClick("/clinician-cases")}
        >
          <h3>Total Cases</h3>
          <p className="count">{counts.totalCases}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <h2>Weekly Statistics</h2>
        <div className="chart-container">
          <div className="chart">
            <h3>User</h3>
            {weeklyGrowth.length > 0 ? (
              <Line data={lineChartData} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="chart">
            <h3>Patient</h3>
            {Array.isArray(weeklyPatients) && weeklyPatients.length > 0 ? (
              <Line data={patientLineChartData} />
            ) : (
              <p>Loading or No Data Available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
