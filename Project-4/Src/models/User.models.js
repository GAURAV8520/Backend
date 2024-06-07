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

    this.passWord=await bcrypt.hash(this.passWord,10)
    next()
})

userSchema.methods.ispasswordCorrect=async function (passWord){
    return await bcrypt.compare(passWord,this.passWord)
}


userSchema.methods.generateAccessToken=function(){  //ACCESS TOKEN METHOD
    return jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },

    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}


//REFRESH TOKEN METHOD
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
)
}


export const User=mongoose.model('User',userSchema)