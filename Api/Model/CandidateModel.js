const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// Folder path where images will be stored
const ImagePath = "/Uploads/Candidate";

const CandidateSchema = new mongoose.Schema({
  // Basic Info
  Fname: { type: String, required: true },
  Lname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  fax: { type: String, required: true },
  website: { type: String, required: true },

  // Address
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  code: { type: String, required: true },
  country: {
    type: String,
    // enum: ["India", "Ahemdabad", "Rajkot", "Vadodara", "Mumbai", "Navsari", "Div", "Other"],
    required: true
  },

  // Professional Details
  experience: { type: String, required: true },
  education: { type: String, required: true },
  salary: { type: String, required: true },
  skills: { type: String, required: true },
  additional: { type: String, required: true },

  // Other Info
  source: {
    type: String,
    enum: ["Website", "Referral", "LinkedIn", "Naukri", "Indeed", "Social Media", "Walk-In", "Consultancy", "Job Fair", "Other"],
    required: true
  },
  twitterId: { type: String, required: true },
  skypeId: { type: String, required: true },

  // Education Info
  educationInfo: [
    {
      degree: String,
      institute: String,
      year: String
    }
  ],

  // Work Experience
  workExperience: [
    {
      company: String,
      role: String,
      duration: String // ✅ fixed from `years` to `duration` to match frontend
    }
  ],

  // Files
  resume: { type: String, required: true },
  coverLetter: { type: String, required: true },
  contract: { type: String, required: true },
  profileImage: { type: String, required: true }

}, { timestamps: true });


const storageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',ImagePath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})
CandidateSchema.statics.uploadeImageFile = multer({ storage: storageImage }).fields([
  { name: "profileImage", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "coverLetter", maxCount: 1 },
  { name: "contract", maxCount: 1 }
]);
CandidateSchema.statics.ImgPath=ImagePath
const Candidate=mongoose.model("Candidate",CandidateSchema);
module.exports=Candidate