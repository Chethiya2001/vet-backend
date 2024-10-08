import express from "express";

import {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctorByName,
} from "../controllers/doctorController.js";
const router = express.Router();

router.post("/", addDoctor);
// Route to get all doctors
router.get("/", getDoctors);

// Route to get a specific doctor by ID
router.get("/:name", getDoctorByName);

// Route to get a specific doctor by ID
router.get("/id/:id", getDoctorById);

// Route to update a doctor's information
router.put("/:id", updateDoctor);

// Route to delete a doctor
router.delete("/:id", deleteDoctor);

export default router;
