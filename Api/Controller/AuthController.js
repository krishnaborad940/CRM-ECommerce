
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
const Companies = require("../Model/CompaniesModel");
const Note=require('../Model/NoteModule');
const { route } = require("../Routes/AuthRoutes");
// login-register-profile
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
                    return res.status(200).json({msg:"login successfully",    token,
      user: {
        _id: checkEmail._id,
        name: checkEmail.name,
        email: checkEmail.email,
        role: checkEmail.role,
        Image: checkEmail.Image,
      },})
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
// dashpage
module.exports.dashCount = async (req, res) => {
  try {
    // Total counts
    const leadCount = await Lead.countDocuments();
    const CustomerCount = await Customer.countDocuments();
    const TicketCount = await Ticket.countDocuments();
    const FollowupCount = await FollowUp.countDocuments();
    const SalesCount = await Sales.countDocuments();
    const QuotationCount = await Quotation.countDocuments();

    // Aaj ki date ka setup
    const todays = new Date();
    todays.setHours(0, 0, 0, 0);

    const tomorrow = new Date(todays);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Quotations expiring today
    const expiringCount = await Quotation.countDocuments({
      expiryDate: {
        $gte: todays,
        $lt: tomorrow,
      },
    });

    // FollowUps due today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayFollowups = await FollowUp.countDocuments({
      nextFollowup: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Total Sales Amount
    const totalSalesData = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

    const TotalSalesAmount = totalSalesData[0]?.totalAmount || 0;

    // Final Response
    return res.status(200).json({
      msg: "Dashboard count fetched successfully",
      leadCount,
      CustomerCount,
      TicketCount,
      FollowupCount,
      SalesCount,
      QuotationCount,         // ✅ Total quotations
      ExpiringToday: expiringCount,  // ✅ Aaj expire hone wale quotations
      todayFollowups,
      TotalSalesAmount,
    });
  } catch (err) {
    console.error("Dashboard Count Error:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
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
module.exports.MonthlyLeadData = async (req, res) => {
  try {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 4);
    startDate.setHours(0, 0, 0, 0); // Start of first day

    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999); // End of today

    const data = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "+05:30" // ✅ For IST (Change as per your timezone)
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Ensure all 5 days present
    const result = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];

      const match = data.find((d) => d._id === key);
      result.push({ date: key, leads: match ? match.count : 0 });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error getting lead stats" });
  }
};


module.exports.MonthlySaleData = async (req, res) => {
  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 4);

    const data = await Sales.aggregate([
      {
        $match: {
          createdAt: { $gte: fromDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const result = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split("T")[0];

      const match = data.find((d) => d._id === key);
      result.push({ date: key, sales: match ? match.count : 0 });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error getting sales stats" });
  }
};
module.exports.notification = async (req, res) => {
  try {
    
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // ✅ Today's follow-ups
    const followups = await FollowUp.find({
      nextFollowup: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // ✅ Quotations expiring today
    const expiring = await Quotation.find({
      quotationDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const lowStock=await Product.find({stock:1}).select("title stock")
    const outStock=await Product.find({stock:0}).select("title stock")
    // console.log(expiring)

    return res.status(200).json({
      msg: "Notification fetched successfully",
      followups,
      expiring,
      lowStock,
      outStock
    });
  } catch (err) {
    console.error("Notification Error:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};

// product
module.exports.Product = async (req, res) => {
  try {
    let newImg = '';
    if (req.file) {
      newImg = await Product.ImgPath + '/' + req.file.filename;
    }

    const {
      title,
      description,
      Price,
      rate,
      category,
      IntialStock,
    } = req.body;

    const CreateProduct = await Product.create({
      title,
      description,
      Price,
      rate,
      category,
      IntialStock,
      stock: IntialStock, // ✅ now it works
      Image: newImg || "",
    });

    if (CreateProduct) {
      return res
        .status(200)
        .json({ msg: 'Product Added Successfully', data: CreateProduct });
    } else {
      return res.status(200).json({ msg: "Product Not Created" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
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
        return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.DeleteProduct=async(req,res)=>{
    try{
        let findProduct=await Product.findById(req.params.id)
        if(findProduct){
            try{
                let delPath=path.join(__dirname,'..',findProduct.Image)
                fs.unlinkSync(delPath)
            }catch(err){
                return res.status(200).json({msg:'Image Error',data:err})
            }
            let deleteProduct=await Product.findByIdAndDelete(findProduct);
            return res.status(200).json({msg:'Data Deleted',data:deleteProduct})
        }
    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.EditProduct=async(req,res)=>{
    try{
            let findProduct=await Product.findById(req.params.id);
        return res.status(200).json({msg:' Product Is Here',data:findProduct})

    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:err})

    }
}
module.exports.UpdateProduct=async(req,res)=>{
    try{
            let findProduct=await Product.findById(req.params.id);
            if(req.file){
                try{
                    let delPath=path.join(__dirname,'..',findProduct.Image)
                    fs.unlinkSync(delPath)
                }catch(err){
        return res.status(200).json({msg:'Image Error',data:err})
                }
                req.body.Image=await Product.ImgPath+"/"+req.file.filename
                let updateData=await Product.findByIdAndUpdate(req.params.id,req.body)
                     return res.status(200).json({msg:'Product Updated Successfulkly',data:updateData})
            }else{
                req.body.Image=findProduct.Image;
                      let updateData=await Product.findByIdAndUpdate(req.params.id,req.body)
                     return res.status(200).json({msg:'Product Updated Successfulkly',data:updateData})
            }
        // return res.status(200).json({msg:' Product Is Here',data:findProduct})

    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:err})

    }
}
const reduceProductStock = async (products) => {
  for (let item of products) {
    const { productId, quantity } = item;
    await Product.findByIdAndUpdate(
      productId,
      { $inc: { stock: -quantity } }, // ❗ stock घटाओ
      { new: true }
    );
  }
};
// Lead
module.exports.AddLead = async (req, res) => {
    try {
        const { name, role,email, phone,assigner, nextFollowup, productId, remark, status,companies } = req.body;
        const product = await Product.findById(productId);
        const company=await Companies.findById(companies)
      
   let newImg=await Lead.ImgPath+'/'+req.file.filename

        const createLead = await Lead.create({
            name,
            email,
            phone,role,
            product: product._id,
            nextFollowup,
            remark,
            assigner,
            status,
            companies:company._id,
            Image:newImg
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
        let showLead=await Lead.find().populate('companies').populate('product').populate('assigner').exec();
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
            let ceditDetails=await Lead.findById(req.params.id).populate("product");
            // console.log(ceditDetails)
            if(req.file){
                try{
                    let delpath=path.join(__dirname,'..',ceditDetails.Image)
                    fs.unlinkSync(delpath)
                }catch(err){
                    return res.status(200).json({msg:'Image Error',data:'err'})
                }
                req.body.Image=await Lead.ImgPath+'/'+req.file.filename
                let updateDetails=await Lead.findByIdAndUpdate(req.params.id,req.body)
                return res.status(200).json({msg:"Updated Successfully",data:updateDetails})
            }else{
                req.body.Image=ceditDetails.Image;
                 let updateDetails=await Lead.findByIdAndUpdate(req.params.id,req.body)
                return res.status(200).json({msg:"Updated Successfully",data:updateDetails})
            }
            
                // if(updateDetails){
                // }else{
                //     return res.status(200).json({msg:"Updated failed"})
                // }
            
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.LeadDetails=async(req,res)=>{
    try{
        let findLead=await Lead.findById(req.params.id).populate("product").populate('companies').populate('assigner')
        if(findLead){
            return res.status(200).json({msg:"lead find",data:findLead})
        }else{
            return res.status(200).json({msg:'Lead Not Find'})
        }
    }catch(err){
        return res.status(200).json({msg:'Somthing Went Wrong',data:err})
    }
}
// followup
module.exports.AddFollowup=async(req,res)=>{
    try{
        const {remark,nextFollowup,FollowUpType,status,assigner}=req.body
        let findid=await Lead.findById(req.params.id).populate("product")
        // console.log("lead data:-"+findid)
        if(findid){
            let createFollowup=await  FollowUp.create({
                remark,nextFollowup,FollowUpType,status,
                lead:findid ._id,
                product:findid.product._id,
                assigner:findid.assigner
            })
            // console.log("followup-data:-"+createFollowup)
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
module.exports.AllFollowUp=async(req,res)=>{
    try{
        let findCustomer=await FollowUp.find().populate({path:"lead",populate:{path:'assigner'}}).populate("product").populate('assigner').exec()
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
module.exports.AddNewFollowUp = async (req, res) => {
  try {
    const { remark, nextFollowup, FollowUpType, status,assigner } = req.body;
    const lead = await Lead.findById(req.params.id).populate("product");
    // console.log("lead data:-"+lead)
    if(lead){
        const followup = await FollowUp.create({
          remark,
          nextFollowup,
          FollowUpType,
          status,
          product: lead.product._id,
          assigner,
          lead:lead._id
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
// followup convet customer
module.exports.AddConvert=async(req,res)=>{
    try{
        let findLead=await Lead.findById(req.params.id)
        // console.log(findLead)
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
            // console.log(createCustomer)
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
module.exports.AllCustomer=async(req,res)=>{
    try{
        let findCustomer=await Customer.find().populate('lead').populate("product").populate('assigner').exec()
        // console.log(findCustomer)
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
module.exports.DeleteCustomer=async(req,res)=>{
    try{
      let findid=await Customer.findById(req.params.id)
      if(findid){
        let deleteData=await Customer.findByIdAndDelete(findid)
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
// Ticket
module.exports.AddTicket=async(req,res)=>{
    try{
        const {subject,message,assigner,lead,role,status,category,priority}=req.body
        let findid=await Customer.findById(req.params.id)
        if(findid){
            let createTicket=await  Ticket.create({
                subject,message,assigner,status,role,priority,category,
                customer:findid._id,lead:lead
                
            })
            // console.log(createTicket)
            if(createTicket){
                   return res.status(200).json({msg:'folloup adeed sucessfully',data:createTicket})
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
          let findTicket = await Ticket.find()
          .populate({
              path:'customer',
              populate:{
                  path:'lead'
                }
            })
            .populate('assigner')
      .exec();

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
            let findTicket=await Ticket.findById(req.params.id).populate({path:'customer',populate:{path:'lead'}}).populate("assigner").populate("lead")
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
    const assignerId = req.params.id;
    const tickets = await Ticket.find({ assigner: assignerId })
      .populate({
        path:"customer",
        populate:{
            path:'lead'
        }
      })
      .populate("assigner");
    res.status(200).json({ data: tickets });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tickets", error });
  }
};
// quotation
module.exports.AddQuatation = async (req, res) => {
  try {
    // console.log("body:-"+req.body)
    const { leadId, quotationDate, items, totalAmount, notes, status } = req.body;
    const lead = await Lead.findById(leadId);
// console.log("lead:-"+lead)
    if (lead) {
      const calculatedTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
      const newQuotation = await Quotation.create({
        lead: lead._id,
        quotationDate: quotationDate || new Date(),
        items,
        totalAmount: totalAmount || calculatedTotal,
        notes,
        status,
        createdBy: lead.assigner,
      });
    //   console.log("quotation"+newQuotation)

      if (newQuotation) {
        return res.status(200).json({ msg: "Quotation Added Successfully", data: newQuotation });
      } else {
        return res.status(400).json({ msg: "Quotation creation failed" });
      }
    } else {
      return res.status(404).json({ msg: "Lead Not Found" });
    }
  } catch (err) {
    console.error("Quotation Add Error:", err);
    return res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};
module.exports.ViewQuotation=async(req,res)=>{
    try{
            let findQuotation=await Quotation.find().populate("items.product").populate({path:"lead",populate:{path:'companies'}}).populate("createdBy")
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
         const { id } = req.params;
            let findQuotation=await Quotation.findById(req.params.id).populate("items.product").populate({path:'lead',populate:{path:'product',path:'companies'}}).populate("createdBy")
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
// sales
module.exports.AddSales = async (req, res) => {
  try {
    const {
      QuotationId,
      saleDate,
      product,
      totalAmount,
      PaymentStatus,
      customerId,
      createBy,
    } = req.body;

    if (!Array.isArray(product) || product.length === 0) {
      return res.status(400).json({ error: "Product must be a non-empty array" });
    }

    const transformedProducts = [];

    for (let item of product) {
      const productInDb = await Product.findById(item.productId);

      if (!productInDb) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (productInDb.stock < item.quantity) {
        return res.status(400).json({
          error: `Product "${productInDb.title}" is out of stock.`,
        });
      }

      // Reduce stock
      productInDb.stock -= item.quantity;
    //   productInDb.stock=productInDb.IntialStock
      await productInDb.save();
      if (productInDb.stock === 0) {
  productInDb.IntialStock = 0;
}

      // Push transformed item including image
      transformedProducts.push({
        productId: productInDb._id,
        quantity: item.quantity,
        price: item.price,
        title: productInDb.title,
        image: productInDb.Image || "", // ✅ product image
        stock: productInDb.stock,
      });
    }

    const newSale = await Sales.create({
      QuotationId,
      saleDate,
      product: transformedProducts,
      totalAmount,
      PaymentStatus,
      customerId,
      createBy,
    });

    return res.status(201).json({
      message: "Sale created and stock updated successfully",
      data: newSale,
    });
  } catch (error) {
    console.error("❌ Error adding sale:", error);
    return res.status(500).json({ error: "Internal server error" });
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
            }).populate({path:"customerId",populate:{path:'lead'}}).populate("createBy").populate('product.productId').populate('lead')
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
            populate({path:"customerId",populate:{path:'lead'}}).populate("createBy").populate('product.productId').populate('lead')
        if(findSales){
            return res.status(200).json({msg:"Sales Find",data:findSales})
        }else{
            return res.status(200).json({msg:'Sales Not Found'})
        }
    }catch(err){
        return res.status(200).json({msg:'somthing Went Wrong',data:err})
    }
}
module.exports.convertSlaes = async (req, res) => {
  try {
    const QuotationId = req.params.id;
    const quotation = await Quotation.findById(QuotationId).populate('lead').populate("items.product").populate("createdBy");
    // console.log(quotation);
const findCustomer=await Customer.findOne({lead:quotation.lead._id})
    const sale = await Sales.create({
      QuotationId: QuotationId,
      customerId: findCustomer._id,
      lead: quotation.lead,
      product: req.body.products.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.Price,
      })),
      totalAmount: req.body.totalAmount,
      createBy: req.body.createBy,
      PaymentStatus: req.body.PaymentStatus || "Paid",
      saleDate: req.body.saleDate || Date.now(),
    });

    if (sale) {
      await Quotation.findByIdAndUpdate(QuotationId, { status: "Approved" });

      return res
        .status(200)
        .json({ msg: "Customer added successfully", data: sale });
    } else {
      return res.status(400).json({ msg: "Sale creation failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};
// payment
exports.AddPayment = async (req, res) => {
  try {
    const { saleId, amount, method, receivedDate, customerId, status } = req.body;

    const payment = await Payment.create({
      saleId,
      amount,
      method,
      receivedDate,
      customerId,
      status,
    });

    // Calculate total paid
    const payments = await Payment.find({ saleId, customerId });
    const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);

    const sale = await Sales.findById(saleId);

    // ✅ Use updateOne instead of save() to avoid schema re-validation
    const newStatus = sale.totalAmount <= totalPaid ? "Paid" : "Pending";
    await Sales.updateOne({ _id: saleId }, { PaymentStatus: newStatus });

    const populatedPayment = await Payment.findById(payment._id).populate("customerId");

    return res.status(200).json({ msg: "Payment Added", payment: populatedPayment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports.ViewPayments=async(req,res)=>{
    try{
        let findPayments=await Payment.find().populate({path:"saleId",populate:{path:'customerId'},populate:{path:'lead'}}).populate({path:"customerId",populate:{path:'lead'}});
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
module.exports.ViewPaymentDetails=async(req,res)=>{
    try{
        let findPayment=await Payment.findById(req.params.id).populate({path:'customerId',populate:{path:'lead'}}).populate('saleId')
            if(findPayment){
                return res.status(200).json({msg:'Payment details is here',data:findPayment})
            }else{
                return res.status(200).json({msg:'Payment is Not Found'})
            }
    }catch(err){
        return res.status(200).json({msg:"somthing went wrong",data:err})
    }
}
// candidate
exports.AddCandidate = async (req, res) => {
  try {
       req.body.resume = req.files.resume ? Candidate.ImgPath + '/' + req.files.resume[0].filename : '';
req.body.coverLetter = req.files.coverLetter ? Candidate.ImgPath + '/' + req.files.coverLetter[0].filename : '';
req.body.contract = req.files.contract ? Candidate.ImgPath + '/' + req.files.contract[0].filename : '';
req.body.profileImage = req.files.profileImage ? Candidate.ImgPath + '/' + req.files.profileImage[0].filename : '';

   if (req.body.educationInfo) {
      req.body.educationInfo = JSON.parse(req.body.educationInfo);
    }
    if (req.body.workExperience) {
      req.body.workExperience = JSON.parse(req.body.workExperience);
    }
        let createCandidate=await Candidate.create(req.body)
          if(createCandidate){
                      return res.status(200).json({msg:"Candidate Added Successfully",data:createCandidate})
              }else{
                return res.status(200).json({msg: "candidate Not create"});
              }
  } catch (err) {
    console.log("🔥 Error while adding candidate:", err);
    res.status(500).json({ error: err.message });
  }
};
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
module.exports.CandidateDetails=async(req,res)=>{
    try{
            let findCandidate=await Candidate.findById(req.params.id)
            if(findCandidate){
                 return res.status(200).json({msg:'Find Candidate',data:findCandidate})
            }
    }catch(err){
         return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
// companies
module.exports.AddCompanies=async(req,res)=>{
    try{
        let newImg='';
        if(req.file){
            newImg=await Companies.ImgPath+'/'+req.file.filename
        }
        req.body.Image=newImg;
        let createCompanies=await Companies.create(req.body);
        return res.status(200).json({msg:'Added Successfully',data:createCompanies})
    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.ViewCompanies=async(req,res)=>{
    try{
        let findCompanies=await Companies.find();
        return res.status(200).json({msg:'All Companies',data:findCompanies})
    }catch(err){
       return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.DeleteCompanies=async(req,res)=>{
    try{
        let findCompanies=await Companies.findById(req.params.id);
        if(findCompanies){
           try{
             let delPath=path.join(__dirname,'..',findCompanies.Image)
            fs.unlinkSync(delPath)
           }catch(err){
            return res.status(200).json({msg:'Image Error',data:err})
           }
           let deleteData=await Companies.findByIdAndDelete(findCompanies._id)
           return res.status(200).json({msg:'All Companies',data:deleteData})
        }
    }catch(err){
       return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.EditCompanies=async(req,res)=>{
    try{
        let findCompanies=await Companies.findById(req.params.id);
        return res.status(200).json({msg:'All Companies',data:findCompanies})
    }catch(err){
       return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.UpdateCompanies=async(req,res)=>{
    try{
        if(req.file){
            let findCompanies=await Companies.findById(req.params.id);
            if(findCompanies){
                try{
                    let delpath=path.join(__dirname,'..',findCompanies.Image)
                fs.unlinkSync(delpath)
                }catch(err){
                    return res.status(200).json({msg:'Image Erorr',data:err})
                }
                req.body.Image=await Companies.ImgPath+'/'+req.file.filename
                let updatedata=await Companies.findByIdAndUpdate(req.params.id,req.body)
                return res.status(200).json({msg:'update Companies',data:updatedata})
            }

        }else{
            let findCompanies=await Companies.findById(req.params.id);
            req.body.image=findCompanies.Image;
             let updatedata=await Companies.findByIdAndUpdate(req.params.id,req.body)
                return res.status(200).json({msg:'update Companies',data:updatedata})

        }
    }catch(err){
       return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.CompaneyDetails=async(req,res)=>{
    try{
            let findProduct=await Companies.findById(req.params.id)
            if(findProduct){
                return res.status(200).json({msg:"added Quotation",data:findProduct})
            }else{
                return res.status(200).json({msg:"Product not find"})
            }
    }catch(err){
        return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
// Note
module.exports.AddNote=async(req,res)=>{
    try{
        // console.log(req.body)
        // console.log(req.file)
        const {title,description,Image,candidate,status,noteType}=req.body
        const findCandidate=await Candidate.findById(candidate)
// console.log(candidate)
        let newImg='';
        if(req.file){
            newImg=await Note.ImgPath+'/'+req.file.filename
        }
        const createNote=await Note.create({
            title,Image:newImg,description,candidate:findCandidate._id,status,noteType
        })
       return res.status(200).json({msg:'findSucessfully',data:createNote})

    }catch(err){
       return res.status(200).json({msg:'somthing went wrong',data:err})

    }
}
module.exports.ViewNote=async(req,res)=>{
    try{
        let findNote=await Note.find().populate('candidate')
       return res.status(200).json({msg:'findSucessfully',data:findNote})

    }catch(err){
       return res.status(200).json({msg:'somthing went wrong',data:err})
    }
}
module.exports.NoteDetails=async(req,res)=>{
    try{
        let findNote=await Note.findById(req.params.id).populate("candidate")
        if(findNote){
            return res.status(200).json({msg:"Note find",data:findNote})
        }else{
            return res.status(200).json({msg:'Note Not Find'})
        }
    }catch(err){
        return res.status(200).json({msg:'Somthing Went Wrong',data:err})
    }
}
module.exports.editNote=async(req,res)=>{
    try{
      let findid=await Note.findById(req.params.id).populate('candidate').exec()
      if(findid){
        return res.status(200).json({ msg: "note details", data: findid })
      }else{
            return res.status(200).json({msg:"note Data Not Found"})
      }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.UpdateNote=async(req,res)=>{
    try{
            let ceditDetails=await Note.findById(req.params.id);
            if(req.file){
                try{
                    let delpath=path.join(__dirname,'..',ceditDetails.Image)
                    fs.unlinkSync(delpath)
                }catch(err){
                    return res.status(200).json({msg:'Image Error',data:'err'})
                }
                req.body.Image=await Note.ImgPath+'/'+req.file.filename
                let updateDetails=await Note.findByIdAndUpdate(req.params.id,req.body)
                return res.status(200).json({msg:"Updated Successfully",data:updateDetails})
            }else{
                req.body.Image=ceditDetails.Image;
                 let updateDetails=await Note.findByIdAndUpdate(req.params.id,req.body)
                return res.status(200).json({msg:"Updated Successfully",data:updateDetails})
            }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}
module.exports.DeleteNote=async(req,res)=>{
    try{
      let findid=await Note.findById(req.params.id)
      if(findid){
        let deleteData=await Note.findByIdAndDelete(findid)
        if(deleteData){
            return res.status(200).json({ msg: "delete note", data: deleteData })
        }else{
            return res.status(200).json({msg:"Data Not Deleted"})
        }
      }else{
            return res.status(200).json({msg:"note Not Find"})
      }
    }catch(err){
        console.log(err)
        return res.status(500).json({ msg: "Something Went Wrong", error: err.message });
    }
}

