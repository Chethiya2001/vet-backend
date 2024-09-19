import express from "express";
import bodyParser from "body-parser";
import AuthRoutes from "./routes/auth.js";
import DoctorRoutes from "./routes/doctor.js";
import starfRoutes from "./routes/staff.js";
import AnimalRoutes from "./routes/animal.js";
import AnimalOwnerRoutes from "./routes/animal-owner.js";
import sequelize from "./db.js";
import AppoimentRoutes from "./routes/appoment.js";
import TreatmentRoutes from "./routes/treatment.js";
import InventroryRoutes from "./routes/inventroty.js";
import IssueDrugRoutes from "./routes/issueDrug.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/auth", AuthRoutes);
app.use("/auth/login", AuthRoutes);
app.use("/doctor", DoctorRoutes);
app.use("/staff", starfRoutes);
app.use("/animal", AnimalRoutes);
app.use("/animal-owner", AnimalOwnerRoutes);
app.use("/appoiment", AppoimentRoutes);
app.use("/treatment", TreatmentRoutes);
app.use("/inventory", InventroryRoutes);
app.use("/issue-drug", IssueDrugRoutes);
const startServer = async () => {
  try {
    await sequelize.sync(); // Sync all models with the database
    app.listen(PORT, () =>
      console.log(`Server started on port: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
