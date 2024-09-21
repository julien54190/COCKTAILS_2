/********************/
/*** Import des modules nécessaires */

const express = require('express')

const cocktailCtrl = require('../controllers/cocktail')

const checkTokenMiddleware = require('../jsonwebtoken/check')

/********************/
/*** Récupération du routeur d'express */

let router = express.Router()

/********************/
/*** Rmiddleware pour logger date de requete */
router.use((req, res, next) => {
  const event = new Date()
  console.log('COCKTAIL Time', event.toString())
  next()
})

/********************/
/*** Routage de la ressource Cocktail */

// GET pour récupérer l'ensemble des cocktails
router.get('', cocktailCtrl.getAllCocktail)

// GET pour récupérer un cocktail précisé par un id
router.get('/:id', cocktailCtrl.getCoctail)


// PUT pour ajouter/créer un cocktail
router.put('', checkTokenMiddleware , cocktailCtrl.addCocktail)

// patch pour modifier le cocktail
router.patch('/:id', checkTokenMiddleware, cocktailCtrl.updateCocktail)


// POST pour récupérer un cocktail supprimé
router.post('/untrash/:id', checkTokenMiddleware , cocktailCtrl.untrashCocktail)

// DELETE pour supprimer un cocktail mais le mettre en corbeille
router.delete('/trash/:id', checkTokenMiddleware , cocktailCtrl.trashCocktail)

// DELETE pour supprimer complètement un cocktail
router.delete('/:id', checkTokenMiddleware , cocktailCtrl.deleteCocktail)

module.exports = router
