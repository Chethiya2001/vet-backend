import express from "express";

import {
  createAdminRegister,
  loginAdmin,
} from "../controllers/authController.js";

import { authenticateToken, authorizeRoles } from "../middleware/token.js";

const router = express.Router();

router.post("/", createAdminRegister);

router.post("/login", loginAdmin);

router.post(
  "/admin/register",
  authorizeRoles("admin"),
  createAdminRegister
);

export default router;
