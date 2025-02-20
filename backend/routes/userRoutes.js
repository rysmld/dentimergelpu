const express = require("express");
const { getProfile, getAllUsers, addUser, deactivateUser, reactivateUser, getUsersByRole, getPatients, resetPassword } = require("../controllers/userController");
const { verifyToken, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, authorizeRoles("admin", "clinical_instructor"), getAllUsers);
router.get("/profile", verifyToken, getProfile);
router.post("/add", verifyToken, authorizeRoles("admin", "clinical_instructor"), addUser);
router.put("/:student_number/deactivate", verifyToken, authorizeRoles("admin", "clinical_instructor"), deactivateUser);
router.put("/reactivate/:student_number", verifyToken, authorizeRoles("admin", "clinical_instructor"), reactivateUser);
router.get("/role/:role", verifyToken, getUsersByRole);
router.get("/patients", verifyToken, getPatients);
router.post("/reset-password", verifyToken, authorizeRoles("admin", "clinical_instructor"), resetPassword);

module.exports = router;
