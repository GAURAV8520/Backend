import mongooes from 'mongoose';

const subtodoSchema =new mongooes.Schema({
  content:{
    type:String,
    required:true
  },
  complete:{
    type:Boolean,
    default:false
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  },
  
},{timestamps:true});


export const Subtodo = mongooes.model('Subtodo',subtodoSchema);