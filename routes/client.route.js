import express from "express";
import ClientController from "../controllers/client.controller.js";

const router = express.Router()

router
  .post('/', ClientController.createClient)
  .get('/', ClientController.getAllClients)
  .get('/:id', ClientController.getClient)
  .put( '/', ClientController.updateClient)
  .delete('/:id', ClientController.deleteClient);


export default router