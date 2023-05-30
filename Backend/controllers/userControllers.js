const {userModel} = require('../Database/users')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const configs = require('../configs/config');
const { JWT_SECRET_KEY } = require('../configs/config');

function getToken(user){
    let{_id, name, email, image} = user;
    return jwt.sign({_id, name, email, image},JWT_SECRET_KEY)
}

async function signup(data){
    
        const {name, email, age, password} = data;
         const alreadyExisting = await userModel.findOne({email});
         if(alreadyExisting){
            return res.status(500).send('user with email already exist');
         }
         const hashedPassword = await bcrypt.hash(password, 11);
        const createdUser = await userModel.create({name, email, password:hashedPassword,  signinMethod:'Email' })

        createdUser = createdUser.toJSON();
        return createdUser;
        // return res.send('registration sucessful')
}



async function login(data){
        const {email, password} = data;
        console.log(email)
        let FindUSer = await userModel.findOne({email});

        if(!FindUSer){
            return res.send('user does not exist')
        }
        const matchPassword = await bcrypt.compare(password, FindUSer.password);

        if(!matchPassword){
            return res.send('wrong password');
        }

        const token = getToken(FindUSer)

        return token;
}




async function updateUser(userId, name, age) {
    
    let user = await userModel.findById(userId)

    if (!user) {
        throw new Error('User does not exist');
    }

    const changedName = name ==="" ? user.name : name;
    const changedAge = age ==="" ? user.name : age;


    await userModel.findByIdAndUpdate(userId,{
        $set: {
            name: changedName,
            age: changedAge,
        }
    })

    user = await userModel.findById(userId);

    return user;
}

module.exports = {signup,login, updateUser}