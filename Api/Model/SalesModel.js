
const mongoose=require("mongoose");
const Product = require("./ProductModel");

const SalesSchema=mongoose.Schema({
   QuotationId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Quotation",
                // required:true
   },
   customerId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Customer",
                required:true
   },
   product: [
    {
        productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product", required:true,},
            quantity:Number,
            price:Number    
            
   }],
   lead:{
        type:mongoose.Schema.Types.ObjectId,
                ref:"Lead",
                // required:true
   },
   totalAmount:{
    type:Number
   },
   saleDate:{
    type:Date,
    default:Date.now()
   },
   PaymentStatus:{
    type:String,
    enum:["Pending","Paid"],
    default:"Pending"
   },
   createBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Auth"
   }
},{timestamps:true})

const Sales=mongoose.model("Sales",SalesSchema);
module.exports=Sales