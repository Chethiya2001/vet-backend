import Auth from "../models/Auth.js";
const jwtSecret = "ADBC45321F475";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAdminRegister = async (req, res) => {
  try {
    const { name, address, email, password, contact, nic, role } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the provided role or default to 'user'
    const user = await Auth.create({
      name,
      address,
      email,
      password: hashedPassword,
      contact,
      nic,
      role: role || "user", // Default to "user" if role is not provided
    });

    res.status(201).send(`Admin with the id ${user.id} created successfully`);
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Auth.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    // Create a JWT token with the user's id, email, and role
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).send(`Error during login: ${error.message}`);
  }
};
