/********************/
/*** Import des module nécessaire */

const express = require('express')
const userCtrl = require('../controllers/user')

/********************/
/*** récuperation du routeur d'express*/

let router = express.Router()

/********************/
/*** Rmiddleware pour logger date de requete */
router.use((req, res, next) => {
  const event = new Date()
  console.log('User Time', event.toString())
  next()
})

/********************/
/*** Routage de la ressource User */

router.get('/', userCtrl.getAllUsers)

// pour recuperer un utilisateur préciser par un id ainsi que id dans l'url
router.get('/:id', userCtrl.getUser)

//  put, pour l'ajout, crée
router.put('', userCtrl.addUser)

// patch pour la modification
router.patch('/:id', userCtrl.updateUser)


// recuperer utilisateur supprimer
router.post('/untrash/:id', userCtrl.untrashUser)

// pour suprimer mais en corbeille
router.delete('/trash/:id' , userCtrl.trashUser)

// pour supprimer completement
router.delete('/:id' , userCtrl.deletedUser)

module.exports = router
