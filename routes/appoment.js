// routes/appointment.js
import express from "express";
const router = express.Router();

import {
  addAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appoimentController.js";

// Route to add a new appointment
router.post("/", addAppointment);

// Route to get all appointments
router.get("/", getAppointments);

// Route to get a specific appointment by ID
router.get("/:id", getAppointmentById);

// Route to update an appointment by ID
router.put("/:id", updateAppointment);

// Route to delete an appointment by ID
router.delete("/:id", deleteAppointment);

export default router;
