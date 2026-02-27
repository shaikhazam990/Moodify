const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { json } = require("express")

async function registerController(req,res) {
    const{email,username,password} = req.body

    const isUserExist = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserExist){
        return res.status(400).json({
            message: isUserExist.email == email ? "email already exists" : "username already exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,email,password:hash
    })

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"4d"}
    )
    res.cookie("token", token)

    return res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }

    })

    
}

module.exports={
    registerController
}