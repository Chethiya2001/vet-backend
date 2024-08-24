import express from "express";

import { createAdminRegister,loginAdmin } from "../controllers/authController.js";
const router = express.Router();



router.post("/", createAdminRegister);

 router.post("/login",loginAdmin);



export default router;
