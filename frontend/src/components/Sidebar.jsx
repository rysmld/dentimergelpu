import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  User,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import "./Sidebar.css"; // Import the external CSS file

const Sidebar = ({ role }) => {
  const normalizedRole = role?.toLowerCase(); // Normalize the role
  console.log("Normalized role in Sidebar:", normalizedRole); // Debugging line

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userProfile, setUserProfile] = useState({
    first_name: "Guest",
    last_name: "",
    profile_image: "../images/default-avatar.png",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.clear();
    window.location.replace("/");
  };

  const navLinks = {
    admin: [
      { name: "Dashboard", path: "/admin-dashboard", icon: <Home /> },
      { name: "Users", path: "/users", icon: <User /> },
      { name: "Settings", path: "/settings", icon: <Settings /> },
      { name: "Help", path: "/help", icon: <HelpCircle /> },
    ],
    clinician: [
      { name: "Dashboard", path: "/clinician-dashboard", icon: <Home /> },
      { name: "Patients", path: "/clinician-patients", icon: <User /> },
      { name: "Cases", path: "/clinician-cases", icon: <FileText /> },
      { name: "Settings", path: "/settings", icon: <Settings /> },
      { name: "Help", path: "/help", icon: <HelpCircle /> },
    ],
    clinical_instructor: [
      { name: "Dashboard", path: "/instructor-dashboard", icon: <Home /> },
      { name: "Users", path: "/users", icon: <User /> },
      { name: "Patients", path: "/clinician-patients", icon: <User /> },
      { name: "Cases", path: "/instructor-cases", icon: <FileText /> },
      { name: "Settings", path: "/settings", icon: <Settings /> },
      { name: "Help", path: "/help", icon: <HelpCircle /> },
    ],
    default:[
      { name: "Dashboard", path: "/instructor-dashboard", icon: <Home /> },
      { name: "Users", path: "/users", icon: <User /> },
      { name: "Patients", path: "/clinician-patients", icon: <User /> },
      { name: "Cases", path: "/instructor-cases", icon: <FileText /> },
      { name: "Settings", path: "/settings", icon: <Settings /> },
      { name: "Help", path: "/help", icon: <HelpCircle /> },

    ]
  };

    const links = navLinks[normalizedRole] || navLinks.default;

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!isCollapsed && (
            <div className="sidebar-logo">
              <img
                src="/dentimerge.png"
                alt="Logo"
                className="sidebar-logo-img"
              />
              <span className="sidebar-title">DentiMerge</span>
            </div>
          )}
          <button className="collapse-btn" onClick={toggleSidebar}>
            {isCollapsed ? <Menu size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>
                {link.icon} <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          {!isCollapsed && (
            <div className="profile-section">
              <img
                src={userProfile.profile_image}
                alt="Profile"
                className="profile-img"
              />
              <div className="profile-info">
                <span className="user-name">{`${userProfile.first_name} ${userProfile.last_name}`}</span>
              </div>
            </div>
          )}
          
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut /> {!isCollapsed }
          </button>
        </div>
      </div>

      <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;