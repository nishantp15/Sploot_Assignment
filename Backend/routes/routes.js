const express = require('express')
const {register,login, SigninWithGithub, getLoggedinUser} = require('../controllers/controllers')
const auth = require('../middleware/auth')
const AuthRouter = express.Router();

AuthRouter.post('/register', register)
AuthRouter.post('/login', login )
AuthRouter.get('/loggedin',auth , getLoggedinUser )


module.exports = AuthRouter;