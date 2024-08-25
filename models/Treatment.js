import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Treatment = sequelize.define("Treatment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  description: { // Fixed the typo from 'discription' to 'description'
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER, // Changed from DataTypes.NUMBER to DataTypes.INTEGER
    allowNull: false,
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  prescription: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
});

export default Treatment;
