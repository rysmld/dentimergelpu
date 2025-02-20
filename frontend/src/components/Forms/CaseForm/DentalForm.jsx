import React, { useState, useRef, useEffect } from "react";
import "./Form.css";

const DentalForm = ({ currentStep, prevStep, nextStep, formData, setFormData, handleChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000"); // Default brush color is black

  // Initialize canvas context and load the initial image
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load the initial image onto the canvas
    const image = new Image();
    image.src = "/dentalcharting.png"; // Path to your tooth chart image
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

  // Handle drawing on the canvas
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
    ctx.lineWidth = 2; // Brush thickness
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Save the edited image
  const saveImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png"); // Convert canvas to base64 image
    setFormData((prevData) => ({
      ...prevData,
      editedImage: image, // Save the edited image in formData
    }));
    alert("Image saved!");
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
              <button onClick={saveImage}>Save</button>
            </div>
          </div>
        </fieldset>

        {/* Diagnostic Test Input */}
        <fieldset>
          <legend>Diagnostic Test</legend>
          <input
                      type="text"
                      value={formData.diagnosticTest}
                      onChange={handleChange}
                      placeholder="Notes"/>
        </fieldset>

        <fieldset>
          <legend>Notes</legend>
          <input
                      type="text"
                      value={formData.diagnosticTestNotes}
                      onChange={handleChange}
                      placeholder="Notes"/>
        </fieldset>

        <fieldset>
          <div>
            <h2 className="text-lg font-bold mb-4">
              Assessment Plan
            </h2>
            <table>
              <thead>
                <tr>
                  <th colSpan="3">Diagnosis/Problem List</th>
                  <th colSpan="2">Treatment Plan</th>
                  <th>Prognosis</th>
                </tr>
              </thead>
              <tbody>
                {/* Main Concern Row */}
                <tr>
                  <td>
                    <label>Main Concern</label>
                    <label>Priority</label>
                  </td>
                  <td>
                    <label htmlFor="tooth_number">TH#</label>
                  </td>
                  <td></td>
                  <td>
                    <label htmlFor="priority">PRIORITY</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.treatmentNotes || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          treatmentNotes: e.target.value,
                        }))
                      }
                      placeholder="Notes"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.prognosis || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          prognosis: e.target.value,
                        }))
                      }
                      placeholder="Prognosis"
                    />
                  </td>
                </tr>

                {/* Other Problems Row */}
                <tr>
                  <td>
                    <label htmlFor="other_problems">Other Problems</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={formData.otherProblems || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          otherProblems: e.target.value,
                        }))
                      }
                      placeholder="Th#"
                    />
                  </td>
                  <td>
                    <label htmlFor="systematic">Systematic:</label>
                    <input
                      type="text"
                      value={formData.systematic || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          systematic: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td>
                    <label htmlFor="systematic_phase">
                      SYSTEMATIC <br />
                      PHASE
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.systematicPhaseNotes || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          systematicPhaseNotes: e.target.value,
                        }))
                      }
                      placeholder="Notes"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.systematicPrognosis || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          systematicPrognosis: e.target.value,
                        }))
                      }
                      placeholder="Prognosis"
                    />
                  </td>
                </tr>

                {/* Acute Phase Row */}
                <tr>
                  <td></td>
                  <td><input
                      type="number"
                      value={formData.otherProblems || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          otherProblems: e.target.value,
                        }))
                      }
                      placeholder="Th#"
                    /></td>
                  <td>
                    <label htmlFor="acute_phase">Acute</label><input
                      type="text"
                      value={formData.otherProblems || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          otherProblems: e.target.value,
                        }))
                      }
                      placeholder="Th#"
                    /></td>
                  <td>
                    <label htmlFor="acute_phase">
                      ACUTE <br /> PHASE
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.acutePhaseNotes || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          acutePhaseNotes: e.target.value,
                        }))
                      }
                      placeholder="Notes"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.acutePhasePrognosis || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          acutePhasePrognosis: e.target.value,
                        }))
                      }
                      placeholder="Prognosis"
                    />
                  </td>
                </tr>

                {/* Disease Control Phase Row */}
                <tr>
                  <td></td>
                  <td>
                    <input
                      type="number"
                      value={formData.diseaseControlThNumber || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          diseaseControlThNumber: e.target.value,
                        }))
                      }
                      placeholder="Th#"
                    />
                  </td>
                  <td>
                    <label htmlFor="disease">Disease</label>
                    <input
                      type="text"
                      value={formData.diseaseControlNotes || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          diseaseControlNotes: e.target.value,
                        }))
                      }
                      placeholder="Notes"
                    />
                  </td>
                  <td>
                    <label htmlFor="disease_control">
                      DISEASE <br /> CONTROL <br /> PHASE
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.diseaseControlPhaseNotes || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          diseaseControlPhaseNotes: e.target.value,
                        }))
                      }
                      placeholder="Notes"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.diseaseControlPrognosis || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          diseaseControlPrognosis: e.target.value,
                        }))
                      }
                      placeholder="Prognosis"
                    />
                  </td>
                </tr>

                {/* Definitive Phase Row */}
                <tr>
                  <td></td>
                  <td><input
                      type="number"
                      value={formData.otherProblems || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          otherProblems: e.target.value,
                        }))
                      }
                      placeholder="Th#"
                    /></td>
                  <td>
                    <label htmlFor="definitive">Definitive</label><input
                      type="text"
                      value={formData.otherProblems || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          otherProblems: e.target.value,
                        }))
                      }
                      placeholder="Th#"
                    /></td>
                  <td>
                    <label htmlFor="definitive_phase">DEFINITIVE <br />PHASE</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.definitivePhaseNotes || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          definitivePhaseNotes: e.target.value,
                        }))
                      }
                      placeholder="Notes"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.definitivePhasePrognosis || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          definitivePhasePrognosis: e.target.value,
                        }))
                      }
                      placeholder="Prognosis"
                    />
                  </td>
                </tr>

                {/* Maintenance Phase Row */}
                <tr>
                  <td></td>
                  <td><input
                      type="number"
                      value={formData.otherProblems || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          otherProblems: e.target.value,
                        }))
                      }
                      placeholder="Th#"
                    /></td>
                  <td></td>
                  <td>
                    <label htmlFor="maintenance_phase">MAINTENANCE <br /> PHASE </label>
                  
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.maintenancePhaseNotes || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          maintenancePhaseNotes: e.target.value,
                        }))
                      }
                      placeholder="Notes"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={formData.maintenancePhasePrognosis || ""}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          maintenancePhasePrognosis: e.target.value,
                        }))
                      }
                      placeholder="Prognosis"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </fieldset>
      </form>

      {/* Navigation */}
      <div className="form-grid">
        <button onClick={prevStep}>Previous</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default DentalForm;
