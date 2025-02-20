import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const ProfilePage = () => {
  const [user, setUser] = useState({
    student_number: "",
    first_name: "",
    last_name: "",
    role: "",
    profile_picture: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }
  
    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessage(response.data.message);
      
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Refresh after 1.5 seconds
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating password");
    }
  };
  

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="profile-page">
      <h2>Profile Settings</h2>
      <div className="profile-container">
        <div className="profile-picture-section">
          {user.profile_picture && (
            <img
              src={user.profile_picture}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <div className="profile-picture-upload">
            <h3>Update Profile Picture</h3>
            <input type="file" accept="image/*" />
          </div>
        </div>
        <div className="profile-info-section">
          <p>
            <strong>Student Number:</strong> {user.student_number}
          </p>
          <p>
            <strong>Name:</strong> {user.first_name} {user.last_name}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <form onSubmit={handlePasswordChange} className="password-form">
            <h3>Change Password</h3>

            <div className="password-input">
              <input
                type={showPassword.current ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <span
                onClick={() => togglePasswordVisibility("current")}
                className="eye-icon"
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="password-input">
              <input
                type={showPassword.new ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                onClick={() => togglePasswordVisibility("new")}
                className="eye-icon"
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="password-input">
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                onClick={() => togglePasswordVisibility("confirm")}
                className="eye-icon"
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">Update Password</button>
          </form>
        </div>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ProfilePage;
