import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router()

router
  .post('/', ProductController.createProduct)
  .get('/', ProductController.getAllProducts)
  .get('/:id', ProductController.getProduct)
  .put( '/', ProductController.updateProduct)
  .delete('/:id', ProductController.deleteProduct)

export default router