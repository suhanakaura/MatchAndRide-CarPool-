import express from "express"
import { login, logout, signup,location } from "../controllers/auth.controller.js"
import verifyRoute from "../middlewares/verifyRoute.js"

const authRouter = express.Router()

authRouter.post('/signup',signup)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.put('/loc',verifyRoute,location)

export default authRouter