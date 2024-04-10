import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbUrl = process.env.DB_URL
const sequelize = new Sequelize(
  dbUrl,
  {
    dialect: 'postgres',
    define: {
      timestamps: false // add createdAt and  updatedAt in data bank before toggle timestamps to true
    }
  }
)

export default sequelize