/********************/
/*** Import des modules nécessaires */

const express = require('express');

const User = require('../models/user');
const authCtrl = require('../controllers/auth');
require('dotenv').config(); // To load environment variables

/********************/
/*** Récupération du routeur d'express */

let router = express.Router();

/********************/
/*** Rmiddleware pour logger date de requete */
router.use((req, res, next) => {
  const event = new Date()
  console.log('AUTH Time', event.toString())
  next()
})

/********************/
/*** Routage de la ressource Auth */
router.post('/login', authCtrl.login)

module.exports = router;
