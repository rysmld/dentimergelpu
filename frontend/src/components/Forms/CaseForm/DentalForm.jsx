import React, { useState, useRef, useEffect } from "react";
import "./Form.css";

const DentalForm = ({
  currentStep,
  prevPage,
  nextPage,
  formData,
  setFormData,
  handleChange,
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = formData.tooth_chart || "/dentalcharting.png"; // Load saved image or default chart
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before redrawing
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [formData.tooth_chart]); // Reload when formData.tooth_chart changes

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 2;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveImage = (e) => {
    e.preventDefault(); // Prevent form submission
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    setFormData((prevData) => ({
      ...prevData,
      tooth_chart: image, // Save edited image
    }));
    alert("Image saved!");
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Reset to default image
    const image = new Image();
    image.src = "/dentalcharting.png"; // Reset to original tooth chart
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    // Clear the saved image in formData
    setFormData((prevData) => ({
      ...prevData,
      tooth_chart: null,
    }));
  };

  return (
    <div className="form-container">
      <h2>Dental Form</h2>
      <form>
        <fieldset>
          <div>
            <legend>Tooth Chart</legend>
            <canvas
              ref={canvasRef}
              width={800} // Set canvas width
              height={600} // Set canvas height
              style={{ border: "1px solid #000", cursor: "crosshair" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
            <div>
              <label>Brush Color:</label>
              <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
              />
              <button type="button" onClick={saveImage}>
                Save
              </button>
              <button type="button" onClick={clearCanvas}>
                Clear
              </button>
            </div>
          </div>
        </fieldset>

        {/* Diagnostic Test Input */}
        <fieldset>
          <legend>Diagnostic Test</legend>
          <input
            type="text"
            name="diagnostic_test"
            value={formData.diagnostic_test || ""}
            onChange={handleChange}
            placeholder="Notes"
          />
        </fieldset>

        <fieldset>
          <legend>Notes</legend>
          <input
            type="text"
            name="diagnostic_test_notes"
            value={formData.diagnostic_test_notes || ""}
            onChange={handleChange}
            placeholder="Notes"
          />
        </fieldset>

        <fieldset>
          <div>
            <h2 className="text-lg font-bold mb-4">Assessment Plan</h2>
            <table>
              <thead>
                <tr>
                  <th colSpan="3">Diagnosis/Problem List</th>
                  <th colSpan="2">Treatment Plan</th>
                  <th>Prognosis</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Main Concern",
                    key: "mainConcern",
                  },
                  {
                    label: "Other Problems",
                    key: "otherProblems",
                  },
                  {
                    label: "Acute",
                    key: "acutePhase",
                  },
                  {
                    label: "Disease",
                    key: "diseaseControl",
                  },
                  {
                    label: "Definitive",
                    key: "definitivePhase",
                  },
                  {
                    label: "Maintenance",
                    key: "maintenancePhase",
                  },
                ].map((item, index) => (
                  <tr key={index}>
                    <td>
                      <label>{item.label}</label>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={
                          formData.assessment_plan?.[item.key]?.tooth_number ||
                          ""
                        }
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            assessment_plan: {
                              ...prevData.assessment_plan,
                              [item.key]: {
                                ...prevData.assessment_plan?.[item.key],
                                tooth_number: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder="Th#"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={
                          formData.assessment_plan?.[item.key]?.notes || ""
                        }
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            assessment_plan: {
                              ...prevData.assessment_plan,
                              [item.key]: {
                                ...prevData.assessment_plan?.[item.key],
                                notes: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder="Notes"
                      />
                    </td>
                    <td>
                      <label>{item.label.toUpperCase()} PHASE</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={
                          formData.assessment_plan?.[item.key]?.phase_notes ||
                          ""
                        }
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            assessment_plan: {
                              ...prevData.assessment_plan,
                              [item.key]: {
                                ...prevData.assessment_plan?.[item.key],
                                phase_notes: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder="Notes"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={
                          formData.assessment_plan?.[item.key]?.prognosis || ""
                        }
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            assessment_plan: {
                              ...prevData.assessment_plan,
                              [item.key]: {
                                ...prevData.assessment_plan?.[item.key],
                                prognosis: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder="Prognosis"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default DentalForm;
