const express = require("express");
const { getCases } = require("../controllers/caseController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("clinician", "clinical_instructor"), getCases);


module.exports = router;
