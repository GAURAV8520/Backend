import mongoose, { mongo }  from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema =new mongoose.Schema(
    {
        videoFile:{
            type:String,       //cloudnary
            required:true
        },
        thumbNail:{
            type:String,       
            required:true
        },
        Title:{
            type:String,       
            required:true
        },
        description:{
            type:String,       
            required:true
        },
        isPublis:{
            type:Boolean,    
            default:false
        },
        view:{
            type:Number,
            default:0
        },
        duration:{
            type:Number,
            required:true
        },
        ower:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }

    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema)
