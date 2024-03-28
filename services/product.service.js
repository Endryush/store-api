import ProductRepository from "../repositories/product.repository.js"
import productInfoRepository from "../repositories/productInfo.repository.js"
import saleRepository from "../repositories/sale.repository.js"
import SupplierRepository from "../repositories/supplier.repository.js"

async function getAllProducts () {
  return await ProductRepository.getAllProducts()
}

async function createProduct (product) {
  const supplier = await SupplierRepository.getSupplier(product.supplierId)
  if (!supplier) throw new Error('Supplier not found')

  return await ProductRepository.insertProduct(product);
}

async function getProduct (id) {
  const product = await ProductRepository.getProduct(id)
  product.info = await productInfoRepository.getProductInfo(parseInt(id))

  return product
}

async function updateProduct (product) {
  const supplier = await SupplierRepository.getSupplier(product.supplierId)
  if (!supplier) throw new Error('Supplier not found')

  return await ProductRepository.updateProduct(product)
}

async function deleteProduct (id) {
  const sales = await saleRepository.getSalesByProductId(id)
  if (sales?.length > 0) throw new Error('Its not possible to delete product because it has sales registered')
  return await ProductRepository.deleteProduct(id)
}

async function createProductInfo (productInfo) {
  return await productInfoRepository.createProductInfo(productInfo) 
}

async function updateProductInfo (productInfo) {
  return await productInfoRepository.updateProductInfo(productInfo)
}
export default {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductInfo,
  updateProductInfo
}