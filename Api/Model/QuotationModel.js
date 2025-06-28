
const mongoose=require("mongoose");
const Product = require("./ProductModel");

const QuotationSchema=mongoose.Schema({
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
         },
      totalAmount: {
          type: Number,
          required: true
      }, 
    notes: {
          type: String
          },    
    createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth" 
  },
    status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
  },
},{timestamps:true})

const Quotation=mongoose.model("Quotation",QuotationSchema);
module.exports=Quotation