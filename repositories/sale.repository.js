import Product from '../models/product.model.js'
import Sale from '../models/sale.model.js'

async function insertSale (sale) {
  try {
    return await Sale.create(sale) 
  } catch (error) {
    throw error
  }
}

async function getSales () {
  try {
    return await Sale.findAll({
      include: [
        {
          model: Product
        }
      ]
    })
  } catch (error) {
    throw error
  }
}

async function getSale (id) {
  try {
    return await Sale.findByPk(id)
  } catch (error) {
    throw error
  }
}

async function updateSale (sale) {
  try {
    await Sale.update(
      {
        value: sale.value,
        date: sale.date,
        clientId: sale.clientId,
      }, 
      {
      where: { saleId: sale.saleId },
      }
    )

    return await getSale(sale.saleId)
  } catch (error) {
    throw error
  }
}

async function getSalesByProductId (productId) {
   try {
    return await Sale.findAll({
      where: { productId },
      include: [ {  model: Product } ]
    })
  } catch (error) {
    throw error
  }
}

async function deleteSale (id) {
  try {
    await Sale.destroy({
      where: { saleId: id }
    })

    return {
      'message': 'Deleted successfully',
    }
  } catch (error) {
    throw error
  }
}

export default {
  insertSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
  getSalesByProductId
}