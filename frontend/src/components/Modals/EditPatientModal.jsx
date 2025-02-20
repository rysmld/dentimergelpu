import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPatientModal = ({ patient, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_initial: "",
    last_name: "",
    nickname: "",
    age: "",
    sex_gender: "",
    date_of_birth: "",
    civil_status: "",
    nationality_ethnicity: "",
    home_address: "",
    home_phone: "",
    mobile_no: "",
    email: "",
    occupation: "",
    work_address: "",
    work_phone: "",
    parent_guardian: "",
    parent_contact_number: "",
    emergency_contact: "",
    emergency_contact_number: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Convert date back to ISO before sending to backend
      const updatedData = {
        ...formData,
        date_of_birth: formData.date_of_birth
          ? new Date(formData.date_of_birth).toISOString()
          : null,
      };

      await axios.put(
        `http://localhost:5000/api/patients/update/${patient.patient_number}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onUpdate(); // Refresh the patient list
      onClose(); // Close modal after updating
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  useEffect(() => {
    if (patient) {
      setFormData({
        ...patient,
        date_of_birth: patient.date_of_birth
          ? patient.date_of_birth.split("T")[0] // Extract yyyy-MM-dd for input field
          : "",
      });
    }
  }, [patient]);

  if (!patient) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Patient Information</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <h3>Personal Information</h3>
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="middle_initial">Middle Initial:</label>
          <input
            type="text"
            id="middle_initial"
            name="middle_initial"
            value={formData.middle_initial}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />{" "}
          <br />
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="0"
            value={formData.age}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="sex_gender">Gender:</label>
          <input
            type="text"
            id="sex_gender"
            name="sex_gender"
            value={formData.sex_gender}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="civil_status">Civil Status:</label>
          <input
            type="text"
            id="civil_status"
            name="civil_status"
            value={formData.civil_status}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <h3>Contact Information</h3>
          <label htmlFor="home_address">Home Address:</label>
          <input
            type="text"
            id="home_address"
            name="home_address"
            value={formData.home_address}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="home_phone">Home Phone:</label>
          <input
            type="text"
            id="home_phone"
            name="home_phone"
            value={formData.home_phone}
            onChange={handleChange}
          />
          <label htmlFor="mobile_no">Contact Number:</label>
          <input
            type="text"
            id="mobile_no"
            name="mobile_no"
            value={formData.mobile_no}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br /> <br />
          <h3> Occupation Information </h3>
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="work_address">Work Address:</label>
          <input
            type="text"
            id="work_address"
            name="work_address"
            value={formData.work_address}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="work_phone">Work Phone No:</label>
          <input
            type="text"
            id="work_phone"
            name="work_phone"
            value={formData.work_phone}
            onChange={handleChange}
          />
          <br />
          <br />
          <h3>Parent/Guardian for Minors</h3>
          <label htmlFor="parent_guardian">Parent/Guardian Name:</label>
          <input
            type="text"
            id="parent_guardian"
            name="parent_guardian"
            value={formData.parent_guardian}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="parent_contact_number">Contact Number:</label>
          <input
            type="text"
            id="parent_contact_number"
            name="parent_contact_number"
            value={formData.parent_contact_number}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <h3>Emergency Contact</h3>
          <label htmlFor="emergency_contact">Emergency Contact Name:</label>
          <input
            type="text"
            id="emergency_contact"
            name="emergency_contact"
            value={formData.emergency_contact}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="emergency_contact_number">
            Emergency Contact Number:
          </label>
          <input
            type="text"
            id="emergency_contact_number"
            name="emergency_contact_number"
            value={formData.emergency_contact_number}
            onChange={handleChange}
          />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatientModal;
