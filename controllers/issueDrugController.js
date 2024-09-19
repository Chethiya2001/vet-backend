import DrugInventory from "../models/Inventroy.js";
import IssuedDrug from "../models/IssueDrug.js";

export const issueDrug = async (req, res) => {
  const { drugId, quantity, ownerNic, petName } = req.body;

  try {
    // Find the drug by ID
    const drug = await DrugInventory.findByPk(drugId);

    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }

    // Check if there's enough quantity available
    if (drug.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Decrease the quantity in the DrugInventory
    drug.quantity -= quantity;
    await drug.save();

    // Record the issuance in IssuedDrug
    const issuedDrug = await IssuedDrug.create({
      drugId,
      ownerNic,
      petName,
      quantityIssued: quantity,
      issueDate: new Date(),
    });

    return res.status(200).json({
      message: "Drug issued successfully",
      issuedDrug,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error issuing drug: ${error.message}` });
  }
};

export const getIssuedDrugs = async (req, res) => {
  try {
    const issuedDrugs = await IssuedDrug.findAll();     

    res.status(200).json({ data: issuedDrugs });
  } catch (error) {
    res.status(500).json({ message: `Error fetching issued drugs: ${error.message}` });
  }
};
