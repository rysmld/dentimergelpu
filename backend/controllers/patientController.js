const db = require("../config/db");

const getAllPatients = async (req, res) => {
  try {
    const { search } = req.query;

    let query = "SELECT * FROM patients";
    let queryParams = [];

    if (search) {
      query += ` WHERE CONCAT(first_name, ' ', last_name) LIKE ? 
                        OR patient_number LIKE ? 
                        OR first_name LIKE ? 
                        OR last_name LIKE ?`;
      queryParams.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    query += " ORDER BY patient_number ASC";

    console.log("Executing Query:", query);
    console.log("With Parameters:", queryParams);

    const [rows] = await db.execute(query, queryParams);

    if (!Array.isArray(rows)) {
      throw new Error("Query result is not an array");
    }

    // Format patient_number to always have 6 digits with leading zeros
    const formattedPatients = rows.map((patient) => ({
      ...patient,
      patient_number: String(patient.patient_number).padStart(6, "0"),
    }));

    console.log("Formatted Query Result:", formattedPatients);
    res.json(formattedPatients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPatientByNumber = async (req, res) => {
  try {
    const { patient_number } = req.params;
    const [patient] = await db.query(
      "SELECT * FROM patients WHERE patient_number = ?",
      [patient_number]
    );

    if (patient.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient details" });
  }
};

const addPatient = async (req, res) => {
  const {
    last_name,
    first_name,
    middle_initial,
    nickname,
    age,
    sex_gender,
    date_of_birth,
    civil_status,
    nationality_ethnicity,
    home_address,
    home_phone,
    mobile_no,
    email,
    occupation,
    work_address,
    work_phone,
    parent_guardian,
    parent_contact_number,
    emergency_contact,
    emergency_contact_number,
  } = req.body;

  // Required fields check
  if (
    !last_name ||
    !first_name ||
    !sex_gender ||
    !date_of_birth ||
    !home_address ||
    !mobile_no ||
    !emergency_contact ||
    !emergency_contact_number
  ) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    const query = `
      INSERT INTO patients 
      (last_name, first_name, middle_initial, nickname, age, sex_gender, date_of_birth, civil_status, nationality_ethnicity, 
       home_address, home_phone, mobile_no, email, occupation, work_address, work_phone, parent_guardian, parent_contact_number, 
       emergency_contact, emergency_contact_number)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      last_name,
      first_name,
      middle_initial || null,
      nickname || null,
      age,
      sex_gender,
      date_of_birth,
      civil_status || null,
      nationality_ethnicity || null,
      home_address,
      home_phone || null,
      mobile_no,
      email || null,
      occupation || null,
      work_address || null,
      work_phone || null,
      age < 18 ? parent_guardian : null,
      age < 18 ? parent_contact_number : null,
      emergency_contact,
      emergency_contact_number,
    ];

    const [result] = await db.query(query, values);

    res.status(201).json({
      message: "Patient added successfully!",
      patient_number: result.insertId, // Ensure this matches your database schema
    });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Failed to add patient." });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { patient_number } = req.params;
    const {
      first_name,
      last_name,
      middle_initial,
      nickname,
      age,
      sex_gender,
      date_of_birth,
      civil_status,
      nationality_ethnicity,
      home_address,
      home_phone,
      mobile_no,
      email,
      occupation,
      work_address,
      work_phone,
      parent_guardian,
      parent_contact_number,
      emergency_contact,
      emergency_contact_number,
      profile_photo,
      thumbmark,
    } = req.body;

    console.log("Received update request for:", patient_number);
    console.log("Request body:", req.body);

    // Fetch current patient data
    const [currentPatient] = await db.query(
      "SELECT * FROM patients WHERE patient_number = ?",
      [patient_number]
    );

    if (currentPatient.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const updatedFields = [];
    const updateValues = [];

    // Function to check for changes
    const addIfChanged = (fieldName, newValue, dbValue) => {
      if (newValue !== undefined && newValue !== null && newValue !== "" && newValue !== dbValue) {
        updatedFields.push(`${fieldName} = ?`);
        updateValues.push(newValue);
      }
    };

    addIfChanged("first_name", first_name, currentPatient[0].first_name);
    addIfChanged("last_name", last_name, currentPatient[0].last_name);
    addIfChanged("middle_initial", middle_initial, currentPatient[0].middle_initial);
    addIfChanged("nickname", nickname, currentPatient[0].nickname);
    addIfChanged("age", age, currentPatient[0].age);
    addIfChanged("sex_gender", sex_gender, currentPatient[0].sex_gender);
    addIfChanged("date_of_birth", date_of_birth, currentPatient[0].date_of_birth);
    addIfChanged("civil_status", civil_status, currentPatient[0].civil_status);
    addIfChanged("nationality_ethnicity", nationality_ethnicity, currentPatient[0].nationality_ethnicity);
    addIfChanged("home_address", home_address, currentPatient[0].home_address);
    addIfChanged("home_phone", home_phone, currentPatient[0].home_phone);
    addIfChanged("mobile_no", mobile_no, currentPatient[0].mobile_no);
    addIfChanged("email", email, currentPatient[0].email);
    addIfChanged("occupation", occupation, currentPatient[0].occupation);
    addIfChanged("work_address", work_address, currentPatient[0].work_address);
    addIfChanged("work_phone", work_phone, currentPatient[0].work_phone);
    addIfChanged("parent_guardian", parent_guardian, currentPatient[0].parent_guardian);
    addIfChanged("parent_contact_number", parent_contact_number, currentPatient[0].parent_contact_number);
    addIfChanged("emergency_contact", emergency_contact, currentPatient[0].emergency_contact);
    addIfChanged("emergency_contact_number", emergency_contact_number, currentPatient[0].emergency_contact_number);
    addIfChanged("profile_photo", profile_photo, currentPatient[0].profile_photo);
    addIfChanged("thumbmark", thumbmark, currentPatient[0].thumbmark);

    if (updatedFields.length === 0) {
      return res.status(400).json({ message: "No changes detected" });
    }

    updateValues.push(patient_number);
    const query = `UPDATE patients SET ${updatedFields.join(", ")} WHERE patient_number = ?`;

    console.log("Executing Query:", query, updateValues);

    const [result] = await db.query(query, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Patient not updated" });
    }

    res.json({ message: "Patient updated successfully" });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { patient_number } = req.params;

    // Check if patient exists before deleting
    const [existingPatient] = await db.query(
      "SELECT * FROM patients WHERE patient_number = ?",
      [patient_number]
    );

    if (existingPatient.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Delete the patient
    await db.query("DELETE FROM patients WHERE patient_number = ?", [patient_number]);

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllPatients,
  getPatientByNumber,
  addPatient,
  updatePatient,
  deletePatient,
};
