const db = require("../config/db");

const generateCaseNumber = async () => {
  const [rows] = await db.query(
    "SELECT MAX(case_number) AS last_case FROM cases"
  );
  let lastNumber = rows[0].last_case
    ? parseInt(rows[0].last_case.split("-")[1])
    : 0;
  let newNumber = lastNumber + 1;
  return `C-${String(newNumber).padStart(6, "0")}`;
};

const addCase = async (req, res) => {
  try {
    const {
      patient_number,
      clinician_id,
      clinical_instructor_id,
      clinic,
      chief_complaint,
      medical_history,
      history_of_present_illness,
      dental_history,
      family_history,
      personal_social_history,
      review_of_systems,
      health_assessment,
      health_questionnaire,
      general_appraisal,
      extraoral_examination,
      intraoral_examination,
      periodontal_examination,
      occlusion,
      appliances,
      toothchart,
      diagnostic_test,
      diagnostic_test_notes,
      consent,
      patient_signature,
      clinician_signature,
      clinical_instructor_signature,
      date,
    } = req.body;

    if (!patient_number || !clinician_id) {
      return res
        .status(400)
        .json({ message: "Patient number and clinician ID are required" });
    }

    const case_number = await generateCaseNumber();
    const status = "for approval";
    const date_today = new Date().toISOString().split("T")[0];

    const sql = `INSERT INTO cases (case_number, date_today, patient_number, clinician_id, clinical_instructor_id, clinic, chief_complaint,  medical_history, history_of_present_illness,  dental_history, family_history, personal_social_history, review_of_systems, health_assessment, health_questionnaire, general_appraisal, extraoral_examination, intraoral_examination, periodontal_examination, occlusion, appliances, toothchart, diagnostic_test, diagnostic_test_notes, consent, patient_signature, clinician_signature, clinical_instructor_signature, date, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await db.query(sql, [
      case_number,
      date_today,
      patient_number,
      clinician_id,
      clinical_instructor_id,
      clinic,
      chief_complaint,
      JSON.stringify(medical_history), // Convert JSON to string
      history_of_present_illness,
      dental_history,
      family_history,
      personal_social_history,
      JSON.stringify(review_of_systems),
      JSON.stringify(health_assessment),
      JSON.stringify(health_questionnaire),
      JSON.stringify(general_appraisal),
      JSON.stringify(extraoral_examination),
      JSON.stringify(intraoral_examination),
      JSON.stringify(periodontal_examination),
      JSON.stringify(occlusion),
      appliances,
      toothchart,
      diagnostic_test,
      diagnostic_test_notes,
      JSON.stringify(consent),
      patient_signature,
      clinician_signature,
      clinical_instructor_signature,
      date,
      status,
    ]);

    res
      .status(201)
      .json({ message: "Case submitted successfully", case_number });
  } catch (error) {
    console.error("Error submitting case:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCases = async (req, res) => {
  try {
    const sql = `
        SELECT 
    c.case_number,
    c.patient_number,
    p.first_name AS patient_first_name,
    p.last_name AS patient_last_name,
    c.clinician_id,
    c.clinical_instructor_id,
    u1.first_name AS clinician_first_name,
    u1.last_name AS clinician_last_name,
    u2.first_name AS clinical_instructor_first_name,
    u2.last_name AS clinical_instructor_last_name,
    c.status
FROM cases c
JOIN patients p ON c.patient_number = p.patient_number
JOIN users u1 ON c.clinician_id = u1.student_number
LEFT JOIN users u2 ON c.clinical_instructor_id = u2.student_number
ORDER BY c.created_at DESC;

      `;

    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addCase, getCases };
