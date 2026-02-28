const userModel = require("../model/user.model")

const jwt = require("jsonwebtoken")
const blackModel = require("../model/blacklist.model")


async function userAuth(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    const isTokenBlacklisted = await blackModel.findOne({
        token
    }) 

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user=decode
        
    } catch (error) {
        
    }


    
}