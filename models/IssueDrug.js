import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const IssuedDrug = sequelize.define("IssuedDrug", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  drugId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ownerNic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  petName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantityIssued: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  issueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

export default IssuedDrug;
