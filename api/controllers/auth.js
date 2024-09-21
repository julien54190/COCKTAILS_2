/********************/
/*** Import des module nécessaire */


const User = require('../models/user');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');



/*** Routage de la ressource Auth */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validation des données
  if (!email || !password) {
    return res.status(400).json({ message: 'Bad Email or password' });
  }

  try{
    // Vérification si l'utilisateur existe
    let user = await User.findOne({ where: { email: email }, raw: true })
    if (!user) {
      return res.status(401).json({ message: 'This account does not exist' });
    }

    // Vérification du mot de passe
    let test = await bcrypt.compare(password, user.password)
    if (!test) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    // Génération du token et envoi
    const token = jwt.sign({
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING });
    // jwt.sign({payload}, secret, durée)

    return res.json({ access_token: token });
  }catch(err){
    if(err.name == 'SequelizeDatabaseError'){
      res.status(500).json({ message: 'Database Error', error: err })
  }
    res.status(500).json({ message: 'Login process failed', error: err })
  }
}
