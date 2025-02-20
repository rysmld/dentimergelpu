const express = require("express");
const { getAllPatients, getPatientByNumber, addPatient, updatePatient, deletePatient } = require("../controllers/patientController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("clinician", "clinical_instructor"), getAllPatients);
router.get("/:patient_number", getPatientByNumber);
router.put("/update/:patient_number", verifyToken, authorizeRoles("clinician", "clinical_instructor"), updatePatient);
router.post("/add", verifyToken, authorizeRoles("clinician", "clinical_instructor"), addPatient);
router.delete("/:patient_number", verifyToken, authorizeRoles("clinical_instructor"), deletePatient);


module.exports = router;
