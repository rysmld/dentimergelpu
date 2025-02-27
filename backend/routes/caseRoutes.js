const express = require("express");
const router = express.Router();
const { addCase, getCases } = require("../controllers/caseController");

router.get("/", getCases);
router.post("/submit", addCase);

module.exports = router;
