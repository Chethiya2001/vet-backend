import express from "express";
import {
  addAnimalOwner,
  getAnimalOwners,
  getAnimalOwnerById,
  updateAnimalOwner,
  deleteAnimalOwner,
} from "../controllers/animalOwnerController.js";

const router = express.Router();

// Route to add a new animal owner
router.post("/", addAnimalOwner);

// Route to get all animal owners
router.get("/", getAnimalOwners);

// Route to get a specific animal owner by ID
router.get("/:id", getAnimalOwnerById);

// Route to update an animal owner's information
router.put("/:id", updateAnimalOwner);

// Route to delete an animal owner
router.delete("/:id", deleteAnimalOwner);



export default router;
