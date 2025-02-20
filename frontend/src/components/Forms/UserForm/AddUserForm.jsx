import React, { useState } from "react";
import axios from "axios";
import "./AddUserForm.css"; // Import the CSS file

const AddUserForm = ({onClose}) => {
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    student_number: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "Clinician",
    password: "",
    confirmPassword: "",
  });

  const [csvFile, setCsvFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleOpenFormModal = () => {
    setShowFormModal(true); // ✅ Open the form modal
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show confirmation modal
  };

  const handleConfirmSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Submitting user:", formData);

      const response = await axios.post(
        "http://localhost:5000/api/users/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response:", response);

      if (response.status === 201) {
        alert("User added successfully!");
        setFormData({
          student_number: "",
          first_name: "",
          last_name: "",
          email: "",
          role: "Clinician",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert(response.data.message || "Error adding user.");
      }

      setShowModal(false); // ✅ Close confirmation modal
      setShowFormModal(false); // ✅ Close form modal (if used)
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
    setShowFormModal(false);
  };

  return (
    <div className="form-container">
      <h1 style={{ textAlign: "center" }}>Add New User</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>User Information</legend>
          <div className="form-grid">
            <label>
              Student Number*:
              <input
                type="text"
                name="student_number"
                value={formData.student_number}
                onChange={handleChange}
                required={!csvFile}
                disabled={csvFile}
              />
            </label>
            <label>
              First Name*:
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required={!csvFile}
                disabled={csvFile}
              />
            </label>
            <label>
              Last Name*:
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required={!csvFile}
                disabled={csvFile}
              />
            </label>
            <label>
              Email*:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={!csvFile}
                disabled={csvFile}
              />
            </label>
            <label>
              Role*:
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required={!csvFile}
                disabled={csvFile}
              >
                <option value="Clinician">Clinician</option>
                <option value="Clinical Instructor">Clinical Instructor</option>
              </select>
            </label>
            <label>
              Password*:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!csvFile}
                disabled={csvFile}
              />
            </label>
            <label>
              Confirm Password*:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!csvFile}
                disabled={csvFile}
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Upload Users via CSV</legend>
          <label>
            Upload CSV File:
            <input type="file" accept=".csv" onChange={handleFileUpload} />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Submission</h3>
            <p>
              <strong>Student Number:</strong> {formData.student_number}
            </p>
            <p>
              <strong>First Name:</strong> {formData.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {formData.last_name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Role:</strong> {formData.role}
            </p>
            <button onClick={handleConfirmSubmit}>Confirm</button>
            <button onClick={handleCancelSubmit}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserForm;
