const mongoose=require('mongoose');

const LeadSchema=mongoose.Schema({
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
        enum:["New","Follow-Up","Intrested","Converted","Closed"],
        required:true
    },
    nextFollowup:{
        type:Date
    },
    role:{
        type:String,
        enum:["teleCaller","sales","Supporter"],
        required:true
    },
    // assigner:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Auth"
    // },
    remark:{
        type:String
    }
},{timestamps:true})

const Lead=mongoose.model("Lead",LeadSchema);
module.exports=Lead