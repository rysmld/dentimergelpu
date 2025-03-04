import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectiveForm from "./SubjectiveForm";
import ObjectiveForm from "./ObjectiveForm";
import DentalForm from "./DentalForm";
import ConsentForm from "./ConsentForm";
import "./Form.css";

const AddCaseForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const formContainer = document.querySelector(".form-container");
    if (formContainer) {
      formContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  // const validateForm = () => {
  //   if (currentStep === 1) {
  //     if (!formData.patient_selection || !formData.clinician_selection) {
  //       alert("Please fill out all required fields.");
  //       return false;
  //     }
  //   }
  //   // Add validation for other steps as needed
  //   return true;
  // };

  const nextPage = () => {
    setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const [formData, setFormData] = useState({
    //Subjective Data
    date_today: "",
    patient_selection: "",
    clinician_selection: "",
    clinical_instructor_selection: "",
    clinic_selection: "",
    chief_complaint: "",
    history_of_present_illness: "",
    medical_history: {
      meds: "",
      allergies: "",
      past_illness: "",
      last_exam: "",
      hospitalization: "",
      bleeding_tendencies: "",
    },
    contraceptives: "",
    dental_history: "",
    family_history: "",
    personal_social_history: "",
    review_of_systems: {
      skin: "",
      extremities: "",
      eyes: "",
      ent: "",
      respiratory: "",
      cardiovascular: "",
      gastrointestinal: "",
      genitourinary: "",
      endocrine: "",
      hematopoietic: "",
      neurological: "",
      psychiatric: "",
      growth_tumor: "",
    },
    health_assessment: {
      asa: "",
      asa_notes: "",
    },
    health_questionnaire: {
      last_physical: "",
      physician: "",
      under_care: "No",
      under_care_details: "",
      serious_illness: "No",
      serious_illness_details: "",
      hospitalized: "",
      hospitalized_details: "",
      abnormal_bleeding: "No",
      bruising: "No",
      blood_transfusion: "",
      blood_transfusion_details: "",
      blood_disorder: "No",
      tumor_surgery: "No",
      medications: "",
      medications_details: "",
      diseases: {
        rheumatic_fever: "No",
        heart_abnormalities: "No",
        cardiovascular_disease: "No",
        childhood_diseases: "",
        childhood_diseases_details: "",
        asthma: "No",
        hives: "No",
        fainting: "No",
        diabetes: "No",
        frequent_urination: "No",
        thirstiness: "No",
        dry_mouth: "No",
        hepatitis: "No",
        arthritis: "No",
        stomach_ulcers: "No",
        kidney_trouble: "No",
        tuberculosis: "No",
        venereal_disease: "No",
        other_conditions: "",
      },
      allergies: {
        local_anesthetics: "No",
        penicillin: "No",
        aspirin: "No",
        latex_gloves: "No",
        other_allergies: "",
      },
      dental_trouble: "",
      dental_trouble_details: "",
      unlisted_disease: "",
      unlisted_disease_details: "",
      radiation_exposure: "No",
      glasses: "No",
      menstrual_period: "",
      breast_feeding: "",
    },

    // Objective Data
    general_health: "",
    physical: "",
    mental: "",
    temperature: "",
    blood_pressure: "",
    respiratory_rate: "",
    pulse_rate: "",
    other_general_notes: "",
    extraoral_examination: {
      head_face: "",
      eyes: "",
      ears: "",
      nose: "",
      hair: "",
      neck: "",
      paranasal: "",
      lymph_nodes: "",
      salivary_glands: "",
      tmj: "",
      muscles_of_mastication: "",
      other_extraoral: "",
    },
    intraoral_examination: {
      lips: "",
      buccal_mucosa: "",
      alveolar_mucosa: "",
      floor_of_mouth: "",
      tongue: "",
      saliva: "",
      pillars_of_fauces: "",
      tonsils: "",
      uvula: "",
      oropharynx: "",
      other_intraoral: "",
    },
    periodontal_examination: {
      gingiva: "",
      degree_of_inflammation: "",
      degree_of_deposits: "",
    },
    occlusion: {
      molar_class_left: "",
      molar_class_right: "",
      canine_class_left: "",
      canine_class_right: "",
      incisal_class_left: "",
      incisal_class_right: "",
      overjet: false,
      overbite: false,
      midline_deviation: false,
      crossbite: false,
    },
    appliances: "",

    // Dental Data
    toothchart: "",
    diagnostic_test: "",
    diagnostic_test_notes: "",
    assessement_plan: "",

    // Consent Data
    treatment_consent: "",
    drugs_consent: "",
    changes_consent: "",
    radiograph_consent: "",
    removal_consent: "",
    crowns_consent: "",
    root_canal_consent: "",
    periodontal_consent: "",
    fillings_consent: "",
    dentures_consent: "",
    patient_signature: "",
    witness_signature: "",
    clinician_signature: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split("."); // Split nested names like "medical_history.medicines"

    setFormData((prev) => {
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const submitCase = async (formData) => {
    console.log("Submitting form data:", formData); // Debugging

    if (!formData.patient_number || !formData.clinician_id) {
      alert("Patient and Clinician are required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/cases/submit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Case submitted:", response.data);
      console.log(
        "Form data size:",
        JSON.stringify(formData).length / 1024,
        "KB"
      );
      alert("Case submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting case:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to submit case. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      // Reset all fields to their initial values
    });
    setCurrentStep(1);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (currentStep === 4) {
          submitCase(formData);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && currentStep < 4) {
          e.preventDefault(); // Prevents accidental submission
        }
      }}
    >
      <div>
        {currentStep === 1 && (
          <SubjectiveForm
            nextPage={nextPage}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        )}
        {currentStep === 2 && (
          <ObjectiveForm
            nextPage={nextPage}
            prevPage={prevPage}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        )}
        {currentStep === 3 && (
          <DentalForm
            nextPage={nextPage}
            prevPage={prevPage}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        )}
        {currentStep === 4 && (
          <ConsentForm
            prevPage={prevPage}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
        )}

        {currentStep > 1 && (
          <button type="button" onClick={prevPage} aria-label="Previous Step">
            Back
          </button>
        )}
        {currentStep < 4 ? (
          <button type="button" onClick={nextPage}>
            Next
          </button>
        ) : (
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
};

export default AddCaseForm;