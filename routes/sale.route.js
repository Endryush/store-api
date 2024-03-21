import express from "express";
import SaleController from "../controllers/sale.controller.js";

const router = express.Router()

router
  .post('/', SaleController.createSale)
  .get('/', SaleController.getAllSales)
  .get('/:id', SaleController.getSale)
  .put( '/', SaleController.updateSale)
  .delete('/:id', SaleController.deleteSale)

export default router