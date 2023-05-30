const { JWT_SECRET_KEY } = require("../configs/config");
const jwt = require('jsonwebtoken')
const {user} = require('../Database/users')
async function auth(req, res, next){
    const AuthorizationToken = req.headers['authorization'];
        // console.log(req.headers)
        if(AuthorizationToken){
            const token = AuthorizationToken.split(' ').pop();
            
            if(token){
                
                try{
                   jwt.verify(token,JWT_SECRET_KEY)
                }catch(err){
                    return res.status(401).send({
                        message:'Invalid token provided'
                    })
                }
                // console.log(token);
                let userFind = jwt.decode(token)
                console.log(userFind);
                userFind = await user.findById({_id:userFind._id})
                userFind = userFind.toJSON();
                delete userFind.password;
                req.userFind = userFind;

                next();
            }
        }else{
            return res.status(403).send({message:"No token available"})
        }
}

module.exports = auth