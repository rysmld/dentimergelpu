import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Form.css";

const SubjectiveForm = ({
  currentStep,
  nextStep,
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const handlePatientChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      patientSelection: selectedOption.value,
      gender: selectedOption.gender, // Set gender based on selection
    }));
  };

  const formatOptions = (data) =>
    data.map((item) => ({
      value: item.student_number || item.patient_number,
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
      {/* Date and Selection Fields */}
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
          {/* Patient Search */}
          <label>
            Patient Selection:
            <Select
              options={formatPatientOptions(patients)}
              value={
                formatPatientOptions(patients).find(
                  (p) => p.value === formData.patientSelection
                ) || null
              }
              onChange={handlePatientChange}
              isSearchable
              placeholder="Search for a patient..."
            />
          </label>

          {/* Clinician Search */}
          <label>
            Clinician Selection:
            <Select
              options={formatOptions(clinicians)}
              value={formData.clinicianSelection}
              onChange={(selectedOption) =>
                setFormData({ ...formData, clinicianSelection: selectedOption })
              }
              isSearchable
              placeholder="Search for a clinician..."
            />
          </label>

          {/* Clinical Instructor Search */}
          <label>
            Clinical Instructor Selection:
            <Select
              options={formatOptions(clinicalInstructors)}
              value={formData.clinicalInstructorSelection}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  clinicalInstructorSelection: selectedOption,
                })
              }
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
              name="chiefComplaint"
              value={formData.chiefComplaint}
              onChange={handleChange}
            />
          </label>
          <label>
            History of Present Illness:
            <input
              type="text"
              name="historyOfPresentIllness"
              value={formData.historyOfPresentIllness}
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
              name="medicationsTaken"
              value={formData.medicationsTaken}
              onChange={handleChange}
            />
          </label>

          <label>
            Allergy to:
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </label>

          <label>
            Past and Present Illness:
            <input
              type="text"
              name="pastPresentIllness"
              value={formData.pastPresentIllness}
              onChange={handleChange}
            />
          </label>

          <label>
            Last Examined by a Physician? Why? Result?:
            <input
              type="text"
              name="lastExaminedByPhysician"
              value={formData.lastExaminedByPhysician}
              onChange={handleChange}
            />
          </label>

          <label>
            Hospitalization Experience?:
            <input
              type="text"
              name="hospitalizationExperience"
              value={formData.hospitalizationExperience}
              onChange={handleChange}
            />
          </label>

          <label>
            Bleeding Tendencies:
            <input
              type="text"
              name="bleedingTendencies"
              value={formData.bleedingTendencies}
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
              name="dentalHistory"
              value={formData.dentalHistory}
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
              name="familyHistory"
              value={formData.familyHistory}
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
              name="personalSocialHistory"
              value={formData.personalSocialHistory}
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
              name="reviewOfSystems.skin"
              value={formData.reviewOfSystems.skin}
              onChange={handleChange}
            />
          </label>

          <label>
            Extremities:
            <input
              type="text"
              name="reviewOfSystems.extremities"
              value={formData.reviewOfSystems.extremities}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="eyes">
            Eyes
            <input
              type="text"
              id="eyes"
              name="reviewOfSystems.eyes"
              value={formData.reviewOfSystems.eyes}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="ent">
            Ears, Nose, Throat (ENT)
            <input
              type="text"
              id="ent"
              name="reviewOfSystems.ent"
              value={formData.reviewOfSystems.ent}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="respiratory">
            Respiratory
            <input
              type="text"
              id="respiratory"
              name="reviewOfSystems.respiratory"
              value={formData.reviewOfSystems.respiratory}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="cardiovascular">
            Cardiovascular
            <input
              type="text"
              id="cardiovascular"
              name="reviewOfSystems.cardiovascular"
              value={formData.reviewOfSystems.cardiovascular}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="gastrointestinal">
            Gastrointestinal
            <input
              type="text"
              id="gastrointestinal"
              name="reviewOfSystems.gastrointestinal"
              value={formData.reviewOfSystems.gastrointestinal}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="genitourinary">
            Genitourinary
            <input
              type="text"
              id="genitourinary"
              name="reviewOfSystems.genitourinary"
              value={formData.reviewOfSystems.genitourinary}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="endocrine">
            Endocrine
            <input
              type="text"
              id="endocrine"
              name="reviewOfSystems.endocrine"
              value={formData.reviewOfSystems.endocrine}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="hematopoietic">
            Hematopoietic
            <input
              type="text"
              id="hematopoietic"
              name="reviewOfSystems.hematopoietic"
              value={formData.reviewOfSystems.hematopoietic}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="neurological">
            Neurological
            <input
              type="text"
              id="neurological"
              name="reviewOfSystems.neurological"
              value={formData.reviewOfSystems.neurological}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="psychiatric">
            Psychiatric
            <input
              type="text"
              id="psychiatric"
              name="reviewOfSystems.psychiatric"
              value={formData.reviewOfSystems.psychiatric}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="growthTumor">
            Growth/Tumor
            <input
              type="text"
              id="growthTumor"
              name="reviewOfSystems.growthTumor"
              value={formData.reviewOfSystems.growthTumor}
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
            id="lastPhysical"
            name="healthQuestionnaire.lastPhysical"
            value={formData.healthQuestionnaire.lastPhysical}
            onChange={handleChange}
          />
        </label>
        <label>
          The name and address of my personal physician is?
          <input
            type="text"
            id="physician"
            name="healthQuestionnaire.physician"
            value={formData.healthQuestionnaire.physician}
            onChange={handleChange}
          />
        </label>

        {/* Under Care of a Physician */}
        <label>
          Are you now under the care of a physician?
          <select
            name="healthQuestionnaire.underCare"
            id="underCare"
            value={formData.healthQuestionnaire.underCare}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.healthQuestionnaire.underCare === "Yes" && (
          <label>
            What is the Condition being Treated?
            <input
              type="text"
              name="healthQuestionnaire.underCareDetails"
              onChange={handleChange}
              value={formData.healthQuestionnaire.underCareDetails}
            />
          </label>
        )}

        {/* Serious Illness */}
        <label>
          Have you had any serious illness?
          <select
            name="healthQuestionnaire.seriousIllness"
            id="seriousIllnessDetails"
            value={formData.healthQuestionnaire.seriousIllness}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.healthQuestionnaire.seriousIllness === "Yes" && (
          <label>
            What was the illness or operation?
            <input
              type="text"
              name="healthQuestionnaire.seriousIllnessDetails"
              value={formData.healthQuestionnaire.seriousIllnessDetails}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Hospitalized */}
        <label>
          Have you been hospitalized?
          <select
            name="healthQuestionnaire.hospitalized"
            id="hospitalized"
            value={formData.healthQuestionnaire.hospitalized}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.healthQuestionnaire.hospitalized === "Yes" && (
          <label>
            When and What was the problem?
            <input
              type="text"
              value={formData.healthQuestionnaire.hospitalizedDetails}
              name="healthQuestionnaire.hospitalizedDetails"
              onChange={handleChange}
            />
          </label>
        )}

        {/* Abnormal Bleeding */}
        <label>
          Have you had abnormal bleeding associated with previous extractions,
          surgery or trauma?
          <select
            name="healthQuestionnaire.abnormalBleeding"
            id="abnormalBleeding"
            value={formData.healthQuestionnaire.abnormalBleeding}
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
            name="healthQuestionnaire.bruising"
            id="bruising"
            value={formData.healthQuestionnaire.bruising}
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
            name="healthQuestionnaire.bloodTransfusion"
            id="bloodTransfusion"
            value={formData.healthQuestionnaire.bloodTransfusion}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.healthQuestionnaire.bloodTransfusion === "Yes" && (
          <label>
            Under what circumstances?
            <input
              type="text"
              name="healthQuestionnaire.bloodTransfusionDetails"
              value={formData.healthQuestionnaire.bloodTransfusionDetails}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Blood Disorder */}
        <label>
          Do you have any blood disorder such as anemia, including sickle cell
          anemia?
          <select
            name="healthQuestionnaire.bloodDisorder"
            id="bloodDisorder"
            value={formData.healthQuestionnaire.bloodDisorder}
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
            name="healthQuestionnaire.tumorSurgery"
            id="tumorSurgery"
            value={formData.healthQuestionnaire.tumorSurgery}
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
            name="healthQuestionnaire.medications"
            id="medications"
            value={formData.healthQuestionnaire.medications}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.healthQuestionnaire.medications === "Yes" && (
          <label>
            What Medicines?
            <input
              type="text"
              name="healthQuestionnaire.medicationsDetails"
              value={formData.healthQuestionnaire.medicationsDetails}
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
            name="healthQuestionnaire.diseases.rheumaticFever"
            id="rheumaticFever"
            value={formData.healthQuestionnaire.diseases.rheumaticFever}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Heart Abnormalities present since birth
          <select
            name="healthQuestionnaire.diseases.heartAbnormalities"
            id="heartAbnormalities"
            value={formData.healthQuestionnaire.diseases.heartAbnormalities}
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
            name="healthQuestionnaire.diseases.cardiovascularDisease"
            id="cardiovascularDisease"
            value={formData.healthQuestionnaire.diseases.cardiovascularDisease}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Childhood Diseases?
          <select
            name="healthQuestionnaire.childhoodDiseases"
            id="childhoodDiseases"
            value={formData.healthQuestionnaire.childhoodDiseases}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.healthQuestionnaire.childhoodDiseases === "Yes" && (
          <label>
            What are they?
            <input
              type="text"
              name="healthQuestionnaire.childhoodDiseasesDetails"
              onChange={handleChange}
            />
          </label>
        )}

        <label>
          Asthma or Hay Fever
          <select
            name="healthQuestionnaire.diseases.asthma"
            id="asthma"
            value={formData.healthQuestionnaire.diseases.asthma}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Hives or Skin Rash
          <select
            name="healthQuestionnaire.diseases.hives"
            id="hives"
            value={formData.healthQuestionnaire.diseases.hives}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Fainting spells or Seizures
          <select
            name="healthQuestionnaire.diseases.fainting"
            id="fainting"
            value={formData.healthQuestionnaire.diseases.fainting}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Diabetes
          <select
            name="healthQuestionnaire.diseases.diabetes"
            id="diabetes"
            value={formData.healthQuestionnaire.diseases.diabetes}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Do you have to Urinate more than six times a day?
          <select
            name="healthQuestionnaire.diseases.frequentUrination"
            id="frequentUrination"
            value={formData.healthQuestionnaire.diseases.frequentUrination}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Are you thirsty much of the time?
          <select
            name="healthQuestionnaire.diseases.thirstiness"
            id="dryMouth"
            value={formData.healthQuestionnaire.diseases.thirstiness}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Does your mouth usually feel dry?
          <select
            name="healthQuestionnaire.diseases.dryMouth"
            id="dryMouth"
            value={formData.healthQuestionnaire.diseases.dryMouth}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Hepatitis, Jaundice or Liver Disease
          <select
            name="healthQuestionnaire.diseases.hepatitis"
            id="hepatitis"
            value={formData.healthQuestionnaire.diseases.hepatitis}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Arthritis or other joint problems
          <select
            name="healthQuestionnaire.diseases.arthritis"
            id="arthritis"
            value={formData.healthQuestionnaire.diseases.arthritis}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Stomach Ulcers
          <select
            name="healthQuestionnaire.diseases.stomachUlcers"
            id="stomachUlcers"
            value={formData.healthQuestionnaire.diseases.stomachUlcers}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Kidney Trouble
          <select
            name="healthQuestionnaire.diseases.kidneyTrouble"
            id="kidneyTrouble"
            value={formData.healthQuestionnaire.diseases.kidneyTrouble}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Tuberculosis
          <select
            name="healthQuestionnaire.diseases.tuberculosis"
            id="tuberculosis"
            value={formData.healthQuestionnaire.diseases.tuberculosis}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Venereal Disease
          <select
            name="healthQuestionnaire.diseases.venerealDisease"
            id="venerealDisease"
            value={formData.healthQuestionnaire.diseases.venerealDisease}
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
            id="otherConditions"
            name="healthQuestionnaire.diseases.otherConditions"
            value={formData.healthQuestionnaire.diseases.otherConditions}
            onChange={handleChange}
          />
        </label>

        {/* Allergy */}
        <label>Are you allergic or have you reacted adversely to:</label>

        <label>
          Local Anesthetics
          <select
            name="healthQuestionnaire.allergies.localAnesthetics"
            id="localAnesthetics"
            value={formData.healthQuestionnaire.allergies.localAnesthetics}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Penicillin
          <select
            name="healthQuestionnaire.allergies.penicillin"
            id="penicillin"
            value={formData.healthQuestionnaire.allergies.penicillin}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Aspirin
          <select
            name="healthQuestionnaire.allergies.aspirin"
            id="aspirin"
            value={formData.healthQuestionnaire.allergies.aspirin}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label>
          Latex Gloves
          <select
            name="healthQuestionnaire.allergies.latexGloves"
            id="latexGloves"
            value={formData.healthQuestionnaire.allergies.latexGloves}
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
            name="healthQuestionnaire.allergies.others"
            id="others"
            value={formData.healthQuestionnaire.allergies.othersAllergies}
            placeholder="Specify other allergies"
            onChange={handleChange}
          />
        </label>

        {/* Dental Trouble */}
        <label>
          Have you had any serious trouble associated with any previous dental
          treatment?
          <select
            name="healthQuestionnaire.dentalTrouble"
            id="healthQuestionnaire.dentalTrouble"
            value={formData.healthQuestionnaire.dentalTrouble}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.healthQuestionnaire.dentalTrouble === "Yes" && (
          <label>
            What Trouble?
            <input
              type="text"
              name="healthQuestionnaire.dentalTroubleDetails"
              value={formData.healthQuestionnaire.dentalTroubleDetails}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Unlisted Disease */}
        <label>
          Do you have any disease, condition, or problem not listed above that
          you think I should know about?
          <select
            name="healthQuestionnaire.unlistedDisease"
            id="healthQuestionnaire.unlistedDisease"
            value={formData.healthQuestionnaire.unlistedDisease}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        {formData.healthQuestionnaire.unlistedDisease === "Yes" && (
          <label>
            What disease?
            <input
              type="text"
              name="healthQuestionnaire.unlistedDiseaseDetails"
              value={formData.healthQuestionnaire.unlistedDiseaseDetails}
              onChange={handleChange}
            />
          </label>
        )}

        {/* Radiation Exposure */}
        <label>
          Are you employed in any situation which exposes you regularly to
          x-rays or other ionizing radiation?
          <select
            name="healthQuestionnaire.radiationExposure"
            id="radiationExposure"
            value={formData.healthQuestionnaire.radiationExposure}
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
            name="healthQuestionnaire.glasses"
            id="glasses"
            value={formData.healthQuestionnaire.glasses}
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
                name="healthQuestionnaire.menstrualPeriod"
                id="menstrualPeriod"
                value={formData.healthQuestionnaire.menstrualPeriod}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>

            <label>
              Are you presently breastfeeding?
              <select
                name="healthQuestionnaire.breastFeeding"
                id="breastFeeding"
                value={formData.healthQuestionnaire.breastFeeding}
                onChange={handleChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </>
        )}
      </fieldset>

      {/* Health Assessment */}
      <fieldset>
        <legend>Health Assessment</legend>
        <div className="form-grid">
          <label>
            ASA:
            <select
              type="text"
              name="healthAssessment.asa"
              value={formData.healthAssessment.asa}
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
              name="healthAssessment.asaNotes"
              value={formData.healthAssessment.asaNotes}
              onChange={handleChange}
            />
          </label>
        </div>
      </fieldset>

      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default SubjectiveForm;
