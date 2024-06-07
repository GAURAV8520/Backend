import { asyncHandler } from "../utils/asynHandaler.js";
import {ApiError} from '../utils/ApiError.js';
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend 
    //validation  -- not empty
    //check if user already exists : username or email
    //check for images check for avtar is present 
    //upload them to cloudinary 
    //create user object -- create entry in db 
    // remove password and refresh token field from response 
    // check for user creation 
    // return res 

    //get user details from frontend 
    const {fullName,email,username,password} = req.body
    console.log('email',email);

     //validation  -- not empty

    // if(fullName===''){
    //     throw new ApiError(400,"fullname is required")
    // }

    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"ALl fields are required")
    }

    //check if user already exists : username or email

   const existedUser = User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists ")
    }

    //check for images check for avtar is present 

    const avaterLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.CoverImage[0]?.path;

    if(!avaterLocalPath ){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avaterLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

   const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",  //agara hai to upload kardo nahi to empty rahane do
        email,
        password,
        username:username.toLowerCase()


    })

    const createdUsername=await User.findById(user._id).select(
        "-password -refreshToken"                        //kisi field ko mana karna hai to 
    )

    if(!createdUsername){
        throw new ApiError(500,"Something went wrong while registering the user ")
    }


    return res.status(201).json({
        new ApiResponse(200,createdUsername,"user registered successefully")
    })






})

export {registerUser}