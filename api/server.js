
const express = require('express')
const cors = require('cors')
const checkTokenMiddleware = require('./jsonwebtoken/check')

/********************/
/*** Import de la connexion à la DB */
let DB = require('./db.config')

/********************/
/*** Initaliasation de l'API*/
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

/********************/
/*** Import des modules de routage*/

const user_router = require('./routes/users')
const cocktail_router = require('./routes/cocktails')

const auth_router = require('./routes/auth')

/********************/
/*** Mise en place du rouage */
app.get('/', (req, res) => res.send("i'm oneline Welcome"))

/**ajout apres connexion routage */
app.use('/user', checkTokenMiddleware ,user_router)
app.use('/cocktails', cocktail_router)
app.use('/auth',auth_router )

app.get('*', (req, res) => res.status(501).send('what the hell are you doing !!!'))
/**501 est le code http pour une erreur on peu les trouver en tappant codeHttp sur google */


/********************/
/*** Start server avec test DB */

DB.authenticate()
  .then( () => console.log('DB connection OK'))
  .then ( () => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`this server is running on port ${process.env.SERVER_PORT}. Have fun`);
    })
  })
  .catch(err => console.log('DB Error', err))


