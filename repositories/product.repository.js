import { connect } from "./db.js"

async function insertProduct (product) {
  const connection = await connect()
  try {
    const sql = 'INSERT INTO products (name, description, value, stock, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const values = [product.name, product.description, product.value, product.stock, product.supplier_id]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function getAllProducts () {
  const connection = await connect()
  try {
    const response = await connection.query('SELECT * FROM products')

    return  response.rows
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function getProduct (id) {
  const connection = await connect()
  try {
    const response = await connection.query(`SELECT * FROM products WHERE product_id=$1`,[id])

    return response?.rows?.[0] ?? 'Product not found'
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function updateProduct (product) {
  const connection = await connect()
  try {
    const sql = 'UPDATE products SET name = $1, description= $2, value = $3, stock = $4, supplier_id = $5 WHERE product_id=$6 RETURNING *'
    const values = [product.name, product.description, product.value, product.stock, product.supplier_id, product.product_id]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function deleteProduct (id) {
  const connection = await connect()
  try {
    const r = await connection.query(`DELETE FROM products WHERE product_id=$1`,[id])

    return {
      'message': 'Deleted successfully',
    }
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

export default {
  insertProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
}