import { getClient } from "./mongo.db.js";

async function createProductInfo (productInfo) {
  const  client = getClient();
  try {
    await client.connect()
    return await client.db('store').collection('productInfo').insertOne(productInfo)
  } catch (error) {
    throw error
  } finally {
    await client.close()
  }
}

async function updateProductInfo (productInfo) {
  const  client = getClient();
  try {
    await client.connect()
    return await client.db('store').collection('productInfo').updateOne(
      { productId: productInfo.productId },
      { $set: { ...productInfo } }
    )
  } catch (error) {
    throw error
  } finally {
    await client.close()
  }
}

async function getProductInfo (productId) {
  const  client = getClient();
  try {
    await client.connect()
    return await client.db('store').collection('productInfo').findOne({ productId })
  } catch (error) {
    throw error
  } finally {
    await client.close()
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

export default {
  createProductInfo,
  updateProductInfo,
  getProductInfo,
  createReview,
  deleteReview
}