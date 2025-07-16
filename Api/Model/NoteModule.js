const mongoose=require('mongoose');

const multer=require('multer');
const path=require('path')
const ImagePath="/Uploads/Note"

const NoteSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidate',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    noteType:{
 type: String,
  enum: [
    "Interview",
    "Follow-up",
    "Document",
    "Feedback",
    "Reminder",
    "Offer",
    "Rejection",
    "Shortlist",
    "Verification",
    "Other"
  ],
  default: "Other"
    },
    status:{
        type:String,
        default:"Active"
    }
},{timestamps:true})

const storageImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',ImagePath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now())
    }
})

NoteSchema.statics.uploadImageFile=multer({storage:storageImage}).single('Image')
NoteSchema.statics.ImgPath=ImagePath;

const Note=mongoose.model('Note',NoteSchema);
module.exports=Note