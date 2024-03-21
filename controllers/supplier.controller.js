import SupplierService from "../services/supplier.service.js"

async function createSupplier (req, res, next) {
  try {
    const supplier = req.body
  
    if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
      throw new Error('Os campos name, cnpj, email, phone e address são todos obrigatórios')
    }

    res.status(201).send(await SupplierService.createSupplier(supplier))
    logger.info(`POST EM /CLIENT ${JSON.stringify(supplier)}`)
  } catch (error) {
    next(error)
  }
}

async function  getAllSuppliers (req, res, next) {
  try {
    res.status(200).send(await SupplierService.getAllSuppliers())
    logger.info('GET /suppliers')
  } catch (error) {
    next(error)
  }
}

async function getSupplier (req, res, next) {
  try {
    const { id } = req.params

    res.status(200).send(await SupplierService.getSupplier(id))
    logger.info('GET /supplier by ID')
  } catch (error) {
    next(error)
  }
}

async function updateSupplier (req, res, next) {
  try {
    const supplier = req.body
  
    if (!supplier.supplier_id  || !supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const updatedSupplier = await SupplierService.updateSupplier(supplier)

    res.status(200).send(updatedSupplier)
    logger.info(`UPDATED /supplier to ${JSON.stringify(updatedSupplier)}`)
  } catch (error) {
    next(error)
  }
}

async function deleteSupplier (req, res, next) {
  try {
    const { id } = req.params

    res.status(200).send(await SupplierService.deleteSupplier(id))
    logger.info('GET /supplier by ID')
  } catch (error) {
    next(error)
  }
}

export default {
  createSupplier,
  getAllSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier
}