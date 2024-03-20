import ClientService from "../services/client.service.js"

async function createClient (req, res, next) {
  try {
    const client = req.body
  
    if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
      throw new Error('Os campos nome, cpf, email e addres são todos obrigatórios')
    }

    res.status(201).send(await ClientService.createClient(client))
    loggers.info(`POST EM /CLIENT ${JSON.stringify(client)}`)
  } catch (error) {
    next(error)
  }
}

export default {
  createClient
}