import SupplierRepository from "../repositories/supplier.repository.js"

async function getAllSuppliers () {
  return await SupplierRepository.getAllSuppliers()
}

async function createSupplier (supplier) {
  return await SupplierRepository.insertSupplier(supplier);
}

async function getSupplier (id) {
  return await SupplierRepository.getSupplier(id)
}

async function updateSupplier (supplier) {
  return await SupplierRepository.updateSupplier(supplier)
}

async function deleteSupplier (id) {
  return await SupplierRepository.deleteSupplier(id)
}
export default {
  getAllSuppliers,
  createSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier
}