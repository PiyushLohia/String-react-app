
import cld from "../lib/cloudinary.js";
import { generateToken } from "../lib/generateToken.js";
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

export const signup = async (req,res) => {
    const {fullName, email, password} = req.body;

    try {
            if(!fullName || !email || !password){
                return res.status(400).json({error : "Please provide all the fields"})
            }

        if(password.length < 6){
           return res.status(400).json({error : "Password must be more than 5 characters"})

        }

        const user = await User.findOne({email})

        if (user){
           return res.status(400).json({error : "Email already exist!"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword

        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                message : "New user created",
                _id : newUser._id,
                fullName : newUser.fullName,
                email: newUser.email,
                profilePic : newUser.profilePic,
            })
        }

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({message : "Internal server error!"})
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});


        if (!user){
            return res.status(400).json({
                message : "Invalid Credentials"
            })
        }

        const isPasswordCorrect =await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
             return res.status(400).json({
                message : "Invalid Credentials"
            })
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id : user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })


    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({error : "Internal Server Error"})
    }
 
}

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge : 0})
        
        res.status(200).json({message : "Logged out succesfully"});
        console.log("pappu")
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({error : "Internal Server Error"})
    }
}

export const updateProfile = async (req,res) => {

    try {
        
        const {profilePic} = req.body;
        const userId = req.user._id

        if(!profilePic){
            return res.status(400).json({
                error : "Profile picture is required!"
            })
        }

        const uploadResponse = await cld.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({error : "Internal Server Error"})
    } 

}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({error : "Internal Server Error"})
    }
}
