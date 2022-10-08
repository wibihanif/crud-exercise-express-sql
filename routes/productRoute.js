import express from "express";
import { productController } from "../controllers/index.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.delete("/:id", productController.deleteProductById);
router.patch("/:id", productController.editProductById);

export default router;
