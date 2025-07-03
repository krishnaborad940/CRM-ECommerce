
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const Product = require("../Model/ProductModel");
const Lead = require("../Model/LeadModel");
const path=require('path');
const fs=require("fs");
const FollowUp=require("../Model/FollowUpModel");
const Customer = require("../Model/CustomerModel");
const Ticket=require('../Model/TicketModel')
const Auth=require("../Model/AuthModel");
const Quotation = require("../Model/QuotationModel");
const Sales = require("../Model/SalesModel");
const Payment=require('../Model/PaymentModel');
const Candidate=require("../Model/CandidateModel");
module.exports.Register=async(req,res)=>{
    try{
        let checkEmail=await Auth.findOne({email:req.body.email});
        if(!checkEmail){
            if(req.body.password===req.body.ConfirmPassword){
                    let newImg=''
                if(req.file){
                    newImg=await Auth.ImgPath+"/"+req.file.filename;
                }else{
                    return res.status(200).json({msg:"file not Found"})
                }
                req.body.Image=newImg;
                // req.body.password=await bcrypt.hash(req.body.password,10);
                let AddRegister=await Auth.create(req.body)
                if(AddRegister){
                    return res.status(200).json({msg:"Register Successfully",data:AddRegister})
                }else{
                    return res.status(200).json({msg:"Register not Successfully"})
                }
            }else{
                return res.status(200).json({msg:"Password And Confirm-Password Is Not Matched"})
            }
                 
        }else{
            return res.status(200).json({msg:"Email is Already Exist"})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"Somthing Went Wrong"})
    }
}
module.exports.Login=async(req,res)=>{
    try{
        let checkEmail=await Auth.findOne({email:req.body.email})
        if(checkEmail){
            // if(await bcrypt.compare(req.body.password,checkEmail.password)){
                let token=jwt.sign({userData:checkEmail},"Admin",{expiresIn:"1h"})
                if(token){
                    return res.status(200).json({msg:"login successfully",data:token})
                // }
                    }else{
                        return res.status(200).json({msg:'somthing went Wrong'})
                    }
        }else{
            return res.status(200).json({msg:"Email is Not Fount"})
        }

    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"Somthing Went Wrong"})
    }
}
module.exports.AllUser=async(req,res)=>{
    try{
        let findAllUser=await Auth.find();
        if(findAllUser){
            return res.status(200).json({msg:"All User",data:findAllUser})
        }else{
            return res.status(200).json({msg:"User not Found"})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"Somthing Went Wrong"})

    }
}
module.exports.Product=async(req,res)=>{
    try{
        let newImg='';
        if(req.file){
            newImg=await Product.ImgPath+'/'+req.file.filename
        }
        req.body.Image=newImg;
        let CreateProduct=await Product.create(req.body);
        if(CreateProduct){
            return res.status(200).json({msg:'Product Added Sussecfully',data:CreateProduct})
        }else{
            return res.status(200).json({msg:"Product Not Created"})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went wrong"})
    }
}
module.exports.showProduct=async(req,res)=>{
    try{
        let findAllProduct=await Product.find();
        if(findAllProduct){
            return res.status(200).json({msg:"All User",data:findAllProduct})
        }else{
            return res.status(200).json({msg:"Product Not Found"})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"Somthing Went Wrong"})
    }
}
module.exports.ProductDetails=async(req,res)=>{
    try{
            let findProduct=await Product.findById(req.params.id)
            if(findProduct){
                return res.status(200).json({msg:"added Quotation",data:findProduct})
            }else{
                return res.status(200).json({msg:"Product not find"})
            }
    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:errss})
    }
}
module.exports.AddLead = async (req, res) => {
    try {
        const { name, role,email, phone,assigner, nextFollowup, productId, remark, status } = req.body;
        const product = await Product.findById(productId);
        const createLead = await Lead.create({
            name,
            email,
            phone,role,
            product: product._id,
            nextFollowup,
            remark,
            assigner,
            status,
        });
        if(createLead){
            return res.status(200).json({ msg: "Lead Added Successfully", data: createLead });
        }else{
            return res.status(200).json({msg:"Lead not create"})
          }
    } catch (err) {
        console.error("AddLead Error:", err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
};
module.exports.ViewLead=async(req,res)=>{
    try{
        let showLead=await Lead.find().populate('product').exec();
        if(showLead){
            return res.status(200).json({ msg: "all leads", data: showLead })
        }else{
            return res.status(200).json({msg:"Lead not show"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.DeleteLead=async(req,res)=>{
    try{
      let findid=await Lead.findById(req.params.id)
      if(findid){
        let deleteData=await Lead.findByIdAndDelete(findid)
        if(deleteData){
            return res.status(200).json({ msg: "delete leads", data: deleteData })
        }else{
            return res.status(200).json({msg:"Data Not Deleted"})
        }
      }else{
            return res.status(200).json({msg:"Lead Not Find"})
      }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.editLead=async(req,res)=>{
    try{
      let findid=await Lead.findById(req.params.id).populate('product').exec()
      if(findid){
        return res.status(200).json({ msg: "edit details", data: findid })
      }else{
            return res.status(200).json({msg:"Edit Data Not Found"})
      }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.UpdateLead=async(req,res)=>{
    try{
            let ceditDetails=await Lead.findById(req.params.id);
            if(ceditDetails){
                let updateDetails=await Lead.findByIdAndUpdate(req.params.id,req.body)
                if(updateDetails){
                    return res.status(200).json({msg:"Updated Successfully",data:updateDetails})
                }else{
                    return res.status(200).json({msg:"Updated failed"})
                }
            }else{
                    return res.status(200).json({msg:"Data Not Found"})
            }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.LeadDetails=async(req,res)=>{
    try{
        let findLead=await Lead.findById(req.params.id).populate("product").populate("assigner")
        if(findLead){
            return res.status(200).json({msg:"lead find",data:findLead})
        }else{
            return res.status(200).json({msg:'Lead Not Find'})
        }
    }catch(err){
        return res.status(200).json({msg:'Somthing Went Wrong',data:err})
    }
}
module.exports.AddFollowup=async(req,res)=>{
    try{
        const {remark,nextFollowup,FollowUpType,status,assigner}=req.body
        let findid=await Lead.findById(req.params.id).populate("product")
        if(findid){
            let createFollowup=await  FollowUp.create({
                remark,nextFollowup,FollowUpType,status,
                Lead:findid ._id,
                product:findid.product._id,
                assigner
            })
            if(createFollowup){
                return res.status(200).json({msg:'folloup adeed sucessfully',data:createFollowup})
            }else{
                return res.status(200).json({msg:"FollowUp Not Created"})
            }
        }else{
            return res.status(200).json({msg:"Lead Not Found"})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
// followup convet
module.exports.AddConvert=async(req,res)=>{
    try{
        let findLead=await Lead.findById(req.params.id)
        if(findLead){
            let createCustomer=await Customer.create({
                name:findLead.name,
                email:findLead.email,
                phone:findLead.phone,
                product:findLead.product,
                remark:findLead.remark,
                status:"Converted",
                role:findLead.role,
                assigner:findLead.assigner,
                convertedAt:new Date(),
                lead:findLead._id
            })
            if(createCustomer){
                const updateLead=await Lead.findByIdAndUpdate(req.params.id,{status:"Converted"})
                return res.status(200).json({msg:"customer added sucessfully",data:createCustomer})
            }else{
                 return res.status(200).json({msg:"Customer Not Found"})
            }
        }else{
            return res.status(200).json({msg:"Lead Not Found"})
        }
    }catch(err){
         console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
module.exports.ViewCustomerDetails=async(req,res)=>{
    try{
            let findCustomer=await Customer.findById(req.params.id).populate("product").populate("lead");
            if(findCustomer){
                return res.status(200).json({msg:'customer Find',data:findCustomer})
            }else{
                return res.status(200).json({msg:'somthing went wrong',data:err})
            }
    }catch(err){
        return res.status(200).json({msg:'somthing Went Wrong',data:err})
    }
}
module.exports.dashCount = async (req, res) => {
  try {
    const leadCount = await Lead.countDocuments();
    const CustomerCount = await Customer.countDocuments();
    const TicketCount = await Ticket.countDocuments();
    const FollowupCount = await FollowUp.countDocuments();
    const SalesCount = await Sales.countDocuments();
    const todays = new Date().setHours(0, 0, 0, 0);
const tomorrow = new Date(todays);
tomorrow.setDate(tomorrow.getDate() + 1);

const expiringCount = await Quotation.countDocuments({
  expiryDate: { $gte: new Date(todays), $lt: tomorrow }
});

    const today = new Date().toISOString().split("T")[0];
    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const todayFollowups = await FollowUp.find({
      nextFollowup: { $gte: startOfDay, $lte: endOfDay },
    }).countDocuments();

    const totalSalesData = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);
    const TotalSalesAmount = totalSalesData[0]?.totalAmount || 0;

    return res.status(200).json({
      msg: "lead and customer count",
      todayFollowups,
      leadCount,
      CustomerCount,
      TicketCount,
      FollowupCount,
      SalesCount,
      TotalSalesAmount,
      QuotationCount:expiringCount
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
module.exports.ResentActivities=async(req,res)=>{
    try{
        const findLead=await Lead.findOne().sort({createdAt:-1})
         const findTicket=await Ticket.findOne().sort({createdAt:-1})
          const findFollowup=await FollowUp.findOne().sort({createdAt:-1})
           const findQuotation=await Quotation.findOne().sort({createdAt:-1})
            const findSales=await Payment.findOne().sort({createdAt:-1})
             const findCandidate=await Candidate.findOne().sort({createdAt:-1})

             let activityList=[];
           
    if (findLead) activityList.push({ text: `New Lead Added: ${findLead.name}` });
    if (findTicket) activityList.push({ text: `Ticket Created: ${findTicket.subject}` });
    if (findFollowup) activityList.push({ text: `Follow Up on: ${new Date(findFollowup.nextFollowup).toLocaleDateString()}` });
    if (findQuotation) activityList.push({ text: `Quotation Of: ₹${findQuotation.totalAmount}` });
    if (findSales) activityList.push({ text: `Sale Made: ₹${findSales.amount}` });
    if (findCandidate) activityList.push({ text: `Candidate Added: ${findCandidate.name}` });

    activityList = activityList.slice(0, 5);


               return res.status(200).json({msg:"Recent Activity",data:activityList})
    }catch(err){
        return res.status(200).json({msg:"somthing went wrong",data:err})
    }
}
module.exports.AllCustomer=async(req,res)=>{
    try{
        let findCustomer=await Customer.find().populate("product").exec()
        if(findCustomer){
            return res.status(200).json({msg:"all Customers",data:findCustomer})
        }else{
            return res.status(200).json({msg:"Customer Not Found"})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
module.exports.editCustomer=async(req,res)=>{
    try{
      let findid=await Customer.findById(req.params.id).populate('product').exec()
      if(findid){
        return res.status(200).json({ msg: "edit details", data: findid })
      }else{
            return res.status(200).json({msg:"edit customer Not Found"})
      }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.UpdateCustomer=async(req,res)=>{
    try{
            let ceditDetails=await Customer.findById(req.params.id);
            if(ceditDetails){
                let updateDetails=await Customer.findByIdAndUpdate(req.params.id,req.body)
                if(updateDetails){
                    return res.status(200).json({msg:"Updated Successfully",data:updateDetails})
                }else{
                    return res.status(200).json({msg:"Updated failed"})
                }
            }else{
                    return res.status(200).json({msg:"Data Not Found"})
            }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.AddTicket=async(req,res)=>{
    try{
        const {subject,message,assigner,Lead,role,status,category,priority}=req.body
        let findid=await Customer.findById(req.params.id)
        if(findid){
            let createTicket=await  Ticket.create({
                subject,message,assigner,status,role,priority,category,
                customer:findid._id,Lead:findid._id
                
            })
            if(createTicket){
                   return res.status(200).json({msg:'folloup adeed sucessfully',data:createFollowup})
            }else{
                return res.status(200).json({msg:"ticket not created"})
            }
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
module.exports.ShowTicket=async(req,res)=>{
    try{
        let findTicket=await Ticket.find().populate('customer').populate("Lead").exec();
        if(findTicket){
            return res.status(200).json({msg:"All Ticket",data:findTicket})
        }else{
            return res.status(200).json({msg:"Ticket Not Find"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
        
    }
}
module.exports.DeleteTicket=async(req,res)=>{
    try{
            let deleteData=await Ticket.findByIdAndDelete(req.params.id);
            if(deleteData){
                return res.status(200).json({msg:"Ticket deleted sucessfully",data:deleteData})
            }else{
                return res.status(200).json({msg:"Data not Deleted"})
            }
    }catch(err){
        return res.status(200).json({msg:"somthing went wrong"})
    }
}
module.exports.AddClosed = async (req, res) => {
   try{
        let findLead=await FollowUp.findById(req.params.id)
        if(findLead){
            const updateLead=await FollowUp.findByIdAndUpdate(req.params.id,{status:"Closed"})
                if(updateLead){
                    return res.status(200).json({msg:"customer added sucessfully",data:this.UpdateLead})
                }else{
                     return res.status(200).json({msg:"FollowUp not updated"})
                }
        }else{
            return res.status(200).json({msg:"FollowUp Id Not Found"})
        }
    }catch(err){
         console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
};
module.exports.AllFollowUp=async(req,res)=>{
    try{
        let findCustomer=await FollowUp.find().populate("product").populate("Lead").exec()
        if(findCustomer){
            return res.status(200).json({msg:"all Customers",data:findCustomer})
        }else{
            return res.status(200).json({msg:"Followup not found"})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
module.exports.CloseTicket=async(req,res)=>{
    try{
        let findTicket=await Ticket.findById(req.params.id)
        if(findTicket){
        const updateTicket=await Ticket.findByIdAndUpdate(req.params.id,{status:"Closed"})
            if(updateTicket){
                return res.status(200).json({msg:"followup updated sucessfully",data:updateTicket})
            }else{
                return res.status(200).json({msg:"Ticket Not Updated"})
            }
        }else{
            return res.status(200).json({msg:"ticket not find"})
        }
    }catch(err){
         console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
module.exports.ViewTicketDetails=async(req,res)=>{
    try{
            let findTicket=await Ticket.findById(req.params.id).populate('customer').populate("assigner").populate("Lead")
            if(findTicket){
                return res.status(200).json({msg:'ticket find',data:findTicket})
            }else{
                return res.status(200).json({msg:'Ticket Not Found',data:err})
            }
    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.MyTickets = async (req, res) => {
  try {
    const findTicket = await Ticket.find({ assigner: req.params.userId }).populate("Lead").populate("customer");
    if(findTicket){
        return res.status(200).json({ msg:'ticket find successfully',data: findTicket });
    }else{
            return res.status(200).json({msg:"ticket not find"})
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({ msg: "something went wrong" });
  }
};
module.exports.AddNewFollowUp = async (req, res) => {
  try {
    const { remark, nextFollowup, FollowUpType, status,assigner } = req.body;
    const lead = await Lead.findById(req.params.id).populate("product");
    if(lead){
        const followup = await FollowUp.create({
          remark,
          nextFollowup,
          FollowUpType,
          status,
          product: lead.product._id,
          assigner,
          Lead:lead._id
        });
        if(followup){
            return res.status(200).json({ msg: "Follow-Up added successfully", data: followup });
        }else{
            return res.status(200).json({msg:"FollowUp Not Created"})
        }
    }else{
            return res.status(200).json({msg:"lead not found"})
    }
  } catch (err) {
    console.error("FollowUp Add Error:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};
module.exports.EditLead=async(req,res)=>{
    try{
        let findid=await Lead.findById(req.params.id).populate('product').exec()
            if(findid){
                return res.status(200).json({msg:'Lead is here',data:findid})
            }else{
                return res.status(200).json({msg:"Lead is Not Find"})
            }
    }catch(err){
        return res.status(200).json({msg:'Somthing Went Wrong',data:err})
    }
}
module.exports.AddQuatation = async (req, res) => {
  try {
    const { quotationDate, items, totalAmount, notes,status } = req.body;
    const leadId = req.params.id;
    const lead = await Lead.findById(leadId);
    if(lead){
            const calculatedTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
            const newQuotation = await Quotation.create({
            lead: lead._id,
            quotationDate: quotationDate || new Date(),
            items,
            totalAmount: totalAmount || calculatedTotal,
            notes,
            status:status,
            createdBy: lead.assigner,
            //   customerId:customerData.customerId
            });
                if(newQuotation){
                    return res.status(200).json({msg: "Quotation Added Successfully",data: newQuotation });
                }else{
                    return res.status(200).json({msg:'Quotation is not create'})
                }
    }else{
        return res.status(200).json({msg:'Lead Not Found'})
    }
  } catch (err) {
    console.error("Quotation Add Error:", err);
    return res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};
module.exports.ViewQuotation=async(req,res)=>{
    try{
            let findQuotation=await Quotation.find().populate("items.product").populate("lead").populate("createdBy")
            if(findQuotation){
                return res.status(200).json({msg:"added Quotation",data:findQuotation})
            }else{
                return res.status(200).json({msg:'Quotation is not found'})
            }
    }catch(err){
         console.error("Quotation Add Error:", err);
         return res.status(500).json({ msg: "Something went wrong", error: err.message });
    }
}
module.exports.ViewQuotationById=async(req,res)=>{
    try{
            let findQuotation=await Quotation.findById(req.params.id).populate("items.product").populate("lead").populate("createdBy")
            if(findQuotation){
                return res.status(200).json({msg:"added Quotation",data:findQuotation})
            }else{
                return res.status(200).json({msg:'quotation is not find'})
            }
    }catch(err){
         console.error("Quotation Add Error:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
    }
}
module.exports.AddSales = async (req, res) => {
  try {
    const {totalAmount,PaymentStatus,saleDate,QuotationId,lead,product,createBy,customerId} = req.body;

  const findCustomer=await Customer.findById(req.body.customerId).populate("product").populate('lead').populate("assigner")
const quotation = await Quotation.findById(req.body.QuotationId);
    // Create sales entry
    const sale = await Sales.create({
        QuotationId:QuotationId,
      customerId: customerId,
      lead: quotation?.lead._id ,
       product: req.body.products.map((item) => ({
    productId: item.productId,  // <- check karo ye exist karta hai ya nahi
    quantity: item.quantity,
    price: item.Price,
  })),
      totalAmount: req.body.totalAmount,
      createBy: req.body.createBy,
      PaymentStatus: req.body.PaymentStatus || "Pending",
      saleDate: req.body.saleDate || Date.now(),
    });
    if(sale){
        return res.status(200).json({msg:'sale added sucessfuly',data:sale})
    }else{
            return res.status(200).json({msg: "Sales Added Successfully",data: sale });
    }
  } catch (err) {
    console.error("Sales Add Error:", err);
    return res.status(500).json({msg: "Something went wrong",error: err.message});
  }
};
module.exports.ViewSales=async(req,res)=>{
    try{
            let findSales=await Sales.find().populate({
                path:"QuotationId",
                populate:{
                    path:"lead",
                    model:"Lead"
                }
            }).populate("customerId").populate("createBy").populate('product.productId').populate('lead')
            if(findSales){
                return res.status(200).json({msg:"added Quotation",data:findSales})
            }else{
                return res.status(200).json({msg: "sale not Added"});
            }
    }catch(err){
         console.error("Quotation Add Error:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
    }
}
module.exports.ViewSalesDetails=async(req,res)=>{
    try{
 let findSales=await Sales.findById(req.params.id).
            populate("customerId").populate("createBy").populate('product.productId').populate('lead')
        if(findSales){
            return res.status(200).json({msg:"Sales Find",data:findSales})
        }else{
            return res.status(200).json({msg:'Sales Not Found'})
        }
    }catch(err){
        return res.status(200).json({msg:'somthing Went Wrong',data:err})
    }
}
exports.AddPayment = async (req, res) => {
  try {
    const { saleId, amount, method, receivedDate, customerId,status  } = req.body;
    const payment = await Payment.create({
      saleId,
      amount,
      method,
      receivedDate,
      customerId,
      status
    });

    // Calculate total paid
    const payments = await Payment.find({ saleId, customerId });
    const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);

    // Update PaymentStatus in Sales
  const sale = await Sales.findById(saleId);

    if (sale.totalAmount <= totalPaid) {
      // ✅ status update
      sale.PaymentStatus = "Paid";
    } else {
      sale.PaymentStatus = "Pending";
    }

    await sale.save();

    // Populate customer and return
    const populatedPayment = await Payment.findById(payment._id).populate("customerId");

    return res.status(200).json({ msg: "Payment Added",payment: populatedPaymentss});
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message });
  }
};
module.exports.ViewPayments=async(req,res)=>{
    try{
        let findPayments=await Payment.find().populate("customerId").populate("saleId");
        if(findPayments){
            return res.status(200).json({msg:"All Payments",data:findPayments})
        }else{
            return res.status(200).json({msg: "Payment not Found"});
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"Somthing Went Wrong"})
    }
}
module.exports.UpdateProfile=async(req,res)=>{
    try{
        if(req.file){
            let checkEmail=await Auth.findById(req.params.id);
            if(checkEmail){
              try{
                  let delpath=path.join(__dirname,'..',checkEmail.Image);
                    fs.unlinkSync(delpath);
              }catch(err){
                console.log(err)
                return res.status(200).json({msg:"Image Error"})
              }
              let newImg=await Auth.ImgPath+'/'+req.file.filename;
              req.body.Image=newImg;
              let updateProfiles=await Auth.findByIdAndUpdate(req.params.id,req.body)
              if(updateProfiles){
                  return res.status(200).json({msg:"Data Updated Suessfully",data:updateProfiles})
              }else{
                return res.status(200).json({msg: "Profile Not Update"});
              }
            }else{
                return res.status(200).json({msg: "email not found"});
            }
        }else{
            let checkEmail=await Auth.findById(req.params.id);
            req.body.Image=checkEmail.Image;
             let updateProfiles=await Auth.findByIdAndUpdate(req.params.id,req.body)
               if(updateProfiles){
                  return res.status(200).json({msg:"Data Updated Suessfully",data:updateProfiles})
              }else{
                return res.status(200).json({msg: "Profile Not Update"});
              }
        }
    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.AddCandidate=async(req,res)=>{
    try{
        req.body.resume = req.files.resume ? Candidate.ImgPath + '/' + req.files.resume[0].filename : '';
req.body.coverLetter = req.files.coverLetter ? Candidate.ImgPath + '/' + req.files.coverLetter[0].filename : '';
req.body.contract = req.files.contract ? Candidate.ImgPath + '/' + req.files.contract[0].filename : '';
req.body.profileImage = req.files.profileImage ? Candidate.ImgPath + '/' + req.files.profileImage[0].filename : '';

        let createCandidate=await Candidate.create(req.body)
          if(createCandidate){
                      return res.status(200).json({msg:"Candidate Added Successfully",data:createCandidate})
              }else{
                return res.status(200).json({msg: "candidate Not create"});
              }
   
    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.ViewCandidate=async(req,res)=>{
    try{
            let findCandidate=await Candidate.find();
            if(findCandidate){
                return res.status(200).json({mag:"AllCandidate",data:findCandidate})
            }else{
                return res.status(200).json({msg:"Candidate Not Find"})
            }
    }catch(err){
        return res.status(200).json({msg:'Somthing Went Wrong',data:err})
    }
}
