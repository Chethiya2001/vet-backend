// routes/animal.js
import express from "express";
const router = express.Router();

import { addAnimal, getAnimals,getAnimalByName, updateAnimal, deleteAnimal ,getAnimalsByOwnerNic} from "../controllers/animalController.js";

router.post("/", addAnimal);         
router.get("/", getAnimals);         
router.get("/:name",getAnimalByName);
router.put("/:id", updateAnimal);  
router.delete("/:id", deleteAnimal);  
router.get("/owner/nic/:nic", getAnimalsByOwnerNic);

export default router;
