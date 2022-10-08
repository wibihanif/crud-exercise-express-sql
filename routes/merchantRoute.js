import express from "express";
import { merchantController } from "../controllers/index.js";

const router = express.Router();

router.post("/register", merchantController.registerMerchant);
router.delete("/:id", merchantController.deleteMerchant);
router.get("/:id/products", merchantController.getAllProductsFromMerchant);
router.post("/login", merchantController.loginMerchant);
export default router;
