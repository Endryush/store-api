import { connect } from "./db.js"

async function insertClient (client) {
  const connection = await connect()
  try {
    const sql = 'INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const values = [client.name, client.cpf, client.phone, client.email, client.address]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function getAllClients () {
  const connection = await connect()
  try {
    const response = await connection.query('SELECT * FROM clients')

    return  response.rows
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function getClient (id) {
  const connection = await connect()
  try {
    const response = await connection.query(`SELECT * FROM clients WHERE client_id=$1`,[id])

    return response?.rows?.[0] ?? 'Client not found'
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function updateClient (client) {
  const connection = await connect()
  try {
    const sql = 'UPDATE clients SET name = $1, cpf= $2, phone = $3, email = $4, address = $5 WHERE client_id=$6 RETURNING *'
    const values = [client.name, client.cpf, client.phone, client.email, client.address, client.client_id]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    throw error;
  } finally {
    connection.release()
  }
}

async  function deleteClient (id) {
  const connection = await connect()
  try {
    const r = await connection.query(`DELETE FROM clients WHERE client_id=$1`,[id])

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
  insertClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient
}