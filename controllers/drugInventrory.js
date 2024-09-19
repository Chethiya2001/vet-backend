import DrugInventory from "../models/Inventroy.js";

export const addDrug = async (req, res) => {
  try {
    const {
      drugName,
      batchNumber,
      quantity,
      manufacturer,
      expirationDate,
      price,
      description,
    } = req.body;

    // Create a new drug record
    const newDrug = await DrugInventory.create({
      drugName,
      batchNumber,
      quantity,
      manufacturer,
      expirationDate,
      price,
      description,
    });

    res.status(201).json({
      message: "Drug added to inventory successfully",
      drug: newDrug,
    });
  } catch (error) {
    res.status(500).json({ message: `Error adding drug: ${error.message}` });
  }
};

// Get all drugs in inventory
export const getAllDrugs = async (req, res) => {
  try {
    const drugs = await DrugInventory.findAll();
    res.status(200).json(drugs);
  } catch (error) {
    res.status(500).json({ message: `Error fetching drugs: ${error.message}` });
  }
};

// Get drugs by batch number
export const getDrugsByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.query;

    if (!batchNumber) {
      return res
        .status(400)
        .json({ message: "Batch number query parameter is required" });
    }

    const drugs = await DrugInventory.findAll({
      where: {
        batchNumber: {
          [Op.startsWith]: batchNumber,
        },
      },
    });

    if (drugs.length === 0) {
      return res
        .status(404)
        .json({ message: "No drugs found for the given batch number" });
    }

    res.status(200).json(drugs);
  } catch (error) {
    res.status(500).json({ message: `Error fetching drugs: ${error.message}` });
  }
};

// Get a specific drug by ID
export const getDrugById = async (req, res) => {
  try {
    const { id } = req.params;
    const drug = await DrugInventory.findByPk(id);

    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    res.status(200).json(drug);
  } catch (error) {
    res.status(500).json({ message: `Error fetching drug: ${error.message}` });
  }
};

// Update a drug by ID
export const updateDrug = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      drugName,
      batchNumber,
      quantity,
      manufacturer,
      expirationDate,
      price,
      description,
    } = req.body;

    const drug = await DrugInventory.findByPk(id);

    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    await drug.update({
      drugName,
      batchNumber,
      quantity,
      manufacturer,
      expirationDate,
      price,
      description,
    });

    res.status(200).json({
      message: "Drug updated successfully",
      drug,
    });
  } catch (error) {
    res.status(500).json({ message: `Error updating drug: ${error.message}` });
  }
};

// Delete a drug by ID
export const deleteDrug = async (req, res) => {
  try {
    const { id } = req.params;
    const drug = await DrugInventory.findByPk(id);

    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    await drug.destroy();

    res.status(200).json({ message: "Drug deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error deleting drug: ${error.message}` });
  }
};

export const getAllIssuedDrugs = async (req, res) => {
  try {
    try {
      const drugs = await DrugInventory.findAll({
        attributes: ["id", "drugName"],
      });

      if (!drugs || drugs.length === 0) {
        return res.status(404).json({ message: "No drugs found in inventory" });
      }

      res.status(200).json(drugs);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error fetching drugs: ${error.message}` });
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching drugs: ${error.message}` });
  }
};
