// routes/animal.js
import express from "express";
const router = express.Router();

import { addAnimal, getAnimals, getAnimalById, updateAnimal, deleteAnimal } from "../controllers/animalController.js";

router.post("/", addAnimal);          // Create a new animal
router.get("/", getAnimals);          // Get all animals
router.get("/:id", getAnimalById);    // Get a specific animal by ID
router.put("/:id", updateAnimal);     // Update an animal by ID
router.delete("/:id", deleteAnimal);  // Delete an animal by ID

export default router;
