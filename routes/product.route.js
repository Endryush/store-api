import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router()

router
  .post('/', ProductController.createProduct)
  .get('/', ProductController.getAllProducts)
  .get('/:id', ProductController.getProduct)
  .put( '/', ProductController.updateProduct)
  .delete('/:id', ProductController.deleteProduct)
  .get('/info/all', ProductController.getAllProductInfo)
  .post('/info', ProductController.createProductInfo)
  .put('/info', ProductController.updateProductInfo)
  .delete('/info/:id', ProductController.deleteProductInfo)
  .post('/review', ProductController.createReview)
  .delete('/:id/review/:index', ProductController.deleteReview)

export default router