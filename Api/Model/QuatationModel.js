
const mongoose=require("mongoose");
const Product = require("./ProductModel");

const QuatationSchema=mongoose.Schema({
     items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      title: String,
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
     lead:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lead",
        required:true
    },
     quotationDate: {
    type: Date,
    default: Date.now
  },  totalAmount: {
    type: Number,
    required: true
  }, 
   notes: {
    type: String
  },    
      createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth" // user who created the quotation
  },
    status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
},{timestamps:true})

const Quatation=mongoose.model("Quatation",QuatationSchema);
module.exports=Quatation