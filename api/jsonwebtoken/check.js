/********************/
/*** Import des modules nécessaires */

const jwt = require('jsonwebtoken');

/********************/
/*** Extraction du token */
const extractBearer = authorization => {
  if (typeof authorization !== 'string'){
    return false
  }

  //on isole le tokken
  const matches = authorization.match(/(bearer)\s+(\S+)/i)

  return matches && matches[2]
}

/********************/
/*** IVérification de la présence du token */
const checkTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization && extractBearer(req.headers.authorization)

  if(!token){
    return res.status(401).json({message: 'Ho le petit malin !!!'})
  }

  //Vérifier la valadité du token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if(err){
      return res.status(401).json({message: 'Bad Token'})
    }
    next()
  })
}
module.exports = checkTokenMiddleware
