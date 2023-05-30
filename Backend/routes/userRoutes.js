const express = require('express')
const {signup,login, getLoggedinUser, updateUser} = require('../controllers/userControllers')
const auth = require('../middleware/auth')
const AuthRouter = express.Router();

AuthRouter.post('/signup', signup)
AuthRouter.post('/login', login )
AuthRouter.get('/loggedin',auth , getLoggedinUser )

AuthRouter.patch('/users/:userId', auth, async (req, res) => {

    const id = req.params.userId;
    const userData = req.body;
    let updatedUserData = null
    try {
        updatedUserData = await updateUser(id, userData.name, userData.age);
    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            message: err.message // 'Server ran into an unexpected error'
        })
    }

    return res.send({
        data: updatedUserData
    });
})

module.exports = AuthRouter;