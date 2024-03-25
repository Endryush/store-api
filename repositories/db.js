import Sequelize from 'sequelize'


const sequelize = new Sequelize(
  process.env.DB_URL,
  {
    dialect: 'postgres',
    define: {
      timestamps: false // add createdAt and  updatedAt in data bank before toggle timestamps to true
    }
  }
)

export default sequelize