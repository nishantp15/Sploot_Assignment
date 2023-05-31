const {userModel} = require('../Database/users')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../configs/config');

function getToken(user){
    let{_id, name, email} = user;
    return jwt.sign({_id, name, email},process.env.JWT_SECRET_KEY)
}

async function signup(data){
    
        const {name, email, age, password} = data;
         const alreadyExisting = await userModel.findOne({email});
         if(alreadyExisting){
            throw new Error('User already exists with the given email');
         }
         const hashedPassword = await bcrypt.hash(password, 11);
        let createdUser = await userModel.create({name, email, age, password:hashedPassword,  signinMethod:'Email' })
        createdUser = createdUser.toJSON();
        // delete createdUser.password;  // delete password from api response
        return createdUser;
}



async function login(data){
        const {email, password} = data;
       
        let FindUSer = await userModel.findOne({email});

        if(!FindUSer){
            throw new Error('User does not exist with the given email');
        }
        const matchPassword = await bcrypt.compare(password, FindUSer.password);

        if(!matchPassword){
            throw new Error('The password is incorrect');
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

    // user = await userModel.findById(userId,{password:0});  // to avoid including password fromthe response
    
    user = await userModel.findById(userId); 

    return user;
}

module.exports = {signup,login, updateUser}