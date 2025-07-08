const mongoose=require('mongoose');
const Lead=require("./LeadModel")

const CustomerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     phone:{
        type:String,
        required:true
    },
     product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
      status:{
        type:String,
        enum:["InActive","Blocked","Active","Converted"],  
        required:true
    },
    role:{
        type:String,
        enum:["teleCaller","sales","Supporter"],
        required:true
    },
    lead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lead"
    },
    assigner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Auth"  
    },
    nextFollowup:{
        type:Date
    },
    remark:{
        type:String
    }
},{timestamps:true})

const Customer=mongoose.model("Customer",CustomerSchema);
module.exports=Customer