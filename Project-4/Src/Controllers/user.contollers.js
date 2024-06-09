import { asyncHandler } from "../utils/asynHandaler.js";
import {ApiError} from '../utils/ApiError.js';
import { User } from "../models/User.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generateAccessTokenAndRefereshTokens=async(userId){
    try{
        const user= await User.findById(userId)
        const accessToken= user.generateAccessToken()
        const refreshToken= user.generateRefreshToken()

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false}) //because ye bar bar puchega password 

        return {accessToken,refreshToken}

    }
    catch(error){
        throw new ApiError(500,"something went wrong while generating referesh and access token")
    }
}



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

   const existedUser =await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists ")
    }

    //check for images check for avtar is present 

    //console.log(req.files)

    const avaterLocalPath = req.files?.avatar[0]?.path;
   // const coverImageLocalPath = req.files?.coverImage[0]?.path;  //--------------> this code is not working when we didnot give an coverimage  to solve this problem we use below code

   let coverImageLocalPath;

   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0){
     coverImageLocalPath = req.files.coverImage[0].path
   }


    if(!avaterLocalPath ){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avaterLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

   const createdUser= await User.create({
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


    // return res.status(201).json({
    //     new ApiResponse(200,createdUsername,"user registered successefully")
    // })

    const response = new ApiResponse(200, createdUser, "User registered successfully");
    return res.status(response.statusCode).json(response);






})


const loginUser =asyncHandler (async (req,res)=>{
   //req body --> data
   //username or email
   //find the user
   //password check
   //access and referesh token 
   //send cookie 


   const {username,email,password}=req.body;

   if(!username || !email){
    throw new ApiError(400,"username or email is required ")
   }

   const user = await User.findOne({
    $or: [{email},{username}]
   })

   if(!user){
    throw new ApiError(400,"user does not exist")
   }

  const isPasswordValid= await user.ispasswordCorrect(password)


  if(!isPasswordValid){
    throw new ApiError(401,"password incorrect")
   }

  const {accessToken,refreshToken}= await generateAccessTokenAndRefereshTokens(user._id)

  const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

  const options={
    httpOnly:true,
    secure:true
  }

  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
        200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User logged in successfully"
    )
  )

})


const logoutUser=asyncHandler(async (req,res)=>{

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accesToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))


})

export {registerUser,loginUser,logoutUser}