import Staff from "../models/staff.js";

export const addStaff = async (req, res) => {
  try {
    const { name, address, email, contact, nic } = req.body;

    const staff = await Staff.create({
      name,
      address,
      email,
      contact,
      nic,
    });
    res.status(201).json({
      message: "Staff added successfully",
      animal: staff,
    });
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
};
export const getStaff = async (req, res) => {
  try {
    const staffs = await Staff.findAll();
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).send(`Error fetching staffs: ${error.message}`);
  }
};

export const getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).send("staff not found");
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).send(`Error fetching staff: ${error.message}`);
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, email, contact, nic } = req.body;
    const [updated] = await Staff.update(
      { name, address, email, contact, nic },
      { where: { id } }
    );
    if (!updated) {
      return res.status(404).send("staff not found");
    }
    const updatedstaff = await staff.findByPk(id);
    res.status(200).json(updatedstaff);
  } catch (error) {
    res.status(500).send(`Error updating staff: ${error.message}`);
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Staf.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send("staff not found");
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).send(`Error deleting staff: ${error.message}`);
  }
};
