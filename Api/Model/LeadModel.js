const mongoose=require('mongoose');

const multer=require('multer');
const ImagePath='/Uploads/Lead';
const path=require("path")

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
    companies:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Companies'
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
    Image:{
        type:String,
        required:true
    },
    remark:{
        type:String
    }
},{timestamps:true})
const ImageStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',ImagePath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})
LeadSchema.statics.uploadImageFile=multer({storage:ImageStorage}).single("Image");
LeadSchema.statics.ImgPath=ImagePath;

const Lead=mongoose.model("Lead",LeadSchema);
module.exports=Lead