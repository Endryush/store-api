import ProductRepository from "../repositories/product.repository.js"

async function getAllProducts () {
  return await ProductRepository.getAllProducts()
}

async function createProduct (product) {
  return await ProductRepository.insertProduct(product);
}

async function getProduct (id) {
  return await ProductRepository.getProduct(id)
}

async function updateProduct (product) {
  return await ProductRepository.updateProduct(product)
}

async function deleteProduct (id) {
  return await ProductRepository.deleteProduct(id)
}
export default {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}