import ClientService from "../services/client.service.js"

async function createClient (req, res, next) {
  try {
    const client = req.body
  
    if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
      throw new Error('Os campos name, cpf, phone, email e address são todos obrigatórios')
    }

    res.status(201).send(await ClientService.createClient(client))
    logger.info(`POST EM /CLIENT ${JSON.stringify(client)}`)
  } catch (error) {
    next(error)
  }
}

async function  getAllClients (req, res, next) {
  try {
    res.status(200).send(await ClientService.getAllClients())
    logger.info('GET /clients')
  } catch (error) {
    next(error)
  }
}

async function getClient (req, res, next) {
  try {
    const { id } = req.params

    res.status(200).send(await ClientService.getClient(id))
    logger.info('GET /client by ID')
  } catch (error) {
    next(error)
  }
}

async function updateClient (req, res, next) {
  try {
    const client = req.body
  
    if (!client.client_id  || !client.name || !client.cpf || !client.phone || !client.email || !client.address) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const updatedClient = await ClientService.updateClient(client)

    res.status(200).send(updatedClient)
    logger.info(`UPDATED /client to ${JSON.stringify(updatedClient)}`)
  } catch (error) {
    next(error)
  }
}

async function deleteClient (req, res, next) {
  try {
    const { id } = req.params

    res.status(200).send(await ClientService.deleteClient(id))
    logger.info('GET /client by ID')
  } catch (error) {
    next(error)
  }
}

export default {
  createClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient
}