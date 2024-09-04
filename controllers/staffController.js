import Staff from "../models/staff.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const addStaff = async (req, res) => {
  try {
    const { name, address, email, contact, nic, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = await Staff.create({
      name,
      address,
      email,
      contact,
      nic,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Staff added successfully",
      staff,
    });
  } catch (error) {
    console.error("Error creating staff:", error); // Log the error
    res.status(500).json({ message: `Error creating staff: ${error.message}` }); // Ensure response is JSON
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

export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Staff.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("Admin not found");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send(`Error during login: ${error.message}`);
  }
};
