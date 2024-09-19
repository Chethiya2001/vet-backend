import express from "express";
import {
  issueDrug,
  getIssuedDrugs,
} from "../controllers/issueDrugController.js";

const router = express.Router();

router.post("/", issueDrug);

router.get("/", getIssuedDrugs);

export default router;
