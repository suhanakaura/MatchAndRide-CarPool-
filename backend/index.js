import express from "express"
import dotenv from "dotenv"
import connection from "./db/connection.js";
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import DriverRouter from "./routes/driver.routes.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT
const allowedOrigins="http://localhost:5173"

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
    cors({
        origin:allowedOrigins,
        methods:["GET","POST","PUT","DELETE","OPTIONS"],
        allowedHeaders: ['Content-Type'],
        credentials:true
    })
)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/driver',DriverRouter)
app.listen(PORT,()=>{
    connection()
    console.log("server running at ",PORT)
})