import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            requried:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            requried:true,
            unique:true,
            lowercase:true,
            trim:true,
            
        },
        fullName:{
            type:String,
            requried:true,
            lowercase:true,
            trim:true,           
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"

            }
        ],
        avatar:{
            type:String,  //form cloudnary
            required:true

        },
        coverImage:{
            type:String
        },
        passWord:{
            type:String,
            required:[true,"password is require"]
        },
        refreshToken:{
            type:String,
        }

    },
    {
        timestamps:true
    }
)
userSchema.pre("save",async function(next){
    if(!this.isModified('passWord')) return next();

    this.passWord=bcrypt.hash(this.passWord,10)
    next()
})

userSchema.method.ispasswordCorrect=async function (passWord){
    return await bcrypt.compare(passWord,this.passWord)
}


export const User=mongoose.model('User',userSchema)