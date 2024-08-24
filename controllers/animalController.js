// controllers/animalController.js
import Animal from "../models/Aminal.js";

// Create a new animal record
export const addAnimal = async (req, res) => {
  try {
    const { name, address, age, breed, gender, weight } = req.body;

    // Create a new animal record
    const newAnimal = await Animal.create({
      name,
      address,
      age,
      breed,
      gender,
      weight
    });

    res.status(201).json({
      message: "Animal added successfully",
      animal: newAnimal
    });
  } catch (error) {
    res.status(500).json({ message: `Error adding animal: ${error.message}` });
  }
};

// Get all animal records
export const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.findAll();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: `Error fetching animals: ${error.message}` });
  }
};

// Get a specific animal record by ID
export const getAnimalById = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findByPk(id);

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: `Error fetching animal: ${error.message}` });
  }
};

// Update an animal record by ID
export const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, age, breed, gender, weight } = req.body;

    const animal = await Animal.findByPk(id);

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    await animal.update({
      name,
      address,
      age,
      breed,
      gender,
      weight
    });

    res.status(200).json({
      message: "Animal updated successfully",
      animal
    });
  } catch (error) {
    res.status(500).json({ message: `Error updating animal: ${error.message}` });
  }
};

// Delete an animal record by ID
export const deleteAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await Animal.findByPk(id);

    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    await animal.destroy();

    res.status(200).json({ message: "Animal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error deleting animal: ${error.message}` });
  }
};
