import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asynHandaler.js";
import jwt from 'jsonwebtoken'
import { User } from "../models/User.models.js";

export const verifyJWT =asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(404,"Unauthorized request")
        }
    
        const decodedToken= jwt.verify(token,ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            //next video  : discuss about frontend
            throw new ApiError(401,"Invalid access token")
        }
    
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invallid access token")
    }
})