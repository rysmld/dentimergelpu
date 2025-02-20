import React, { useState, useEffect } from "react";
import SubjectiveForm from "./SubjectiveForm";
import ObjectiveForm from "./ObjectiveForm";
import DentalForm from "./DentalForm";
import ConsentForm from "./ConsentForm";
import "./Form.css";

const AddCaseForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    //Subjective Data
    dateToday: "",
    patientSelection: "",
    clinicianSelection: "",
    clinicalInstructorSelection: "",
    clinicSelection: "",
    chiefComplaint: "",
    historyOfPresentIllness: "",
    medicalHistory: {
      medications: "",
      allergies: "",
      pastIllness: "",
      lastExam: "",
      hospitalization: "",
      bleedingTendencies: "",
    },
    contraceptives: "",
    dentalHistory: "",
    familyHistory: "",
    personalSocialHistory: "",
    reviewOfSystems: {
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
      growthTumor: "",
    },
    healthQuestionnaire: {
      lastPhysical: "",
      physician: "",
      underCare: "No",
      underCareDetails: "",
      seriousIllness: "No",
      seriousIllnessDetails: "",
      hospitalized: "",
      hospitalizedDetails: "",
      abnormalBleeding: "No",
      bruising: "No",
      bloodTransfusion: "",
      bloodTransfusionDetails: "",
      bloodDisorder: "No",
      tumorSurgery: "No",
      medications: "",
      medicationsDetails: "",
      diseases: {
        rheumaticFever: "No",
        heartAbnormalities: "No",
        cardiovascularDisease: "No",
        childhoodDiseases: "",
        childhoodDiseasesDetails: "",
        asthma: "No",
        hives: "No",
        fainting: "No",
        diabetes: "No",
        frequentUrination: "No",
        thirstiness: "No",
        dryMouth: "No",
        hepatitis: "No",
        arthritis: "No",
        stomachUlcers: "No",
        kidneyTrouble: "No",
        tuberculosis: "No",
        venerealDisease: "No",
        otherConditions: "",
      },
      allergies: {
        localAnesthetics: "No",
        penicillin: "No",
        aspirin: "No",
        latexGloves: "No",
        othersAllergies: "",
      },
      dentalTrouble: "",
      dentalTroubleDetails: "",
      unlistedDisease: "",
      unlistedDiseaseDetails: "",
      radiationExposure: "No",
      glasses: "No",
      menstrualPeriod: "",
      breastFeeding: "",
    },
    healthAssessment: {
      asa: "",
      asaNotes: "",
    },

    //Objective Data
    generalHealth: "",
    physical: "",
    mental: "",
    temperature: "",
    bloodPressure: "",
    respiratoryRate: "",
    pulseRate: "",
    otherGeneralNotes: "",
    extraoralExamination: {
      headFace: "",
      eyes: "",
      ears: "",
      nose: "",
      hair: "",
      neck: "",
      paranasal: "",
      lymphNodes: "",
      salivaryGlands: "",
      tmj: "",
      musclesOfMastication: "",
      otherExtraoral: "",
    },
    intraoralExamination: {
      lips: "",
      buccalMucosa: "",
      alveolarMucosa: "",
      floorOfMouth: "",
      tongue: "",
      saliva: "",
      pillarsOfFauces: "",
      tonsils: "",
      uvula: "",
      oropharynx: "",
      otherIntraoral: "",
    },
    periodontalExamination: {
      gingiva: "",
      degreeOfInflammation: "",
      degreeOfDeposits: "",
    },
    occlusion: {
      molarClassLeft: "",
      molarClassRight: "",
      canineClassLeft: "",
      canineClassRight: "",
      incisalClassLeft: "",
      incisalClassRight: "",
      overjet: false,
      overbite: false,
      midlineDeviation: false,
      crossbite: false,
    },
    appliances: "",

    //Dental Data
    toothchart: "",
    diagnosticeTest: "", 
    diagnosticeTestNotes:"",

    // Consent Data
    treatmentConsent: "",
    drugsConsent: "",
    changesConsent: "",
    radiographConsent: "",
    removalConsent: "",
    crownsConsent: "",
    rootCanalConsent: "",
    periodontalConsent: "",
    fillingsConsent: "",
    denturesConsent: "",
    patientSignature: "",
    witnessSignature: "",
    clinicianSignature: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split("."); // Split nested keys like "reviewOfSystems.eyes"
  
    setFormData((prev) => {
      if (keys.length === 1) {
        // If it's a top-level field
        return { ...prev, [name]: value };
      } else {
        // If it's a nested field (e.g., reviewOfSystems.eyes)
        const [section, field] = keys;
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
    });
  };
  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div>
      {currentStep === 1 && (
        <SubjectiveForm
          nextStep={nextStep}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      )}
      {currentStep === 2 && (
        <ObjectiveForm
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          
        />
      )}
      {currentStep === 3 && (
        <DentalForm
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      )}
      {currentStep === 4 && (
        <ConsentForm
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default AddCaseForm;
