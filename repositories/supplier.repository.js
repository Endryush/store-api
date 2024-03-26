import Supplier from '../models/supplier.model.js'

async function insertSupplier (supplier) {
  try {
    return await Supplier.create(supplier)
  } catch (error) {
    throw error
  }
}

async function getAllSuppliers () {
  try {
    return await Supplier.findAll()
  } catch (error) {
    throw error
  }
}

async function getSupplier (id) {
  try {
    return await Supplier.findByPk(id)
  } catch (error) {
    throw error
  }
}

async function updateSupplier (supplier) {
  try {
    await Supplier.update(supplier, {
      where: { supplierId: supplier.supplierId }
    })

    return await getSupplier(supplier.supplierId)
  } catch (error) {
    throw error
  }
}

async function deleteSupplier (id) {
  try {
    await Supplier.destroy({
      where: { supplierId: id }
    })

    return {
      'message': 'Deleted successfully',
    }
  } catch (error) {
    throw error
  }
}

export default {
  insertSupplier,
  getAllSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier
}