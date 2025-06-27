// const Auth = require("../Model/AuthModel")
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
const NewFollowUp = require("../Model/NewFollowUpModel");
const Quatation = require("../Model/QuatationModel");
// const mongoose=require("mongoose")

module.exports.Register=async(req,res)=>{
    try{
        let checkEmail=await Auth.findOne({email:req.body.email});
        if(!checkEmail){
            if(req.body.password===req.body.ConfirmPassword){
                    let newImg=''
                if(req.file){
                    newImg=await Auth.ImgPath+"-"+req.file.filename;
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
            }
        }

    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"Somthing Went Wrong"})
    }
}
module.exports.AllUser=async(req,res)=>{
    try{
        let findAllUser=await Auth.find();
        return res.status(200).json({msg:"All User",data:findAllUser})

    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"Somthing Went Wrong"})

    }
}
module.exports.Product=async(req,res)=>{
    try{
        // console.log(req.body);
        // console.log(req.file)
        let newImg='';
        if(req.file){
            newImg=await Product.ImgPath+'/'+req.file.filename
        }
        req.body.Image=newImg;
        let CreateProduct=await Product.create(req.body);
        if(CreateProduct){
            return res.status(200).json({msg:'Product Added Sussecfully',data:CreateProduct})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went wrong"})
    }
}
module.exports.showProduct=async(req,res)=>{
    try{
        let findAllProduct=await Product.find();
        return res.status(200).json({msg:"All User",data:findAllProduct})

    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"Somthing Went Wrong"})

    }
}

module.exports.AddLead = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, role,email, phone,assigner, nextFollowup, productId, remark, status } = req.body;

        const product = await Product.findById(productId);
        // console.log(product)
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


        return res.status(200).json({ msg: "Lead Added Successfully", data: createLead });

    } catch (err) {
        console.error("AddLead Error:", err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
};
module.exports.ViewLead=async(req,res)=>{
    try{
        let showLead=await Lead.find().populate('product').exec()
        return res.status(200).json({ msg: "all leads", data: showLead })
        
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.DeleteLead=async(req,res)=>{
    try{
      let findid=await Lead.findById(req.params.id)
      console.log(findid)
      if(findid){
        let deleteData=await Lead.findByIdAndDelete(findid)
        return res.status(200).json({ msg: "delete leads", data: deleteData })
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
      }
      
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.UpdateLead=async(req,res)=>{
    try{
        console.log(req.params.id)
            let ceditDetails=await Lead.findById(req.params.id);
            console.log(ceditDetails)
            if(ceditDetails){
                let updateDetails=await Lead.findByIdAndUpdate(req.params.id,req.body)
                console.log(updateDetails)
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

module.exports.AddFollowup=async(req,res)=>{
    try{
        // console.log(req.body)
        const {remark,nextFollowup,FollowUpType,status,assigner}=req.body
        let findid=await Lead.findById(req.params.id).populate("product")
        // let findProduct=await product.findById(productId)

        if(findid){
            let createFollowup=await  FollowUp.create({
                remark,nextFollowup,FollowUpType,status,
                Lead:findid ._id,
                product:findid.product._id,
                assigner
            })
            return res.status(200).json({msg:'folloup adeed sucessfully',data:createFollowup})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}

module.exports.AddConvert=async(req,res)=>{
    try{
        // console.log(req.params.id);
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
        const updateLead=await Lead.findByIdAndUpdate(req.params.id,{status:"Converted"})

            // await Lead.findByIdAndDelete(req.params.id)
            return res.status(200).json({msg:"customer added sucessfully",data:createCustomer})
        }
        
    }catch(err){
         console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
module.exports.dashCount=async(req,res)=>{
    try{

        const leadCount=await Lead.countDocuments();
        const CustomerCount=await Customer.countDocuments();
        const TicketCount=await Ticket.countDocuments();
        const FollowupCount=await FollowUp.countDocuments()
        return res.status(200).json({msg:"lead and customer count",leadCount,CustomerCount,TicketCount,FollowupCount})
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}

module.exports.AllCustomer=async(req,res)=>{
    try{
        let findCustomer=await Customer.find().populate("product").exec()
        return res.status(200).json({msg:"all Customers",data:findCustomer})
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
        // let findProduct=await product.findById(productId)S

        if(findid){
            let createFollowup=await  Ticket.create({
                subject,message,assigner,status,role,priority,category,
                customer:findid._id,Lead:findid._id
                
            })
            return res.status(200).json({msg:'folloup adeed sucessfully',data:createFollowup})
        }
    }catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
module.exports.ShowTicket=async(req,res)=>{
    try{
        let findTicket=await Ticket.find().populate('customer').populate("Lead").exec();
        return res.status(200).json({msg:"All Ticket",data:findTicket})
    }
    catch(err){
        console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
        
    }
}
module.exports.DeleteTicket=async(req,res)=>{
    try{
            let deleteData=await Ticket.findByIdAndDelete(req.params.id);
            return res.status(200).json({msg:"Ticket deleted sucessfully",data:deleteData})
    }catch(err){
        return res.status(200).json({msg:"somthing went wrong"})
    }
}
module.exports.AddClosed = async (req, res) => {
   try{
        // console.log(req.params.id);
        let findLead=await Ticket.findById(req.params.id)

       
        const updateLead=await Ticket.findByIdAndUpdate(req.params.id,{status:"Closed"})
        // const updateFoloowup=await FollowUp.findByIdAndUpdate(req.params.id,{status:"Closed"})

            // await Lead.findByIdAndDelete(req.params.id)
            return res.status(200).json({msg:"customer added sucessfully",data:createCustomer})
        
        
    }catch(err){
         console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
};
module.exports.AllFollowUp=async(req,res)=>{
    try{
        let findCustomer=await FollowUp.find().populate("product").populate("Lead").exec()
        return res.status(200).json({msg:"all Customers",data:findCustomer})
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

            // await Lead.findByIdAndDelete(req.params.id)
            return res.status(200).json({msg:"customer added sucessfully",data:updateTicket})
        }
        
    }catch(err){
         console.log(err)
        return res.status(200).json({msg:"somthing went Wrong"})
    }
}
module.exports.MyTickets = async (req, res) => {
  try {
    // console.log(req.params.id)
    const findTicket = await Ticket.find({ assigner: req.params.id }).populate("Lead")
    return res.status(200).json({ data: findTicket });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ msg: "something went wrong" });
  }
};

module.exports.AddNewFollowUp = async (req, res) => {
  try {
    const { remark, nextFollowup, FollowUpType, status,assigner } = req.body;

    const lead = await Lead.findById(req.params.id).populate("product");
    console.log("lead:-"+lead)
  
    const followup = await NewFollowUp.create({
      remark,
      nextFollowup,
      FollowUpType,
      status,
      product: lead.product._id,
      assigner,
      Lead:lead._id
    });

    return res.status(200).json({ msg: "Follow-Up added successfully", data: followup });
  } catch (err) {
    console.error("FollowUp Add Error:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};
module.exports.EditLead=async(req,res)=>{
        let findid=await Lead.findById(req.params.id).populate('product').exec()
      if(findid){
        return res.status(200).json({ msg: "edit details", data: findid })
      } 
}


module.exports.AddQuatation = async (req, res) => {
  try {
    const { quotationDate, items, totalAmount, notes,status } = req.body;
    const leadId = req.params.id;
    const lead = await Lead.findById(leadId);
    const calculatedTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const newQuotation = await Quatation.create({
      lead: lead._id,
      quotationDate: quotationDate || new Date(),
      items,
      totalAmount: totalAmount || calculatedTotal,
      notes,
      status:status,
      createdBy: lead.assigner
    });

    return res.status(200).json({msg: "Quotation Added Successfully",data: newQuotation });

  } catch (err) {
    console.error("Quotation Add Error:", err);
    return res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};

module.exports.ViewQuotation=async(req,res)=>{
    try{
            let findQuotation=await Quatation.find().populate("items.product").populate("lead").populate("createdBy")
            return res.status(200).json({msg:"added Quotation",data:findQuotation})
    }catch(err){
         console.error("Quotation Add Error:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
    }
}
module.exports.ViewQuotationById=async(req,res)=>{
    try{
            let findQuotation=await Quatation.findById(req.params.id).populate("items.product").populate("lead").populate("createdBy")
            return res.status(200).json({msg:"added Quotation",data:findQuotation})
    }catch(err){
         console.error("Quotation Add Error:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
    }
}
// module.exports.AddSales=async(req,res)=>{
//     try{
//             const {}=req.body
//     }catch(err){
//          console.error("Quotation Add Error:", err);
//     return res.status(500).json({ msg: "Something went wrong", error: err.message });
//     }
// }
