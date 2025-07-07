const mongoose=require("mongoose");

const multer=require("multer");
const path=require("path");
const ImagePath="/Uploads/Companies"

const CompainesSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    AccountUrl:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },Plan:{
        type:String,
        enum:['Advanced','Basic','EnterPrise'],
        reqired:true
    },
    PlanType:{
        type:String,
        enum:["Monthly","Yearly"],
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Active","InActive"],
        required:true
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
CompainesSchema.statics.uploadImageFile=multer({storage:ImageStorage}).single("Image");
CompainesSchema.statics.ImgPath=ImagePath;
const Companies=mongoose.model("Companies",CompainesSchema)
module.exports=Companies