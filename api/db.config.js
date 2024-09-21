/********************/
/*** Import des module nécessaire */

const { Sequelize } = require('sequelize')
const { log } = require('util')

/********************/
/*** Connexion à la BDD */



let sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
)


/********************/
/*** Syncronisation des modèle */
sequelize.sync(err => {

  console.log('Database sync OK Error', err);

  })

module.exports = sequelize
