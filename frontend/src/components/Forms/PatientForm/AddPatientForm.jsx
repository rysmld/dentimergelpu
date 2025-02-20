import React, { useState } from "react";
import axios from "axios";
import "./AddPatientForm.css"; // Import the CSS file

const AddPatient = ({ onClose }) => {
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    middle_initial: "",
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
    profile_photo: null, // Store profile photo
    thumbmark: null, // Store thumbmark
  });

  const [preview, setPreview] = useState({
    profile_photo: null,
    thumbmark: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "age" ? (value ? parseInt(value, 10) : "") : value;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [type]: file }));

      // Read and set preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview((prev) => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Ensure authentication

    if (!token) {
      alert("Unauthorized: Please log in first.");
      return;
    }

    // Exclude profile_photo and thumbmark
    const { profile_photo, thumbmark, ...formDataToSend } = formData;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/patients/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );

      alert(res.data.message); // Show success message

      // Reset form fields after successful submission
      setFormData({
        last_name: "",
        first_name: "",
        middle_initial: "",
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
      onClose();
    } catch (error) {
      alert("Failed to add patient.");
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 style={{ textAlign: "center" }}>Add New Patient</h1>
      <fieldset>
        <legend>Personal Information</legend>
        <div className="form-grid">
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Middle Initial:
            <input
              type="text"
              name="middle_initial"
              value={formData.middle_initial}
              onChange={handleChange}
              maxLength="1"
            />
          </label>
          <label>
            Nickname:
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Sex/Gender:
            <input
              type="text"
              name="sex_gender"
              value={formData.sex_gender}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Civil Status:
            <input
              type="text"
              name="civil_status"
              value={formData.civil_status}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nationality/Ethnicity:
            <input
              type="text"
              name="nationality_ethnicity"
              value={formData.nationality_ethnicity}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Contact Information</legend>
        <div className="form-grid">
          <label>
            Home Address:
            <input
              type="text"
              name="home_address"
              value={formData.home_address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Home Phone:
            <input
              type="tel"
              name="home_phone"
              value={formData.home_phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Mobile No:
            <input
              type="tel"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Occupation Information</legend>
        <div className="form-grid">
          <label>
            Home Address:
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Work Address:
            <input
              type="text"
              name="work_address"
              value={formData.work_address}
              onChange={handleChange}
            />
          </label>
          <label>
            Work Phone Number:
            <input
              type="tel"
              name="work_phone"
              value={formData.work_phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </fieldset>

      {formData.age < 18 && (
        <fieldset>
          <legend>Parent/Guardian</legend>
          <div className="form-grid">
            <label>
              Parent/Guardian:
              <input
                type="text"
                name="parent_guardian"
                value={formData.parent_guardian}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Contact Number:
              <input
                type="tel"
                name="parent_contact_number"
                value={formData.parent_contact_number}
                onChange={handleChange}
              />
            </label>
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend>Emergency Contact</legend>
        <div className="form-grid">
          <label>
            Emergency Contact Name:
            <input
              type="text"
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Emergency Contact Number:
            <input
              type="tel"
              name="emergency_contact_number"
              value={formData.emergency_contact_number}
              onChange={handleChange}
              required
            />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Profile Photo and Thumbmark</legend>
        <div className="form-grid">
          <label>
            Upload Profile Photo:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "profile_photo")}
            />
          </label>
          <label>
            Upload Thumbmark:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "thumbmark")}
            />
          </label>

          <div className="image-preview-container">
            {preview.profile_photo && (
              <div className="image-preview">
                <p>Profile Photo:</p>
                <img src={preview.profile_photo} alt="Profile Preview" />
              </div>
            )}
            {preview.thumbmark && (
              <div className="image-preview">
                <p>Thumbmark:</p>
                <img src={preview.thumbmark} alt="Thumbmark Preview" />
              </div>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset>
      <div>
            {/* Confirmation Checkbox */}
            <label htmlFor="confirmation" className="checkbox-label">
              <input type="checkbox" id="confirmation" required />
              <span>
                I confirm that all the information provided is true and correct
                to the best of my knowledge.
              </span>
            </label>

            {/* Data Privacy Consent Checkbox */}
            <label htmlFor="data-consent" className="checkbox-label">
              <input type="checkbox" id="data-consent" required />
              <span>
                I consent to the collection, processing, and storage of my
                personal and medical information by Lyceum of the Philippines
                University - Batangas solely for maintaining accurate dental
                records, providing healthcare services, and complying with legal
                requirements. I understand that my data will be securely stored,
                kept confidential, and not shared with third parties without my
                consent unless required by law. I acknowledge my rights to
                access, correct, object to processing, and withdraw my consent
                at any time, subject to legal and medical record-keeping
                regulations.
              </span>
            </label>
          </div>
      </fieldset>

      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default AddPatient;
