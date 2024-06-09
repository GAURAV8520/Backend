import mongoose, { Schema } from "mongoose";

const subscribeSchema = new mongoose.Schema({

    channel:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

export const Subscribe = mongoose.model("Subscribe",subscribeSchema)