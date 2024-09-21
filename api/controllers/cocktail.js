/********************/
/*** Import des module nécessaire */
const bcript = require('bcrypt')

const Cocktail  = require('../models/cocktail')



// GET pour récupérer l'ensemble des cocktails
exports.getAllCocktail = (req, res) => {
  Cocktail.findAll()
    .then(cocktails => res.json({ data: cocktails }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

// GET pour récupérer un cocktail précisé par un id
exports.getCoctail = async (req, res) => {
  let cocktailId = parseInt(req.params.id)

  // Vérification si le champ ID est présent et cohérent
  if (!cocktailId) {
    return res.status(400).json({ message: "Missing Parameter" })
  }

  try {
      // Récupération du cocktail
      let cocktail = await Cocktail.findOne({where: {id: cocktailId}, raw: true})
      // test si resultat
      if (cocktail === null) {
        return res.status(404).json({ message: 'This cocktail does not exist!' })
    }
    // renvoi du Cocktail trouvé
    return res.json({ data: cocktail })

  }catch(err){
    res.status(500).json({message: 'database Error'})
  }}


// PUT pour ajouter/créer un cocktail
exports.addCocktail = async (req, res) => {
  const { user_id, nom, description, recette } = req.body

// Validation des données reçues
if (!user_id || !nom || !description || !recette) {
  return res.status(400).json({ message: 'Missing Data' })
  }
try {
  //Vérifier si le cocktail existe
  let cocktail = await Cocktail.findOne({ where: { nom: nom }, raw: true })
    if (cocktail !== null) {
      return res.status(409).json({ message: `The cocktail ${nom} already exists!` })
    }

  // Création du cocktail
  cocktail = await Cocktail.create(req.body)
    return res.json({ message: 'Cocktail created', data: cocktail })
  }catch(err){
    return res.status(500).json({ message: 'Database Error', error: err })
  }
}

exports.updateCocktail = async (req, res) => {
  let cocktailId = parseInt(req.params.id)

  // Vérification si le champ id est présent et cohérent
  if (!cocktailId) {
      return res.status(400).json({ message: 'Missing parameter' })
  }

  try{
      // Recherche du cocktail et vérification
      let cocktail = await Cocktail.findOne({ where: { id: cocktailId }, raw: true })
      if (cocktail === null) {
          return res.status(404).json({ message: 'This cocktail does not exist !' })
      }

      // Mise à jour du cocktail
      await Cocktail.update(req.body, { where: { id: cocktailId } })
      return res.json({ message: 'Cocktail Updated' })
  }catch(err){
      return res.status(500).json({ message: 'Database Error', error: err })
  }
}

// POST pour récupérer un cocktail supprimé
exports.untrashCocktail = (req, res) => {
  let cocktailId = parseInt(req.params.id)

  // Vérification si le champ ID est présent et cohérent
  if (!cocktailId) {
    return res.status(400).json({ message: 'Missing Parameter' })
  }

  Cocktail.restore({ where: { id: cocktailId } })
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

// DELETE pour supprimer un cocktail mais le mettre en corbeille
exports.trashCocktail = (req, res) => {
  let cocktailId = parseInt(req.params.id)

  // Vérification si le champ ID est présent et cohérent
  if (!cocktailId) {
    return res.status(400).json({ message: 'Missing Parameter' })
  }

  // Suppression du cocktail
  Cocktail.destroy({ where: { id: cocktailId } })
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

// DELETE pour supprimer complètement un cocktail
exports.deleteCocktail = (req, res) => {
  let cocktailId = parseInt(req.params.id)

  // Vérification si le champ ID est présent et cohérent
  if (!cocktailId) {
    return res.status(400).json({ message: 'Missing Parameter' })
  }

  // Suppression complète du cocktail
  Cocktail.destroy({ where: { id: cocktailId }, force: true })
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}
