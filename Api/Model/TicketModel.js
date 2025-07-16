const mongoose=require('mongoose');

const TicketSchema=mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
     message:{
        type:String,
        required:true
    },
     customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },
      status:{
        type:String,
        enum:["Open","InProgress","Closed"],
        required:true
    },
      priority:{
        type:String,
        enum:["Low","Medium","High"],
        required:true
    },
    assigner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Auth"
    },
      lead:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Lead"
    },
    role:{
        type:String,
        enum:["teleCaller","sales","Supporter"],
        required:true
    },
      category:{
        type:String,
        enum: ["Technical", "Billing", "General", "Other"],
        required:true
    }
},{timestamps:true})

const Ticket=mongoose.model("Ticket",TicketSchema);
module.exports=Ticket