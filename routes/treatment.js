import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  addTreatment,
  getTreatments,
} from "../controllers/treatmentController.js";

const router = express.Router();
// Define the directory where files will be stored
const uploadDirectory = "uploads/prescriptions/";

// Ensure the directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true }); // Create the directory if it doesn't exist
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
  },
});

const upload = multer({ storage });

router.post("/", upload.single("prescription"), addTreatment);
router.get("/", getTreatments);

export default router;
