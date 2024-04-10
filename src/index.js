import express from "express";
import cors from 'cors'
import winston from 'winston'
import clientsRouter from './routes/client.route.js'
import productsRouter from './routes/product.route.js'
import salesRouter from './routes/sale.route.js'
import suppliersRouter from './routes/supplier.route.js'
import dotenv from 'dotenv';

dotenv.config();

const { combine, timestamp, label, printf } = winston.format
const formatLog = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'store-api.log' })
  ],
  format: combine(
    label({ label: 'Store API'}),
    timestamp(),
    formatLog
  )
})

const app = express()
app.use(express.json())
app.use(cors())
app.use('/client', clientsRouter)
app.use('/supplier', suppliersRouter)
app.use('/product', productsRouter)
app.use('/sale', salesRouter)
app.get('/health-check', (req, res) => {
  try {
    res.status(200).send('Server is running')
  } catch (error) {
    res.status(500).send(`Error: ${error}`)
  }
})

app.use((error, req, res, next) => {
  logger.error(`Error processing request: ${req.method} - ${req.baseUrl} - ${error.message ?? JSON.stringify(error)}`)
  res.status(400).send({ error: error.message ?? error })
})

app.listen(5678, () => console.log('API started on port 5678'))
