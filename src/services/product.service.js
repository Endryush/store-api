import ProductRepository from "../repositories/product.repository.js"
import ProductInfoRepository from "../repositories/productInfo.repository.js"
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
  if (product) {
    product.info = await ProductInfoRepository.getProductInfo(parseInt(id))
  }

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
  const product = await ProductRepository.getProduct(id)
  if (!product) throw new Error("Product doesn't exist")

  return await ProductRepository.deleteProduct(id)
}

async function createProductInfo (productInfo) {
  return await ProductInfoRepository.createProductInfo(productInfo) 
}

async function updateProductInfo (productInfo) {
  return await ProductInfoRepository.updateProductInfo(productInfo)
}

async function createReview(review, productId){ 
  return await ProductInfoRepository.createReview(review, productId)
}

async function deleteReview (productId, index) {
  if (!await ProductInfoRepository.getProductInfo(parseInt(productId))) throw new Error('product not exists')
  return await ProductInfoRepository.deleteReview(parseInt(productId), index)
}

async function getAllProductInfo () {
  return await ProductInfoRepository.getAllProductInfo()
}

async function deleteProductInfo (productId) {
  return await ProductInfoRepository.deleteProductInfo(productId)
}
export default {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductInfo,
  updateProductInfo,
  createReview,
  deleteReview,
  getAllProductInfo,
  deleteProductInfo
}