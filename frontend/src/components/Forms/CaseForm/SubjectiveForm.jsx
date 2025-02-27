import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Form.css";

const SubjectiveForm = ({
  currentStep,
  nextPage,
  formData,
  setFormData,
  handleChange,
}) => {
  const [patients, setPatients] = useState([]);
  const [clinicians, setClinicians] = useState([]);
  const [clinicalInstructors, setClinicalInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setFunction) => {
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setFunction(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData("http://localhost:5000/api/users/role/clinician", setClinicians);
    fetchData(
      "http://localhost:5000/api/users/role/clinical instructor",
      setClinicalInstructors
    );
    fetchData("http://localhost:5000/api/users/patients", setPatients);
  }, []);

  const handlePatientChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      patient_number: selectedOption.value, // Map to patient_number
      gender: selectedOption.gender, // Set gender based on selection
    }));
  };

  const handleClinicianChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      clinician_id: selectedOption ? selectedOption.value : null, // Map to clinician_id
    }));
  };

  const handleClinicalInstructorChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      clinical_instructor_id: selectedOption ? selectedOption.value : null, // Map to clinical_instructor_id
    }));
  };

  const formatOptions = (data, role) =>
    data.map((item) => ({
      value: role === "patient" ? item.patient_number : item.student_number,
      label: `${item.first_name} ${item.last_name}`,
    }));

  const formatPatientOptions = (patients) =>
    patients.map((patient) => ({
      value: patient.patient_number,
      label: `${patient.first_name} ${patient.last_name}`,
      gender: patient.sex_gender, // Include gender in selection options
    }));

  return (
    <div className="form-container">
      <h2>SUBJECTIVE</h2>
      <fieldset>
        <div className="form-grid">
          <label>
            Date Today:
            <input
              type="date"
              name="dateToday"
              value={formData.dateToday}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="clinic">
            Clinic:
            <select
              name="clinic"
              id="clinic"
              value={formData.clinic}
              onChange={handleChange}
            >
              <option value="">Select Clinic</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </label>
        </div>
        <br />
        <div className="form-grid">
          <label>
            Patient Selection:
            <Select
              options={formatPatientOptions(patients)}
              value={
                formatPatientOptions(patients).find(
                  (p) => p.value === formData.patient_number
                ) || null
              }
              onChange={handlePatientChange}
              isSearchable
              placeholder="Search for a patient..."
            />
          </label>

          <label>
            Clinician Selection:
            <Select
              options={formatOptions(clinicians, "clinician")}
              value={
                formatOptions(clinicians, "clinician").find(
                  (c) => c.value === formData.clinician_id
                ) || null
              }
              onChange={handleClinicianChange}
              isSearchable
              placeholder="Search for a clinician..."
            />
          </label>

          <label>
            Clinical Instructor Selection:
            <Select
              options={formatOptions(
                clinicalInstructors,
                "clinical_instructor"
              )}
              value={
                formatOptions(clinicalInstructors, "clinical_instructor").find(
                  (ci) => ci.value === formData.clinical_instructor_id
                ) || null
              }
              onChange={handleClinicalInstructorChange}
              isSearchable
              placeholder="Search for a clinical instructor..."
            />
          </label>
        </div>
      </fieldset>

      {/* Chief Complaint & History of Present Illness */}
      <fieldset>
        <div className="form-grid">
          <label>
            Chief Complaint:
            <input
              type="text"
              name="chief_complaint"
              value={formData.chief_complaint}
              onChange={handleChange}
            />
          </label>
          <label>
            History of Present Illness:
            <input
              type="text"
              name="history_of_present_illness"
              value={formData.history_of_present_illness}
              onChange={handleChange}
            />
          </label>
        </div>
      </fieldset>

      {/* Medical History */}
      <fieldset>
        <legend>Medical History</legend>
        <div className="form-grid">
          <label>
            Medications Taken? Why?
            <input
              type="text"
              name="medical_history.medicines"
              value={formData.medical_history.medicinces || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Allergy to:
            <input
              type="text"
              name="medical_history.allergies"
              value={formData.medical_history.allergies || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Past and Present Illness:
            <input
              type="text"
              name="medical_history.past_illness"
              value={formData.medical_history.past_illness || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Last Examined by a Physician? Why? Result?:
            <input
              type="text"
              name="medical_history.last_exam"
              value={formData.medical_history.last_exam || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Hospitalization Experience?:
            <input
              type="text"
              name="medical_history.hospitalization"
              value={formData.medical_history.hospitalization || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Bleeding Tendencies:
            <input
              type="text"
              name="medical_history.bleeding_tendencies"
              value={formData.medical_history.bleeding_tendencies || ""}
              onChange={handleChange}
            />
          </label>

          {formData.gender === "Female" && (
            <label>
              Contraceptives, Pregnancy, Changes in Menstrual Pattern,
              Breastfeeding:
              <input
                type="text"
                name="contraceptives"
                value={formData.contraceptives}
                onChange={handleChange}
              />
            </label>
          )}
        </div>
      </fieldset>

      {/* Dental History */}
      <fieldset>
        <div className="form-grid">
          <label>
            Dental History:
            <input
              type="text"
              name="dental_history"
              value={formData.dental_history}
              onChange={handleChange}
            />
          </label>
        </div>
      </fieldset>

      {/* Family History */}
      <fieldset>
        <div>
          <label>
            Family History:
            <input
              type="text"
              name="family_history"
              value={formData.family_history}
              onChange={handleChange}
            />
          </label>
        </div>
      </fieldset>

      {/* Personal and Social History */}
      <fieldset>
        <div>
          <label>
            Personal and Social History:
            <input
              type="text"
              name="personal_social_history"
              value={formData.personal_social_history}
              onChange={handleChange}
            />
          </label>
        </div>
      </fieldset>

      {/* Review of Systems Section */}
      <fieldset>
        <legend>Review of Systems</legend>
        <div className="form-grid">
          <label>
            Skin:
            <input
              type="text"
              id="skin"
              name="review_of_systems.skin"
              value={formData.review_of_systems.skin}
              onChange={handleChange}
            />
          </label>

          <label>
            Extremities:
            <input
              type="text"
              name="review_of_systems.extremities"
              value={formData.review_of_systems.extremities}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="eyes">
            Eyes
            <input
              type="text"
              id="eyes"
              name="review_of_systems.eyes"
              value={formData.review_of_systems.eyes}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="ent">
            Ears, Nose, Throat (ENT)
            <input
              type="text"
              id="ent"
              name="review_of_systems.ent"
              value={formData.review_of_systems.ent}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="respiratory">
            Respiratory
            <input
              type="text"
              id="respiratory"
              name="review_of_systems.respiratory"
              value={formData.review_of_systems.respiratory}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="cardiovascular">
            Cardiovascular
            <input
              type="text"
              id="cardiovascular"
              name="review_of_systems.cardiovascular"
              value={formData.review_of_systems.cardiovascular}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="gastrointestinal">
            Gastrointestinal
            <input
              type="text"
              id="gastrointestinal"
              name="review_of_systems.gastrointestinal"
              value={formData.review_of_systems.gastrointestinal}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="genitourinary">
            Genitourinary
            <input
              type="text"
              id="genitourinary"
              name="review_of_systems.genitourinary"
              value={formData.review_of_systems.genitourinary}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="endocrine">
            Endocrine
            <input
              type="text"
              id="endocrine"
              name="review_of_systems.endocrine"
              value={formData.review_of_systems.endocrine}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="hematopoietic">
            Hematopoietic
            <input
              type="text"
              id="hematopoietic"
              name="review_of_systems.hematopoietic"
              value={formData.review_of_systems.hematopoietic}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="neurological">
            Neurological
            <input
              type="text"
              id="neurological"
              name="review_of_systems.neurological"
              value={formData.review_of_systems.neurological}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="psychiatric">
            Psychiatric
            <input
              type="text"
              id="psychiatric"
              name="review_of_systems.psychiatric"
              value={formData.review_of_systems.psychiatric}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="growthTumor">
            Growth/Tumor
            <input
              type="text"
              id="growthTumor"
              name="review_of_systems.growthTumor"
              value={formData.review_of_systems.growthTumor}
              onChange={handleChange}
            />
          </label>
        </div>
      </fieldset>

      {/* Health Assessment */}
      <fieldset>
        <legend>Health Assessment</legend>
        <div className="form-grid">
          <label>
            ASA:
            <select
              type="text"
              name="health_assessment.asa"
              value={formData.health_assessment.asa || ""}
              onChange={handleChange}
            >
              <option value="">Select Clinic</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </label>

          <label>
            Notes:
            <input
              type="text"
              name="health_assessment.asa_notes"
              value={formData.health_assessment.asa_notes || ""}
              onChange={handleChange}
            />
          </label>
        </div>
      </fieldset>

      {/* Health Questionnaire Section */}
      <fieldset className="fieldset-spacing">
        <legend>Health Questionnaire</legend>

        {/* Last Medical Physical Evaluation */}
        <label>
          My last medical physical evaluation was on (approximately)?
          <input
            type="date"
            id="last_physical"
            name="health_questionnaire.last_physical"
            value={formData.health_questionnaire.last_physical}
            onChange={handleChange}
          />
        </label>
        <label>
          The name and address of my personal physician is?
          <input
            type="text"
            id="physician"
            name="health_questionnaire.physician"
            value={formData.health_questionnaire.physician}
            onChange={handleChange}
          />
        </label>

        {/* Under Care of a Physician */}
        <label>
          Are you now under the care of a physician?
          <select
            name="health_questionnaire.under_care"
            id="under_care"
            value={formData.health_questionnaire.under_care}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.health_questionnaire.under_care === "Yes" && (
          <label>
            What is the Condition being Treated?
            <input
              type="text"
              name="health_questionnaire.under_care_details"
              onChange={handleChange}
              value={formData.health_questionnaire.under_care_details}
            />
          </label>
        )}

        {/* Serious Illness */}
        <label>
          Have you had any serious illness?
          <select
            name="health_questionnaire.serious_illness"
            id="serious_illnessDetails"
            value={formData.health_questionnaire.serious_illness}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.health_questionnaire.serious_illness === "Yes" && (
          <label>
            What was the illness or operation?
            <input
              type="text"
              name="health_questionnaire.serious_illness_details"
              value={formData.health_questionnaire.serious_illness_details}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Hospitalized */}
        <label>
          Have you been hospitalized?
          <select
            name="health_questionnaire.hospitalized"
            id="hospitalized"
            value={formData.health_questionnaire.hospitalized}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.health_questionnaire.hospitalized === "Yes" && (
          <label>
            When and What was the problem?
            <input
              type="text"
              value={formData.health_questionnaire.hospitalized_details}
              name="health_questionnaire.hospitalized_details"
              onChange={handleChange}
            />
          </label>
        )}

        {/* Abnormal Bleeding */}
        <label>
          Have you had abnormal bleeding associated with previous extractions,
          surgery or trauma?
          <select
            name="health_questionnaire.abnormal_bleeding"
            id="abnormal_bleeding"
            value={formData.health_questionnaire.abnormal_bleeding}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Bruising */}
        <label>
          Do you bruise easily?
          <select
            name="health_questionnaire.bruising"
            id="bruising"
            value={formData.health_questionnaire.bruising}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Blood Transfusion */}
        <label>
          Have you ever required a blood transfusion?
          <select
            name="health_questionnaire.blood_transfusion"
            id="blood_transfusion"
            value={formData.health_questionnaire.blood_transfusion}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.health_questionnaire.blood_transfusion === "Yes" && (
          <label>
            Under what circumstances?
            <input
              type="text"
              name="health_questionnaire.blood_transfusion_details"
              value={formData.health_questionnaire.blood_transfusion_details}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Blood Disorder */}
        <label>
          Do you have any blood disorder such as anemia, including sickle cell
          anemia?
          <select
            name="health_questionnaire.blood_disorder"
            id="blood_disorder"
            value={formData.health_questionnaire.blood_disorder}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Tumor/Surgery */}
        <label>
          Have you had surgery or radiation treatment for a tumor, cancer, or
          other condition of your head or neck?
          <select
            name="health_questionnaire.tumor_surgery"
            id="tumor_surgery"
            value={formData.health_questionnaire.tumor_surgery}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Medications */}
        <label>
          Are you taking any drugs or medicines?
          <select
            name="health_questionnaire.medications"
            id="medications"
            value={formData.health_questionnaire.medications}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.health_questionnaire.medications === "Yes" && (
          <label>
            What Medicines?
            <input
              type="text"
              name="health_questionnaire.medications_details"
              value={formData.health_questionnaire.medications_details}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Diseases */}
        <label>
          Do you have or have you had any of the following diseases or problems:
        </label>

        <label>
          Rheumatic Fever
          <select
            name="health_questionnaire.diseases.rheumatic_fever"
            id="rheumatic_fever"
            value={formData.health_questionnaire.diseases.rheumatic_fever}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Heart Abnormalities present since birth
          <select
            name="health_questionnaire.diseases.heart_abnormalities"
            id="heart_abnormalities"
            value={formData.health_questionnaire.diseases.heart_abnormalities}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Cardiovascular Disease (heart trouble, heart attack, angina, stroke,
          high blood pressure, heart murmur)
          <select
            name="health_questionnaire.diseases.cardiovascular_disease"
            id="cardiovascular_disease"
            value={
              formData.health_questionnaire.diseases.cardiovascular_disease
            }
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Childhood Diseases?
          <select
            name="health_questionnaire.childhood_diseases"
            id="childhood_diseases"
            value={formData.health_questionnaire.childhood_diseases}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.health_questionnaire.childhood_diseases === "Yes" && (
          <label>
            What are they?
            <input
              type="text"
              name="health_questionnaire.childhood_diseases_details"
              value={formData.health_questionnaire.childhood_diseases_details}
              onChange={handleChange}
            />
          </label>
        )}

        <label>
          Asthma or Hay Fever
          <select
            name="health_questionnaire.diseases.asthma"
            id="asthma"
            value={formData.health_questionnaire.diseases.asthma}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Hives or Skin Rash
          <select
            name="health_questionnaire.diseases.hives"
            id="hives"
            value={formData.health_questionnaire.diseases.hives}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Fainting spells or Seizures
          <select
            name="health_questionnaire.diseases.fainting"
            id="fainting"
            value={formData.health_questionnaire.diseases.fainting}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Diabetes
          <select
            name="health_questionnaire.diseases.diabetes"
            id="diabetes"
            value={formData.health_questionnaire.diseases.diabetes}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Do you have to Urinate more than six times a day?
          <select
            name="health_questionnaire.diseases.frequent_urination"
            id="frequent_urination"
            value={formData.health_questionnaire.diseases.frequent_urination}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Are you thirsty much of the time?
          <select
            name="health_questionnaire.diseases.thirstiness"
            id="dry_mouth"
            value={formData.health_questionnaire.diseases.thirstiness}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Does your mouth usually feel dry?
          <select
            name="health_questionnaire.diseases.dry_mouth"
            id="dry_mouth"
            value={formData.health_questionnaire.diseases.dry_mouth}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Hepatitis, Jaundice or Liver Disease
          <select
            name="health_questionnaire.diseases.hepatitis"
            id="hepatitis"
            value={formData.health_questionnaire.diseases.hepatitis}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Arthritis or other joint problems
          <select
            name="health_questionnaire.diseases.arthritis"
            id="arthritis"
            value={formData.health_questionnaire.diseases.arthritis}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Stomach Ulcers
          <select
            name="health_questionnaire.diseases.stomachUlcers"
            id="stomachUlcers"
            value={formData.health_questionnaire.diseases.stomachUlcers}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Kidney Trouble
          <select
            name="health_questionnaire.diseases.kidney_trouble"
            id="kidney_trouble"
            value={formData.health_questionnaire.diseases.kidney_trouble}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Tuberculosis
          <select
            name="health_questionnaire.diseases.tuberculosis"
            id="tuberculosis"
            value={formData.health_questionnaire.diseases.tuberculosis}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Venereal Disease
          <select
            name="health_questionnaire.diseases.venereal_disease"
            id="venereal_disease"
            value={formData.health_questionnaire.diseases.venereal_disease}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Other Conditions
          <input
            type="text"
            id="other_conditions"
            name="health_questionnaire.diseases.other_conditions"
            value={formData.health_questionnaire.diseases.other_conditions}
            onChange={handleChange}
          />
        </label>

        {/* Allergy */}
        <label>Are you allergic or have you reacted adversely to:</label>

        <label>
          Local Anesthetics
          <select
            name="health_questionnaire.allergies.local_anesthetics"
            id="local_anesthetics"
            value={formData.health_questionnaire.allergies.local_anesthetics}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Penicillin
          <select
            name="health_questionnaire.allergies.penicillin"
            id="penicillin"
            value={formData.health_questionnaire.allergies.penicillin}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Aspirin
          <select
            name="health_questionnaire.allergies.aspirin"
            id="aspirin"
            value={formData.health_questionnaire.allergies.aspirin}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Latex Gloves
          <select
            name="health_questionnaire.allergies.latex_gloves"
            id="latex_gloves"
            value={formData.health_questionnaire.allergies.latex_gloves}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Other Allergies (please specify):
          <input
            type="text"
            name="health_questionnaire.allergies.other_allergies"
            id="others"
            value={formData.health_questionnaire.allergies.other_allergies}
            placeholder="Specify other allergies"
            onChange={handleChange}
          />
        </label>

        {/* Dental Trouble */}
        <label>
          Have you had any serious trouble associated with any previous dental
          treatment?
          <select
            name="health_questionnaire.dental_trouble"
            id="health_questionnaire.dental_trouble"
            value={formData.health_questionnaire.dental_trouble}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.health_questionnaire.dental_trouble === "Yes" && (
          <label>
            What Trouble?
            <input
              type="text"
              name="health_questionnaire.dental_trouble_details"
              value={formData.health_questionnaire.dental_trouble_details}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Unlisted Disease */}
        <label>
          Do you have any disease, condition, or problem not listed above that
          you think I should know about?
          <select
            name="health_questionnaire.unlisted_disease"
            id="health_questionnaire.unlisted_disease"
            value={formData.health_questionnaire.unlisted_disease}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.health_questionnaire.unlisted_disease === "Yes" && (
          <label>
            What disease?
            <input
              type="text"
              name="health_questionnaire.unlisted_disease_details"
              value={formData.health_questionnaire.unlisted_disease_details}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Radiation Exposure */}
        <label>
          Are you employed in any situation which exposes you regularly to
          x-rays or other ionizing radiation?
          <select
            name="health_questionnaire.radiation_exposure"
            id="radiation_exposure"
            value={formData.health_questionnaire.radiation_exposure}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Glasses */}
        <label>
          Are you wearing eyeglasses or contact lenses?
          <select
            name="health_questionnaire.glasses"
            id="glasses"
            value={formData.health_questionnaire.glasses}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* If Female Patient */}
        {formData.gender === "Female" && (
          <>
            <label>
              Are you pregnant or have you recently missed a menstrual period?
              <select
                name="health_questionnaire.menstrual_period"
                id="menstrual_period"
                value={formData.health_questionnaire.menstrual_period}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>

            <label>
              Are you presently breastfeeding?
              <select
                name="health_questionnaire.breast_feeding"
                id="breast_feeding"
                value={formData.health_questionnaire.breast_feeding}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </>
        )}
      </fieldset>
    </div>
  );
};

export default SubjectiveForm;
