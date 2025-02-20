const db = require("../config/db");

const getCases = async (req, res) => {
    try {
        const { search } = req.query;

        let query = `
            SELECT 
                sf.id AS subjective_form_id,
                p.patient_number,
                p.last_name AS patient_last_name,
                p.first_name AS patient_first_name,
                CONCAT(clinician.first_name, ' ', clinician.last_name) AS clinician_name,
                CONCAT(instructor.first_name, ' ', instructor.last_name) AS clinical_instructor_name,
                sf.status
            FROM subjective_form sf
            JOIN patients p ON sf.patient_number = p.patient_number
            JOIN users clinician ON sf.clinician_id = clinician.id
            JOIN users instructor ON sf.clinical_instructor_id = instructor.id
        `;
        
        let queryParams = [];
        
        if (search) {
            query += ` WHERE CONCAT(p.first_name, ' ', p.last_name) LIKE ? 
                        OR p.patient_number LIKE ? 
                        OR p.first_name LIKE ? 
                        OR p.last_name LIKE ?`;
            queryParams.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += " ORDER BY p.patient_number ASC";

        console.log("Executing Query:", query);
        console.log("With Parameters:", queryParams);

        const [rows] = await db.execute(query, queryParams);

        if (!Array.isArray(rows)) {
            throw new Error("Query result is not an array");
        }

        // Format patient_number to always have 6 digits with leading zeros
        const formattedCases = rows.map(caseItem => ({
            ...caseItem,
            patient_number: String(caseItem.patient_number).padStart(6, '0'),
        }));

        console.log("Formatted Query Result:", formattedCases);
        res.json(formattedCases);
    } catch (error) {
        console.error("Error fetching cases:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getCases };
