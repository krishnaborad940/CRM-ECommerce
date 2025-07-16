// models/PaymentModel.js
const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  saleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sales",
    required: true
  },customerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Customer",
      required:true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ["UPI", "Cash", "Bank"],
    required: true
  },
  receivedDate: {
    type: Date,
    default: Date.now
  },
  status:{
    type:String,
    enum:["Paid","Partial"],
    default:"Paid"
  }
}, { timestamps: true });


const Payment = mongoose.model("Payment", PaymentSchema);
 module.exports=Payment
