const {user} = require('../Database/users')
const jwt = require('jsonwebtoken');
const configs = require('../configs/config');
const { JWT_SECRET_KEY } = require('../configs/config');

async function register(req, res){
    try{
        console.log(req)
        const {name, email, password} = req.body;
         const alreadyExisting = await user.findOne({email});
         if(alreadyExisting){
            return res.status(500).send('user with email already exist');
         }

        const CreateUser = await user.create({name, email, password,  signinMethod:'Email' })

        return res.send('registration sucessful')


    }catch(err){
        res.status(500).send('Something went wrong')
    }
}

function getToken(user){
    let{_id, name, email, image} = user;
    return jwt.sign({_id, name, email, image},configs.JWT_SECRET_KEY)
}

async function login(req, res){
    try{
        const {email, password} = req.body;

        let FindUSer = await user.findOne({email});

        if(!FindUSer){
            return res.send('user does not exist')
        }

        if(password !== FindUSer.password){
            return res.send('wrong password');
        }

        const token = getToken(FindUSer)

        return res.status(200).send({
            message:"Success",
            Data:{
                token
            }
        })

    }catch(err){
        res.status(500).send('Something went wrong')
    }
}

async function SigninWithGithub(req, res){
    try{

    }catch(err){
        res.status(500).send('Something went wrong')
    }
}

async function getLoggedinUser(req, res){
    try{
        let userFind = req.userFind;
       return res.send({data:userFind})
    }catch(err){
        res.status(500).send('Something went wrong')
    }
}

module.exports = {register,login, SigninWithGithub, getLoggedinUser}