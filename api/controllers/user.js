/********************/
/*** Import des module nécessaire */
const bcript = require('bcrypt')

const User  = require('../models/user')


/********************/
/*** Routage de la ressource User */

// .get pour recuperer l'ensemble des utilisateuer
exports.getAllUsers = (req, res) => {
  User.findAll()
    .then( users => res.json({ data: users }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err})) // erreur ne sont pas mise de base juste pour le dev
}

// pour recuperer un utilisateur préciser par un id ainsi que id dans l'url
exports.getUser = async (req, res) => {
  let userId = parseInt(req.params.id)

  // verification si le champ ID est present et cohérent
  if (!userId){
    return res.json(400).json({ message: "Missing Parameter"})
  }

  try{
    //Récupération Utilisateur
    let user = await User.findOne({ where: {id: userId}, row: true})
    if((user === null)){
      return res.status(404).json({ message: 'This user does not exist !'})
    }
    // utilisateur trouvé
    return res.json({ data: user})
  }catch(err){
    return res.status(500).json({ message: 'Database Error', error: err})
  }
}

//  put, pour l'ajout, crée
exports.addUser = async (req, res) => {
  const {nom, prenom, pseudo, email, password} = req.body

    //Validation des données reçus
    if(!nom || !prenom || !pseudo || !email || !password){
      return res.status(400).json({message: 'Missing Data'})
}
  try{
    //Vérification si l'utilisateur existe déja
    const user = await User.findOne({ where: { email: email}, row: true})

    if( user !== null){
      return res.status(409).json({message: `the user ${nom} already exists!`})
    }

    // hashage du mot de passe utilisateur
    let hash = await bcript.hash(password,parseInt(process.env.BCRIPT_SALT_ROUND))
    req.body.password = hash

    // création Utilisateur
    let userc = await User.create(req.body)
    return res.json({message: 'User created', data: userc })
  }catch(err){
    if(err.name == 'SequelizeDatabaseError'){
      res.status(500).json({ message: 'Database Error', error: err })
  }
  res.status(500).json({ message: 'Hash Process Error', error: err})
}
  }

// patch pour la modification
exports.updateUser = async (req, res) => {
  let userId = parseInt(req.params.id)

  // vérifier si le champ id est présent et cohérent
  if( !userId) {
    return res.statut(400).json({ message: 'missing parameter'})
  }

  try {
    //recherche de l'utilisateur
    let user = await User.findOne({ where: {id: userId}, raw: true})

    //vérifier si l'utilisateur existe
    if(user === null){
      return res.status(400).json({ message: 'this user does not exixt ! '})
    }

    // MAJ de l'utilisateur
    await User.update(req.body, {where: {id: userId}})
    return res.json({ message: 'User Updates'})
  }catch(err){
    return res.status(500).json({message: 'DataBase Error', error:err})
  }
}

// recuperer utilisateur supprimer
exports.untrashUser = (req, res) => {
  let userId = parseInt(req.params.id)

  // vérifier si le champ id est présent et cohérent
  if( !userId) {
    return res.statut(400).json({ message: 'missing parameter'})
  }
  User.restore({where : userId})
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json({message: 'DataBase Error', error:err}))
}

// pour suprimer mais en corbeille
exports.trashUser = (req, res) => {
  let userId = parseInt(req.params.id)

  // verification si le champ ID est present et cohérent
  if (!userId){
    return res.json(400).json({ message: "Missing Parameter"})
  }

  // Suppression de l'utilisateur
  User.destroy({ where : { id: userId}})
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json({message: 'DataBase Error', error:err}))
}

// pour supprimer completement
exports.deletedUser = (req, res) => {
  let userId = parseInt(req.params.id)

  // verification si le champ ID est present et cohérent
  if (!userId){
    return res.json(400).json({ message: "Missing Parameter"})
  }

  // Suppression de l'utilisateur
  User.destroy({ where : { id: userId}, force: true})
    .then(() => res.status(204).json({}))
    .catch(err => res.status(500).json({message: 'DataBase Error', error:err}))
}

