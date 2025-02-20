import React from "react";

const PatientModal = ({ patient, onClose }) => {
  if (!patient) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Patient Details</h2>
        <br />

        <h3>Personal Infomation</h3>
        <p>
          <strong>Patient Number:</strong> {patient.patient_number}
        </p>
        <p>
          <strong>Full Name:</strong>{" "}
          {`${patient.first_name} ${
            patient.middle_initial ? patient.middle_initial + ". " : ""
          }${patient.last_name}`}
        </p>

        <p>
          <strong>Nickname: </strong>
          {patient.nickname}
        </p>
        <p>
          <strong>Gender:</strong> {patient.sex_gender}
        </p>
        <p>
          <strong>Age:</strong> {patient.age}
        </p>

        <p>
         <strong>Date of Birth:</strong>  {patient.date_of_birth ? patient.date_of_birth.split("T")[0] : "N/A"}

        </p>

        <p>
          <strong>Civil Status:</strong> {patient.civil_status}
        </p>

        <p>
          <strong>Nationality:</strong> {patient.nationality_ethnicity}
        </p>

        <br />

        <h3>Contact Information</h3>
        <p>
          <strong>Home Address:</strong> {patient.home_address}
        </p>
        <p>
          <strong>Home Phone:</strong> {patient.home_phone}
        </p>
        <p>
          <strong>Contact No:</strong> {patient.mobile_no}
        </p>
        <p>
          <strong>Email:</strong> {patient.email}
        </p>

        <br />

        <h3>Occupation Infomation</h3>
        <p>
          <strong>Occupation:</strong> {patient.occupation}
        </p>
        <p>
          <strong>Work Address:</strong> {patient.work_address}
        </p>
        <p>
          <strong>work Phone No.:</strong> {patient.work_phone}
        </p>

        {patient.age <= 18 && (
          <div>
            <br />
            <h3>Parent/Guardian for Minors</h3>
            <p>
              <strong>Name:</strong> {patient.parent_guardian}
            </p>
            <p>
              <strong>Contact Number:</strong> {patient.parent_contact_number}
            </p>
          </div>
        )}

        <br />

        <h3>Emergeny Contact</h3>
        <p>
          <strong>Name:</strong> {patient.emergency_contact}
        </p>
        <p>
          <strong>Contact Number:</strong> {patient.emergency_contact_number}
        </p>

        <br />

        <button onClick={onClose} style={{ display: 'block', margin: '0 auto' }}>Close</button>
      </div>
    </div>
  );
};

export default PatientModal;
