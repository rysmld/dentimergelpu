import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Import the CSS file

const Login = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_number: studentNumber, password }),
      });

      const data = await response.json();
      console.log("Login response:", data); // Debugging

      if (response.ok) {
        console.log("Token received:", data.token);
        console.log("Role received:", data.role);

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        const dashboardRoute = getDashboardRoute(data.role);
        console.log("Redirecting to:", dashboardRoute);

        navigate(dashboardRoute, { replace: true });
      } else {
        console.error("Login failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const getDashboardRoute = (role) => {
    switch (role.toLowerCase().replace(" ", "_")) {
      case "admin":
        return "/admin-dashboard";
      case "clinician":
        return "/clinician-dashboard";
      case "clinical_instructor":
        return "/instructor-dashboard";
      default:
        return "/";
    }
  };

  return (
    <div className="login-page">
    <div className="login-container">
    <div className="logo-container">
          <img
            src="school_logo.png" // Replace with the path to your school logo
            alt="School Logo"
            className="school-logo"
          />
          <img
            src="dept_logo.png" // Replace with the path to your department logo
            alt="Department Logo"
            className="department-logo"
          />
        </div>
      <form className="login-form" onSubmit={handleLogin}>
      <img
            src="dentimergeword.png" // Replace with the path to your school logo
            alt="dentimerge word"
            className="dentimerge-word"
          /> <br />
          <img
            src="dentimergeicon.png" // Replace with the path to your department logo
            alt="dentimerge icon"
            className="dentimerge-icon"
          />
        <div className="input-group">
          <input
            type="text"
            placeholder="Student Number"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <br /><br />
        <p>If you forgot your password, Please contact Administrator or Clinical Instructor.</p>
      </form>
    </div>
    </div>
  );
};

export default Login;