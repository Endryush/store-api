import ProductService from "../services/product.service.js"

async function createProduct (req, res, next) {
  try {
    const product = req.body
  
    if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
      throw new Error('Os campos name, description, value, stock e supplierId são todos obrigatórios')
    }

    res.status(201).send(await ProductService.createProduct(product))
    logger.info(`POST EM /CLIENT ${JSON.stringify(product)}`)
  } catch (error) {
    next(error)
  }
}

async function getAllProducts (req, res, next) {
  try {
    res.status(200).send(await ProductService.getAllProducts())
    logger.info('GET /products')
  } catch (error) {
    next(error)
  }
}

async function getProduct (req, res, next) {
  try {
    const { id } = req.params

    const response = await ProductService.getProduct(id)
    
    if (!response)  res.status(404).send({ message: 'Product not found' })

    res.status(200).send(response)
    logger.info('GET /product by ID')
  } catch (error) {
    next(error)
  }
}

async function updateProduct (req, res, next) {
  try {
    const product = req.body
  
    if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId || !product.productId) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const updatedProduct = await ProductService.updateProduct(product)

    res.status(200).send(updatedProduct)
    logger.info(`UPDATED /product to ${JSON.stringify(updatedProduct)}`)
  } catch (error) {
    next(error)
  }
}

async function deleteProduct (req, res, next) {
  try {
    const { id } = req.params

    res.status(200).send(await ProductService.deleteProduct(id))
    logger.info('GET /product by ID')
  } catch (error) {
    next(error)
  }
}

async function createProductInfo ( req, res, next) {
  try {
    let productInfo = req.body
    if (!productInfo.productId) throw new Error('Product ID é obrigatório')

    res.status(200).send(await ProductService.createProductInfo(productInfo))
    logger.info('POST /product/info', + productInfo)
  } catch (error) {
    next(error)
  }
}

async function updateProductInfo ( req, res, next) {
  try {
    let productInfo = req.body
    if (!productInfo.productId) throw new Error('Product ID é obrigatório')

    res.status(200).send(await ProductService.updateProductInfo(productInfo))
    logger.info('PUT /product/info', + productInfo)
  } catch (error) {
    next(error)
  }
}


export default {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductInfo,
  updateProductInfo
}