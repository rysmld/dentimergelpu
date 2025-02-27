import React, { useState, useEffect } from "react";
import "./Form.css";

const ObjectiveForm = ({
  currentStep,
  nextPage,
  prevPage,
  formData,
  setFormData,
  handleChange,
}) => {
  return (
    <div className="form-container">
      <h2>OBJECTIVE</h2>
      <form>
        {/* General Appraisal */}
        <fieldset>
          <legend>General Appraisal</legend>
          <div className="form-grid">
            {[
              "general_health",
              "physical",
              "mental",
              "temperature",
              "blood_pressure",
              "respiratory_rate",
              "pulse_rate",
              "other_general_notes",
            ].map((field) => (
              <label key={field} htmlFor={field}>
                {field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                :
                <input
                  type="text"
                  id={field}
                  name={`general_appraisal.${field}`}
                  value={formData?.general_appraisal?.[field] ?? ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field.replace(/_/g, " ")}`}
                />
              </label>
            ))}
          </div>
        </fieldset>

        {/* Extraoral Examination */}
        <fieldset>
          <legend>Extraoral Examination</legend>
          <div className="form-grid">
            {[
              "head_face",
              "eyes",
              "ears",
              "nose",
              "hair",
              "neck",
              "paranasal",
              "lymph_nodes",
              "salivary_glands",
              "tmj",
              "muscles_of_mastication",
              "other_extraoral",
            ].map((field) => (
              <label key={field} htmlFor={field}>
                {field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                :
                <input
                  type="text"
                  id={field}
                  name={`extraoral_examination.${field}`}
                  value={formData?.extraoral_examination?.[field] ?? ""}
                  onChange={handleChange}
                  placeholder={`Enter details about ${field.replace(
                    /_/g,
                    " "
                  )}`}
                />
              </label>
            ))}
          </div>
        </fieldset>

        {/* Intraoral Examination */}
        <fieldset>
          <legend>Intraoral Examination</legend>
          <div className="form-grid">
            {[
              "lips",
              "buccal_mucosa",
              "alveolar_mucosa",
              "floor_of_mouth",
              "tongue",
              "saliva",
              "pillars_of_fauces",
              "tonsils",
              "uvula",
              "oropharynx",
              "other_intraoral",
            ].map((field) => (
              <label key={field} htmlFor={field}>
                {field
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                :
                <input
                  type="text"
                  id={field}
                  name={`intraoral_examination.${field}`}
                  value={formData?.intraoral_examination?.[field] ?? ""}
                  onChange={handleChange}
                  placeholder={`Enter details about ${field.replace(
                    /_/g,
                    " "
                  )}`}
                />
              </label>
            ))}
          </div>
        </fieldset>

        {/* Periodontal Examination */}
        <fieldset>
          <legend>Periodontal Examination</legend>

          <div className="form-grid">
            <label htmlFor="gingiva">
              Gingiva
              <select
                id="gingiva"
                name="periodontal_examination.gingiva"
                value={formData?.periodontal_examination?.gingiva ?? ""}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select condition
                </option>
                <option value="Healthy">Healthy</option>
                <option value="Inflamed">Inflamed</option>
              </select>
            </label>
          </div>

          {formData?.periodontal_examination?.gingiva === "Inflamed" && (
            <>
              <div className="form-grid">
                <label htmlFor="degree_of_inflammation">
                  Degree of Inflammation
                  <select
                    id="degree_of_inflammation"
                    name="periodontal_examination.degree_of_inflammation"
                    value={
                      formData?.periodontal_examination
                        ?.degree_of_inflammation ?? ""
                    }
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select degree
                    </option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </select>
                </label>
              </div>

              <div className="form-grid">
                <label htmlFor="degree_of_deposit">
                  Degree of Deposit
                  <select
                    id="degree_of_deposit"
                    name="periodontal_examination.degree_of_deposit"
                    value={
                      formData?.periodontal_examination?.degree_of_deposit ?? ""
                    }
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select degree
                    </option>
                    <option value="Light">Light</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Heavy">Heavy</option>
                  </select>
                </label>
              </div>
            </>
          )}
        </fieldset>

        {/* Occlusion Examination */}
        <fieldset className="fieldset-spacing">
          <legend>Occlusion</legend>
          <div className="form-grid">
            <label htmlFor="molar_class_left">
              Molar Class (L):
              <select
                name="occlusion.molar_class_left"
                value={formData?.occlusion?.molar_class_left ?? ""}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>

            <label htmlFor="molar_class_right">
              Molar Class (R):
              <select
                name="occlusion.molar_class_right"
                value={formData?.occlusion?.molar_class_right ?? ""}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>
          </div>

          <div className="form-grid">
            <label htmlFor="canine_class_left">
              Canine Class (L):
              <select
                name="occlusion.canine_class_left"
                value={formData?.occlusion?.canine_class_left ?? ""}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>

            <label htmlFor="canine_class_right">
              Canine Class (R):
              <select
                name="occlusion.canine_class_right"
                value={formData?.occlusion?.canine_class_right ?? ""}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>
          </div>

          <div className="form-grid">
            <label htmlFor="incisal_class_left">
              Incisal Class (L):
              <select
                name="occlusion.incisal_class_left"
                value={formData?.occlusion?.incisal_class_left ?? ""}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </label>

            <label htmlFor="incisal_class_right">
              Incisal Class (R):
              <select
                name="occlusion.incisal_class_right"
                value={formData?.occlusion?.incisal_class_right ?? ""}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
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
                name="occlusion.overjet"
                checked={formData?.occlusion?.overjet ?? false}
                onChange={(e) =>
                  handleChange({
                    target: { name: e.target.name, value: e.target.checked },
                  })
                }
              />
            </label>

            <label htmlFor="overbite">
              Overbite:
              <input
                type="checkbox"
                name="occlusion.overbite"
                checked={formData?.occlusion?.overbite ?? false}
                onChange={(e) =>
                  handleChange({
                    target: { name: e.target.name, value: e.target.checked },
                  })
                }
              />
            </label>

            <label htmlFor="midline_deviation">
              Midline Deviation:
              <input
                type="checkbox"
                name="occlusion.midline_deviation"
                checked={formData?.occlusion?.midline_deviation ?? false}
                onChange={(e) =>
                  handleChange({
                    target: { name: e.target.name, value: e.target.checked },
                  })
                }
              />
            </label>

            <label htmlFor="crossbite">
              Crossbite:
              <input
                type="checkbox"
                name="occlusion.crossbite"
                checked={formData?.occlusion?.crossbite ?? false}
                onChange={(e) =>
                  handleChange({
                    target: { name: e.target.name, value: e.target.checked },
                  })
                }
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
                onChange={handleChange}
                placeholder="Enter appliances details"
              />
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ObjectiveForm;
