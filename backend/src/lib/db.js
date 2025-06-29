import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB connected :${connect.connection.host}`);
    } catch (error) {
        console.log(`DB connection error ${error}`)
    }
}