const mongoose=require('mongoose');
const FollowUpSchema=mongoose.Schema({
    remark:{
        type:String,
        required:true
    },
    nextFollowup:{
        type:Date
    },
     FollowUpType:{
        type:String,
        required:true
    },
     Lead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lead",
        required:true
    },
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
      status:{
        type:String,
        enum:["Intrested","Converted","Closed"],
        required:true
    },
    assigner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Auth",
}
},{timestamps:true})

const FollowUp=mongoose.model("FollowUp",FollowUpSchema);
module.exports=FollowUp