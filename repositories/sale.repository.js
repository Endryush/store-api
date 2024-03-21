import { connect } from "./db.js"

async function insertSale (sale) {
  const connection = await connect()
  try {
    const sql = 'INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [sale.value, sale.date, sale.client_id, sale.product_id]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function getAllSales () {
  const connection = await connect()
  try {
    const response = await connection.query('SELECT * FROM sales')

    return  response.rows
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function getSale (id) {
  const connection = await connect()
  try {
    const response = await connection.query(`SELECT * FROM sales WHERE sale_id=$1`,[id])

    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function updateSale (sale) {
  const connection = await connect()
  try {
    const sql = 'UPDATE sales SET value = $1, date= $2, client_id = $3 WHERE sale_id=$4 RETURNING *'
    const values = [sale.value, sale.date, sale.client_id, sale.sale_id]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function deleteSale (id) {
  const connection = await connect()
  try {
    const r = await connection.query(`DELETE FROM sales WHERE sale_id=$1`,[id])

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
  insertSale,
  getAllSales,
  getSale,
  updateSale,
  deleteSale
}