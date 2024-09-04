import Doctor from "../models/Doctor.js";
const jwtSecret = "ADBC45321F475";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      address,
      email,
      qualifications,
      password,
      contact,
      gender,
      nic,
    } = req.body;
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name,
      address,
      email,
      qualifications,
      gender,
      contact,
      password: hashedPassword,
      nic,
    });
    res.status(201).json({
      message: "Doctor added successfully",
      animal: doctor,
    });
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
};
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).send(`Error fetching doctors: ${error.message}`);
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).send(`Error fetching doctor: ${error.message}`);
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, email, qualifications, gender, contact, nic } =
      req.body;
    const [updated] = await Doctor.update(
      { name, address, email, qualifications, gender, contact, nic },
      { where: { id } }
    );
    if (!updated) {
      return res.status(404).send("Doctor not found");
    }
    const updatedDoctor = await Doctor.findByPk(id);
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).send(`Error updating doctor: ${error.message}`);
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Doctor.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send("Doctor not found");
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).send(`Error deleting doctor: ${error.message}`);
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Doctor.findOne({ where: { email } });
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
export const getDoctorByName = async (req, res) => {
  try {
    const { name } = req.params;

    const animal = await Doctor.findOne({
      where: {
        name: name,
      },
    });

    if (!animal) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(animal);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching Doctor: ${error.message}` });
  }
};
