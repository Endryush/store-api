import { connect } from "./mongo.db.js";
import ProductInfoSchema from "../schemas/productInfo.schema.js";
 
async function createProductInfo (productInfo) {
  try {
    const mongoose = await connect()
    const ProductInfo = mongoose.model('ProductInfo', ProductInfoSchema);
    productInfo = new ProductInfo(productInfo)
    return await productInfo.save(productInfo)
  } catch (error) {
    throw error
  } 
}

async function updateProductInfo (productInfo) {
  try {
    const mongoose = await connect()
    const ProductInfo = mongoose.model('ProductInfo', ProductInfoSchema);
    return await ProductInfo.findOneAndUpdate({ productId: productInfo.productId}, productInfo)
  } catch (error) {
    throw error
  }
}

async function getProductInfo (productId) {
  try {
    const mongoose = await connect()
    const ProductInfo = mongoose.model('ProductInfo', ProductInfoSchema);

    return await ProductInfo.findOne({ productId }).exec()
  } catch (error) {
    throw error
  }
}

async function getAllProductInfo () {
  try {
    const mongoose = await connect()
    const ProductInfo = mongoose.model('ProductInfo', ProductInfoSchema);
    const t = await ProductInfo.find().exec()
    return await ProductInfo.find().exec()
  } catch (error) {
    throw error
  }
}

async function createReview (review, productId) {
  try {
    const productInfo = await getProductInfo(productId)
    productInfo.reviews.push(review)
    return await updateProductInfo(productInfo)
  } catch (error) {
    throw error
  }
}

async function deleteReview (productId, index) {
  try {
    const productInfo = await getProductInfo(productId)
    productInfo.reviews.splice(index, 1)

    return await updateProductInfo(productInfo)
  } catch (error) {
    throw error
  }
}

async function deleteProductInfo (productId) {
  try {
    const mongoose = await connect()
    const ProductInfo = mongoose.model('ProductInfo', ProductInfoSchema);

    return ProductInfo.deleteOne({ productId }).exec()
  } catch (error) {
    throw error
  }
}

export default {
  createProductInfo,
  updateProductInfo,
  getProductInfo,
  createReview,
  deleteReview,
  getAllProductInfo,
  deleteProductInfo
}