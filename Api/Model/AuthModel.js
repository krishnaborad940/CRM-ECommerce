const mongoose=require("mongoose");

const multer=require("multer");
const path=require("path");
const ImagePath="/Uploads/Auth"

const AuthSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","teleCaller","sales"],
        default:"Supporter"
    },
    status:{
        type:Boolean,
        default:true
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
AuthSchema.statics.uploadImageFile=multer({storage:ImageStorage}).single("Image");
AuthSchema.statics.ImgPath=ImagePath;
const Auth=mongoose.model("Auth",AuthSchema)
module.exports=Auth