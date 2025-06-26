const mongoose=require("mongoose");

const multer=require("multer");
const path=require("path");
const ImagePath="/Uploads/Product"

const ProductSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     Price:{
        type:String,
        required:true
    },
     category:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
     rate:{
        type:String,
        required:true
    },
     stock:{
        type:Number,
        required:true
    },
     Image:{
        type:String,
        required:true
    },
    
},{timestamps:true});

const storageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',ImagePath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})

ProductSchema.statics.uploadImageFile=multer({storage:storageImage}).single("Image");
ProductSchema.statics.ImgPath=ImagePath;

const Product=mongoose.model("Product",ProductSchema);
module.exports=Product;

