import Doctor from "../models/Doctor.js";

export const addDoctor = async (req, res) => {
  try {
    const { name, address, email, qualifications, contact, gender, nic } =
      req.body;

    const doctor = await Doctor.create({
      name,
      address,
      email,
      qualifications,
      gender,
      contact,
      nic,
    });
    res.status(201).json({
      message: "Doctor added successfully",
      animal: doctor
    });
  } catch (error) {
    res.status(500).send(`Error creating user: ${error.message}`);
  }
};
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
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
