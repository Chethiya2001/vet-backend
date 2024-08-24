import express from "express";
import bodyParser from "body-parser";
import AuthRoutes from "./routes/auth.js";
import DoctorRoutes from "./routes/doctor.js";
import starfRoutes from "./routes/staff.js";
import AnimalRoutes from "./routes/animal.js";
import sequelize from "./db.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/auth", AuthRoutes);
app.use("/auth/login", AuthRoutes);
app.use("/doctor", DoctorRoutes);
app.use("/staff", starfRoutes);
app.use("/animal", AnimalRoutes);

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
