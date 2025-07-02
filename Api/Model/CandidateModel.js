const mongoose=require("mongoose");
const multer=require("multer");
const path=require("path");
const ImgaePath="/Uploads/Candidate"

const CandidateSchema=mongoose.Schema({
    Fname:{
        type:String,
        required:true
    },
     Lname:{
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
     password:{
        type:String,
        required:true
    },
     fax:{
        type:String,
        required:true
    },
     website:{
        type:String,
        required:true
    },
    // addresss
     street:{
        type:String,
        required:true
    },
     city:{
        type:String,
        required:true
    },
     state:{
        type:String,
        required:true
    },
     code:{
        type:String,
        required:true
    },
     country:{
        type:String,
        enum:["Surat","Ahemdabad","Rajkot","Vadodara","Mumbai","Navsari","Div","Other"],
        required:true
    },
    // professional-Details
     experience:{
        type:String,
        required:true
    },
     education:{
        type:String,
        required:true
    },
     salary:{
        type:String,
        required:true
    },
     skills:{
        type:String,
        required:true
    },
     additional:{
        type:String,
        required:true
    },
    // other information
     source:{
        type:String,
        enum:["Website", "Referral","LinkedIn","Naukri","Indeed", "Social Media",   "Walk-In", "Consultancy",  "Job Fair", "Other"],
        required:true
    },
    twitterId:{
        type:String,
        required:true
    },
    skypeId:{
        type:String,
        required:true
    },
     educationInfo: [
    {
      degree: String,
      institute: String,
      year: String
    }
  ],
  workExperience: [
    {
      company: String,
      role: String,
      years: String
    }
  ],
   skypeId:{
        type:String,
        required:true
    },
    // attach information
     resume:{
        type:String,
        required:true
    },
     coverLetter:{
        type:String,
        required:true
    },
     contract:{
        type:String,
        required:true
    },
     profileImage:{
        type:String,
        required:true
    },
},{timestamps:true})

const storageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',ImgaePath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})
CandidateSchema.statics.uploadeImageFile=multer({storage:storageImage}).fields([
   { name:"profileImage",maxCount:1},
   {name:"resume",maxCount:1},
   {name:"coverLetter",maxCount:1},
   {name:"contract",maxCount:1}
])
CandidateSchema.statics.ImgPath=ImgaePath
const Candidate=mongoose.model("Candidate",CandidateSchema);
module.exports=Candidate