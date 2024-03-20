import { connect } from "./db.js"

async function insertSupplier (supplier) {
  const connection = await connect()
  try {
    const sql = 'INSERT INTO suppliers (name, cnpj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function getAllSuppliers () {
  const connection = await connect()
  try {
    const response = await connection.query('SELECT * FROM suppliers')

    return  response.rows
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function getSupplier (id) {
  const connection = await connect()
  try {
    const response = await connection.query(`SELECT * FROM suppliers WHERE supplier_id=$1`,[id])

    return response?.rows?.[0] ?? 'Supplier not found'
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function updateSupplier (supplier) {
  const connection = await connect()
  try {
    const sql = 'UPDATE suppliers SET name = $1, cnpj= $2, phone = $3, email = $4, address = $5 WHERE supplier_id=$6 RETURNING *'
    const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address, supplier.supplier_id]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function deleteSupplier (id) {
  const connection = await connect()
  try {
    const r = await connection.query(`DELETE FROM suppliers WHERE supplier_id=$1`,[id])

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
  insertSupplier,
  getAllSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier
}