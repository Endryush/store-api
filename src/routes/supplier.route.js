import express from "express";
import SupplierController from "../controllers/supplier.controller.js";

const router = express.Router()

router
  .post('/', SupplierController.createSupplier)
  .get('/', SupplierController.getAllSuppliers)
  .get('/:id', SupplierController.getSupplier)
  .put( '/', SupplierController.updateSupplier)
  .delete('/:id', SupplierController.deleteSupplier)

export default router