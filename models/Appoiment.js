import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import AnimalOwner from "./AminalOwner.js";
import Animal from "./Aminal.js";
import Doctor from "./Doctor.js";

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  appointmentNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  animalOwnerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: AnimalOwner,
      key: "id",
    },
  },
  animalId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Animal,
      key: "id",
    },
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Doctor,
      key: "id",
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Define relationships
Appointment.belongsTo(Animal, { foreignKey: "animalId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });
Appointment.belongsTo(AnimalOwner, { foreignKey: "animalOwnerId" });

export default Appointment;
