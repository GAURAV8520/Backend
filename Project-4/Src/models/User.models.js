import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';

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
            requried:true

        },
        coverImage:{
            type:String
        },
        password:{
            type:String,
            required: [true, "password is required"]
           
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
    if(!this.isModified('password')) return next();

    this.password=await bcrypt.hash(this.password,10)
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