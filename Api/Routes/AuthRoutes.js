const express=require('express');

const routes=express.Router()
const AuthCtl=require('../Controller/AuthController');
const Auth = require('../Model/AuthModel');
const Product=require("../Model/ProductModel");
const Candidate=require("../Model/CandidateModel")

routes.post("/",Auth.uploadImageFile,AuthCtl.Register)
routes.post("/Login",AuthCtl.Login)
routes.get("/AllUser",AuthCtl.AllUser)
routes.put("/UpdateProfile/:id",Auth.uploadImageFile,AuthCtl.UpdateProfile)



routes.post("/Product",Product.uploadImageFile,AuthCtl.Product)
routes.get("/showProduct",AuthCtl.showProduct)
routes.get("/ProductDetails/:id",AuthCtl.ProductDetails)


routes.post("/AddLead",AuthCtl.AddLead)
routes.get("/ViewLead",AuthCtl.ViewLead)
routes.delete("/DeleteLead/:id",AuthCtl.DeleteLead)
routes.get("/editLead/:id",AuthCtl.editLead)
routes.put("/UpdateLead/:id",AuthCtl.UpdateLead)
routes.get("/LeadDetails/:id",AuthCtl.LeadDetails)


// FollowUp
routes.post("/AddFollowup/:id",AuthCtl.AddFollowup)
// lead=>customer
routes.post("/AddConvert/:id",AuthCtl.AddConvert)
routes.get("/ViewCustomerDetails/:id",AuthCtl.ViewCustomerDetails)

// totalCount
routes.get("/dashCount",AuthCtl.dashCount)
routes.get("/ResentActivities",AuthCtl.ResentActivities)
// allCustomer
routes.get("/AllCustomer",AuthCtl.AllCustomer)
routes.get("/editCustomer/:id",AuthCtl.editCustomer)
routes.put("/UpdateCustomer/:id",AuthCtl.UpdateCustomer)

// Ticket
routes.post("/AddTicket/:id",AuthCtl.AddTicket)
routes.get("/ShowTicket",AuthCtl.ShowTicket)
routes.delete("/DeleteTicket/:id",AuthCtl.DeleteTicket)
routes.post("/CloseTicket/:id",AuthCtl.CloseTicket)
routes.get("/ViewTicketDetails/:id",AuthCtl.ViewTicketDetails)
// foolowup-->closed
routes.get("/AllFollowUp",AuthCtl.AllFollowUp)
routes.post("/AddClosed/:id",AuthCtl.AddClosed)

// ticket-assigne
routes.get("/MyTickets/:userId",AuthCtl.MyTickets);
routes.post("/AddNewFollowUp/:id",AuthCtl.AddNewFollowUp)
routes.get("/EditLead/:id",AuthCtl.EditLead)

// Quatation
routes.post("/AddQuatation/:id",AuthCtl.AddQuatation)
routes.get("/ViewQuotation",AuthCtl.ViewQuotation)
routes.get("/ViewQuotationById/:id",AuthCtl.ViewQuotationById)

// Sales
routes.post("/AddSales",AuthCtl.AddSales)
routes.get("/ViewSales",AuthCtl.ViewSales)
routes.get("/ViewSalesDetails/:id",AuthCtl.ViewSalesDetails)
// payment
routes.post("/AddPayment",AuthCtl.AddPayment)
routes.get("/ViewPayments",AuthCtl.ViewPayments)
routes.get("/ViewPaymentDetails/:id",AuthCtl.ViewPaymentDetails)

// Candidate
routes.post("/AddCandidate",Candidate.uploadeImageFile,AuthCtl.AddCandidate)
routes.get("/ViewCandidate",AuthCtl.ViewCandidate)

module.exports=routes

// 65,26,88,29,23,86,32