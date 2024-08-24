import AnimalOwner from "../models/AminalOwner.js";

// Add a new animal owner
export const addAnimalOwner = async (req, res) => {
  try {
    const { name, contact, address,nic } = req.body;
    const newOwner = await AnimalOwner.create({ name, contact, address ,nic}  );
    res.status(201).json({ message: "Animal owner created successfully", data: newOwner });
  } catch (error) {
    res.status(500).json({ message: `Error creating animal owner: ${error.message}` });
  }
};

// Get all animal owners
export const getAnimalOwners = async (req, res) => {
  try {
    const owners = await AnimalOwner.findAll();
    res.status(200).json({ data: owners });
  } catch (error) {
    res.status(500).json({ message: `Error fetching animal owners: ${error.message}` });
  }
};

// Get a specific animal owner by ID
export const getAnimalOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await AnimalOwner.findByPk(id);
    if (!owner) {
      return res.status(404).json({ message: "Animal owner not found" });
    }
    res.status(200).json({ data: owner });
  } catch (error) {
    res.status(500).json({ message: `Error fetching animal owner: ${error.message}` });
  }
};

// Update an animal owner's information
export const updateAnimalOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, address ,nic} = req.body;
    const owner = await AnimalOwner.findByPk(id);
    if (!owner) {
      return res.status(404).json({ message: "Animal owner not found" });
    }
    owner.name = name || owner.name;
    owner.contact = contact || owner.contact;
    owner.address = address || owner.address;
    owner.nic = nic || owner.nic;
    await owner.save();
    res.status(200).json({ message: "Animal owner updated successfully", data: owner });
  } catch (error) {
    res.status(500).json({ message: `Error updating animal owner: ${error.message}` });
  }
};

// Delete an animal owner
export const deleteAnimalOwner = async (req, res) => {
    try {
      const { id } = req.params;
      const owner = await AnimalOwner.findByPk(id);
      if (!owner) {
        return res.status(404).json({ message: "Animal owner not found" });
      }
      await owner.destroy();
      res.status(200).json({ message: "Animal owner deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: `Error deleting animal owner: ${error.message}` });
    }
  };