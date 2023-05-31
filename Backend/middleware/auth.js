const { JWT_SECRET_KEY } = require("../configs/config");
const jwt = require('jsonwebtoken')
const {userModel} = require('../Database/users')

async function auth(req, res, next){
    const AuthorizationToken = req.headers['authorization'];
        if(AuthorizationToken){
            const token = AuthorizationToken.split(' ').pop();
            
            if(token){
                
                try{
                   jwt.verify(token,process.env.JWT_SECRET_KEY)
                }catch(err){
                    return res.status(401).send({
                        message:'Invalid token provided'
                    })
                }
              
                let userFind = jwt.decode(token);
                userFind = await userModel.findById({_id:userFind._id})
                userFind = userFind.toJSON();
                delete userFind.password;
                req.user = userFind;
                next();
            }
        }
        else{
            return res.status(403).send({message:"No token available"})
        }
}

module.exports = auth