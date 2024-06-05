import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

dotenv.config();

const connectDB=async ()=>{
    try{
        console.log("running ")
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n Mongooes connected !! DB:host ${connectionInstance.connection.host}`)

    }catch(error){
        console.log('MongoDB connection error',error)
        process.exit(1)
    }
}
export default connectDB;