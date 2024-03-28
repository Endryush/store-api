import SaleService from "../services/sale.service.js"

async function createSale (req, res, next) {
  try {
    const sale = req.body
  
    if (!sale.value || !sale.date || !sale.clientId || !sale.productId) {
      throw new Error('Os campos value, date, clientId productId são todos obrigatórios')
    }

    res.status(201).send(await SaleService.createSale(sale))
    logger.info(`POST EM /CLIENT ${JSON.stringify(sale)}`)
  } catch (error) {
    next(error)
  }
}

async function getSales (req, res, next) {
  try {
    res.status(200).send(await SaleService.getSales(req.query.productId, req.query.supplierId))
    logger.info('GET /sales')
  } catch (error) {
    next(error)
  }
}

async function getSale (req, res, next) {
  try {
    const { id } = req.params
    const response = await SaleService.getSale(id)
    
    if (!response)  res.status(404).send({ message: 'Sale not found' })

    res.status(200).send(response)
    
    logger.info('GET /sale by ID')
  } catch (error) {
    next(error)
  }
}

async function updateSale (req, res, next) {
  try {
    const sale = req.body
  
    if (!sale.value || !sale.date || !sale.clientId || !sale.productId || !sale.saleId) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const updatedSale = await SaleService.updateSale(sale)

    res.status(200).send(updatedSale)
    logger.info(`UPDATED /sale to ${JSON.stringify(updatedSale)}`)
  } catch (error) {
    next(error)
  }
}

async function deleteSale (req, res, next) {
  try {
    const { id } = req.params

    res.status(200).send(await SaleService.deleteSale(id))
    logger.info('GET /sale by ID')
  } catch (error) {
    next(error)
  }
}

export default {
  createSale,
  getSales,
  getSale,
  updateSale,
  deleteSale
}