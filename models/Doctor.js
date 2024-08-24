
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Doctor = sequelize.define("Doctor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  qualifications:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  nic: {
    type: DataTypes.STRING,
    allowNull: true,
  }

});

export default Doctor;
