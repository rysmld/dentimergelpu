import { useState } from "react";
// import axios from "axios";

const ProgressNotesForm = ({
  caseId,
  patientNumber,
  clinicians = [],
  instructors = [],
}) => {
  const [notes, setNotes] = useState([
    {
      date: "",
      tooth: "",
      progress_notes: "",
      clinician_id: "",
      clinical_instructor_id: "",
      remarks: "",
    },
  ]);

  const handleChange = (index, e) => {
    const updatedNotes = [...notes];
    updatedNotes[index][e.target.name] = e.target.value;
    setNotes(updatedNotes);
  };

  const addRow = () => {
    setNotes([
      ...notes,
      {
        date: "",
        tooth: "",
        progress_notes: "",
        clinician_id: "",
        clinical_instructor_id: "",
        remarks: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/progress_notes", {
        notes,
        case_id: caseId,
        patient_number: patientNumber,
      });
      alert("Progress notes added successfully!");
      setNotes([
        {
          date: "",
          tooth: "",
          progress_notes: "",
          clinician_id: "",
          clinical_instructor_id: "",
          remarks: "",
        },
      ]);
    } catch (error) {
      console.error("Error adding progress notes", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Progress Notes</h2>
      <div className="form-grid">
        <form onSubmit={handleSubmit}>
          {notes.map((note, index) => (
            <div key={index}>
              <input
                type="date"
                name="date"
                value={note.date}
                onChange={(e) => handleChange(index, e)}
                required
              />
              <input
                type="text"
                name="tooth"
                value={note.tooth}
                onChange={(e) => handleChange(index, e)}
                placeholder="Tooth"
              />
              <textarea
                name="progress_notes"
                value={note.progress_notes}
                onChange={(e) => handleChange(index, e)}
                required
                placeholder="Progress Notes"
              ></textarea>
              <select
                name="clinician_id"
                value={note.clinician_id}
                onChange={(e) => handleChange(index, e)}
                required
              >
                <option value="">Select Clinician</option>
                {clinicians.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.first_name} {c.last_name}
                  </option>
                ))}
              </select>
              <select
                name="clinical_instructor_id"
                value={note.clinical_instructor_id}
                onChange={(e) => handleChange(index, e)}
                required
              >
                <option value="">Select CI</option>
                {instructors.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.first_name} {i.last_name}
                  </option>
                ))}
              </select>
              <textarea
                name="remarks"
                value={note.remarks}
                onChange={(e) => handleChange(index, e)}
                placeholder="Remarks"
              ></textarea>
              <button type="button" onClick={() => removeRow(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addRow}>
            Add Row
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProgressNotesForm;
