/********************/
/*** Import des module nécessaire */

const { DataTypes } = require("sequelize")

const DB = require('../db.config')

/********************/
/*** IDéfinition du moèle */

const Cocktail = DB.define('Cocktail', {
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER(10),
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING(100),
    defaultValue: '',
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue:'',
    allowNull: false,
  },
  recette: {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: false
  }
}, { paranoid: true})    // ici pour faire de softDelete c'est a dire envoyer a une corbeille pour pas supprimer completement

/********************/
/*** Syncronisation des modèle */

// Cocktail.sync()
// Cocktail.sync({force: true})
// Cocktail.sync({alter: true})

module.exports = Cocktail


