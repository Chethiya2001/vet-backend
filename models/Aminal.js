import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import AnimalOwner from "./AminalOwner.js"; 

const Animal = sequelize.define("Animal", {
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
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  animalOwnerNic: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: AnimalOwner, // The model being referenced
      key: "nic", // The column being referenced
    },
  },
});

Animal.belongsTo(AnimalOwner, { foreignKey: "animalOwnerNic" });




export default Animal;
