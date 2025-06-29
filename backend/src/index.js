import express from "express";
import  authRoute from "./routes/auth_route.js";
import  messageRoutes from "./routes/message_route.js";
import cors from 'cors'
import path from 'path'
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import { app,server } from "./lib/socket.js";

dotenv.config();

const __dirname = path.resolve();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
const PORT = process.env.PORT;
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}
))
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get('/{*any}', (req, res) => {
       res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html")); 
    })
}
 
server.listen(PORT, ()=>{
    console.log("server is running :",PORT);
    connectDB();
} )