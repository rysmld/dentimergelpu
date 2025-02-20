import { useState } from "react";
import { Button, Input, Textarea, Select } from "@/components/ui";
import axios from "axios";

const ProgressNotesForm = ({ caseId, patientNumber, clinicians, instructors }) => {
    const [notes, setNotes] = useState([
        { date: "", tooth: "", progress_notes: "", clinician_id: "", clinical_instructor_id: "", remarks: "" }
    ]);

    const handleChange = (index, e) => {
        const updatedNotes = [...notes];
        updatedNotes[index][e.target.name] = e.target.value;
        setNotes(updatedNotes);
    };

    const addRow = () => {
        setNotes([...notes, { date: "", tooth: "", progress_notes: "", clinician_id: "", clinical_instructor_id: "", remarks: "" }]);
    };

    const removeRow = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/progress_notes", { notes, case_id: caseId, patient_number: patientNumber });
            alert("Progress notes added successfully!");
        } catch (error) {
            console.error("Error adding progress notes", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-lg">
            {notes.map((note, index) => (
                <div key={index} className="border-b pb-4 mb-4">
                    <Input type="date" name="date" value={note.date} onChange={(e) => handleChange(index, e)} required label="Date" />
                    <Input type="text" name="tooth" value={note.tooth} onChange={(e) => handleChange(index, e)} label="Tooth" />
                    <Textarea name="progress_notes" value={note.progress_notes} onChange={(e) => handleChange(index, e)} required label="Progress Notes" />
                    <Select name="clinician_id" value={note.clinician_id} onChange={(e) => handleChange(index, e)} required label="Clinician">
                        <option value="">Select Clinician</option>
                        {clinicians.map((c) => (
                            <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
                        ))}
                    </Select>
                    <Select name="clinical_instructor_id" value={note.clinical_instructor_id} onChange={(e) => handleChange(index, e)} required label="Clinical Instructor">
                        <option value="">Select Clinical Instructor</option>
                        {instructors.map((i) => (
                            <option key={i.id} value={i.id}>{i.first_name} {i.last_name}</option>
                        ))}
                    </Select>
                    <Textarea name="remarks" value={note.remarks} onChange={(e) => handleChange(index, e)} label="Remarks" />
                    <Button type="button" onClick={() => removeRow(index)} className="mt-2 bg-red-500">Remove</Button>
                </div>
            ))}
            <Button type="button" onClick={addRow} className="bg-blue-500">Add Row</Button>
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default ProgressNotesForm;
