import React, { useState, useEffect } from "react";
import "./Form.css";

const ObjectiveForm = ({ currentStep, nextStep, prevStep, formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

  const handleExtraoralChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      extraoralExamination: {
        ...prevData.extraoralExamination,
        [name]: value,
      },
    }));
  };

  const handleIntraoralChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      intraoralExamination: {
        ...prevData.intraoralExamination,
        [name]: value,
      },
    }));
  };

  const handlePeriodontalChange = (e) => {
    const { name, value } = e.target;
    if (name === "occlusionIssues") {
      setFormData((prevData) => ({
        ...prevData,
        periodontalExamination: {
          ...prevData.periodontalExamination,
          [name]: prevData.periodontalExamination[name].includes(value)
            ? prevData.periodontalExamination[name].filter(
                (issue) => issue !== value
              )
            : [...prevData.periodontalExamination[name], value],
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        periodontalExamination: {
          ...prevData.periodontalExamination,
          [name]: value,
        },
      }));
    }
  };

  const handleOcclusionChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      occlusion: {
        ...prevData.occlusion,
        [name]: checked,
      },
    }));
  };

  return (
    <div className="form-container">
      <h2>OBJECTIVE</h2>
      <form>
        {/* General Appraisal */}
        <fieldset>
          <legend>General Appraisal</legend>
          <div className="form-grid">
            <label htmlFor="generalHealth">
              General Health Notes:
              <input
                type="text"
                name="generalHealth"
                value={formData.generalHealth}
                onChange={handleInputChange}
                placeholder="Enter general health notes"
              />
            </label>
            <label htmlFor="physical">
              Physical:
              <input
                type="text"
                name="physical"
                value={formData.physical}
                onChange={handleInputChange}
                placeholder="Enter physical details"
              />
            </label>
            <label htmlFor="mental">
              Mental:
              <input
                type="text"
                name="mental"
                value={formData.mental}
                onChange={handleInputChange}
                placeholder="Enter mental health details"
              />
            </label>
            <label htmlFor="temperature">
              T:
              <input
                type="text"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                placeholder="Temperature"
              />
            </label>
            <label htmlFor="bloodPressure">
              BP:
              <input
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleInputChange}
                placeholder="Blood Pressure"
              />
            </label>
            <label htmlFor="respiratoryRate">
              RR:
              <input
                type="text"
                name="respiratoryRate"
                value={formData.respiratoryRate}
                onChange={handleInputChange}
                placeholder="Respiratory Rate"
              />
            </label>
            <label htmlFor="pulseRate">
              PR:
              <input
                type="text"
                name="pulseRate"
                value={formData.pulseRate}
                onChange={handleInputChange}
                placeholder="Pulse Rate"
              />
            </label>
            <label htmlFor="otherGeneralNotes">
              Other:
              <input
                type="text"
                name="otherGeneralNotes"
                value={formData.otherGeneralNotes}
                onChange={handleInputChange}
                placeholder="Enter other details"
              />
            </label>
          </div>
        </fieldset>

        {/* Extraoral Examination */}
        <fieldset>
          <legend>Extraoral Examination</legend>
          <div className="form-grid">
            <label htmlFor="headFace">
              Head and Face:
              <input
                type="text"
                name="headFace"
                value={formData.extraoralExamination.headFace}
                onChange={handleExtraoralChange}
                placeholder="Enter details about head and face"
              />
            </label>
            <label htmlFor="eyes">
              Eyes:
              <input
                type="text"
                name="eyes"
                value={formData.extraoralExamination.eyes}
                onChange={handleExtraoralChange}
                placeholder="Enter details about eyes"
              />
            </label>
            <label htmlFor="ears">
              Ears:
              <input
                type="text"
                name="ears"
                value={formData.extraoralExamination.ears}
                onChange={handleExtraoralChange}
                placeholder="Enter details about ears"
              />
            </label>
            <label htmlFor="nose">
              Nose:
              <input
                type="text"
                name="nose"
                value={formData.extraoralExamination.nose}
                onChange={handleExtraoralChange}
                placeholder="Enter details about nose"
              />
            </label>
            <label htmlFor="hair">
              Hair:
              <input
                type="text"
                name="hair"
                value={formData.extraoralExamination.hair}
                onChange={handleExtraoralChange}
                placeholder="Enter details about hair"
              />
            </label>
            <label htmlFor="neck">
              Neck:
              <input
                type="text"
                name="neck"
                value={formData.extraoralExamination.neck}
                onChange={handleExtraoralChange}
                placeholder="Enter details about neck"
              />
            </label>
            <label htmlFor="paranasal">
              Paranasal:
              <input
                type="text"
                name="paranasal"
                value={formData.extraoralExamination.paranasal}
                onChange={handleExtraoralChange}
                placeholder="Enter details about paranasal"
              />
            </label>
            <label htmlFor="lymphNodes">
              Lymph Nodes:
              <input
                type="text"
                name="lymphNodes"
                value={formData.extraoralExamination.lymphNodes}
                onChange={handleExtraoralChange}
                placeholder="Enter details about lymph nodes"
              />
            </label>
            <label htmlFor="salivaryGlands">
              Salivary Glands:
              <input
                type="text"
                name="salivaryGlands"
                value={formData.extraoralExamination.salivaryGlands}
                onChange={handleExtraoralChange}
                placeholder="Enter details about salivary glands"
              />
            </label>
            <label htmlFor="tmj">
              TMJ:
              <input
                type="text"
                name="tmj"
                value={formData.extraoralExamination.tmj}
                onChange={handleExtraoralChange}
                placeholder="Enter details about TMJ"
              />
            </label>
            <label htmlFor="musclesOfMastication">
              Muscles of Mastication:
              <input
                type="text"
                name="musclesOfMastication"
                value={formData.extraoralExamination.musclesOfMastication}
                onChange={handleExtraoralChange}
                placeholder="Enter details about muscles of mastication"
              />
            </label>
            <label htmlFor="otherExtraoral">
              Other:
              <input
                type="text"
                name="otherExtraoral"
                value={formData.extraoralExamination.otherExtraoral}
                onChange={handleExtraoralChange}
                placeholder="Enter other extraoral examination details"
              />
            </label>
          </div>
        </fieldset>

        {/* Intraoral Examination */}
        <fieldset>
          <legend>Intraoral Examination</legend>
          <div className="form-grid">
            <label htmlFor="lips">
              Lips:
              <input
                type="text"
                name="lips"
                value={formData.intraoralExamination.lips}
                onChange={handleIntraoralChange}
                placeholder="Enter details about lips"
              />
            </label>
            <label htmlFor="buccalMucosa">
              Buccal Mucosa:
              <input
                type="text"
                name="buccalMucosa"
                value={formData.intraoralExamination.buccalMucosa}
                onChange={handleIntraoralChange}
                placeholder="Enter details about buccal mucosa"
              />
            </label>
            <label htmlFor="alveolarMucosa">
              Alveolar Mucosa:
              <input
                type="text"
                name="alveolarMucosa"
                value={formData.intraoralExamination.alveolarMucosa}
                onChange={handleIntraoralChange}
                placeholder="Enter details about alveolar mucosa"
              />
            </label>
            <label htmlFor="floorOfMouth">
              Floor of the Mouth:
              <input
                type="text"
                name="floorOfMouth"
                value={formData.intraoralExamination.floorOfMouth}
                onChange={handleIntraoralChange}
                placeholder="Enter details about floor of the mouth"
              />
            </label>
            <label htmlFor="tongue">
              Tongue:
              <input
                type="text"
                name="tongue"
                value={formData.intraoralExamination.tongue}
                onChange={handleIntraoralChange}
                placeholder="Enter details about tongue"
              />
            </label>
            <label htmlFor="saliva">
              Saliva:
              <input
                type="text"
                name="saliva"
                value={formData.intraoralExamination.saliva}
                onChange={handleIntraoralChange}
                placeholder="Enter details about saliva"
              />
            </label>
            <label htmlFor="pillarsOfFauces">
              Pillars of Fauces:
              <input
                type="text"
                name="pillarsOfFauces"
                value={formData.intraoralExamination.pillarsOfFauces}
                onChange={handleIntraoralChange}
                placeholder="Enter details about pillars of fauces"
              />
            </label>
            <label htmlFor="tonsils">
              Tonsils:
              <input
                type="text"
                name="tonsils"
                value={formData.intraoralExamination.tonsils}
                onChange={handleIntraoralChange}
                placeholder="Enter details about tonsils"
              />
            </label>
            <label htmlFor="uvula">
              Uvula:
              <input
                type="text"
                name="uvula"
                value={formData.intraoralExamination.uvula}
                onChange={handleIntraoralChange}
                placeholder="Enter details about uvula"
              />
            </label>
            <label htmlFor="oropharynx">
              Oropharynx:
              <input
                type="text"
                name="oropharynx"
                value={formData.intraoralExamination.oropharynx}
                onChange={handleIntraoralChange}
                placeholder="Enter details about oropharynx"
              />
            </label>
            <label htmlFor="otherIntraoral">
              Other:
              <input
                type="text"
                name="otherIntraoral"
                value={formData.intraoralExamination.otherIntraoral}
                onChange={handleIntraoralChange}
                placeholder="Enter other intraoral examination details"
              />
            </label>
          </div>
        </fieldset>

        {/* Periodontal Examination */}
        <fieldset>
          <legend>Periodontal Examination</legend>
          <div className="form-grid">
            <label htmlFor="gingiva">Gingiva
            <select
              id="gingiva"
              name="gingiva"
              value={formData.periodontalExamination.gingiva || ""}
              onChange={handlePeriodontalChange}
            >
              <option value="" disabled>
                Select condition
              </option>
              <option value="Healthy">Healthy</option>
              <option value="Inflamed">Inflamed</option>
            </select>
            </label>
          </div>

          {formData.periodontalExamination.gingiva === "Inflamed" && (
            <>
              <div>
                <label htmlFor="degreeOfInflammation">
                  Degree of Inflammation
                </label>
                <select
                  id="degreeOfInflammation"
                  name="degreeOfInflammation"
                  value={
                    formData.periodontalExamination.degreeOfInflammation || ""
                  }
                  onChange={handlePeriodontalChange}
                >
                  <option value="" disabled>
                    Select degree
                  </option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>

              <div>
                <label htmlFor="degreeOfDeposit">Degree of Deposit</label>
                <select
                  id="degreeOfDeposit"
                  name="degreeOfDeposit"
                  value={formData.periodontalExamination.degreeOfDeposit || ""}
                  onChange={handlePeriodontalChange}
                >
                  <option value="" disabled>
                    Select degree
                  </option>
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Heavy">Heavy</option>
                </select>
              </div>
            </>
          )}
        </fieldset>

        {/* Occlusion Examination */}
        <fieldset className="fieldset-spacing">
          <legend>Occlusion</legend>
          <div className="form-grid">
            <label htmlFor="molarClassLeft">
              Molar Class (L):
              <select
                name="molarClassLeft"
                value={formData.occlusion.molarClassLeft}
                onChange={handleOcclusionChange}
              >
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>
            <label htmlFor="molarClassRight">
              Molar Class (R):
              <select
                name="molarClassRight"
                value={formData.occlusion.molarClassRight}
                onChange={handleOcclusionChange}
              >
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>
          </div>
          <div className="form-grid">
            <label htmlFor="canineClassLeft">
              Canine Class (L):
              <select
                name="canineClassLeft"
                value={formData.occlusion.canineClassLeft}
                onChange={handleOcclusionChange}
              >
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>
            <label htmlFor="canineClassRight">
              Canine Class (R):
              <select
                name="canineClassRight"
                value={formData.occlusion.canineClassRight}
                onChange={handleOcclusionChange}
              >
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>
          </div>
          <div className="form-grid">
            <label htmlFor="incisalClassLeft">
              Incisal Class (L):
              <select
                name="incisalClassLeft"
                value={formData.occlusion.incisalClassLeft}
                onChange={handleOcclusionChange}
              >
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>
            <label htmlFor="incisalClassRight">
              Incisal Class (R):
              <select
                name="incisalClassRight"
                value={formData.occlusion.incisalClassRight}
                onChange={handleOcclusionChange}
              >
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>
          </div>
          <div className="form-grid">
            <label htmlFor="overjet">
              Overjet:
              <input
                type="checkbox"
                name="overjet"
                checked={formData.occlusion.overjet}
                onChange={handleOcclusionChange}
              />
            </label>

            <label htmlFor="overbite">
              Overbite:
              <input
                type="checkbox"
                name="overbite"
                checked={formData.occlusion.overbite}
                onChange={handleOcclusionChange}
              />
            </label>

            <label htmlFor="midlineDeviation">
              Midline Deviation:
              <input
                type="checkbox"
                name="midlineDeviation"
                checked={formData.occlusion.midlineDeviation}
                onChange={handleOcclusionChange}
              />
            </label>

            <label htmlFor="crossbite">
              Crossbite:
              <input
                type="checkbox"
                name="crossbite"
                checked={formData.occlusion.crossbite}
                onChange={handleOcclusionChange}
              />
            </label>
          </div>
        </fieldset>

        {/* Appliances */}
        <fieldset>
          <legend>Appliances</legend>
          <div className="form-grid">
            <label htmlFor="appliances">
              Appliances:
              <input
                type="text"
                name="appliances"
                value={formData.appliances}
                onChange={handleInputChange}
                placeholder="Enter appliances details"
              />
            </label>
          </div>
        </fieldset>

        {/* Navigation */}
        <div className="form-grid">
          <button onClick={prevStep}>Previous</button>
          <button onClick={nextStep}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default ObjectiveForm;
