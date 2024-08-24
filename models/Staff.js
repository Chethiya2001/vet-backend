
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Staff = sequelize.define("Staff", {
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
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nic: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});

export default Staff;
