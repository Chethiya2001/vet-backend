import Appointment from "../models/Appoiment.js";
import Animal from "../models/Aminal.js";
import Doctor from "../models/Doctor.js";
import AnimalOwner from "../models/AminalOwner.js";
import { Op } from "sequelize";

// Create a new appointment
export const addAppointment = async (req, res) => {
  try {
    const { appointmentNumber, animalOwnerNic, animalId, doctorId, date } =
      req.body;

    // Create a new appointment record
    const newAppointment = await Appointment.create({
      appointmentNumber,
      animalOwnerNic,
      animalId,
      doctorId,
      date,
    });

    res.status(201).json({
      message: "Appointment added successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error adding appointment: ${error.message}` });
  }
};
// Get appointments by date

// Get appointments by date
export const getAppointmentsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res
        .status(400)
        .json({ message: "Date query parameter is required" });
    }

    const appointments = await Appointment.findAll({
      where: {
        date: {
          [Op.startsWith]: date, // Example using Sequelize with `Op` operator
        },
      },
      include: [
        { model: Animal, attributes: ["name"] },
        { model: Doctor, attributes: ["name"] },
        { model: AnimalOwner, attributes: ["name", "nic"] },
      ],
    });

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for the given date" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching appointments: ${error.message}` });
  }
};
// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Animal, attributes: ["name"] }, // Include animal details
        { model: Doctor, attributes: ["name"] }, // Include doctor details
        { model: AnimalOwner, attributes: ["name", "nic"] }, // Include owner details
      ],
    });
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching appointments: ${error.message}` });
  }
};

// Get a specific appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id, {
      include: [
        { model: Animal, attributes: ["name"] },
        { model: Doctor, attributes: ["name"] },
        { model: AnimalOwner, attributes: ["name", "nic"] },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching appointment: ${error.message}` });
  }
};

// Update an appointment by ID
export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      appointmentNumber,
      animalOwnerNic,
      animalId,
      doctorId,
      appointmentDate,
    } = req.body;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.update({
      appointmentNumber,
      animalOwnerNic,
      animalId,
      doctorId,
      appointmentDate,
    });

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating appointment: ${error.message}` });
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await appointment.destroy();

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting appointment: ${error.message}` });
  }
};
