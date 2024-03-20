import ClientRepository from "../repositories/client.repository.js"

async function createClient (client) {
  return await ClientRepository.insertClient(client);
}

async function getAllClients () {
  return await ClientRepository.getAllClients()
}

async function getClient (id) {
  return await ClientRepository.getClient(id)
}

async function updateClient (client) {
  return await ClientRepository.updateClient(client)
}

async function deleteClient (id) {
  return await ClientRepository.deleteClient(id)
}
export default {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient
}