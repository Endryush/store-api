import { connect } from "./db.js"

async function insertClient (client) {
  try {
    const connection = await connect()
    const sql = 'INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *'
    const values = [client.name, client.cpf, client.phone, client.email, client.address]
    const response = await connection.query(sql, values)
  
    return response?.rows?.[0]
  } catch (error) {
    next(error);
  }
}

export default {
  insertClient
}