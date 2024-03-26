import SaleRepository from "../repositories/sale.repository.js"
import ClientRepository from "../repositories/client.repository.js"
import ProductRepository from "../repositories/product.repository.js"

async function getSales (productId) {
  return productId ? await SaleRepository.getSalesByProductId(productId) : await SaleRepository.getSales()
}
// validar se tem estoque e diminuir estoque
async function createSale (sale) {
  const errors = await hasErrors(sale)

  if (errors.length > 0) throw errors

  const product = await ProductRepository.getProduct(sale.productId)

  if (product.stock <= 0) throw new Error('Product has no stock') 
  
  const newSale =  await SaleRepository.insertSale(sale)
  product.stock--
  await ProductRepository.updateProduct(product)
  return newSale;
}

async function getSale (id) {
  return await SaleRepository.getSale(id)
}

async function updateSale (sale) {
  const errors = await hasErrors(sale, true)

  if (errors.length > 0) throw errors

  return await SaleRepository.updateSale(sale)
}

async function deleteSale (id) {
  const sale = await SaleRepository.getSale(id)

  if (!sale) throw new Error('Sale not found')

  const product = await ProductRepository.getProduct(sale.productId)
  product.stock++
  await ProductRepository.updateProduct(product)

  return await SaleRepository.deleteSale(id)
}

async function hasErrors (sale, isUpdating = false) {
  const errors = []
  const client = await ClientRepository.getClient(sale.clientId)
  if (!client) errors.push({ product_error: 'Client not found' })

  const product = await ProductRepository.getProduct(sale.productId)
  if (!product) errors.push({ product_error: 'Product not found' })
  
  if (isUpdating) {
    const updatingSale = await SaleRepository.getSale(sale.saleId)

    if (!updatingSale) errors.push({ sale_error: 'Sale not found' })
  }

  return errors
}
export default {
  getSales,
  createSale,
  getSale,
  updateSale,
  deleteSale
}