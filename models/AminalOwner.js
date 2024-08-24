import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const AnimalOwner = sequelize.define("AnimalOwner", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nic:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  }
});

export default AnimalOwner;