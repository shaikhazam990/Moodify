const express = require("express")

const authRouter = express.Router()
const authController = require("../controller/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

// routes

authRouter.post("/register", authController.registerController)
authRouter.post("/login", authController.loginController)
authRouter.get("/get-me",authMiddleware.userAuth ,authController.getMeController)
authRouter.get("/logout", authMiddleware.userAuth, authController.logoutController)

module.exports=authRouter