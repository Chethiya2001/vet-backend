import multer from "multer";
import path from "path";
import Treatment from "../models/Treatment.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/prescriptions/"); // Directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
  },
});

const upload = multer({ storage });

export const addTreatment = async (req, res) => {
  try {
    const {
      description,
      dosage,
      quantity,
      remark,
      date,
      price,
      doctorId,
      animal_name,
      owner_nic,
    } = req.body;

    let prescriptionPath = null;
    if (req.file) {
      prescriptionPath = req.file.path; // Save the file path
    }

    const newTreatment = await Treatment.create({
      description,
      dosage,
      quantity,
      remark,
      date,
      price,
      prescription: prescriptionPath,
      doctorId,
      animal_name,
      owner_nic,
    });

    res.status(201).json({
      message: "Treatment added successfully",
      treatment: newTreatment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error adding treatment: ${error.message}` });
  }
};

export const getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.findAll();
    res.status(200).json(treatments);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching treatments: ${error.message}` });
  }
};
