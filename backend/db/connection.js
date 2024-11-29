import mongoose from "mongoose"
const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("db connected successfully")
    }
    catch(err){
        console.log("error connecting db ",err.message);
    }
}
export default connection