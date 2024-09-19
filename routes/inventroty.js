import express from "express";
import {
  addDrug,
  getAllDrugs,
  getDrugsByBatch,
  getDrugById,
  updateDrug,
  deleteDrug,
  getAllIssuedDrugs,
} from "../controllers/drugInventrory.js";

const router = express.Router();

router.post("/", addDrug);
router.get("/", getAllDrugs);
router.get("/batch", getDrugsByBatch);
router.get("/drugs", getAllIssuedDrugs);
router.get("/:id", getDrugById);
router.put("/:id", updateDrug);
router.delete("/:id", deleteDrug);

export default router;
