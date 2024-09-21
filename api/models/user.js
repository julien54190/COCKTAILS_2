/********************/
/*** Import des module nécessaire */

const { DataTypes } = require("sequelize")

const DB = require('../db.config')
//const sequelize = require("../db.config")

/********************/
/*** IDéfinition du moèle */

const User = DB.define('User', {
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    defaultValue: '',
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING(100),
    defaultValue: '',
    allowNull: false
  },
  pseudo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    Validate:{
      isEmail: true   // Ici une validation de données
    }
  },
  password: {
    type: DataTypes.STRING(64),
    is: /^[0-9a-f]{64}$/i    //Ici une contrainte
  }
}, { paranoid: true})    // ici pour faire de softDelete c'est a dire envoyer a une corbeille pour pas supprimer completement


/********************/
/*** Syncronisation des modèle */

// User.sync()
// User.sync({force: true})
// User.sync({alter: true})

module.exports = User


